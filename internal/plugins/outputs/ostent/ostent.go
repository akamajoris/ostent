package ostent

import (
	"fmt"
	"sort"
	"strings"
	"sync"

	"github.com/shirou/gopsutil/disk"

	"github.com/influxdata/telegraf"
	"github.com/influxdata/telegraf/plugins/outputs"
	// "github.com/influxdata/telegraf/plugins/serializers"

	"github.com/ostrost/ostent/format"
)

type convert struct {
	k string // k for key; required, others optional
	v *int64 // v for value
	// for humanB conversion:
	s *string // s for string
	r *uint64 // r for round
	f func(uint64) string
}

// decode returns true if everything went ok.
func decode(fields map[string]interface{}, converts []convert) bool {
	for _, c := range converts {
		if f, ok := fields[c.k]; ok {
			if v, ok := f.(int64); ok {
				if c.v != nil {
					*c.v = v
				}
				if c.s != nil {
					if c.f != nil {
						*c.s = c.f(uint64(v))
					} else {
						*c.s = humanB(v, c.r)
					}
				}
				continue
			}
		}
		return false // either fields lookup or casting failed
	}
	return true
}

var humanUnitless = format.HumanUnitless

func humanBits(n uint64) string { return format.HumanBits(n * 8) }

func humanB(value int64, round *uint64) string {
	if round == nil {
		return format.HumanB(uint64(value))
	}
	var s string
	s, *round, _ = format.HumanBandback(uint64(value)) // err is ignored
	return s
}

type group struct {
	mutex sync.Mutex
	kv    map[string]interface{}
}

type groupCPU struct {
	mutex sync.Mutex
	list  []cpuData
}

type groupDisk struct {
	mutex sync.Mutex
	list  []diskData
}

type groupMemory struct {
	mutex sync.Mutex
	list  [2]memoryData
}

type groupNet struct {
	mutex sync.Mutex
	list  []netData
}

type cpuData struct {
	N string

	// percents without "%"
	UserPct int64
	SysPct  int64
	WaitPct int64
	IdlePct int64
}

type diskData struct {
	DevName string
	DirName string

	// strings with units

	// bytes
	Total  string
	Used   string
	Avail  string
	UsePct uint // percent without "%"

	// inodes
	Inodes  string
	Iused   string
	Ifree   string
	IusePct uint // percent without "%"
}

type memoryData struct {
	Kind string

	// strings with units
	Total string
	Used  string
	Free  string

	UsePct uint // percent without "%"
}

type netData struct {
	loopback bool

	Name string
	IP   string `json:",omitempty"` // may be empty

	// strings with units

	BytesIn    string
	BytesOut   string
	DropsIn    string
	DropsOut   string `json:",omitempty"`
	ErrorsIn   string
	ErrorsOut  string
	PacketsIn  string
	PacketsOut string

	DeltaBitsIn      string
	DeltaBitsOut     string
	DeltaBytesOutNum int64
	DeltaDropsIn     string
	DeltaDropsOut    string `json:",omitempty"`
	DeltaErrorsIn    string
	DeltaErrorsOut   string
	DeltaPacketsIn   string
	DeltaPacketsOut  string
}

type cpuList []cpuData

// Len, Swap and Less satisfy sorting interface.
func (cl cpuList) Len() int           { return len(cl) }
func (cl cpuList) Swap(i, j int)      { cl[i], cl[j] = cl[j], cl[i] }
func (cl cpuList) Less(i, j int) bool { return cl[i].IdlePct < cl[j].IdlePct }

// TODO type diskList []diskData

type netList []netData

func (nl netList) Len() int      { return len(nl) }
func (nl netList) Swap(i, j int) { nl[i], nl[j] = nl[j], nl[i] }
func (nl netList) Less(i, j int) bool {
	a, b := nl[i], nl[j]
	if !(a.loopback && b.loopback) {
		if a.loopback {
			return false
		} else if b.loopback {
			return true
		}
	}
	return a.Name < b.Name
}

