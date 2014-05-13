// requires underscore.js
// requires backbone.js
// requires jquery.js

var stateClass = React.createClass({
    getInitialState: function() { return {V: this.props.initialValue}; },
    render: function() {
	return (
            React.DOM.span(null, this.state.V, this.props.append)
	);
    }
});
function xlabel_colorPercent(p) {
    return "label label-"+ _xcolorPercent(p);
}
function _xcolorPercent(p) {
    if (p > 90) { return "danger";  }
    if (p > 80) { return "warning"; }
    if (p > 20) { return "info";    }
    return "success";
}
var percentClass = React.createClass({
    getInitialState: function() { return {V: this.props.initialValue}; },
    render: function() {
	return (
            React.DOM.span({className:xlabel_colorPercent(this.state.V)}, this.state.V, '%')
	);
    }
});

function newState(ID) {
    var node = document.getElementById(ID);
    n = new stateClass({
	elementID:    node,
	initialValue: node.innerHTML
    });
    return React.renderComponent(n, n.props.elementID);
    return n;
}
function newPercent(ID) {
    var node = document.getElementById(ID);
    n = new percentClass({
	elementID:    node,
        initialValue: ''
    });
    // React.renderComponent(n, n.props.elementID);
    return n;
}

function default_button(btn) {
    btn.addClass('btn-default');
    btn.removeClass('btn-primary');
}
function primary_button(btn) {
    btn.addClass('btn-primary');
    btn.removeClass('btn-default');
}

function Updatables(initial) {
    var models = [];
    function make(modelClass, opt, viewClass, elopt) {
        var el;
        if (elopt !== undefined) {
            el  =  elopt.el_added;
            delete elopt.el_added;
            _.extend(opt, elopt); // !

            if (el === undefined) {
                el = $();
            }
            _.map(elopt, function(a) { // add the values
                el = el.add(a);
            });
        }
        opt = _.extend(opt, modelClass.modelAttributes(initial)); // !
        var model = new modelClass(opt);
	models.push(model);

        if (viewClass !== undefined) {
            new viewClass({el: el, model: model});
        }
	return model;
    }
    function set(data) {
	for (var i = 0; i < models.length; i++) {
            var ma = models[i].modelAttributes(data);
            for (var k in ma) {
                if (ma[k] === null) {
                    delete ma[k];
                }
            }
            models[i].set(ma);
	}
    }
    return {
	make: make,
	set:  set
    };
}
Updatables.declareModel = function(opt) {
    if (typeof opt == 'function') {
        opt = opt();
    }
    var modelClass = Backbone.Model.extend(opt);
    modelClass.modelAttributes = opt.modelAttributes;
    return modelClass;
};

function newwebsocket(onmessage) {
    var conn, connected = false;
    function sendJSON(obj) {
	if (conn && ~[2,3].indexOf(conn.readyState)) {
            connected = false;
            init();
	}
	if (!connected) {
            console.log('Cannot send this (re-connection failed):', obj);
            return;
	}
	conn.send(JSON.stringify(obj));
    }
    function sendState(dict) {
	console.log(JSON.stringify(dict), 'sendState');
	return sendJSON({State: dict});
    }
    function sendSearch(search) {
	return sendJSON({Search: search});
    }

    function init() {
	var hostport;
	// hostport = HTTP_HOST; // global value from page context
	hostport = window.location.hostname + (location.port ? ':' + location.port : '');
	conn = new WebSocket('ws://' + hostport + '/ws'); // assert window["WebSocket"]

	conn.onopen = function() {
            connected = true;
            sendSearch(location.search);
            $(window).bind('popstate', function() {
                sendSearch(location.search);
            });
	};

	var again = function(_e) {
            $("a.state").unbind('click');
            window.setTimeout(init, 5000);
	};
	conn.onclose = again;
	conn.onerror = again;
	conn.onmessage = onmessage;

        $("a.state").click(function() {
            history.pushState({path: this.path}, '', this.href);
            sendSearch(this.search);
            return false;
	});
    }
    init();

    return {
        sendState: sendState,
        sendSearch: sendSearch
    };
}

