// Code generated by go-bindata.
// sources:
// index.html
// DO NOT EDIT!

// +build bin

package templates

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"io"
	"strings"
	"os"
	"time"
	"io/ioutil"
	"path/filepath"
)

func bindataRead(data []byte, name string) ([]byte, error) {
	gz, err := gzip.NewReader(bytes.NewBuffer(data))
	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}

	var buf bytes.Buffer
	_, err = io.Copy(&buf, gz)
	clErr := gz.Close()

	if err != nil {
		return nil, fmt.Errorf("Read %q: %v", name, err)
	}
	if clErr != nil {
		return nil, err
	}

	return buf.Bytes(), nil
}

type asset struct {
	bytes []byte
	info  os.FileInfo
}

type bindataFileInfo struct {
	name string
	size int64
	mode os.FileMode
	modTime time.Time
}

func (fi bindataFileInfo) Name() string {
	return fi.name
}
func (fi bindataFileInfo) Size() int64 {
	return fi.size
}
func (fi bindataFileInfo) Mode() os.FileMode {
	return fi.mode
}
func (fi bindataFileInfo) ModTime() time.Time {
	return fi.modTime
}
func (fi bindataFileInfo) IsDir() bool {
	return false
}
func (fi bindataFileInfo) Sys() interface{} {
	return nil
}