type ostent struct {
	// serializer serializers.Serializer

	diskParts dparts

	systemCPU    groupCPU
	systemDisk   groupDisk
	systemMemory groupMemory
	systemNet    groupNet
	systemOstent group
}

type dparts struct {
	mutex sync.Mutex
	parts map[string]string
}

func (o *ostent) SystemOstentCopy() (map[string]string, lalist) {
	o.systemOstent.mutex.Lock()
	defer o.systemOstent.mutex.Unlock()
	dup := make(map[string]string, len(o.systemOstent.kv))
	for k, v := range o.systemOstent.kv {
		if !strings.HasPrefix(k, "load") {
			if s, ok := v.(string); ok {
				dup[k] = s
			}
		}
	}
	periods := [3]string{"1", "5", "15"}
	lal := lalist{make([]la, len(periods))}
	for i, period := range periods {
		if v, ok := o.systemOstent.kv["load"+period]; ok {
			if f, ok := v.(float64); ok {
				lal.List[i] = la{period, fmt.Sprintf("%.2f", f)}
			}
		}
	}
	return dup, lal
}

type la struct {
	Period, Value string
}

type lalist struct{ List []la }
type list struct{ List interface{} }

func (o *ostent) SystemCPUCopyL() interface{}    { return list{o.systemCPUCopy()} }
func (o *ostent) SystemDiskCopyL() interface{}   { return list{o.systemDiskCopy()} }
func (o *ostent) SystemMemoryCopyL() interface{} { return list{o.systemMemoryCopy()} }
func (o *ostent) SystemNetCopyL() interface{}    { return list{o.systemNetCopy()} }

func (o *ostent) systemDiskCopy() []diskData {
	o.systemDisk.mutex.Lock()
	defer o.systemDisk.mutex.Unlock()
	llen := len(o.systemDisk.list)
	if llen == 0 {
		return []diskData{}
	}
	dup := make([]diskData, llen)
	copy(dup, o.systemDisk.list)
	// sort.Sort(diskList(dup))
	return dup
}

func (o *ostent) systemCPUCopy() []cpuData {
	o.systemCPU.mutex.Lock()
	defer o.systemCPU.mutex.Unlock()
	llen := len(o.systemCPU.list)
	if llen == 0 {
		return []cpuData{}
	}
	tshift := 0 // "total shift"
	if o.systemCPU.list[llen-1].N == "cpu-total" {
		tshift = 1
	}

	dup := make([]cpuData, llen)
	copy(dup[tshift:], o.systemCPU.list[:llen-tshift])
	sort.Sort(cpuList(dup[tshift:]))
	if tshift != 0 {
		dup[0] = o.systemCPU.list[llen-tshift] // last, "cpu-total", becomes first
	}
	return dup
}

func (o *ostent) systemMemoryCopy() []memoryData {
	o.systemMemory.mutex.Lock()
	defer o.systemMemory.mutex.Unlock()
	dup := make([]memoryData, len(o.systemMemory.list))
	copy(dup, o.systemMemory.list[:])
	return dup
}

func (o *ostent) systemNetCopy() []netData {
	o.systemNet.mutex.Lock()
	defer o.systemNet.mutex.Unlock()
	llen := len(o.systemNet.list)
	if llen == 0 {
		return []netData{}
	}
	dup := make([]netData, llen)
	copy(dup, o.systemNet.list)
	sort.Sort(netList(dup)) // not .Stable
	return dup
}

func (dp *dparts) mpDevice(mountpoint string) (string, error) {
	dp.mutex.Lock()
	defer dp.mutex.Unlock()

	if device, ok := dp.parts[mountpoint]; ok {
		return device, nil
	}
	parts, err := disk.Partitions(true)
	if err != nil {
		return "", err
	}
	for _, p := range parts {
		dp.parts[p.Mountpoint] = p.Device
	}
	return dp.parts[mountpoint], nil
}