var websocket; // a global
function update(currentState, updatables, inlines) {
    var params = location.search.substr(1).split("&");
    for (var i in params) {
	if (params[i].split("=")[0] === "still") {
            return;
	}
    }

    // all *Class defined in gen/jscript.js
    var   procTable     = React.renderComponent(procTableClass      (null), document.getElementById('ps-table'));
    var disksinBytes    = React.renderComponent(disksinBytesClass   (null), document.getElementById('df-table'));
    var disksinInodes   = React.renderComponent(disksinInodesClass  (null), document.getElementById('dfi-table'));
    var    cpuTable     = React.renderComponent(cpuTableClass       (null), document.getElementById('cpu-table'));
    var    ifsTable     = React.renderComponent(ifsTableClass       (null), document.getElementById('ifs-table'));
    var ifsPacketsTable = React.renderComponent(ifsPacketsTableClass(null), document.getElementById('ifs-packets-table'));
    var ifsErrorsTable  = React.renderComponent(ifsErrorsTableClass (null), document.getElementById('ifs-errors-table'));

    var onmessage = function(event) {
	var data = JSON.parse(event.data);

        var setState = function(obj, data) {
            if (data !== undefined) { // null
                obj.setState(data);
            }
        };

        setState(procTable, data.ProcTable);

	var bytestate = {DisksinBytes: data.DisksinBytes};
	if (data.DiskLinks !== undefined) { bytestate.DiskLinks = data.DiskLinks; }
	setState(disksinBytes, bytestate);

	var inodestate = {DisksinInodes: data.DisksinInodes};
	if (data.DiskLinks !== undefined) { inodestate.DiskLinks = data.DiskLinks; }
	setState(disksinInodes, inodestate);

        setState(cpuTable, data.CPU);
        setState(ifsTable, data.InterfacesBytes);
	setState(ifsErrorsTable,  data.InterfacesErrors);
	setState(ifsPacketsTable, data.InterfacesPackets);

	inlines.About.Hostname  .setState({V: data.About.HostnameHTML }); // TODO there could be real html
	inlines.About.IP        .setState({V: data.About.IP        });
	inlines.System.Uptime   .setState({V: data.System.Uptime   });
	inlines.System.LA       .setState({V: data.System.LA       });

	inlines.RAM.Free        .setState({V: data.RAM.Free        });
	inlines.RAM.Used        .setState({V: data.RAM.Used        });
	inlines.RAM.Total       .setState({V: data.RAM.Total       });

	var x = React.renderComponent(inlines.RAM.UsePercent, inlines.RAM.UsePercent.props.elementID);
	x.setState({V: data.RAM.UsePercent  });

	inlines.Swap.Free       .setState({V: data.Swap.Free       });
	inlines.Swap.Used       .setState({V: data.Swap.Used       });
	inlines.Swap.Total      .setState({V: data.Swap.Total      });

        var y = React.renderComponent(inlines.Swap.UsePercent, inlines.Swap.UsePercent.props.elementID);
	y.setState({V: data.Swap.UsePercent });

        currentState = _.extend(currentState, data.ClientState);
        data.ClientState = currentState;
        updatables.set(data);

        $('span .tooltipable').tooltip(); // update the tooltips
    };
    websocket = newwebsocket(onmessage);
}

var HeaderView = Backbone.View.extend({
    events: { 'click': 'header_click' },
    initialize: function() {
	this.listenTo(this.model, 'change:Hide', this.redisplay_panel);
        this.init_target();
    },
    init_target: function() {
	_.map(this.model.attributes.target, function(t) {
            $(t).collapse({toggle: false}); // init collapsable objects
	}, this);
    },
    redisplay_panel: function() {
	_.map(this.model.attributes.target, function(t) {
            $(t).collapse(this.model.hidden() ? 'hide' : 'show');
	}, this);
    },
    toggleHidden: function() {
	return this.model.toggleHidden(this.model.attributes);
    },
    header_click: function(e) {
	websocket.sendState(this.toggleHidden());
        e.preventDefault();
    }
});

function empty(obj) {
    return obj === undefined || obj === null;
}