var _indexHtml = []byte("\x1f\x8b\x08\x00\x00\x09\x6e\x88\x00\xff\xec\x5c\xeb\x73\xdb\x36\x12\xff\xee\xbf\x02\xc7\x6b\xef\x43\xa7\x92\xce\x79\xdc\xf5\x52\xc9\x37\xb6\xe5\xa6\x9c\xc6\x8e\xc6\x8f\xcc\xf5\xbe\x74\x20\x12\xa4\x50\x53\x24\x0b\x42\x72\x5c\x8d\xfe\xf7\x5b\x3c\x48\x91\x14\x29\xf1\xe5\xc4\xba\x24\x33\xb1\x48\x10\xbb\xd8\x05\x16\xbf\x5d\x10\x4b\x0c\xff\x32\x7e\x7f\x7e\xfb\xeb\xe4\x02\xcd\xf8\xdc\x3b\x3a\x19\xca\x1f\x84\xe0\x82\x60\x1b\x2e\xc4\xe5\x9c\x70\x8c\xac\x19\x66\x11\xe1\x23\x63\xc1\x9d\xde\x0f\x46\xfa\xd1\x8c\xf3\xb0\x47\xfe\x58\xd0\xe5\xc8\xf8\x4f\xef\xee\xb4\x77\x1e\xcc\x43\xcc\xe9\xd4\x23\x06\xb2\x02\x9f\x13\x1f\xe8\xcc\x8b\x11\xb1\x5d\x92\xa1\xf4\xf1\x9c\x8c\x8c\x25\x25\x0f\x61\xc0\x78\xaa\xf2\x03\xb5\xf9\x6c\x64\x93\x25\xb5\x48\x4f\xde\x7c\x8f\xa8\x4f\x39\xc5\x5e\x2f\xb2\xb0\x47\x46\xc7\x31\x23\x4e\xb9\x47\xe4\x35\xdc\xad\x56\xfd\x31\xe6\xb8\xff\x73\x10\x71\xc1\x7c\xbd\x46\x70\x05\x2c\x87\x83\x4d\xbd\x93\xa1\x47\xfd\x7b\xc4\x88\x37\x32\x28\x34\x69\x20\xfe\x18\x82\x1c\x74\x8e\x5d\x32\x08\x7d\xd7\x40\x33\x46\x9c\x91\x31\x70\xf0\x52\x54\xe8\x8b\xb2\x2d\xd2\x88\x3f\x7a\x24\x9a\x11\xc2\x63\x06\x9c\x7c\xe4\x03\x2b\x8a\x12\x7a\xb8\x1e\x50\xdf\x26\x1f\xfb\xa2\x54\x73\x88\x2c\x46\x43\x9e\x26\xf9\x1d\x2f\xb1\x2a\x35\xf2\xfd\x8c\x22\x66\x01\xa3\xdf\xa3\x01\x13\x3d\xcc\x08\x5c\xbd\xe8\x1f\xf7\x8f\x7f\x88\x0b\xfa\x73\xea\xf7\x7f\x87\x36\x6d\x50\xbc\x37\xc7\xd4\x57\xf5\x57\x2b\xea\xa0\xfe\xed\xe9\xdb\xb7\x17\xe3\x29\xf5\xd7\x6b\xa8\xa7\x85\x51\x14\xab\x15\xf1\x22\xe8\x21\x68\x61\x30\xa7\xde\xbd\x7e\x28\x1f\xf8\xf6\x7a\x6d\xc4\x9d\x3a\x1c\x28\xe1\xb4\xfc\x03\x6d\x1a\x27\xc3\x69\x60\x3f\xea\x42\x1f\x2f\x91\xe5\xe1\x28\x1a\x19\x70\x39\xc5\x0c\xa9\x9f\x9e\x4d\x1c\xbc\xf0\x78\x7c\x1b\x71\x30\x0c\xab\xc7\x83\xd0\x40\x2c\x80\x71\x14\xd5\xa9\x0b\x85\x30\x0e\x49\x83\x36\x4d\xb8\x09\x93\x00\x9d\x08\xeb\x39\xde\x82\xda\x71\x9d\x5c\x2d\xcd\x5d\x48\x46\x18\x98\x91\xd7\x9b\xdb\xbd\x63\x14\x62\xdb\xa6\xbe\xdb\xf3\x88\x03\x83\x1f\x0f\x41\x4c\x3f\x5d\x70\x1e\xf8\x39\x16\x3c\x70\x5d\x8f\x08\x16\x1e\x0e\x23\x62\xc7\x63\xab\x2a\xeb\x5e\x56\x95\x84\x70\xaa\x56\x5c\x8c\x99\x2b\x86\xee\xaf\x9a\x57\xf2\x38\xd5\xac\xb4\x80\x10\x27\xcd\x46\xac\x17\xf8\xde\x63\xb6\x0a\x54\xba\x55\x72\x6c\x7a\x07\x46\x01\xc8\x76\x70\x12\x96\xda\x83\x66\xb7\x58\x3d\x1b\xca\x81\xea\xc4\xcc\x20\x60\x44\xed\x91\x31\x83\x9e\xcd\x8e\xc3\x94\x61\xdf\x86\x32\x0a\x86\x22\x67\xda\xc8\x98\xe3\x8f\x0a\x0b\xde\xa0\xe3\x17\xd6\x2c\x99\x65\x30\x44\x62\x6e\x03\x17\x3d\xeb\xd1\x36\x0c\xe4\x86\x60\xbb\xc2\x70\x80\x33\x72\x0d\xc0\xba\x72\xb6\x26\x04\xcd\x8f\xec\xc6\x4c\x55\x01\xda\x31\xf4\x27\xc3\x85\x97\xd2\x32\xae\x0a\x3f\x79\x03\xf1\x68\x5c\x0f\x5b\x9c\x2e\xc9\x76\xf7\x62\xad\xbc\xc0\xde\xe8\xcd\x60\xf0\xf0\xf0\xd0\x07\x5d\x18\xfc\xef\x5b\xc1\x7c\xa0\x50\x0f\x30\xc2\x23\x38\x22\xd1\xc0\xc3\x9c\x44\xfc\xdf\xd6\x3c\x1c\xc5\xba\x7f\xb8\xb8\xbe\x31\xdf\x5f\xe5\xfb\x46\xf2\x8f\x41\x13\x6f\x8f\xab\x47\x4b\x85\x8d\xa7\x10\x60\x1a\x4a\x5d\x03\x28\x31\x97\xfa\x62\x02\x22\x87\xb2\x88\xcb\xd2\x6d\x9d\xac\xc0\x26\x39\x56\xa2\x08\x10\x77\xab\x03\xa4\x88\xc9\x30\x8f\xcd\x9b\xdb\x6b\xf3\x4c\x0c\xa2\x20\xe8\x58\xe6\xb6\x82\xd2\xf0\x6f\xfe\x34\x0a\x7f\x54\x13\x47\x18\x11\xd8\xf4\x56\xb5\x94\x51\x9a\x13\xa1\xc9\xd6\xfc\xd1\xba\x3c\x43\x0d\x17\x5b\x1a\x2e\x76\x6b\x78\x17\x72\xaa\x26\xdd\x01\x69\xe9\xe1\xbc\x96\x1e\xde\xa9\xe5\xbb\xd3\x0e\x34\x1c\x2c\xbc\x5d\xb8\x94\xba\x85\x1b\x50\x42\xfb\xe3\xfd\x1e\x34\x53\x87\x05\x0f\x79\xcf\x2a\x14\x9c\x93\x39\x38\x35\x15\xc7\x25\x38\x27\x5c\xeb\xab\xd8\xc7\x06\x8e\x03\xd1\x4a\xef\x38\x83\x73\xab\x15\x27\xf3\x50\x40\x0e\x32\xc0\xff\x43\xdb\xd1\x9b\x37\xea\xe2\x37\xe8\x0d\xe2\x01\x5f\x03\xf5\x45\xef\x14\xa3\xac\xed\x14\x37\xfb\xba\x5d\xb3\xb6\x53\xd8\x6a\xa6\x0f\xf7\x77\x8a\x15\x2e\x9e\xa4\x53\x80\xef\xce\x4e\xa1\x4f\xd3\x29\xb4\x93\x4e\x09\xa3\x62\xe1\x8e\xff\xde\x4e\xba\x30\xea\x42\xba\xa5\xfb\x34\xd2\x2d\xdd\xfd\xd2\x25\x37\x7b\x22\xff\x98\x60\x09\xb1\xb3\x80\x0f\x34\x8a\xfd\xdb\x7a\xfd\x63\x3e\x04\xd7\x91\xb7\x08\xc6\xe5\xba\x6d\xb5\x1a\x7c\x77\xf4\xdd\x60\xbd\x5e\xad\x94\x7c\x29\x81\xa7\x18\x96\x5d\xb6\x58\xb7\x88\x30\xd8\x00\x71\x75\xf0\x00\xec\x7f\x86\x5f\xb1\x46\xf2\xcf\x3d\x6a\xdd\x8f\x56\x7c\x46\xa3\xfe\x0c\x22\x2f\x8f\xc8\x92\x35\xc8\x20\xbb\x6c\xbd\x16\xd5\xcf\xc5\x25\x32\xa6\xdc\x47\xf0\x3f\x8e\xed\x81\x25\xc8\x72\x94\xc4\x86\x1b\x12\xe3\xa3\x87\xa7\xc4\x43\xea\x27\xa9\x7f\xa4\x7b\xb7\x7f\x26\x44\x4b\x81\xe4\x89\x50\xf9\x16\x3a\x46\xc5\x63\x27\x7a\x25\x52\x4d\x3b\x46\xdd\xd9\xd3\xaa\x97\x08\x87\x5a\x2b\x5a\x55\x3d\x6d\x6d\x80\x0d\x60\xda\x91\x21\xea\x3c\x50\x3e\x43\xe2\x0e\x0c\x56\x58\x1f\xb0\x17\x7f\xd4\x62\x6e\xb5\x82\xb8\xd9\x25\xe8\x1b\xfa\x3d\xfa\xc6\x0a\x18\x41\x6f\x46\x48\xb9\xa3\xf3\xc9\x5d\xff\x1d\x8d\x44\xdf\x72\x06\xb2\xcb\xc7\xfd\xab\xfe\x29\xe7\xec\x17\xf2\x88\x24\xb0\x01\xdf\xe9\x63\xef\x4a\xe9\x0c\x8b\x6b\x3b\x9e\x31\xd2\x99\xca\x2e\x46\x7e\xf0\xc0\x70\x98\x28\xa7\xf9\x08\xed\xb8\x5d\x4a\x95\xac\x7e\x73\x1d\xb7\x88\x48\x48\x98\x05\xd1\xa6\x8a\x0a\xd5\x4a\x6a\x53\x3a\x8a\x1b\xb8\x8b\x08\x93\x52\x65\x9a\x55\xa5\x29\x2f\x7b\xf2\xb4\x52\xdc\x3c\x46\xdb\x42\xc8\xc2\xae\x65\xe8\x51\x7f\x49\x58\xb2\xb6\x2c\x90\xc5\x04\x33\xde\x16\x46\x95\x16\x4a\x33\xe0\x2c\x65\x74\xd9\x9f\x2a\x26\xa8\x30\x54\x54\xfa\x26\xdc\xd8\xd5\x04\x33\x3c\x17\x1d\x20\x1f\x0b\xc3\x0a\xa5\x4d\xc9\xd9\x74\x15\xf8\x7f\x12\x16\x20\x28\x3b\x0f\x17\x3e\x32\x54\x25\xf9\xb7\x37\x0b\x40\x43\x03\x25\x8b\xa7\xde\x8c\xda\x36\xf1\x13\xe3\x4b\xbd\x83\x02\xc9\x63\x40\xe5\xb3\x34\xd4\x26\x77\xe2\xc1\x1e\x63\x95\xd5\x84\xc5\x64\xd6\xb0\x0b\x9f\x66\x16\x23\x27\xdf\xe6\x82\xb6\x26\xad\x80\x49\x3c\x7d\x23\x62\xa8\xdb\xb4\x32\xd0\xbd\x2a\x4b\xe3\x97\x3a\x7c\xf3\x56\x67\x97\xff\x8b\x11\x49\xf9\x3f\xbe\x71\x48\x72\x68\xeb\x60\x9b\xed\x4c\x1f\x61\x71\xfa\x5b\x4d\x80\xb3\x69\x74\xbf\x31\xc2\xf1\x4f\x92\x49\x16\xe0\x44\x95\xfe\x98\xb2\x2b\x58\xe1\x6f\x60\x4e\xb7\xa7\xa1\xce\xa6\x4c\xbc\x00\xd8\x00\x5e\x02\x6b\x8a\x9a\x2c\xaf\xf4\xfb\x81\x64\x4a\xe7\x6a\x28\xfe\xd5\xe0\x2f\x26\x3a\x5d\x62\xea\x55\x25\x29\x1f\x84\x0d\x28\x18\xaa\x43\x04\x1e\x4e\x54\xc9\x7a\xad\x96\x2b\x71\x93\xf0\xc4\xae\x27\xe4\x6d\xc0\x71\x5a\xc8\x56\xf0\x11\x8f\x72\x03\x0c\xb9\xc5\x53\x81\x1f\x63\xc7\x57\x3f\x1c\xbd\xe8\x00\x47\x0a\xfb\x55\xbd\x40\x24\xfe\x62\x2e\x22\x0a\x43\xb4\xf7\x41\xbe\xf1\x95\x0d\xdf\xa3\x63\x64\x8c\xe5\x4b\x69\x68\x4d\x2a\xd1\x80\x07\x08\x7f\x19\x2c\x7c\x2e\xde\x2d\x36\x66\xf2\x12\x19\xd2\x86\x80\x45\x6a\xfc\x1a\x32\x7b\x85\x8c\x3b\xf9\xaa\xb3\x03\x5e\xaf\x91\x21\xed\x26\xcf\xac\x15\xd8\x64\x20\xa2\x0b\xc4\xa1\x3e\xac\xbe\x5b\x43\x8e\xe2\x52\x0d\x73\x54\xdd\xcf\x0a\x3a\xa6\xc3\x48\x65\x92\x3a\xa0\x63\x2e\x4a\x51\x47\x3c\xaa\x09\x3b\xa6\xec\xa9\xee\x70\x47\x8f\x75\x27\xc0\x73\xdc\x4d\x00\x13\xf7\x81\x9a\x4c\x29\x8f\xae\xc0\xa5\x24\x14\xd8\xaa\xad\x61\x64\x67\x75\x94\xef\x67\x59\x4d\x62\x47\x03\x3a\x01\x13\x0d\xc8\x24\x22\x74\x16\x7a\x64\xa7\x6f\x7b\x38\xa0\xcd\x02\x10\xea\x6c\xcc\xc8\x2c\x0a\x3f\xa8\xd3\xcf\xa2\x00\xcd\x44\x1e\x25\x08\xa0\xa9\x2a\xcf\x19\xa8\x3f\x26\x1e\xc7\xa6\x5f\x9b\xe4\xfd\x82\xd7\xa1\xa9\xd7\x42\x96\x79\xab\x39\x4c\x5b\xc7\x0e\xa6\x9a\xc2\x26\x4c\xe1\x97\x5d\xaf\x41\x4c\x98\x83\xcc\xc1\xa5\xd3\x76\x3b\x82\x8f\xf7\xab\xce\xcc\xdb\x1b\x04\x58\x8a\x22\x62\x05\x7e\x7a\x6f\xd3\xf4\x77\xc7\xf5\xc3\xdc\x6b\xe2\xe9\x70\x90\x2e\x39\x09\xa3\xc6\xcb\x8b\xfd\xc2\xc1\xc8\x7e\x76\xe9\xb8\x40\x14\x74\xf6\xeb\xed\xc5\x0d\x9a\x07\xf6\xc2\x0b\xd0\xab\xb7\x2d\x3a\xf0\x2c\x27\xe2\xb7\xaf\xde\x3e\xb9\x8c\xb5\xfb\xb1\xae\x90\x6d\x40\x96\x76\x1b\x72\x51\x87\x30\x16\xb0\x96\x20\xab\x78\xec\x45\x59\x55\xed\x2b\xcc\xd6\x86\x59\x3d\x46\x9d\xe0\x6c\x17\x6b\xb4\x8e\x70\xb6\x04\x62\xd3\xdb\x79\x65\x53\xb0\x03\xa8\x2a\xc3\xd0\x4f\xd4\x7c\x31\x3a\x56\x69\xbc\x0b\x0c\x2c\xc1\xbd\x2e\x9a\x6f\x87\x6e\x69\x38\xea\x02\xde\x42\x6c\xdd\x13\xde\x12\xdf\x34\x93\xbd\x00\xa7\xeb\x7d\x45\xb8\xda\x08\x17\x0f\x53\x27\x10\xd7\xd1\x6a\xf0\x2b\xc4\x75\x12\x68\x7d\x5e\xa0\x2b\x97\xe1\x59\xc0\x5d\x06\x9e\xda\xe3\xdd\x9c\xcc\x1b\xec\x47\x02\xd5\x66\xae\x5d\x5e\x5c\x66\x71\x0e\x9e\xf6\x7f\xa1\xbe\xbd\x01\x3a\x91\x7e\xa2\x20\xee\x1e\xca\x0b\x20\x2e\x26\xa9\x0c\x27\x82\xe0\xa7\xee\xdf\x82\x09\xb6\x85\x6f\xde\xf5\x83\x7a\x02\x76\xfa\xde\x1d\x18\xb6\xdb\xb6\xbb\x24\xf3\x4f\xbf\x6d\x97\x9a\x3e\x62\xb8\xea\xd4\xdf\xf1\x8a\xea\x13\xbc\x9b\x8a\x27\x46\xfb\x29\x96\xe4\x04\x95\x0e\x9c\xc8\x6e\x11\xff\xb2\x43\x37\xd9\xec\xb5\xc2\x18\x49\x2e\x48\xfe\xcd\xe6\x33\x9c\x20\xa4\x19\xec\x25\x97\x69\xd5\xd4\x77\x0d\xbd\xd9\x7c\x22\xfe\x0c\x71\x9a\x54\x24\x5a\xa8\x8c\xe5\x9f\xa1\x6e\xcc\x62\x9d\xce\xaf\xd0\xbc\x24\x5c\xca\xf4\x8a\xa9\x17\x58\xf7\x49\xda\x8b\xfa\x19\x4e\xcb\xc5\x99\xbd\x32\xc4\x1f\x34\x75\x7b\xd4\x77\x02\x23\xd9\xfa\x06\xea\xf3\xc9\xdd\x70\x30\x4d\xf3\x8a\x73\x57\x85\x9e\x3a\x05\x47\x5c\x16\x19\xfb\x24\xbf\x3b\x9d\x37\x6c\x5d\x9e\xe8\x2f\x00\x4b\x9b\x94\x52\x0a\x3c\x9f\x43\xdd\x4d\x66\xdd\x66\x8e\xeb\xf4\xa2\x17\x65\x79\xeb\xd2\x89\x14\xbe\x34\x45\xe2\x6d\xb0\x87\x1f\x0b\x7c\x87\xcc\x79\xd9\xca\x68\x56\x4a\xd8\x05\x39\x87\xdb\x59\x83\x1a\x43\x53\x70\xba\x25\x9a\x18\x22\x97\x05\x8b\x50\x7b\x3a\x75\x13\x67\xed\xab\x9b\xa3\x8c\x00\x05\xb3\x22\x97\x7b\x24\x3a\xfa\x1d\x89\xa2\x31\x4a\x84\xdd\x43\xa6\x3a\x45\xe2\x50\xc0\x48\x8a\x6e\xb7\x4a\x5b\x79\x5e\x86\xb0\xc4\xc0\x13\x1d\x23\x6c\x31\x33\x1e\x69\xd2\xcd\xdc\xff\x44\x63\x7c\x0d\x68\x51\x73\x88\xfd\xfe\x19\xc0\xca\x21\x8c\xf3\xd5\x06\x09\x6a\x8d\x73\x8a\xee\x19\xa8\xb4\x91\xed\xbf\xe0\x13\x2b\xcb\xb6\x6d\x83\xfb\x6c\x4e\x40\x95\xf2\x13\xf2\x66\x4f\xfa\x85\xce\x68\x4c\xf2\x0f\xeb\xfa\x16\xdb\x69\xe4\x5a\xc4\x6e\x58\x73\xcf\x92\xa1\x6e\xe4\x58\x80\x43\x57\x7e\x45\x0a\xb3\xcb\xad\x8c\xc5\x86\xef\x22\xc2\x2e\x69\xe9\x5d\x64\x4b\x07\xee\x5c\xc6\xce\xe1\xf8\x16\x29\x6b\x7d\xd7\xa2\x55\xfc\x32\x3d\x0b\xd8\xe8\x61\x39\x16\x89\x04\xf5\xfd\x8a\x24\x7b\x06\x0a\x15\xb8\x95\x0a\xa2\xd5\xf7\x2a\xdd\xd9\x5b\x89\xa1\xdd\x10\x8f\x58\x7c\x8f\xd8\x99\x49\xf2\x32\xdd\xc0\xd6\x47\x71\xbd\x90\x7a\x5e\xee\x5b\x4d\x8f\x56\xc9\xcd\xd0\x5f\xcb\xc9\xb4\xaa\xbc\x85\x17\x8c\x45\x59\x16\x93\xe4\xa5\xd2\x50\x14\xaf\xdc\x77\x39\x95\xc4\x79\xd1\xa1\x38\xc0\xeb\x4c\xec\xc6\x95\x48\x93\xfe\x46\xa8\x7d\x68\x91\xcb\x98\x11\x01\xc6\xd1\x3e\x8a\xf4\xfe\x7c\xf3\x88\x84\x36\x8b\x48\xcc\x56\x11\x89\xd9\x3a\x22\x31\xbb\x8b\x48\xcc\x7d\x11\x49\xf2\x86\x38\x6a\x19\x91\x98\xff\x07\x11\x89\x79\x40\x11\x89\xd9\x2c\x22\x31\xbf\xe4\x88\xc4\x3c\xb4\x88\xc4\x6c\x16\x91\x98\xcf\x37\x22\xa9\x20\xda\xd7\x88\x64\xc7\xfe\x60\x27\x21\x80\xe6\x35\x51\x7b\x38\x35\x43\x92\x6c\x4a\x46\x67\xf2\x00\xaf\x0b\xb9\x85\xde\x5c\x9c\x97\x1d\x8a\xf3\xf2\x53\x46\x48\xf9\x6d\xe4\x0a\x21\x52\x2e\xb7\xa6\x12\x45\x37\x41\x95\xf8\xd6\xba\x49\x54\xa5\xf6\x7d\x1a\x87\x55\x59\xf2\x46\x71\x95\x60\xd1\x55\x60\xa5\xc4\xd9\x15\x59\x41\x8d\x80\x3d\xb6\x8c\xaa\xd2\x9b\x65\x07\x1b\x56\x81\x12\x87\x13\x57\x29\x61\xeb\x07\x56\xb1\x92\x5f\x66\x64\x25\xec\xf4\xb0\x42\x2b\x05\x06\xf5\x63\x2b\x45\xf7\x0c\x54\x2a\x08\xae\xaa\xc8\xf6\xa4\xbb\x08\x49\x72\x40\x73\xf7\x12\x46\x8d\xbc\xcb\x24\x6a\xe3\x5c\x32\xd4\x8d\x7c\x0b\x70\xe8\xca\xb5\x48\x61\x76\x79\x96\x09\x0b\x60\xbd\x1e\xb5\x5e\xb2\xcb\x86\x0e\xdc\xb7\x4c\xa2\xc3\x71\x2d\x52\xd6\xfa\x9e\x45\xab\xf8\x65\x3a\x16\xb0\xd1\xc3\xf2\x2b\x12\x08\xea\xbb\x15\x49\xf6\x0c\x14\x2a\xf0\x2a\x15\x44\x7b\x52\xa7\x12\x46\x6d\x7d\xca\xd2\x6d\xe4\x53\x3e\xb8\x6d\x7c\x4a\x86\xba\x91\x4f\x01\x0e\x5d\xf9\x14\x29\xcc\x2e\x9f\xf2\x01\xbb\x0c\x8b\x13\xfa\x5a\x79\x14\xd9\xcc\x81\x7b\x94\x0f\xee\xe1\x78\x14\x29\x6b\x7d\x8f\xa2\x55\xfc\x32\x3d\x0a\xd8\xe8\x61\x79\x14\x09\x03\xf5\x3d\x8a\x24\x7b\x06\x0a\x15\x78\x94\x0a\xa2\x3d\xa9\x47\x59\xba\x6d\x3c\x4a\x54\x33\x53\x3d\x84\x70\x3d\xe5\x78\x6e\x64\xdb\xd9\x54\x75\x51\xa5\x3f\x31\xc7\x9b\x54\xf5\x30\xfe\x18\x27\xa4\xf6\xae\xc3\xb3\x74\xa6\x77\x9a\x49\xb5\xdc\xf0\x84\xe2\x2e\x47\x71\x94\x4c\x15\xf9\x54\x9f\x87\x55\x83\xe1\x84\xd1\x80\x51\xfe\x58\x93\xec\x8a\x5a\x15\xd3\xe8\x13\x92\x1b\xfa\x67\x5d\x92\x6b\x12\x51\x5b\xe6\xd4\x97\x91\x89\x8c\xfb\xf8\x54\x84\xa4\x1b\x6e\x69\xd9\xf1\x19\x4a\xf6\xec\x77\x51\xad\x12\xec\xe3\x70\xa7\x69\x7e\x7d\x6a\x55\xf7\x29\x4f\xb3\x99\x44\xf2\x34\x1b\xb0\xbf\xd6\xc7\xbe\x08\x56\x3f\x20\xe3\xae\x23\x56\xff\x02\x56\x37\x17\xd7\x0d\x0f\xc7\x11\x1c\x5e\x80\x5e\xd7\x9d\xc8\xf2\x12\x19\x57\x66\x27\x9c\x5e\x21\xe3\x83\x79\x7d\xdb\x09\xaf\xd7\xc8\xb8\xbe\xb8\xe9\x84\xd5\x3f\x90\x71\x6b\x5e\x5e\xc4\xbc\xf4\x64\x6a\xc8\xec\x9f\xc8\x38\x7f\x7f\x79\x79\x7a\x35\x8e\xb7\x61\x5a\x7c\x49\xa1\x71\xbb\xfd\x87\x14\xa9\x2f\x75\x80\x55\xfe\xd4\x3d\x79\x60\x63\xd1\x19\x7b\x6a\x87\xe6\x44\x5e\xc4\xc7\xa8\xd5\x68\x75\xe9\xca\x0d\x1f\x43\xf9\x8c\x7b\xf2\x28\x4e\x21\x55\x45\x31\x8a\x65\x02\xb4\xd7\x09\x82\xe9\xd3\xb9\x55\x80\x2f\xf7\xd8\x4a\xa1\xaa\x82\x14\x89\xf3\xd3\xde\x6d\x8e\xad\xd9\x06\xa4\x74\x2b\x97\x50\x28\xe8\x72\x1f\x64\x41\x69\xff\xee\x2e\xed\xe6\x96\xaa\xbe\xf6\x75\x8b\x05\x2d\xfc\x2a\x2b\xa6\x2b\x46\x60\xf9\xb8\xfc\x7c\x23\xf9\x78\xc2\x82\x25\xe0\x3e\xdb\x51\x05\xfc\x32\xdf\xc5\x42\xab\xe6\x50\x4f\xac\x2a\xf9\x6c\x1f\xde\x57\xe8\xcb\x08\x02\x08\x6b\x56\x25\x94\xa0\x0e\x22\x7f\xa0\xed\x91\xb4\x11\x67\x0b\x52\x32\xbd\x72\x96\x83\x32\x1c\x77\xd5\x4f\x26\x4a\x53\x1f\x16\x07\x58\x4d\x7d\x58\x6a\x1d\xd9\xd9\xa7\xb0\xe3\xdc\x47\x5c\x9b\x47\xc2\x76\x4a\x1f\xc6\x96\x53\x5a\x41\xda\x4d\xe9\xd3\x31\x65\xc4\xe2\x72\x23\xb0\xa3\x2f\xc2\x12\xb3\x69\x81\x64\x09\xe4\x66\x4e\xb7\x7d\x07\x25\x7b\x4f\xb8\xd5\x18\x26\xea\xd6\x3b\x58\x37\x07\xf6\xc2\x08\x66\x69\xe0\xd4\xe7\x3d\x01\xef\x53\x8f\xba\xfe\xb9\x2a\x57\xe0\x56\x28\x63\xe6\xa8\x5d\x51\xae\x49\xe2\xe5\x40\x56\xca\x1c\x4e\x8b\xd3\x79\x31\x23\x3c\x4d\x23\x3b\x31\x7d\xcc\x29\xd6\xfd\x3a\x4b\x14\xfc\x5f\x00\x00\x00\xff\xff\x32\xbb\xa3\x6b\xe0\x66\x00\x00")