func (o *ostent) writeSystemCPU(cpuno int, m telegraf.Metric) {
	cd := cpuData{N: m.Tags()["cpu"]}

	if !decode(m.Fields(), []convert{
		{k: "usage_user", v: &cd.UserPct},
		{k: "usage_system", v: &cd.SysPct},
		{k: "usage_iowait", v: &cd.WaitPct},
		{k: "usage_idle", v: &cd.IdlePct},
	}) {
		return // either fields lookup or casting failed
	}

	o.systemCPU.mutex.Lock()
	defer o.systemCPU.mutex.Unlock()
	if len(o.systemCPU.list) < cpuno {
		list := make([]cpuData, cpuno)
		copy(list, o.systemCPU.list)
		o.systemCPU.list = list
	}
	o.systemCPU.list[cpuno-1] = cd
}

func (o *ostent) writeSystemDisk(diskno int, m telegraf.Metric) {
	dd := diskData{DirName: m.Tags()["path"]}
	dd.DevName, _ = o.diskParts.mpDevice(dd.DirName) // err is ignored

	var rounds, roundInodes struct{ used, free uint64 }
	if !decode(m.Fields(), []convert{
		{k: "total", s: &dd.Total},
		{k: "used", s: &dd.Used, r: &rounds.used},
		{k: "free", s: &dd.Avail, r: &rounds.free},
		{k: "inodes_total", s: &dd.Inodes},
		{k: "inodes_used", s: &dd.Iused, r: &roundInodes.used},
		{k: "inodes_free", s: &dd.Ifree, r: &roundInodes.free},
	}) {
		return // either fields lookup or casting failed
	}
	dd.UsePct = format.Percent(rounds.used, rounds.used+rounds.free)
	dd.IusePct = format.Percent(roundInodes.used, roundInodes.used+roundInodes.free)

	o.systemDisk.mutex.Lock()
	defer o.systemDisk.mutex.Unlock()
	if len(o.systemDisk.list) < diskno {
		list := make([]diskData, diskno)
		copy(list, o.systemDisk.list)
		o.systemDisk.list = list
	}
	o.systemDisk.list[diskno-1] = dd
}

func (o *ostent) writeSystemMemory(m telegraf.Metric) {
	var (
		fields = m.Fields()
		md     = memoryData{Kind: m.Name()}
	)
	isRAM := md.Kind == "mem"
	if isRAM {
		md.Kind = "RAM"
	}

	var values struct{ total, free int64 }
	var rounds struct{ total, used uint64 }
	if !decode(fields, []convert{
		{k: "total", v: &values.total, s: &md.Total, r: &rounds.total},
		{k: "free", v: &values.free, s: &md.Free},
	}) {
		return // either fields lookup or casting failed
	}
	if isRAM {
		md.Used = humanB(values.total-values.free, &rounds.used)
	} else if !decode(fields, []convert{
		{k: "used", s: &md.Used, r: &rounds.used},
	}) {
		return // either fields lookup or casting failed
	}

	md.UsePct = format.Percent(rounds.used, rounds.total)

	index := 0
	if !isRAM { // must be swap
		index = 1
	}

	o.systemMemory.mutex.Lock()
	defer o.systemMemory.mutex.Unlock()
	o.systemMemory.list[index] = md
}

func (o *ostent) writeSystemNet(netno int, m telegraf.Metric) bool {
	tags := m.Tags()
	nd := netData{Name: tags["interface"], IP: tags["ip"]}
	if nd.Name == "all" { // uninterested NetProto stats
		return false
	}
	if _, ok := tags["nonemptyifLoopback"]; ok {
		nd.loopback = true
	}

	if !decode(m.Fields(), []convert{
		{k: "bytes_sent", s: &nd.BytesOut},
		{k: "bytes_recv", s: &nd.BytesIn},
		{f: humanUnitless, k: "packets_sent", s: &nd.PacketsOut},
		{f: humanUnitless, k: "packets_recv", s: &nd.PacketsIn},
		{f: humanUnitless, k: "err_in", s: &nd.ErrorsIn},
		{f: humanUnitless, k: "err_out", s: &nd.ErrorsOut},
		{f: humanUnitless, k: "drop_in", s: &nd.DropsIn},
		{f: humanUnitless, k: "drop_out", s: &nd.DropsOut},

		{f: humanBits, k: "delta_bytes_sent", s: &nd.DeltaBitsOut, v: &nd.DeltaBytesOutNum},
		{f: humanBits, k: "delta_bytes_recv", s: &nd.DeltaBitsIn},

		{f: humanUnitless, k: "delta_packets_sent", s: &nd.DeltaPacketsOut},
		{f: humanUnitless, k: "delta_packets_recv", s: &nd.DeltaPacketsIn},
		{f: humanUnitless, k: "delta_err_in", s: &nd.DeltaErrorsIn},
		{f: humanUnitless, k: "delta_err_out", s: &nd.DeltaErrorsOut},
		{f: humanUnitless, k: "delta_drop_in", s: &nd.DeltaDropsIn},
		{f: humanUnitless, k: "delta_drop_out", s: &nd.DeltaDropsOut},
	}) {
		return false // either fields lookup or casting failed
	}

	o.systemNet.mutex.Lock()
	defer o.systemNet.mutex.Unlock()
	if len(o.systemNet.list) < netno {
		list := make([]netData, netno)
		copy(list, o.systemNet.list)
		o.systemNet.list = list
	}
	o.systemNet.list[netno-1] = nd
	return true
}

func (o *ostent) setCPUno(cpuno int) {
	o.systemCPU.mutex.Lock()
	defer o.systemCPU.mutex.Unlock()
	if len(o.systemCPU.list) > cpuno {
		o.systemCPU.list = o.systemCPU.list[:cpuno]
	}
}

func (o *ostent) setDiskno(diskno int) {
	o.systemDisk.mutex.Lock()
	defer o.systemDisk.mutex.Unlock()
	if len(o.systemDisk.list) > diskno {
		o.systemDisk.list = o.systemDisk.list[:diskno]
	}
}

func (o *ostent) setNetno(netno int) {
	o.systemNet.mutex.Lock()
	defer o.systemNet.mutex.Unlock()
	if len(o.systemNet.list) > netno {
		o.systemNet.list = o.systemNet.list[:netno]
	}
}

func (o *ostent) writeSystemOstent(m telegraf.Metric) {
	o.systemOstent.mutex.Lock()
	defer o.systemOstent.mutex.Unlock()
	for k, v := range m.Fields() {
		o.systemOstent.kv[k] = v
	}
}

func (o *ostent) Close() error         { return nil }
func (o *ostent) Connect() error       { return nil }
func (o *ostent) Description() string  { return "in-memory output" }
func (o *ostent) SampleConfig() string { return `` }

// func (o *ostent) SetSerializer(s serializers.Serializer) { o.serializer = s }

func (o *ostent) Write(ms []telegraf.Metric) error {
	if len(ms) == 0 {
		return nil
	}

	cpus, disks, nets := 0, 0, 0
	for _, m := range ms {
		switch m.Name() {
		case "system_ostent":
			o.writeSystemOstent(m)

		case "cpu":
			cpus++
			o.writeSystemCPU(cpus, m)
		case "disk":
			disks++
			o.writeSystemDisk(disks, m)
		case "mem", "swap":
			o.writeSystemMemory(m)
		case "net":
			if o.writeSystemNet(nets+1, m) {
				nets++
			}
		}
	}
	o.setCPUno(cpus)
	o.setDiskno(disks)
	o.setNetno(nets)
	return nil
}

var Output = &ostent{
	diskParts: dparts{parts: make(map[string]string)},

	systemCPU:    groupCPU{},
	systemDisk:   groupDisk{},
	systemMemory: groupMemory{},
	systemNet:    groupNet{},
	systemOstent: group{kv: make(map[string]interface{})},
}

func init() { outputs.Add("ostent", func() telegraf.Output { return Output }) }