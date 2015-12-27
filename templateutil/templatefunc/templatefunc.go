package templatefunc

import (
	"fmt"
	"html/template"
	"strings"

	"github.com/ostrost/ostent/params"
	"github.com/ostrost/ostent/templateutil"
)

func (f JSXLFuncs) TitlePrefixed(prefix string, v interface{}) template.HTMLAttr {
	return SprintfAttr(` title={%q + %s}`, prefix, v.(Uncurler).Uncurl())
}
func (f HTMLFuncs) TitlePrefixed(prefix string, v interface{}) template.HTMLAttr {
	return SprintfAttr(` title="%s %s"`, prefix, v.(string))
}

func (f JSXLFuncs) ClassAllZero(x1, x2, y1, y2 interface{}, class string) template.HTMLAttr {
	return SprintfAttr(" className={(%s && %s && %s && %s) ? %q : \"\"}",
		fmt.Sprintf("(%[1]s == null || %[1]s == \"0\")", x1.(Uncurler).Uncurl()),
		fmt.Sprintf("(%[1]s == null || %[1]s == \"0\")", x2.(Uncurler).Uncurl()),
		fmt.Sprintf("(%[1]s == null || %[1]s == \"0\")", y1.(Uncurler).Uncurl()),
		fmt.Sprintf("(%[1]s == null || %[1]s == \"0\")", y2.(Uncurler).Uncurl()),
		class)
}

func (f HTMLFuncs) ClassAllZero(x1, x2, y1, y2 interface{}, class string) template.HTMLAttr {
	if f.IsStringZero(x1) && f.IsStringZero(x2) &&
		f.IsStringZero(y1) && f.IsStringZero(y2) {
		return SprintfAttr(" class=%q", class)
	}
	return SprintfAttr("")
}

// IsStringZero is internal (not required for interface)
func (f HTMLFuncs) IsStringZero(x interface{}) bool {
	if s, ok := x.(string); ok {
		if s == "0" {
			return true
		}
	} else if s, ok := x.(*string); ok && (s == nil || *s == "0") {
		return true
	}
	return false
}

func (f JSXLFuncs) ClassNonNil(x interface{}, class, sndclass string) template.HTMLAttr {
	return SprintfAttr(" className={%s != null ? %q : %q}",
		x.(Uncurler).Uncurl(), class, sndclass)
}

func (f HTMLFuncs) ClassNonNil(x interface{}, class, sndclass string) template.HTMLAttr {
	if s := x.(*string); s == nil {
		class = sndclass
	}
	return SprintfAttr(" class=%q", class)
}

func (f JSXLFuncs) ClassNonZero(x interface{}, class, sndclass string) template.HTMLAttr {
	return SprintfAttr(` className={%s.Absolute != 0 ? %q : %q}`,
		x.(Uncurler).Uncurl(), class, sndclass)
}

func (f HTMLFuncs) ClassNonZero(x interface{}, class, sndclass string) template.HTMLAttr {
	if x.(params.Num).Absolute == 0 {
		class = sndclass
	}
	return SprintfAttr(" class=%q", class)
}

func (f JSXLFuncs) ClassPositive(x interface{}, class, sndclass string) template.HTMLAttr {
	return SprintfAttr(` className={!%s.Negative ? %q : %q}`,
		x.(Uncurler).Uncurl(), class, sndclass)
}

func (f HTMLFuncs) ClassPositive(x interface{}, class, sndclass string) template.HTMLAttr {
	if x.(params.Num).Negative {
		class = sndclass
	}
	return SprintfAttr(" class=%q", class)
}

// Key returns key attribute: prefix + uncurled x being an Uncurler.
func (f JSXLFuncs) Key(prefix string, x interface{}) template.HTMLAttr {
	return SprintfAttr(" key={%q+%s}", prefix+"-", x.(Uncurler).Uncurl())
}

// Key returns empty attribute.
func (f HTMLFuncs) Key(_ string, x interface{}) (empty template.HTMLAttr) { return }

func (f JSXLFuncs) FuncHrefT() interface{} {
	return func(_, n Uncurler) (template.HTMLAttr, error) {
		base, last := f.Split(n)
		return SprintfAttr(" href={%s.Tlinks.%s} onClick={this.handleClick}",
			base, last), nil
	}
}

func (f HTMLFuncs) FuncHrefT() interface{} { return f.ParamsFuncs.HrefT }

func (f JSXLFuncs) FuncLessD() interface{} {
	return func(_, dur Uncurler, bclass string) (params.ALink, error) {
		return f.Dlink(dur, bclass, "Less", "-")
	}
}

func (f JSXLFuncs) FuncMoreD() interface{} {
	return func(_, dur Uncurler, bclass string) (params.ALink, error) {
		return f.Dlink(dur, bclass, "More", "+")
	}
}

func (f HTMLFuncs) FuncLessD() interface{} { return f.ParamsFuncs.LessD }
func (f HTMLFuncs) FuncMoreD() interface{} { return f.ParamsFuncs.MoreD }

func (f JSXLFuncs) FuncLessN() interface{} {
	return func(_, num Uncurler, bclass string) (params.ALink, error) {
		return f.Nlink(num, bclass, "Less", "-")
	}
}

func (f JSXLFuncs) FuncMoreN() interface{} {
	return func(_, num Uncurler, bclass string) (params.ALink, error) {
		return f.Nlink(num, bclass, "More", "+")
	}
}

