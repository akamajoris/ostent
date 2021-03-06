package main

import (
	"errors"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"net/http/pprof"
	"net/url"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/Sirupsen/logrus"
	"github.com/blang/semver" // alt semver: "github.com/Masterminds/semver"
	"github.com/facebookgo/grace/gracehttp"
	"github.com/julienschmidt/httprouter"
	"github.com/justinas/alice"
	"github.com/spf13/cobra"

	"github.com/ostrost/ostent/cmd"
	"github.com/ostrost/ostent/ostent"
	"github.com/ostrost/ostent/share/assets"
	"github.com/ostrost/ostent/share/templates"
)

func run(*cobra.Command, []string) error {
	if cv, err := newSemver(cmd.OstentVersion); err != nil {
		logru.Printf("Current semver parse error: %s\n", err)
	} else if upgradeChecks && cv != nil {
		go untilUpgrade(cv)
	}

	send, recv := make(chan chan string, 1), make(chan string, 1)
	send <- recv
	go cmd.MainAgent(send)
	hp := <-recv
	close(send)

	templates.InitTemplates()
	go ostent.UpdateLoop()
	return serve(hp)
}

func main() {
	cmd.RootCmd.RunE = run
	cmd.Execute()
}

var (
	taggedBin = assets.AssetAltModTimeFunc != nil // whether the build features bin tag
	logru     = newLogger()

	// flags
	upgradeChecks = true
	logRequests   = !taggedBin
)

func newLogger() *logrus.Logger {
	lr := logrus.New() // into os.Stderr
	lr.Formatter = &logrus.TextFormatter{FullTimestamp: true}
	// , TimestampFormat: "02/Jan/2006:15:04:05 -0700",
	return lr
}

func init() {
	var usagedefault string
	if !logRequests {
		usagedefault = fmt.Sprintf(" (default %t)", logRequests /* false */)
	}
	cmd.RootCmd.Flags().BoolVar(&logRequests, "log-requests", logRequests,
		"log server requests"+usagedefault)
	cmd.RootCmd.Flags().BoolVar(&upgradeChecks, "upgrade-checks", upgradeChecks,
		"periodic upgrade checks") // default true
}

func newSemver(s string) (*semver.Version, error) {
	v, err := semver.New(s)
	if err == nil {
		return v, nil
	}
	if err.Error() == "No Major.Minor.Patch elements found" &&
		len(strings.SplitN(s, ".", 3)) == 2 {
		return semver.New(s + ".0")
	}
	return nil, err
}

// serve constructs a *http.Server to (gracefully) Serve. Routes are set here.
func serve(laddr string) error {
	distrib, err := ostent.Distrib()
	if err != nil {
		logru.Printf("Warning: detecting distrib: %s\n", err)
	}

	var (
		serve1 = ostent.NewServeSSE(logRequests)
		serve2 = ostent.NewServeWS(serve1, logru)
		serve3 = ostent.NewServeIndex(serve2, templates.IndexTemplate, ostent.StaticData{
			TAGGEDbin:     taggedBin,
			Distrib:       distrib,
			OstentVersion: cmd.OstentVersion,
		})
		serve4 = ostent.ServeAssets{
			Logger:         logru,
			ReadFunc:       assets.Asset,
			InfoFunc:       assets.AssetInfo,
			AltModTimeFunc: assets.AssetAltModTimeFunc,
		}
	)

	routes := map[[2]string]httprouter.Handle{
		{"/index.sse", "GET"}: ostent.HandleFunc(serve1.IndexSSE),
		{"/index.ws", "GET"}:  ostent.HandleFunc(serve2.IndexWS),
		{"/", "GET HEAD"}:     ostent.HandleFunc(serve3.Index),
		// {"/panic", "GET"}:  ostent.HandleFunc(func(http.ResponseWriter, *http.Request) { panic("/") }),
	}
	for _, path := range assets.AssetNames() {
		p := "/" + path
		if path != "favicon.ico" && path != "robots.txt" {
			p = "/" + cmd.OstentVersion + "/" + path // the Version prefix
		}
		routes[[2]string{p, "GET HEAD"}] = ostent.HandleThen(alice.New(
			ostent.AddAssetPathContextFunc(path),
		).Then)(serve4.Serve)
	}
	if !taggedBin { // pprof in dev
		routes[[2]string{"/debug/pprof/:name", "GET HEAD POST"}] =
			ostent.ParamsFunc(nil)(pprofHandle)
	}

	r := httprouter.New()
	for x, handle := range routes {
		for _, m := range strings.Split(x[1], " ") {
			r.Handle(m, x[0], handle)
		}
	}
	return gracehttp.Serve(&http.Server{
		Addr:     laddr,
		ErrorLog: log.New(os.Stderr, "[ostent httpd] ", log.LstdFlags),
		Handler:  ostent.ServerHandler(logRequests, r),
	})
}