var ExpandButtonView = HeaderView.extend({
    events: { 'click': 'expand_click' },
    initialize_fromswitch: function() {
	this.listenTo(this.model, 'change:More',       this.redisplay_more);
	this.listenTo(this.model, 'change:Expandable', this.redisplay_expandable);
    },
    initialize: function() {
        this.initialize_fromswitch();
	this.listenTo(this.model, 'change:Expand',     this.change_expand);
        HeaderView.prototype.initialize.call(this); // does this.init_target();
    },
    change_expand: function() {
        this.redisplay_panel();
        this.redisplay_expand();
    },
    redisplay_more: function() {
        var $expand_el = this.model.attributes.expand_el;
        $expand_el.text(this.model.attributes.More);
    },
    redisplay_expand: function() {
        var $expand_el = this.model.attributes.expand_el;
        if (this.model.expanded()) {
            primary_button($expand_el);
        } else {
            default_button($expand_el);
        }
    },
    redisplay_expandable: function() {
        var $expand_el = this.model.attributes.expand_el;
        var expandable = this.model.attributes.Expandable;
        if (empty(expandable)) {
            $expand_el.addClass('disabled');
        } else {
            $expand_el.removeClass('disabled');
        }
    },
    expand_click: function(e) {
	var clicked = $(e.target);
        if (clicked.is(this.model.attributes.header_el)) { // header clicked
            this.header_click(e);
            return;
        }

	var newState = this.toggleExpandedState();
	if (this.model.hidden()) { // if the panel was hidden by the header link
            newState = _.extend(newState, this.toggleHidden());
	}
	websocket.sendState(newState);
    },
    toggleExpandedState: function() {
        var te = this.model.toggleExpanded; //this.toggleExpanded !== undefined ? this.toggleExpanded : this.model.toggleExpanded;
	return te(this.model.attributes);
    }
});

var SwitchView = HeaderView.extend(ExpandButtonView.prototype).extend({
    events: { 'click': 'switch_click' },
    initialize: function() {
        // HeaderView.prototype.initialize.call(this); // DO NOT HeaderView.initialize
	this.listenTo(this.model, 'change:Hide',       this.change_switch); // <- as in HeaderView.initialize
	this.listenTo(this.model, 'change:Expand',     this.change_switch); // <- as in ExpandButton.initialize
	this.listenTo(this.model, 'change:CurrentTab', this.change_switch);
        ExpandButtonView.prototype.initialize_fromswitch.call(this);
        this.init_target();
    },
    redisplay_tabs: function() {
	var target = this.model.attributes.target;
        var tabid  = this.model.tabid();
        var nots = _.map(target.not('[data-tabid="'+ tabid +'"]'),
                         function(el) {
                             var $el = $(el);
                             $el.collapse('hide');
                             return el;
                         });
        var el = target.not(nots);
        $(el).collapse('show');
    },
    redisplay_buttons: function() {
        var tabid = this.model.tabid();
        // _.map(this.$el, function(el) {
        _.map(this.model.attributes.switch_el, function(el) {
            var $el = $(el);

            if (!$el.hasClass('nondefault')) {
                return;
            }
            var tabid_attr = +$el.attr('data-tabid'); // an int
            if (tabid_attr === tabid) {
                primary_button($el);
            } else {
                default_button($el);
            }
        }, this);
    },
    change_switch: function() {
        if (this.model.hidden()) {
            this.redisplay_panel();
        }
        this.redisplay_tabs();
        this.redisplay_buttons();
        this.redisplay_expand(this.model.attributes.expand_el);
    },
    switch_click: function(e) {
	var clicked = $(e.target);
        if (clicked.is(this.model.attributes.header_el)) { // header clicked
            this.header_click(e);
            return;
        } else if (clicked.is(this.model.attributes.expand_el)) {
            this.expand_click(e);
            return;
        }

        var newtab_id = +$( clicked.attr('href') ).attr('data-tabid'); // THIS. +string makes an int
        var newState = this.model.setTabState(newtab_id);

	if (this.model.hidden()) { // if the panel was hidden by the header link
            newState = _.extend(newState, this.toggleHidden());
	}
	websocket.sendState(newState);
    }
});