func indexHtmlBytes() ([]byte, error) {
	return bindataRead(
		_indexHtml,
		"index.html",
	)
}

func indexHtml() (*asset, error) {
	bytes, err := indexHtmlBytes()
	if err != nil {
		return nil, err
	}

	info := bindataFileInfo{name: "index.html", size: 26336, mode: os.FileMode(384), modTime: time.Unix(1400000000, 0)}
	a := &asset{bytes: bytes, info:  info}
	return a, nil
}

// Asset loads and returns the asset for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func Asset(name string) ([]byte, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("Asset %s can't read by error: %v", name, err)
		}
		return a.bytes, nil
	}
	return nil, fmt.Errorf("Asset %s not found", name)
}

// MustAsset is like Asset but panics when Asset would return an error.
// It simplifies safe initialization of global variables.
func MustAsset(name string) []byte {
	a, err := Asset(name)
	if (err != nil) {
		panic("asset: Asset(" + name + "): " + err.Error())
	}

	return a
}

// AssetInfo loads and returns the asset info for the given name.
// It returns an error if the asset could not be found or
// could not be loaded.
func AssetInfo(name string) (os.FileInfo, error) {
	cannonicalName := strings.Replace(name, "\\", "/", -1)
	if f, ok := _bindata[cannonicalName]; ok {
		a, err := f()
		if err != nil {
			return nil, fmt.Errorf("AssetInfo %s can't read by error: %v", name, err)
		}
		return a.info, nil
	}
	return nil, fmt.Errorf("AssetInfo %s not found", name)
}