// untilUpgrade waits for an upgrade and returns.
func untilUpgrade(cv *semver.Version) {
	if checkUpgrade(cv) {
		return
	}

	seed := time.Now().UTC().UnixNano()
	random := rand.New(rand.NewSource(seed))

	wait := time.Hour
	wait += time.Duration(random.Int63n(int64(wait))) // 1.5 +- 0.5 h
	for {
		time.Sleep(wait)
		if checkUpgrade(cv) {
			break
		}
	}
}

// checkUpgrade does upgrade check and returns true if an upgrade is available.
func checkUpgrade(cv *semver.Version) bool {
	newVersion, err := newerVersion()
	if err != nil {
		logru.Printf("Upgrade check error: %s\n", err)
		return false
	}
	if newVersion == "" {
		logru.Printf("Upgrade check: version is empty\n")
		return false
	}
	nv, err := newSemver(newVersion)
	if err != nil {
		logru.Printf("Semver parse error: %s\n", err)
		return false
	}
	if !nv.GT(*cv) {
		return false
	}
	logru.Printf("Upgrade check: %s release available\n", newVersion)
	ostent.OstentUpgrade.Set(newVersion)
	return true
}

// newerVersion checks GitHub for the latest ostent version.
// Return is in form of "\d.*" (sans "^v").
func newerVersion() (string, error) {
	// 1. https://github.com/ostrost/ostent/releases/latest // redirects, NOT followed
	// 2. https://github.com/ostrost/ostent/releases/v...   // Redirect location
	// 3. return "v..." // basename of the location

	type redirected struct {
		error
		url url.URL
	}
	checkRedirect := func(req *http.Request, _via []*http.Request) error {
		return redirected{url: *req.URL}
	}
	client := &http.Client{CheckRedirect: checkRedirect}
	resp, err := client.Get("https://github.com/ostrost/ostent/releases/latest")
	if err == nil {
		err = resp.Body.Close()
		if err != nil {
			return "", err
		}
		return "", errors.New("/latest GitHub page did not return a redirect")
	}
	urlerr, ok := err.(*url.Error)
	if !ok {
		return "", err
	}
	if resp != nil && resp.Body != nil {
		if err := resp.Body.Close(); err != nil {
			return "", err
		}
	}
	redir, ok := urlerr.Err.(redirected)
	if !ok {
		return "", urlerr
	}
	v := filepath.Base(redir.url.Path)
	if len(v) == 0 || v[0] != 'v' {
		return "", fmt.Errorf("Unexpected version from GitHub: %q", v)
	}
	return v[1:], nil
}

func pprofHandle(w http.ResponseWriter, r *http.Request) {
	name, err := ostent.ContextParam(r, "name")
	if err != nil {
		http.Error(w, err.Error(), http.StatusServiceUnavailable)
		return
	}
	var handler func(http.ResponseWriter, *http.Request)
	switch name {
	case "cmdline":
		handler = pprof.Cmdline
	case "profile":
		handler = pprof.Profile
	case "symbol":
		handler = pprof.Symbol
	case "trace":
		handler = pprof.Trace
	default:
		handler = pprof.Index
	}
	if handler == nil {
		http.NotFound(w, r)
		return
	}
	handler(w, r)
}