function SwitchModel(self) {
    var easy = {};
    easy.hidden   = function() { return this.attributes.Hide;       }; // return this.attributes[self.Attribute_Hide];
    easy.expanded = function() { return this.attributes.Expand;     }; // return this.attributes[self.Attribute_Expand];
    easy.tabid    = function() { return this.attributes.CurrentTab; }; // return this.attributes[self.Attribute_CurrentTab];

    self = _.extend(self, easy);
    self.modelAttributes = function(data) {
        return {
            Hide:       data.ClientState[self.Attribute_Hide],
            Expand:     data.ClientState[self.Attribute_Expand],
            CurrentTab: data.ClientState[self.Attribute_CurrentTab],
            Expandable: data[self.Attribute_Data].Expandable, // immutable
            More:       data[self.Attribute_Data].More        // immutable
        };
    };

    self.toggleHidden   = function(s) { return _.object([self.Attribute_Hide],   [!s.Hide]);   }; //, [!s[self.Attribute_Hide]]
    self.toggleExpanded = function(s) { return _.object([self.Attribute_Expand], [!s.Expand]); }; //, [!s[self.Attribute_Expand]]
    self.setTabState    = function(n) { return _.object([self.Attribute_CurrentTab], [n]); };

    return Updatables.declareModel(self);
}

var DisksSwitchModel = SwitchModel({
    Attribute_CurrentTab: 'CurrentDisksTab',
    Attribute_Expand:     'ExpandDisks',
    Attribute_Hide:       'HideDisks',
    Attribute_Data:       'Disks'
});

var NetworkSwitchModel = SwitchModel({
    Attribute_CurrentTab: 'CurrentNetworkTab',
    Attribute_Expand:     'ExpandNetwork',
    Attribute_Hide:       'HideNetwork',
    Attribute_Data:       'Network'
});

var ExpandCPUModel = Updatables.declareModel(function() {
    var self = {};
    self.hidden   = function() { return this.attributes.Hide;   }; // return this.attributes[self.Attribute_Hide];
    self.expanded = function() { return this.attributes.Expand; }; // return this.attributes[self.Attribute_Expand];

    self = _.extend(self, {
        Attribute_Expand: 'ExpandCPU',
        Attribute_Hide:   'HideCPU'
    });
    self.modelAttributes = function(data) {
        var r = {
            Hide:       data.ClientState[self.Attribute_Hide],
            Expand:     data.ClientState[self.Attribute_Expand]
        };
        if (!empty(data.CPU)) {
            r = _.extend(r, {
                Expandable: data.CPU.Expandable, // immutable
                More:       data.CPU.More        // immutable
            });
        }
        return r;
    };

    self.toggleHidden   = function(s) { return _.object([self.Attribute_Hide],   [!s.Hide]);   }; //, [!s[self.Attribute_Hide]]
    self.toggleExpanded = function(s) { return _.object([self.Attribute_Expand], [!s.Expand]); }; //, [!s[self.Attribute_Expand]]

    return self;
});

var ProcessesModel = Updatables.declareModel(function() {
    var self = {};
    self.hidden = function() { return this.attributes.Hide; };

    self = _.extend(self, {
        Attribute_Hide: 'HideProcesses'
    });
    self.modelAttributes = function(data) {
        var r = {
            Hide: data.ClientState[self.Attribute_Hide]
        };
        if (!empty(data.ProcTable)) {
            r = _.extend(r, {
                NotExpandable: data.ProcTable.NotExpandable,
                MoreText:      data.ProcTable.MoreText
            });
        }
        return r;
    };

    self.toggleHidden = function(s) { return _.object([self.Attribute_Hide], [!s.Hide]); }; //, [!s[self.Attribute_Hide]]

    self.more         = function()  { return {MoreProcessesSignal: true}; };
    self.less         = function()  { return {MoreProcessesSignal: false}; };
    return self;
});