// AssetNames returns the names of the assets.
func AssetNames() []string {
	names := make([]string, 0, len(_bindata))
	for name := range _bindata {
		names = append(names, name)
	}
	return names
}

// _bindata is a table, holding each asset generator, mapped to its name.
var _bindata = map[string]func() (*asset, error){
	"index.html": indexHtml,
}

// AssetDir returns the file names below a certain
// directory embedded in the file by go-bindata.
// For example if you run go-bindata on data/... and data contains the
// following hierarchy:
//     data/
//       foo.txt
//       img/
//         a.png
//         b.png
// then AssetDir("data") would return []string{"foo.txt", "img"}
// AssetDir("data/img") would return []string{"a.png", "b.png"}
// AssetDir("foo.txt") and AssetDir("notexist") would return an error
// AssetDir("") will return []string{"data"}.
func AssetDir(name string) ([]string, error) {
	node := _bintree
	if len(name) != 0 {
		cannonicalName := strings.Replace(name, "\\", "/", -1)
		pathList := strings.Split(cannonicalName, "/")
		for _, p := range pathList {
			node = node.Children[p]
			if node == nil {
				return nil, fmt.Errorf("Asset %s not found", name)
			}
		}
	}
	if node.Func != nil {
		return nil, fmt.Errorf("Asset %s not found", name)
	}
	rv := make([]string, 0, len(node.Children))
	for childName := range node.Children {
		rv = append(rv, childName)
	}
	return rv, nil
}

