define(function(require) {
	var React = require('react');
	return {
		mem_rows:        function(Data, $mem)  { return (<tr key={"mem-rowby-kind-"+$mem.Kind}
  ><td
    >{$mem.Kind}</td
  ><td className="text-right"
    >{$mem.Free}</td
  ><td className="text-right"
    >{$mem.Used}&nbsp;<sup
      ><span  className={LabelClassColorPercent($mem.UsePercent)}
  >{$mem.UsePercent}%</span
></sup
    ></td
  ><td className="text-right"
    >{$mem.Total}</td
  ></tr
>); },
		panelmem:        function(Data, rows)  { return (<div className="panel1"
  ><label className="panel-heading btn-block"
    ><a  className={Data.Links.Params.BOOL.showconfigmem.Value ? "btn-header-block active" : "btn-header-block" }  href={Data.Links.Params.BOOL.showconfigmem.Href} onClick={this.handleClick}
      >Memory</a
    ></label
  ><div
    ><div id="memconfig"  className={Data.Links.Params.BOOL.showconfigmem.Value ? "" : "collapse-hidden" }
      ><form className="horizontal-form border-bottom-form"  action={"/form/"+Data.Links.Params.Query}
        ><input className="collapse-hidden" type="submit"
        ></input
      ><div className="form-group-padded"
        ><div className="btn-group btn-group-sm" role="group"
          ><a  className={Data.Links.Params.BOOL.hidemem.Value ? "btn btn-default active" : "btn btn-default " }  href={Data.Links.Params.BOOL.hidemem.Href} onClick={this.handleClick}
            >Hidden</a
          ><a  className={Data.Links.Params.BOOL.hideswap.Value ? "btn btn-default active" : "btn btn-default " }  href={Data.Links.Params.BOOL.hideswap.Href} onClick={this.handleClick} disabled={Data.Links.Params.BOOL.hidemem.Value ? "disabled" : "" }
            >Hide swap</a
          ></div
        ></div
      ><div className="form-group-padded"
        ><div  className={"input-group input-group-sm refresh-group" + (Data.Links.Params.PERIOD.refreshmem.InputErrd ? " has-warning" : "")}
  ><span className="input-group-addon"
    >Refresh</span
  ><input className="form-control refresh-input" type="text" placeholder={Data.Links.Params.PERIOD.refreshmem.Placeholder}  name="refreshmem"  onChange={this.handleChange} value={Data.Links.Params.PERIOD.refreshmem.Input}
  ></input></div
></div
      ></form
    ></div
  ></div
><div
  ><div  className={Data.Links.Params.BOOL.hidemem.Value ? "collapse-hidden" : "" }
    ><table className="table1 stripe-table"
  ><thead
    ><tr
      ><th
        ></th
      ><th className="text-right"
        >Free</th
      ><th className="text-right"
        >Used</th
      ><th className="text-right"
        >Total</th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
></div
  ></div
></div
>); },

		ifbytes_rows:    function(Data, $if)   { return (<tr key={"ifbytes-rowby-name-"+$if.Name}
  ><td
    ><input id={"if-bytes-name-"+$if.Name}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"if-bytes-name-"+$if.Name} className="clip" style={{maxWidth: '12ch'}}
  >{$if.Name}</label
></td
  ><td className="text-right"
    >{$if.DeltaIn}</td
  ><td className="text-right"
    >{$if.DeltaOut}</td
  ><td className="text-right"
    >{$if.In}</td
  ><td className="text-right"
    >{$if.Out}</td
  ></tr
>); },
		ifbytes_table:   function(Data, rows)  { return (<table className="table1 stripe-table"
  ><thead
    ><tr
      ><th
        >Interface</th
      ><th className="text-right nowrap" title="BITS per second"
        >In<span className="unit"
          ><i
            >b</i
          >ps</span
        ></th
      ><th className="text-right nowrap" title="BITS per second"
        >Out<span className="unit"
          ><i
            >b</i
          >ps</span
        ></th
      ><th className="text-right nowrap" title="total BYTES modulo 4G"
        >In<span className="unit"
          ><i
            >B</i
          >%4G</span
        ></th
      ><th className="text-right nowrap" title="total BYTES modulo 4G"
        >Out<span className="unit"
          ><i
            >B</i
          >%4G</span
        ></th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); },
		iferrors_rows:   function(Data, $if)   { return (<tr key={"iferrors-rowby-name-"+$if.Name}
  ><td
    ><input id={"if-errors-name-"+$if.Name}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"if-errors-name-"+$if.Name} className="clip" style={{maxWidth: '12ch'}}
  >{$if.Name}</label
></td
  ><td className="text-right"
    >{$if.DeltaIn}</td
  ><td className="text-right"
    >{$if.DeltaOut}</td
  ><td className="text-right"
    >{$if.In}</td
  ><td className="text-right"
    >{$if.Out}</td
  ></tr
>); },
		iferrors_table:  function(Data, rows)  { return (<table className="table1 stripe-table"
  ><thead
    ><tr
      ><th
        >Interface</th
      ><th className="text-right nowrap" title="per second"
        >In&nbsp;<span className="unit"
          >ps</span
        ></th
      ><th className="text-right nowrap" title="per second"
        >Out&nbsp;<span className="unit"
          >ps</span
        ></th
      ><th className="text-right nowrap" title="modulo 4G"
        >In&nbsp;<span className="unit"
          >%4G</span
        ></th
      ><th className="text-right nowrap" title="modulo 4G"
        >Out&nbsp;<span className="unit"
          >%4G</span
        ></th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); },
		ifpackets_rows:  function(Data, $if)   { return (<tr key={"ifpackets-rowby-name-"+$if.Name}
  ><td
    ><input id={"if-packets-name-"+$if.Name}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"if-packets-name-"+$if.Name} className="clip" style={{maxWidth: '12ch'}}
  >{$if.Name}</label
></td
  ><td className="text-right"
    >{$if.DeltaIn}</td
  ><td className="text-right"
    >{$if.DeltaOut}</td
  ><td className="text-right"
    >{$if.In}</td
  ><td className="text-right"
    >{$if.Out}</td
  ></tr
>); },
		ifpackets_table: function(Data, rows)  { return (<table className="table1 stripe-table"
  ><thead
    ><tr
      ><th
        >Interface</th
      ><th className="text-right nowrap" title="per second"
        >In&nbsp;<span className="unit"
          >ps</span
        ></th
      ><th className="text-right nowrap" title="per second"
        >Out&nbsp;<span className="unit"
          >ps</span
        ></th
      ><th className="text-right nowrap" title="total modulo 4G"
        >In&nbsp;<span className="unit"
          >%4G</span
        ></th
      ><th className="text-right nowrap" title="total modulo 4G"
        >Out&nbsp;<span className="unit"
          >%4G</span
        ></th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); },

		cpu_rows:        function(Data, $core) { return (<tr key={"cpu-rowby-N-"+$core.N}
  ><td className="text-right nowrap"
    >{$core.N}</td
  ><td className="text-right"
    ><span className={$core.UserClass}
      >{$core.User}</span
    ></td
  ><td className="text-right"
    ><span className={$core.SysClass} 
      >{$core.Sys}</span
    ></td
  ><td className="text-right"
    ><span className={$core.IdleClass}
      >{$core.Idle}</span
    ></td
  ></tr
>); },
		cpu_table:       function(Data, rows)  { return (<table className="table1 stripe-table"
  ><thead
    ><tr
      ><th
        ></th
      ><th className="text-right nowrap"
        >User<span className="unit"
          >%</span
        ></th
      ><th className="text-right nowrap"
        >Sys<span className="unit"
          >%</span
        ></th
      ><th className="text-right nowrap"
        >Idle<span className="unit"
          >%</span
        ></th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); },

		dfbytes_rows:    function(Data, $disk) { return (<tr key={"dfbytes-rowby-dirname-"+$disk.DirName}
  ><td className="nowrap"
    ><input id={"df-bytes-devname-"+$disk.DevName}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"df-bytes-devname-"+$disk.DevName} className="clip" style={{maxWidth: '12ch'}}
  >{$disk.DevName}</label
></td
  ><td className="nowrap"
    ><input id={"df-bytes-dirname-"+$disk.DirName}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"df-bytes-dirname-"+$disk.DirName} className="clip" style={{maxWidth: '6ch'}}
  >{$disk.DirName}</label