var ProcessesView = HeaderView.extend({
    events: { 'click': 'proc_click' },
    initialize: function() {
        HeaderView.prototype.initialize.call(this);
	this.listenTo(this.model, 'change:MoreText',      this.change_moretext);
	this.listenTo(this.model, 'change:NotExpandable', this.change_notexpandable);
    },
    change_notexpandable: function() {
        var $more_el = this.model.attributes.more_el;
        if (this.model.attributes.NotExpandable) {
            $more_el.addClass('disabled');
        } else {
            $more_el.removeClass('disabled');
        }
    },
    change_moretext: function() {
        var $more_el = this.model.attributes.more_el;
        $more_el.text(this.model.attributes.MoreText);
    },
    proc_click: function(e) {
	var clicked = $(e.target);
        if (clicked.is(this.model.attributes.header_el)) { // header clicked
            this.header_click(e);
            return;
        }
        do {
            var func;
            if (clicked.is(this.model.attributes.more_el)) { // more clicked
                func = 'more';
            } else if (clicked.is(this.model.attributes.less_el)) { // less clicked
                func = 'less';
            } else {
                break;
            }
            var newState = this.model[func]();
            if (this.model.hidden()) { // if the panel was hidden by the header link
                newState = _.extend(newState, this.toggleHidden());
            }
            websocket.sendState(newState);
        } while (0);
        e.stopPropagation(); // otherwise input checkbox gets checked/unchecked
        e.preventDefault();
    }
});

function ready() {
    var updatables = Updatables(Data);

    new HeaderView({ // MEMORY
	el: $('header a[href="#memory"]'),
	model: updatables.make(Updatables.declareModel(function () {
            var self = {};
            self.hidden = function() { return this.attributes.Hide; };

            self = _.extend(self, {
                Attribute_Hide: 'HideMemory'
            });
            self.modelAttributes = function(data) {
                return {
                    Hide: data.ClientState[self.Attribute_Hide]
                };
            };

            self.toggleHidden = function(s) { return _.object([self.Attribute_Hide], [!s.Hide]); }; //, [!s[self.Attribute_Hide]]
            return self;
        }), {target: $('#memory')})
    });

    updatables.make( // NETWORK
        NetworkSwitchModel, {target: $('.network-tab')}, SwitchView, {
            switch_el: $('label.network-switch'), // el_added:
            header_el: $('header  a[href="#network"]'),
            expand_el: $('label.all[href="#network"]')
        });

    updatables.make( // CPU
        ExpandCPUModel, {target: $('#cpu')}, ExpandButtonView, {
            header_el: $('header  a[href="#cpu"]'),
            expand_el: $('label.all[href="#cpu"]')
        });

    updatables.make( // DISKS
        DisksSwitchModel, {target: $('.disk-tab')}, SwitchView, {
            switch_el: $('label.disk-switch'), // el_added:
            header_el: $('header  a[href="#disks"]'),
            expand_el: $('label.all[href="#disks"]')
        });

    updatables.make( // PROCESSES
        ProcessesModel, {target: $('#processes')}, ProcessesView, {
            header_el: $('header a[href="#processes"]'),
            more_el: $('label.more[href="#psmore"]'),
            less_el: $('label.less[href="#psless"]')
        });

    /* $('label.all').tooltip({
	container: 'body',
	placement: 'left',
	trigger: 'click'
    });
    $('label.all').tooltip('show');
    $(window).resize(function() {
	$('label.all').tooltip('show');
    });
    $('.tooltip .tooltip-arrow').addClass('ii-tooltip-arrow');
    $('.tooltip .tooltip-inner').addClass('ii-tooltip-inner'); // */

    $('span .tooltipable').tooltip();

    update(Data.ClientState, updatables, {
	About: { Hostname:   newState('Data.About.Hostname'),
                 IP:         newState('Data.About.IP')
               },
	System: { Uptime:    newState('Data.System.Uptime'),
                  LA:        newState('Data.System.LA')
		},
	RAM: { Free:         newState('Data.RAM.Free'),
               Used:         newState('Data.RAM.Used'),
               UsePercent:   newPercent('Data.RAM.UsePercent'),
               Total:        newState('Data.RAM.Total')
             },
	Swap: { Free:        newState('Data.Swap.Free'),
                Used:        newState('Data.Swap.Used'),
                UsePercent:  newPercent('Data.Swap.UsePercent'),
                Total:       newState('Data.Swap.Total')
              }
    });
}

// Local Variables:
// indent-tabs-mode: nil
// End:
