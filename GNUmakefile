#!/usr/bin/env make -f

fqostent=github.com/ostrost/ostent
testpackage?=./...

binassets_develgo         = share/assets/bindata.devel.go
binassets_productiongo    = share/assets/bindata.production.go
bintemplates_develgo      = share/templates/bindata.devel.go
bintemplates_productiongo = share/templates/bindata.production.go
templates_dir             = share/templates/
templates_files           = index.html usepercent.html tooltipable.html
templates_html=$(addprefix $(templates_dir), $(templates_files))

PATH=$(shell printf %s: $$PATH; echo $$GOPATH | awk -F: 'BEGIN { OFS="/bin:"; } { print $$1,$$2,$$3,$$4,$$5,$$6,$$7,$$8,$$9 "/bin"}')

xargs=xargs
ifeq (Linux, $(shell uname -s))
xargs=xargs --no-run-if-empty
endif
go-bindata=go-bindata -ignore '.*\.go' # Go regexp syntax for -ignore

.PHONY: all al init test covertest coverfunc coverhtml bindata bindata-devel bindata-production
ifneq (init, $(MAKECMDGOALS))
# before init:
# - go list would fail => unknown $(destbin)
# - go test fails without dependencies installed
# - go-bindata is not installed yet

destbin=$(shell echo $(GOPATH) | awk -F: '{ print $$1 "/bin" }')
# destbin=$(abspath $(dir $(shell go list -f '{{.Target}}' $(fqostent))))
ostent_files=$(shell \
go list -tags production -f '{{.ImportPath}}{{"\n"}}{{join .Deps "\n"}}' $(fqostent) | xargs \
go list -tags production -f '{{if and (not .Standard) (not .Goroot)}}\
{{$$dir := .Dir}}\
{{range .GoFiles }}{{$$dir}}/{{.}}{{"\n"}}{{end}}\
{{range .CgoFiles}}{{$$dir}}/{{.}}{{"\n"}}{{end}}{{end}}' | \
sed -n "s,^ *,,g; s,$(PWD)/,,p" | sort) # | tee /dev/stderr

all: $(destbin)/ostent
endif
init:
	go get -u -v \
github.com/jteeuwen/go-bindata/go-bindata \
github.com/skelterjohn/rerun \
github.com/clipperhouse/gen
# TODO rm {src,pkg/*}/github.com/clipperhouse/slice{,.a}
	cd system/operating && gen add github.com/rzab/slice
	git remote set-url origin https://$(fqostent) # travis & tip & https://code.google.com/p/go/issues/detail?id=8850
	go get -v -tags production $(fqostent)
	go list -f '{{.Target}}' $(fqostent) | $(xargs) rm # clean the library archive
	go get -v -a $(fqostent)
	go list -f '{{.Target}}' $(fqostent) | $(xargs) rm # clean the library archive

%: %.sh # clear the implicit *.sh rule covering ./ostent.sh

ifneq (init, $(MAKECMDGOALS))
test:
	go vet $(testpackage)
	go test -v $(testpackage)
covertest:
	go test -v -covermode=count -coverprofile=coverage.out $(testpackage)
coverfunc: covertest
	go tool cover -func=coverage.out
coverhtml: covertest
	go tool cover -html=coverage.out

$(PWD)/system/operating/%_slice.go: $(PWD)/system/operating/operating.go
	cd $(dir $@) && go generate

al: $(ostent_files)
# al: like `all' but without final go build ostent. For when rerun does the build

$(destbin)/ostent: $(ostent_files)
	go build -ldflags -w -a -tags production -o $@ $(fqostent)

$(destbin)/%:
	go build -o $@ $(fqostent)/$|
$(destbin)/amberpp: | amberp/amberpp

$(destbin)/amberpp: $(shell go list -f '\
{{$$dir := .Dir}}\
{{range .GoFiles }}{{$$dir}}/{{.}}{{"\n"}}{{end}}' $(fqostent)/amberp/amberpp | \
sed -n "s,^ *,,g; s,$(PWD)/,,p" | sort) # | tee /dev/stderr

share/assets/css/index.css: share/style/index.scss
	type sass   >/dev/null || exit 0; sass $< $@
share/assets/js/devel/gen/jscript.js: share/tmp/jscript.jsx
	type jsx    >/dev/null || exit 0; jsx <$^ >/dev/null && jsx <$^ 2>/dev/null >$@
share/assets/js/devel/milk/index.js: share/coffee/index.coffee
	type coffee >/dev/null || exit 0; coffee -p $^ >/dev/null && coffee -o $(@D)/ $^
share/assets/js/production/index.min.js: $(shell find share/assets/js/devel/ -type f)
	type r.js   >/dev/null || exit 0; cd share/assets/js/devel/milk && r.js -o build.js

share/templates/%.html: share/amber.templates/%.amber share/amber.templates/defines.amber $(destbin)/amberpp
	$(destbin)/amberpp -defines share/amber.templates/defines.amber -output $@ $<
share/tmp/jscript.jsx: share/amber.templates/jscript.amber share/amber.templates/defines.amber $(destbin)/amberpp
	$(destbin)/amberpp -defines share/amber.templates/defines.amber -javascript -output $@ $<

$(bintemplates_productiongo): $(templates_html)
	cd $(<D) && $(go-bindata) -pkg templates -tags production -mode 0600 -modtime 1400000000 -o $(@F) $(^F)

$(bintemplates_develgo): $(templates_html)
	cd $(templates_dir) && $(go-bindata) -pkg templates -tags '!production' -dev -o $(@F) $(templates_files)
#	# the target has no prerequisites e.g. $(templates_html):
#	# $(templates_dir)   instead of $(<D)
#	# $(templates_files) instead of $(^F)

$(binassets_productiongo):
	cd share/assets && $(go-bindata) -pkg assets -o $(@F) -tags production -ignore js/devel/ -mode 0600 -modtime 1400000000 ./...
$(binassets_develgo):
	cd share/assets && $(go-bindata) -pkg assets -o $(@F) -tags '!production' -dev -ignore js/production/ ./...

$(binassets_productiongo): $(shell find \
                           share/assets -type f \! -name '*.go' \! -path \
                          'share/assets/js/devel/*')
$(binassets_productiongo): share/assets/css/index.css
$(binassets_productiongo): share/assets/js/production/index.min.js

$(binassets_develgo): $(shell find \
                      share/assets -type f \! -name '*.go' \! -path \
                     'share/assets/js/production/*')
$(binassets_develgo): share/assets/css/index.css
$(binassets_develgo): share/assets/js/devel/gen/jscript.js

# spare shortcuts
bindata-production: $(binassets_productiongo) $(bintemplates_productiongo)
bindata-devel: $(binassets_develgo) $(bintemplates_develgo)
bindata: bindata-devel bindata-production

endif # END OF ifneq (init, $(MAKECMDGOALS))