></td
  ><td className="text-right"
    >{$disk.Avail}</td
  ><td className="text-right"
    >{$disk.Used}&nbsp;<sup
      ><span  className={LabelClassColorPercent($disk.UsePercent)}
  >{$disk.UsePercent}%</span
></sup
    ></td
  ><td className="text-right"
    >{$disk.Total}</td
  ></tr
>); },
		dfbytes_table:   function(Data, rows)  { return (<table className="table1 stripe-table"
  ><thead
    ><tr
      ><th className="header "
  ><a href={Data.Links.Params.ENUM.df.FS.Href} className={Data.Links.Params.ENUM.df.FS.Class}
    >Device<span className={Data.Links.Params.ENUM.df.FS.CaretClass}
      ></span
    ></a
  ></th
><th className="header "
  ><a href={Data.Links.Params.ENUM.df.MP.Href} className={Data.Links.Params.ENUM.df.MP.Class}
    >Mounted<span className={Data.Links.Params.ENUM.df.MP.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.df.AVAIL.Href} className={Data.Links.Params.ENUM.df.AVAIL.Class}
    >Avail<span className={Data.Links.Params.ENUM.df.AVAIL.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.df.USED.Href} className={Data.Links.Params.ENUM.df.USED.Class}
    >Used<span className={Data.Links.Params.ENUM.df.USED.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.df.TOTAL.Href} className={Data.Links.Params.ENUM.df.TOTAL.Class}
    >Total<span className={Data.Links.Params.ENUM.df.TOTAL.CaretClass}
      ></span
    ></a
  ></th
></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); },
		dfinodes_rows:   function(Data, $disk) { return (<tr key={"dfinodes-rowby-dirname-"+$disk.DirName}
  ><td className="nowrap"
    ><input id={"df-inodes-devname-"+$disk.DevName}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"df-inodes-devname-"+$disk.DevName} className="clip" style={{maxWidth: '12ch'}}
  >{$disk.DevName}</label
></td
  ><td className="nowrap"
    ><input id={"df-inodes-devname-"+$disk.DirName}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"df-inodes-devname-"+$disk.DirName} className="clip" style={{maxWidth: '6ch'}}
  >{$disk.DirName}</label
