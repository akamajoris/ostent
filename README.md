[![Build status](https://secure.travis-ci.org/rzab/ostent.png?branch=master)](http://travis-ci.org/rzab/ostent)

`ostent` displays current system metrics. [**Demo** here](http://demo.ostrost.com/)

![Screenshot](https://www.ostrost.com/ostent/screenshot.png)

Install & run with `curl -sSL https://github.com/rzab/ostent/raw/master/ostent.sh | sh`

It's a single executable without dependecies. Once installed,
it will self-upgrade whenever there's new release.

Platforms
---------

   - Linux [64-bit](https://github.com/rzab/ostent/releases/download/v0.1.8/Linux.x86_64) | [32-bit](https://github.com/rzab/ostent/releases/download/v0.1.8/Linux.i686)
   - [Darwin](https://github.com/rzab/ostent/releases/download/v0.1.8/Darwin.x86_64)
   - _Expect \*BSD builds surely_

Binaries distributed by [GitHub Releases](https://github.com/rzab/ostent/releases)

Usage
-----

`ostent` accepts optional `-bind` argument to set specific IP and/or port to bind to, otherwise any machine IP and port 8050 by default.

   - `ostent -bind 127.1` # [http://127.0.0.1:8050/](http://127.0.0.1:8050/)
   - `ostent -bind 192.168.1.10:8051` # port 8051
   - `ostent -bind 8052` # any IP, port 8052

`-update` sets collection interval (1 second by default), append `s` for seconds, `m` for minutes: `5s`, `1m` etc.

Run it, it'll give the link(s) to open in a browser.

Running the code
----------------

1. **`git clone https://github.com/rzab/ostent.git`**

2. **`cd ostent`** `# the project directory`

3. **`export GOPATH=$GOPATH:$PWD`** `# the current directory into $GOPATH`

4. **`make bootstrap`**

   - installs required Go packages
   - generates `src/share/{assets,templates}/bindata.devel.go`
     These files will contain absolute local paths.

5. Either **`rerun ostent`** (see [rerun](https://github.com/skelterjohn/rerun)) to run or **`make`** to build.

Go packages
-----------

`[src/]ostent` is the main (_as in [Go Program execution](http://golang.org/ref/spec#Program_execution)_) package:
rerun will find `main.devel.go` file; the other `main.production.go` (used when building with `-tags production`)
is the init code for the distributed binaries: also includes
[goagain](https://github.com/rcrowley/goagain) recovering and self-upgrading via [go-update](https://github.com/inconshreveable/go-update).

`[src/]amberp/amberpp` is templates compiler, used with make.

Make
----

GNU make to rebuild the assets and build the program.

Additional required tools here:
- [Sass](http://sass-lang.com/install)
- [react-tools](https://www.npmjs.org/package/react-tools)
- [uglify-js](https://www.npmjs.org/package/uglify-js) (for builds)

`make` rebuilds these **commited to the repo** files:
- `src/share/templates/bindata.production.go`
- `src/share/assets/bindata.production.go`
- `src/share/assets/js/devel/milk/*.js`
- `src/share/assets/js/devel/gen/*.js`
- `src/share/templates/*.html`
- `src/share/assets/css/*.css`
- `src/share/tmp/jsassets.d`
- `src/share/tmp/*.jsx`

If you don't change source files, content re-generated should not differ from the commited.
Whenever src/share/{amber.templates,style,coffee} modified, you have to re-run `make`.

`make` compiles everything and produces final binary.

The assets
----------

The binaries, to be stand-alone, have the assets and templates embeded.
Unless you specifically `go build` with `-tags production` (e.g with make),
the content is not embeded for the ease of development:
with `rerun ostent`, asset requests are served from the actual files.
