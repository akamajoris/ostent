// Generated by CoffeeScript 1.9.1
(function() {
  require.config({
    shim: {
      bootstrap: {
        deps: ['jquery']
      }
    },
    baseUrl: '/js/devel',
    paths: {
      domReady: 'vendor/min/requirejs-domReady/2.0.1/domReady',
      headroom: 'vendor/min/headroom/0.7.0/headroom.min',
      jquery: 'vendor/min/jquery/2.1.3/jquery-2.1.3.min',
      bootstrap: 'vendor/min/bootstrap/3.3.2/bootstrap.min',
      react: 'vendor/min/react/0.12.2/react.min',
      jscript: 'gen/jscript'
    }
  });

  require(['jquery', 'bootstrap', 'react', 'jscript'], function($, _, React, jscript) {
    this.neweventsource = function(onmessage) {
      var conn, init, sendClient, sendSearch;
      conn = null;
      sendSearch = function(search) {
        console.log('SEARCH', search);
        conn.close();
        return window.setTimeout(init, 1000);
      };
      sendClient = function(client) {
        var obj;
        return;
        console.log(JSON.stringify(client), 'sendClient');
        obj = {
          Client: client
        };
        if ((conn == null) || conn.readyState === conn.CLOSING || conn.readyState === conn.CLOSED) {
          init();
        }
        if ((conn == null) || conn.readyState !== conn.OPEN) {
          console.log('Not connected, cannot send', obj);
          return;
        }
        return conn.send(JSON.stringify(obj));
      };
      init = function() {
        var again, statesel;
        conn = new EventSource('/index.sse' + location.search);
        conn.onopen = function() {
          $(window).bind('popstate', (function() {
            sendSearch(location.search);
          }));
        };
        statesel = 'table thead tr .header a.state';
        again = function(e) {
          $(statesel).unbind('click');
          if (!e.wasClean) {
            window.setTimeout(init, 5000);
          }
        };
        conn.onclose = function() {
          return console.log('sse closed (should recover)');
        };
        conn.onerror = function() {
          return console.log('sse errord (should recover)');
        };
        conn.onmessage = onmessage;
        $(statesel).click(function() {
          history.pushState({
            path: this.path
          }, '', this.href);
          sendSearch(this.search);
          return false;
        });
      };
      init();
      return {
        sendClient: sendClient,
        sendSearch: sendSearch,
        close: function() {
          return conn.close();
        }
      };
    };
    this.newwebsocket = function(onmessage) {
      var conn, init, sendClient, sendJSON, sendSearch;
      conn = null;
      sendSearch = function(search) {
        return sendJSON({
          Search: search
        });
      };
      sendClient = function(client) {
        console.log(JSON.stringify(client), 'sendClient');
        return sendJSON({
          Client: client
        });
      };
      sendJSON = function(obj) {
        if ((conn == null) || conn.readyState === conn.CLOSING || conn.readyState === conn.CLOSED) {
          init();
        }
        if ((conn == null) || conn.readyState !== conn.OPEN) {
          console.log('Not connected, cannot send', obj);
          return;
        }
        return conn.send(JSON.stringify(obj));
      };
      init = function() {
        var again, hostport, statesel;
        hostport = window.location.hostname + (location.port ? ':' + location.port : '');
        conn = new WebSocket('ws://' + hostport + '/index.ws');
        conn.onopen = function() {
          sendSearch(location.search);
          $(window).bind('popstate', (function() {
            sendSearch(location.search);
          }));
        };
        statesel = 'table thead tr .header a.state';
        again = function(e) {
          $(statesel).unbind('click');
          if (!e.wasClean) {
            window.setTimeout(init, 5000);
          }
        };
        conn.onclose = again;
        conn.onerror = again;
        conn.onmessage = onmessage;
        $(statesel).click(function() {
          history.pushState({
            path: this.path
          }, '', this.href);
          sendSearch(this.search);
          return false;
        });
      };
      init();
      return {
        sendClient: sendClient,
        sendSearch: sendSearch,
        close: function() {
          return conn.close();
        }
      };
    };
    this.IFbytesCLASS = React.createClass({
      getInitialState: function() {
        return Data.IFbytes;
      },
      render: function() {
        var $if, Data;
        Data = {
          IFbytes: this.state
        };
        return jscript.ifbytes_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.IFbytes) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $if = ref2[i];
            results.push(jscript.ifbytes_rows(Data, $if));
          }
          return results;
        })());
      }
    });
    this.IFerrorsCLASS = React.createClass({
      getInitialState: function() {
        return Data.IFerrors;
      },
      render: function() {
        var $if, Data;
        Data = {
          IFerrors: this.state
        };
        return jscript.iferrors_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.IFerrors) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $if = ref2[i];
            results.push(jscript.iferrors_rows(Data, $if));
          }
          return results;
        })());
      }
    });
    this.IFpacketsCLASS = React.createClass({
      getInitialState: function() {
        return Data.IFpackets;
      },
      render: function() {
        var $if, Data;
        Data = {
          IFpackets: this.state
        };
        return jscript.ifpackets_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.IFpackets) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $if = ref2[i];
            results.push(jscript.ifpackets_rows(Data, $if));
          }
          return results;
        })());
      }
    });
    this.DFbytesCLASS = React.createClass({
      getInitialState: function() {
        return {
          DFlinks: Data.DFlinks,
          DFbytes: Data.DFbytes
        };
      },
      render: function() {
        var $disk, Data;
        Data = this.state;
        return jscript.dfbytes_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.DFbytes) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $disk = ref2[i];
            results.push(jscript.dfbytes_rows(Data, $disk));
          }
          return results;
        })());
      }
    });
    this.DFinodesCLASS = React.createClass({
      getInitialState: function() {
        return {
          DFlinks: Data.DFlinks,
          DFinodes: Data.DFinodes
        };
      },
      render: function() {
        var $disk, Data;
        Data = this.state;
        return jscript.dfinodes_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.DFinodes) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $disk = ref2[i];
            results.push(jscript.dfinodes_rows(Data, $disk));
          }
          return results;
        })());
      }
    });
    this.MEMtableCLASS = React.createClass({
      getInitialState: function() {
        return Data.MEM;
      },
      render: function() {
        var $mem, Data;
        Data = {
          MEM: this.state
        };
        return jscript.mem_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.MEM) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $mem = ref2[i];
            results.push(jscript.mem_rows(Data, $mem));
          }
          return results;
        })());
      }
    });
    this.CPUtableCLASS = React.createClass({
      getInitialState: function() {
        return Data.CPU;
      },
      render: function() {
        var $core, Data;
        Data = {
          CPU: this.state
        };
        return jscript.cpu_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.CPU) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $core = ref2[i];
            results.push(jscript.cpu_rows(Data, $core));
          }
          return results;
        })());
      }
    });
    this.PStableCLASS = React.createClass({
      getInitialState: function() {
        return {
          PStable: Data.PStable,
          PSlinks: Data.PSlinks
        };
      },
      render: function() {
        var $proc, Data;
        Data = this.state;
        return jscript.ps_table(Data, (function() {
          var i, len, ref, ref1, ref2, results;
          ref2 = (ref = Data != null ? (ref1 = Data.PStable) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
          results = [];
          for (i = 0, len = ref2.length; i < len; i++) {
            $proc = ref2[i];
            results.push(jscript.ps_rows(Data, $proc));
          }
          return results;
        })());
      }
    });
    this.VGtableCLASS = React.createClass({
      getInitialState: function() {
        return {
          VagrantMachines: Data.VagrantMachines,
          VagrantError: Data.VagrantError,
          VagrantErrord: Data.VagrantErrord
        };
      },
      render: function() {
        var $mach, Data, rows;
        Data = this.state;
        if (((Data != null ? Data.VagrantErrord : void 0) != null) && Data.VagrantErrord) {
          rows = [jscript.vagrant_error(Data)];
        } else {
          rows = (function() {
            var i, len, ref, ref1, ref2, results;
            ref2 = (ref = Data != null ? (ref1 = Data.VagrantMachines) != null ? ref1.List : void 0 : void 0) != null ? ref : [];
            results = [];
            for (i = 0, len = ref2.length; i < len; i++) {
              $mach = ref2[i];
              results.push(jscript.vagrant_rows(Data, $mach));
            }
            return results;
          })();
        }
        return jscript.vagrant_table(Data, rows);
      }
    });
    this.addNoscript = function($) {
      return $.append('<noscript />').find('noscript').get(0);
    };
    this.HideClass = React.createClass({
      statics: {
        component: function(opt) {
          return React.render(HideClass(opt), addNoscript(opt.$button_el));
        }
      },
      reduce: function(data) {
        var value;
        if ((data != null ? data.Client : void 0) != null) {
          value = data.Client[this.props.xkey];
          if (value !== void 0) {
            return {
              Hide: value
            };
          }
        }
        return null;
      },
      getInitialState: function() {
        return this.reduce(Data);
      },
      componentDidMount: function() {
        return this.props.$button_el.click(this.click);
      },
      render: function() {
        var buttonactive;
        this.props.$collapse_el.collapse(this.state.Hide ? 'hide' : 'show');
        buttonactive = this.state.Hide;
        if ((this.props.reverseActive != null) && this.props.reverseActive) {
          buttonactive = !this.state.Hide;
        }
        this.props.$button_el[buttonactive ? 'addClass' : 'removeClass']('active');
        return null;
      },
      click: function(e) {
        var S;
        (S = {})[this.props.xkey] = !this.state.Hide;
        updates.sendClient(S);
        e.stopPropagation();
        e.preventDefault();
        return void 0;
      }
    });
    this.ButtonClass = React.createClass({
      statics: {
        component: function(opt) {
          return React.render(ButtonClass(opt), addNoscript(opt.$button_el));
        }
      },
      reduce: function(data) {
        var S;
        if ((data != null ? data.Client : void 0) != null) {
          S = {};
          if (data.Client[this.props.Khide] !== void 0) {
            S.Hide = data.Client[this.props.Khide];
          }
          if ((this.props.Kable != null) && data.Client[this.props.Kable] !== void 0) {
            S.Able = data.Client[this.props.Kable];
          }
          if ((this.props.Ksend != null) && data.Client[this.props.Ksend] !== void 0) {
            S.Send = data.Client[this.props.Ksend];
          }
          if ((this.props.Ktext != null) && data.Client[this.props.Ktext] !== void 0) {
            S.Text = data.Client[this.props.Ktext];
          }
          return S;
        }
      },
      getInitialState: function() {
        return this.reduce(Data);
      },
      componentDidMount: function() {
        return this.props.$button_el.click(this.click);
      },
      render: function() {
        var able;
        if (this.props.Kable) {
          able = this.state.Able;
          if (!(this.props.Kable.indexOf('not') > -1)) {
            able = !able;
          }
          this.props.$button_el.prop('disabled', able);
          this.props.$button_el[able ? 'addClass' : 'removeClass']('disabled');
        }
        if (this.props.Ksend != null) {
          this.props.$button_el[this.state.Send ? 'addClass' : 'removeClass']('active');
        }
        if (this.props.Ktext != null) {
          this.props.$button_el.text(this.state.Text);
        }
        return null;
      },
      click: function(e) {
        var S;
        S = {};
        if ((this.state.Hide != null) && this.state.Hide) {
          S[this.props.Khide] = !this.state.Hide;
        }
        if ((this.props.Ksend != null) && (this.state.Send != null)) {
          S[this.props.Ksend] = !this.state.Send;
        }
        if (this.props.Ksig != null) {
          S[this.props.Ksig] = this.props.Vsig;
        }
        updates.sendClient(S);
        e.stopPropagation();
        e.preventDefault();
        return void 0;
      }
    });
    this.TabsClass = React.createClass({
      statics: {
        component: function(opt) {
          return React.render(TabsClass(opt), addNoscript(opt.$button_el));
        }
      },
      reduce: function(data) {
        var S;
        if ((data != null ? data.Client : void 0) != null) {
          S = {};
          if (data.Client[this.props.Khide] !== void 0) {
            S.Hide = data.Client[this.props.Khide];
          }
          if ((this.props.Ksend != null) && data.Client[this.props.Ksend] !== void 0) {
            S.Send = data.Client[this.props.Ksend];
          }
          return S;
        }
      },
      getInitialState: function() {
        return this.reduce(Data);
      },
      componentDidMount: function() {
        this.props.$button_el.click(this.clicktab);
        return this.props.$hidebutton_el.click(this.clickhide);
      },
      render: function() {
        var activeClass, curtabid, el, i, j, len, len1, nots, ref;
        if (this.state.Hide) {
          this.props.$collapse_el.collapse('hide');
          this.props.$hidebutton_el.addClass('active');
          return null;
        }
        this.props.$hidebutton_el.removeClass('active');
        curtabid = +this.state.Send;
        nots = this.props.$collapse_el.not('[data-tabid="' + curtabid + '"]');
        for (i = 0, len = nots.length; i < len; i++) {
          el = nots[i];
          $(el).collapse('hide');
        }
        $(this.props.$collapse_el.not(nots)).collapse('show');
        activeClass = function(el) {
          var tabid_attr, xel;
          xel = $(el);
          tabid_attr = +xel.attr('data-tabid');
          xel[tabid_attr === curtabid ? 'addClass' : 'removeClass']('active');
        };
        ref = this.props.$button_el;
        for (j = 0, len1 = ref.length; j < len1; j++) {
          el = ref[j];
          activeClass(el);
        }
        return null;
      },
      clicktab: function(e) {
        var S;
        S = {};
        S[this.props.Ksend] = +$($(e.target).attr('href')).attr('data-tabid');
        if ((this.state.Hide != null) && this.state.Hide) {
          S[this.props.Khide] = false;
        }
        updates.sendClient(S);
        e.preventDefault();
        e.stopPropagation();
        return void 0;
      },
      clickhide: function(e) {
        var S;
        (S = {})[this.props.Khide] = !this.state.Hide;
        updates.sendClient(S);
        e.stopPropagation();
        e.preventDefault();
        return void 0;
      }
    });
    this.RefreshInputClass = React.createClass({
      statics: {
        component: function(opt) {
          var sel;
          sel = opt.sel;
          delete opt.$;
          opt.$input_el = sel.find('.refresh-input');
          opt.$group_el = sel.find('.refresh-group');
          return React.render(RefreshInputClass(opt), addNoscript(opt.$input_el));
        }
      },
      reduce: function(data) {
        var S;
        if (((data != null ? data.Client : void 0) != null) && ((data.Client[this.props.K] != null) || (data.Client[this.props.Kerror] != null))) {
          S = {};
          if (data.Client[this.props.K] != null) {
            S.Value = data.Client[this.props.K];
          }
          if (data.Client[this.props.Kerror] != null) {
            S.Error = data.Client[this.props.Kerror];
          }
          return S;
        }
      },
      getInitialState: function() {
        var S;
        S = this.reduce(Data);
        return S;
      },
      componentDidMount: function() {
        return this.props.$input_el.on('input', this.submit);
      },
      render: function() {
        if (this.isMounted() && !this.state.Error) {
          this.props.$input_el.prop('value', this.state.Value);
        }
        this.props.$group_el[this.state.Error ? 'addClass' : 'removeClass']('has-warning');
        return null;
      },
      submit: function(e) {
        var S;
        (S = {})[this.props.Ksig] = $(e.target).val();
        updates.sendClient(S);
        e.preventDefault();
        e.stopPropagation();
        return void 0;
      }
    });
    this.NewTextCLASS = function(reduce) {
      return React.createClass({
        newstate: function(data) {
          var v;
          v = reduce(data);
          if (v != null) {
            return {
              Text: v
            };
          }
        },
        getInitialState: function() {
          return this.newstate(Data);
        },
        render: function() {
          return React.DOM.span(null, this.state.Text);
        }
      });
    };
    this.AlertClass = React.createClass({
      show: function() {
        return this.state.Error != null;
      },
      newstate: function(data) {
        var a, error, ref, ref1;
        error = (ref = data.Client) != null ? ref.DebugError : void 0;
        a = {
          Error: error,
          ErrorText: (ref1 = this.state) != null ? ref1.ErrorText : void 0,
          Changed: (this.state != null) && (error != null) && error !== this.state.Error
        };
        if (a.Changed && (a.Error != null)) {
          a.ErrorText = a.Error;
        }
        console.log('newstate', a);
        return a;
      },
      getInitialState: function() {
        return this.newstate(Data);
      },
      render: function() {
        if (this.state.Changed) {
          console.log('show', this.state);
          if (this.show()) {
            this.props.$collapse_el.collapse('show');
          }
        }
        return React.DOM.span(null, this.state.ErrorText);
      }
    });
    this.setState = function(obj, data) {
      var key;
      if (data != null) {
        for (key in data) {
          if (data[key] == null) {
            delete data[key];
          }
        }
        return obj.setState(data);
      }
    };
    return window.update = function() {
      var cputable, dfbytes, dfinodes, dftitle, expandcpu, expanddf, expandif, hideconfigcpu, hideconfigdf, hideconfigif, hideconfigmem, hideconfigps, hideconfigvg, hidecpu, hideps, hideram, hideswap, hidevg, hostname, ifbytes, iferrors, ifpackets, iftitle, ip, la, memtable, onmessage, param, psless, psmore, psplus, pstable, refresh_cpu, refresh_df, refresh_if, refresh_mem, refresh_ps, refresh_vg, tabsdf, tabsif, uptime, vgtable;
      if (((function() {
        var i, len, ref, results;
        ref = location.search.substr(1).split('&');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          param = ref[i];
          if (param.split('=')[0] === 'still') {
            results.push(42);
          }
        }
        return results;
      })()).length) {
        return;
      }
      hideconfigmem = HideClass.component({
        xkey: 'HideconfigMEM',
        $collapse_el: $('#memconfig'),
        $button_el: $('header a[href="#mem"]'),
        reverseActive: true
      });
      hideconfigif = HideClass.component({
        xkey: 'HideconfigIF',
        $collapse_el: $('#ifconfig'),
        $button_el: $('header a[href="#if"]'),
        reverseActive: true
      });
      hideconfigcpu = HideClass.component({
        xkey: 'HideconfigCPU',
        $collapse_el: $('#cpuconfig'),
        $button_el: $('header a[href="#cpu"]'),
        reverseActive: true
      });
      hideconfigdf = HideClass.component({
        xkey: 'HideconfigDF',
        $collapse_el: $('#dfconfig'),
        $button_el: $('header a[href="#df"]'),
        reverseActive: true
      });
      hideconfigps = HideClass.component({
        xkey: 'HideconfigPS',
        $collapse_el: $('#psconfig'),
        $button_el: $('header a[href="#ps"]'),
        reverseActive: true
      });
      hideconfigvg = HideClass.component({
        xkey: 'HideconfigVG',
        $collapse_el: $('#vgconfig'),
        $button_el: $('header a[href="#vg"]'),
        reverseActive: true
      });
      hideram = HideClass.component({
        xkey: 'HideRAM',
        $collapse_el: $('#mem'),
        $button_el: $('#memconfig').find('.hiding')
      });
      hidecpu = HideClass.component({
        xkey: 'HideCPU',
        $collapse_el: $('#cpu'),
        $button_el: $('#cpuconfig').find('.hiding')
      });
      hideps = HideClass.component({
        xkey: 'HidePS',
        $collapse_el: $('#ps'),
        $button_el: $('#psconfig').find('.hiding')
      });
      hidevg = HideClass.component({
        xkey: 'HideVG',
        $collapse_el: $('#vg'),
        $button_el: $('#vgconfig').find('.hiding')
      });
      ip = React.render(NewTextCLASS(function(data) {
        return data != null ? data.IP : void 0;
      })(), $('#ip').get(0));
      hostname = React.render(NewTextCLASS(function(data) {
        return data != null ? data.Hostname : void 0;
      })(), $('#hostname').get(0));
      uptime = React.render(NewTextCLASS(function(data) {
        return data != null ? data.Uptime : void 0;
      })(), $('#uptime').get(0));
      la = React.render(NewTextCLASS(function(data) {
        return data != null ? data.LA : void 0;
      })(), $('#la').get(0));
      iftitle = React.render(NewTextCLASS(function(data) {
        var ref;
        return data != null ? (ref = data.Client) != null ? ref.TabTitleIF : void 0 : void 0;
      })(), $('header a[href="#if"]').get(0));
      dftitle = React.render(NewTextCLASS(function(data) {
        var ref;
        return data != null ? (ref = data.Client) != null ? ref.TabTitleDF : void 0 : void 0;
      })(), $('header a[href="#df"]').get(0));
      psplus = React.render(NewTextCLASS(function(data) {
        var ref;
        return data != null ? (ref = data.Client) != null ? ref.PSplusText : void 0 : void 0;
      })(), $('label.more[href="#psmore"]').get(0));
      psmore = ButtonClass.component({
        Ksig: 'MorePsignal',
        Vsig: true,
        Khide: 'HidePS',
        Kable: 'PSnotExpandable',
        $button_el: $('label.more[href="#psmore"]')
      });
      psless = ButtonClass.component({
        Ksig: 'MorePsignal',
        Vsig: false,
        Khide: 'HidePS',
        Kable: 'PSnotDecreasable',
        $button_el: $('label.less[href="#psless"]')
      });
      hideswap = ButtonClass.component({
        Khide: 'HideRAM',
        Ksend: 'HideSWAP',
        $button_el: $('label[href="#hideswap"]')
      });
      expandif = ButtonClass.component({
        Khide: 'HideIF',
        Ksend: 'ExpandIF',
        Ktext: 'ExpandtextIF',
        Kable: 'ExpandableIF',
        $button_el: $('label[href="#if"]')
      });
      expandcpu = ButtonClass.component({
        Khide: 'HideCPU',
        Ksend: 'ExpandCPU',
        Ktext: 'ExpandtextCPU',
        Kable: 'ExpandableCPU',
        $button_el: $('label[href="#cpu"]')
      });
      expanddf = ButtonClass.component({
        Khide: 'HideDF',
        Ksend: 'ExpandDF',
        Ktext: 'ExpandtextDF',
        Kalbe: 'ExpandableDF',
        $button_el: $('label[href="#df"]')
      });
      tabsif = TabsClass.component({
        Khide: 'HideIF',
        Ksend: 'TabIF',
        $collapse_el: $('.if-tab'),
        $button_el: $('.if-switch'),
        $hidebutton_el: $('#ifconfig').find('.hiding')
      });
      tabsdf = TabsClass.component({
        Khide: 'HideDF',
        Ksend: 'TabDF',
        $collapse_el: $('.df-tab'),
        $button_el: $('.df-switch'),
        $hidebutton_el: $('#dfconfig').find('.hiding')
      });
      refresh_mem = RefreshInputClass.component({
        K: 'RefreshMEM',
        Kerror: 'RefreshErrorMEM',
        Ksig: 'RefreshSignalMEM',
        sel: $('#memconfig')
      });
      refresh_if = RefreshInputClass.component({
        K: 'RefreshIF',
        Kerror: 'RefreshErrorIF',
        Ksig: 'RefreshSignalIF',
        sel: $('#ifconfig')
      });
      refresh_cpu = RefreshInputClass.component({
        K: 'RefreshCPU',
        Kerror: 'RefreshErrorCPU',
        Ksig: 'RefreshSignalCPU',
        sel: $('#cpuconfig')
      });
      refresh_df = RefreshInputClass.component({
        K: 'RefreshDF',
        Kerror: 'RefreshErrorDF',
        Ksig: 'RefreshSignalDF',
        sel: $('#dfconfig')
      });
      refresh_ps = RefreshInputClass.component({
        K: 'RefreshPS',
        Kerror: 'RefreshErrorPS',
        Ksig: 'RefreshSignalPS',
        sel: $('#psconfig')
      });
      refresh_vg = RefreshInputClass.component({
        K: 'RefreshVG',
        Kerror: 'RefreshErrorVG',
        Ksig: 'RefreshSignalVG',
        sel: $('#vgconfig')
      });
      memtable = React.render(MEMtableCLASS(), document.getElementById('mem' + '-' + 'table'));
      pstable = React.render(PStableCLASS(), document.getElementById('ps' + '-' + 'table'));
      dfbytes = React.render(DFbytesCLASS(), document.getElementById('dfbytes' + '-' + 'table'));
      dfinodes = React.render(DFinodesCLASS(), document.getElementById('dfinodes' + '-' + 'table'));
      cputable = React.render(CPUtableCLASS(), document.getElementById('cpu' + '-' + 'table'));
      ifbytes = React.render(IFbytesCLASS(), document.getElementById('ifbytes' + '-' + 'table'));
      iferrors = React.render(IFerrorsCLASS(), document.getElementById('iferrors' + '-' + 'table'));
      ifpackets = React.render(IFpacketsCLASS(), document.getElementById('ifpackets' + '-' + 'table'));
      vgtable = React.render(VGtableCLASS(), document.getElementById('vg' + '-' + 'table'));
      onmessage = function(event) {
        var data, ref;
        data = JSON.parse(event.data);
        if (data == null) {
          return;
        }
        if (((ref = data.Client) != null ? ref.DebugError : void 0) != null) {
          console.log('DEBUG ERROR', data.Client.DebugError);
        }
        if ((data.Reload != null) && data.Reload) {
          window.setTimeout((function() {
            return location.reload(true);
          }), 5000);
          window.setTimeout(websocket.close, 2000);
          console.log('in 5s: location.reload(true)');
          console.log('in 2s: websocket.close()');
          return;
        }
        setState(pstable, {
          PStable: data.PStable,
          PSlinks: data.PSlinks
        });
        setState(dfbytes, {
          DFbytes: data.DFbytes,
          DFlinks: data.DFlinks
        });
        setState(dfinodes, {
          DFinodes: data.DFinodes,
          DFlinks: data.DFlinks
        });
        setState(hideconfigmem, hideconfigmem.reduce(data));
        setState(hideconfigif, hideconfigif.reduce(data));
        setState(hideconfigcpu, hideconfigcpu.reduce(data));
        setState(hideconfigdf, hideconfigdf.reduce(data));
        setState(hideconfigps, hideconfigps.reduce(data));
        setState(hideconfigvg, hideconfigvg.reduce(data));
        setState(hideram, hideram.reduce(data));
        setState(hidecpu, hidecpu.reduce(data));
        setState(hideps, hideps.reduce(data));
        setState(hidevg, hidevg.reduce(data));
        setState(ip, ip.newstate(data));
        setState(hostname, hostname.newstate(data));
        setState(uptime, uptime.newstate(data));
        setState(la, la.newstate(data));
        setState(iftitle, iftitle.newstate(data));
        setState(dftitle, dftitle.newstate(data));
        setState(psplus, psplus.newstate(data));
        setState(psmore, psmore.reduce(data));
        setState(psless, psless.reduce(data));
        setState(hideswap, hideswap.reduce(data));
        setState(expandif, expandif.reduce(data));
        setState(expandcpu, expandcpu.reduce(data));
        setState(expanddf, expanddf.reduce(data));
        setState(tabsif, tabsif.reduce(data));
        setState(tabsdf, tabsdf.reduce(data));
        setState(refresh_mem, refresh_mem.reduce(data));
        setState(refresh_if, refresh_if.reduce(data));
        setState(refresh_cpu, refresh_cpu.reduce(data));
        setState(refresh_df, refresh_df.reduce(data));
        setState(refresh_ps, refresh_ps.reduce(data));
        setState(refresh_vg, refresh_vg.reduce(data));
        setState(memtable, data.MEM);
        setState(cputable, data.CPU);
        setState(ifbytes, data.IFbytes);
        setState(iferrors, data.IFerrors);
        setState(ifpackets, data.IFpackets);
        setState(vgtable, {
          VagrantMachines: data.VagrantMachines,
          VagrantError: data.VagrantError,
          VagrantErrord: data.VagrantErrord
        });
        if (data.Client != null) {
          console.log(JSON.stringify(data.Client), 'recvClient');
        }
        $('span .tooltipable').popover({
          trigger: 'hover focus'
        });
        $('span .tooltipabledots').popover();
      };
      this.updates = newwebsocket(onmessage);
    };
  });

  this.ready = require(['jquery', 'bootstrap', 'headroom'], function($) {
    (new window.Headroom(document.querySelector('nav'), {
      offset: 20
    })).init();
    $('.collapse').collapse({
      toggle: false
    });
    $('span .tooltipable').popover({
      trigger: 'hover focus'
    });
    $('span .tooltipabledots').popover();
    $('[data-toggle="popover"]').popover();
    $('#la').popover({
      trigger: 'hover focus',
      placement: 'right',
      html: true,
      content: function() {
        return $('#uptime-parent').html();
      }
    });
    $('body').on('click', function(e) {
      $('span .tooltipabledots').each(function() {
        if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
          $(this).popover('hide');
        }
      });
    });
    window.update();
  });

  require(['domReady'], function(domReady) {
    return domReady(function() {
      return ready();
    });
  });

}).call(this);