></td
  ><td className="text-right"
    >{$disk.Ifree}</td
  ><td className="text-right"
    >{$disk.Iused}&nbsp;<sup
      ><span  className={LabelClassColorPercent($disk.IusePercent)}
  >{$disk.IusePercent}%</span
></sup
    ></td
  ><td className="text-right"
    >{$disk.Inodes}</td
  ></tr
>); },
		dfinodes_table:  function(Data, rows)  { return (<table className="table1 stripe-table"
  ><thead
    ><tr
      ><th className="header"
        >Device</th
      ><th className="header"
        >Mounted</th
      ><th className="header text-right"
        >Avail</th
      ><th className="header text-right"
        >Used</th
      ><th className="header text-right"
        >Total</th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); },

		ps_rows:         function(Data, $proc) { return (<tr key={"ps-rowby-pid-"+$proc.PIDstring}
  ><td className="text-right"
    > {$proc.PID}</td
  ><td className="text-right"
    > {$proc.UID}</td
  ><td
    >            <input id={"psuser-pid-"+$proc.PIDstring}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"psuser-pid-"+$proc.PIDstring} className="clip" style={{maxWidth: '12ch'}}
  >{$proc.User}</label
></td
  ><td className="text-right"
    > {$proc.Priority}</td
  ><td className="text-right"
    > {$proc.Nice}</td
  ><td className="text-right"
    > {$proc.Size}</td
  ><td className="text-right"
    > {$proc.Resident}</td
  ><td className="text-center"
    >{$proc.Time}</td
  ><td className="nowrap"
    >     <input id={"psname-pid-"+$proc.PIDstring}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"psname-pid-"+$proc.PIDstring} className="clip" style={{maxWidth: '42ch'}}
  >{$proc.Name}</label
></td
  ></tr
>); },
		panelps:         function(Data, rows)  { return (<div className="panel1"
  ><label className="panel-heading btn-block"
    ><a  className={Data.Links.Params.BOOL.showconfigps.Value ? "btn-header-block active" : "btn-header-block" }  href={Data.Links.Params.BOOL.showconfigps.Href} onClick={this.handleClick}
      >Processes</a
    ></label
  ><div
    ><div id="psconfig"  className={Data.Links.Params.BOOL.showconfigps.Value ? "" : "collapse-hidden" }
      ><form className="inline-form border-bottom-form text-right"  action={"/form/"+Data.Links.Params.Query}
        ><input className="collapse-hidden" type="submit"
        ></input
      ><div className="form-group-padded"
        ><div  className={"input-group input-group-sm refresh-group" + (Data.Links.Params.PERIOD.refreshps.InputErrd ? " has-warning" : "")}
  ><span className="input-group-addon"
    >Refresh</span
  ><input className="form-control refresh-input" type="text" placeholder={Data.Links.Params.PERIOD.refreshps.Placeholder}  name="refreshps"  onChange={this.handleChange} value={Data.Links.Params.PERIOD.refreshps.Input}
  ></input></div
></div
      ><div className="form-group-padded"
        ><div className="btn-group btn-group-sm" role="group"
          ><a  className={Data.Links.Params.BOOL.hideps.Value ? "btn btn-default active" : "btn btn-default " }  href={Data.Links.Params.BOOL.hideps.Href} onClick={this.handleClick}
            >Hidden</a
          ><a  className={Data.PStable.PSnotDecreasable ? "btn btn-default disabled" : "btn btn-default " }  href={Data.Links.Params.COUNT.psn.LessHref} onClick={this.handleClick}
            >-</a
          ><a  className={Data.PStable.PSnotExpandable ? "btn btn-default disabled" : "btn btn-default " }  href={Data.Links.Params.COUNT.psn.MoreHref} onClick={this.handleClick}
            >{Data.PStable.PSplusText}</a
          ></div
        ></div
      ></form
    ></div
  ></div
><div
  ><div  className={Data.Links.Params.BOOL.hideps.Value ? "collapse-hidden" : "" }
    ><table className="table2 stripe-table"
  ><thead
    ><tr
      ><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.ps.PID.Href} className={Data.Links.Params.ENUM.ps.PID.Class}
    >PID<span className={Data.Links.Params.ENUM.ps.PID.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.ps.UID.Href} className={Data.Links.Params.ENUM.ps.UID.Class}
    >UID<span className={Data.Links.Params.ENUM.ps.UID.CaretClass}
      ></span
    ></a
  ></th
><th className="header "
  ><a href={Data.Links.Params.ENUM.ps.USER.Href} className={Data.Links.Params.ENUM.ps.USER.Class}
    >USER<span className={Data.Links.Params.ENUM.ps.USER.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.ps.PRI.Href} className={Data.Links.Params.ENUM.ps.PRI.Class}
    >PR<span className={Data.Links.Params.ENUM.ps.PRI.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.ps.NICE.Href} className={Data.Links.Params.ENUM.ps.NICE.Class}
    >NI<span className={Data.Links.Params.ENUM.ps.NICE.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.ps.VIRT.Href} className={Data.Links.Params.ENUM.ps.VIRT.Class}
    >VIRT<span className={Data.Links.Params.ENUM.ps.VIRT.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-right"
  ><a href={Data.Links.Params.ENUM.ps.RES.Href} className={Data.Links.Params.ENUM.ps.RES.Class}
    >RES<span className={Data.Links.Params.ENUM.ps.RES.CaretClass}
      ></span
    ></a
  ></th
><th className="header text-center"
  ><a href={Data.Links.Params.ENUM.ps.TIME.Href} className={Data.Links.Params.ENUM.ps.TIME.Class}
    >TIME<span className={Data.Links.Params.ENUM.ps.TIME.CaretClass}
      ></span
    ></a
  ></th
><th className="header "
  ><a href={Data.Links.Params.ENUM.ps.NAME.Href} className={Data.Links.Params.ENUM.ps.NAME.Class}
    >COMMAND<span className={Data.Links.Params.ENUM.ps.NAME.CaretClass}
      ></span
    ></a
  ></th
></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
></div
  ></div
></div
>); },

		vagrant_rows:    function(Data, $mach) { return (<tr key={"vagrant-rowby-uuid-"+$mach.UUID}
  ><td
    >       <input id={"vagrant-uuid-"+$mach.UUID}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"vagrant-uuid-"+$mach.UUID} className="clip" style={{maxWidth: '7ch'}}
  >{$mach.UUID}</label
></td
  ><td
    >       {$mach.Name}</td
  ><td
    >       {$mach.Provider}</td
  ><td
    >       <input id={"vagrant-state-"+$mach.UUID}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"vagrant-state-"+$mach.UUID} className="clip" style={{maxWidth: '8ch'}}
  >{$mach.State}</label
></td
  ><td
    >       <input id={"vagrant-filepath-"+$mach.UUID}  className="collapse-checkbox" type="checkbox" aria-hidden="true" hidden
></input><label htmlFor={"vagrant-filepath-"+$mach.UUID} className="clip" style={{maxWidth: '50ch'}}
  >{$mach.Vagrantfile_path}</label
></td
  ></tr
>); },
		vagrant_error:   function(Data)        { return (<tr key="vgerror"
  ><td colspan="5"
    >{Data.VagrantError}</td
  ></tr
>); },
		vagrant_table:   function(Data, rows)  { return (<table id="vgtable" className="table1 stripe-table"
  ><thead
    ><tr
      ><th
        >id</th
      ><th
        >name</th
      ><th
        >provider</th
      ><th
        >state</th
      ><th
        >directory</th
      ></tr
    ></thead
  ><tbody
    >{rows}</tbody
  ></table
>); }
	};
});