type bintree struct {
	Func func() (*asset, error)
	Children map[string]*bintree
}
var _bintree = &bintree{nil, map[string]*bintree{
	"index.html": &bintree{indexHtml, map[string]*bintree{
	}},
}}

// RestoreAsset restores an asset under the given directory
func RestoreAsset(dir, name string) error {
        data, err := Asset(name)
        if err != nil {
                return err
        }
        info, err := AssetInfo(name)
        if err != nil {
                return err
        }
        err = os.MkdirAll(_filePath(dir, filepath.Dir(name)), os.FileMode(0755))
        if err != nil {
                return err
        }
        err = ioutil.WriteFile(_filePath(dir, name), data, info.Mode())
        if err != nil {
                return err
        }
        err = os.Chtimes(_filePath(dir, name), info.ModTime(), info.ModTime())
        if err != nil {
                return err
        }
        return nil
}

// RestoreAssets restores an asset under the given directory recursively
func RestoreAssets(dir, name string) error {
        children, err := AssetDir(name)
        // File
        if err != nil {
                return RestoreAsset(dir, name)
        }
        // Dir
        for _, child := range children {
                err = RestoreAssets(dir, filepath.Join(name, child))
                if err != nil {
                        return err
                }
        }
        return nil
}

func _filePath(dir, name string) string {
        cannonicalName := strings.Replace(name, "\\", "/", -1)
        return filepath.Join(append([]string{dir}, strings.Split(cannonicalName, "/")...)...)
}