func (f HTMLFuncs) FuncLessN() interface{} { return f.ParamsFuncs.LessN }
func (f HTMLFuncs) FuncMoreN() interface{} { return f.ParamsFuncs.MoreN }

func (f JSXLFuncs) FuncVlink() interface{} {
	return func(_, this Uncurler, cmp int, text string) params.VLink {
		base, last := f.Split(this)
		return params.VLink{
			CaretClass: fmt.Sprintf("{%s.Vlinks.%s[%d-1].%s}", base, last, cmp, "CaretClass"),
			LinkClass:  fmt.Sprintf("{%s.Vlinks.%s[%d-1].%s}", base, last, cmp, "LinkClass"),
			LinkHref:   fmt.Sprintf("{%s.Vlinks.%s[%d-1].%s}", base, last, cmp, "LinkHref"),
			LinkText:   text, // always static
		}
	}
}

func (f HTMLFuncs) FuncVlink() interface{} { return f.ParamsFuncs.Vlink }

func (f JSXLFuncs) Dlink(v Uncurler, bclass, which, badge string) (params.ALink, error) {
	base, last := f.Split(v)
	var (
		href   = fmt.Sprintf( /**/ "{%s.Dlinks.%s.%s.Href}", base, last, which)
		text   = fmt.Sprintf( /**/ "{%s.Dlinks.%s.%s.Text}", base, last, which)
		eclass = fmt.Sprintf( /* */ "%s.Dlinks.%s.%s.ExtraClass", base, last, which) // not curled
	)
	return params.ALink{
		Href:  href,
		Text:  text,
		Badge: badge,
		Class: f.ConcatClass(bclass, eclass),
	}, nil
}

// ConcatClass is internal (not required for interface)
func (f JSXLFuncs) ConcatClass(bclass, eclass string) string {
	return fmt.Sprintf("{%q + \" \" + (%s != null ? %s : \"\")}", bclass, eclass, eclass)
}

// Nlink is internal (not required for interface)
func (f JSXLFuncs) Nlink(v Uncurler, bclass, which, badge string) (params.ALink, error) {
	base, last := f.Split(v)
	var (
		href   = fmt.Sprintf( /**/ "{%s.Nlinks.%s.%s.Href}", base, last, which)
		text   = fmt.Sprintf( /**/ "{%s.Nlinks.%s.%s.Text}", base, last, which)
		eclass = fmt.Sprintf( /* */ "%s.Nlinks.%s.%s.ExtraClass", base, last, which) // not curled
	)
	return params.ALink{
		Href:  href,
		Text:  text,
		Badge: badge,
		Class: f.ConcatClass(bclass, eclass),
	}, nil
}

// Split is internal (not required for interface)
func (f JSXLFuncs) Split(v Uncurler) (string, string) {
	split := strings.Split(v.Uncurl(), ".")
	return strings.Join(split[:len(split)-1], "."), split[len(split)-1]
}

// JSXLFuncs has methods implementing Functor.
type JSXLFuncs struct{ templateutil.JSXLFuncs }

// HTMLFuncs has methods implementing Functor.
type HTMLFuncs struct {
	// templateutil.Functor
	templateutil.HTMLFuncs
	params.ParamsFuncs
}

// ConstructMaps constructs template.FuncMap off f implementation.
func ConstructMap(f Functor) template.FuncMap {
	return templateutil.CombineMaps(f, template.FuncMap{
		"TitlePrefixed": f.TitlePrefixed,
		"ClassAllZero":  f.ClassAllZero,
		"ClassNonNil":   f.ClassNonNil,
		"ClassNonZero":  f.ClassNonZero,
		"ClassPositive": f.ClassPositive,
		"Key":           f.Key,

		"HrefT": f.FuncHrefT(),
		"LessD": f.FuncLessD(),
		"MoreD": f.FuncMoreD(),
		"LessN": f.FuncLessN(),
		"MoreN": f.FuncMoreN(),
		"Vlink": f.FuncVlink(),
	})
}

func FuncMapJSXL() template.FuncMap {
	return ConstructMap(JSXLFuncs{templateutil.NewJSXLFuncs()})
}

func FuncMapHTML() template.FuncMap {
	return ConstructMap(HTMLFuncs{
		HTMLFuncs:   templateutil.NewHTMLFuncs(),
		ParamsFuncs: params.ParamsFuncs{},
	})
}

type Functor interface {
	templateutil.Functor

	TitlePrefixed(string, interface{}) template.HTMLAttr
	ClassAllZero(interface{}, interface{}, interface{}, interface{}, string) template.HTMLAttr
	ClassNonNil(interface{}, string, string) template.HTMLAttr
	ClassNonZero(interface{}, string, string) template.HTMLAttr
	ClassPositive(interface{}, string, string) template.HTMLAttr
	Key(string, interface{}) template.HTMLAttr

	FuncHrefT() interface{}
	FuncLessD() interface{}
	FuncMoreD() interface{}
	FuncLessN() interface{}
	FuncMoreN() interface{}
	FuncVlink() interface{}
}

func SprintfAttr(format string, args ...interface{}) template.HTMLAttr {
	return template.HTMLAttr(fmt.Sprintf(format, args...))
}

type Uncurler interface {
	Uncurl() string
}