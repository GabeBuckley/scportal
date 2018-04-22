// TO DO LIST
/**
ToDo
---------------------------------
Dev:
    Put the rest of the ids into the ids table
    Put the rest of the strings into the strings table
    Use strReplace function for string operations
    Bresk up JS file into modules
    
    SDL:
        Diagram:
            Add drag to resize zones
            Add update / delete functionality to zones
 
        
    Vuln Portal:
        Build Data Tables
        

 
    Admin:
         Create UI data model
        Set up build pipelin


Done
---------------------------------
Dev:
Fixed bug in vulnerability portal - multiple copies of quickstats panels
 Dependency injection using page.oninitialise
 Added zones to diagram
 
 Admin:
    Create status page in confluence
 
*/

var asg = {};

asg.conf = {

    ids: {
        // Main App Components
        app: 'asg_app_container',
        ldr_text: 'asg_loading_what',
        breadcrumbs: 'asg_site_breadcrumbs',

        //Diagram Components
        dia_prop_box: 'properties_form',
        dia_prop_btns: 'properties_buttons',

        // Diagram data fields
        dia_shape_name: 'asg_shape_name',
        dia_shape_label_display: 'asg_shape_label_display',
        dia_shape_id_display: 'asg_shape_id_display',
        dia_shape_type_image: 'asg_shape_type_image',
        dia_shape_from: 'asg_shape_from',
        dia_shape_to: 'asg_shape_to',
        dia_shape_transport: 'asg_shape_transport',

        // Vulnerability & Patching Dashboard Regions
        vdash: 'asg-vuln-dashboard',
        vdash_qs: 'asg_vdash_quickstats',
        vdash_chart: 'asg_vdash_chart',
    }

};

asg.app = {
    fn: {
        applyHashChangeEventListener: function () {
            var handleHashChange = function (evt) {

                var strFrom = asg.util.parseHashFromURL(evt.oldURL);
                var strTo = asg.util.parseHashFromURL(evt.newURL);

                var toPage = asg.app.fn.getPageByRoute(strTo);
                if (toPage != null) {
                    asg.app.fn.showPage(toPage.id);
                } else {
                    window.location = evt.oldURL;
                }
            }
            window.onhashchange = handleHashChange;
        },

        getBreadCrumbs: function (strPageID) {
            var thisPage = asg.app.fn.getPageById(strPageID);
            var strU = thisPage.route;

            var arrU = strU.split('/');

            var count = 1;
            var strCrumb = "";
            var currPage = null;

            var arrCrumbs = [];

            while (strCrumb.length < strU.length) {
                var arrCrumb = arrU.slice(0, count);
                strCrumb = (arrCrumb.length == 1 ? "/" : "");
                strCrumb = strCrumb + arrCrumb.join("/");

                currPage = asg.app.fn.getPageByRoute(strCrumb);
                arrCrumbs.push(currPage);
                count++;
            }
            return arrCrumbs;
        },

        getDefaultPage: function (strPageID) {
            var arrPages = asg.app.structure.pages;
            for (var i = 0; i < arrPages.length; i++) {
                var currPage = arrPages[i];
                if (currPage.default) {
                    return currPage;
                }
            }
            return null;
        },

        getHomePage: function () {
            return asg.app.fn.getPageById("page_home");
        },

        getPageById: function (strPageID) {
            var arrPages = asg.app.structure.pages;
            strPageID = strPageID.toUpperCase();
            for (var i = 0; i < arrPages.length; i++) {
                var currPage = arrPages[i];
                if (currPage.id.toUpperCase() == strPageID) {
                    return currPage;
                }
            }
            return null;
        },

        getPageByRoute: function (strRoute) {
            var arrPages = asg.app.structure.pages;
            strRoute = strRoute.toLowerCase();
            for (var i = 0; i < arrPages.length; i++) {
                var currPage = arrPages[i];
                if (currPage.route.toLowerCase() == strRoute) {
                    return currPage;
                }
            }
            return null;
        },

        hidePage: function (strPageID) {
            var currPage = asg.app.fn.getPageById(strPageID);
            var hideEvent = {
                type: "page_hide"
            };
            var unloaded = currPage.onhide(hideEvent, currPage);
            if (unloaded != true) {
                // There was an issue unloading - keep the page open
                return unloaded;
            } else {
                // Sorted, hide the ui
                currPage.visible = false;
                currPage.ui.style.display = 'block';
                $(currPage.ui).toggle('fade');
                return true;
            }
        },

        hideOtherPages: function (strPageID) {
            var arrPages = asg.app.structure.pages;
            for (var i = 0; i < arrPages.length; i++) {
                var currPage = arrPages[i];
                if (currPage.visible && currPage.id != strPageID) {
                    var hidden = asg.app.fn.hidePage(currPage.id);
                    if (hidden != true) {
                        break;
                    }
                }
            }
        },

        hidePages: function () {
            var arrPages = asg.app.structure.pages;
            for (var i = 0; i < arrPages.length; i++) {
                var currPage = arrPages[i];
                if (currPage.visible) {
                    var hidden = asg.app.fn.hidePage(currPage.id);
                    if (hidden != true) {
                        break;
                    }
                }
            }
        },

        initialise: function () {

            asg.app.fn.applyHashChangeEventListener();
            asg.app.fn.load();

            var display = function () {
                if (asg.app.model.ready()) {
                    asg.app.fn.showFirstPage();
                } else {
                    window.setTimeout(display, 200);
                }
            }

            display();

        },

        load: function () {
            asg.app.fn.updateLoadingScreen("Pages Collection");
            asg.app.fn.loadPages();
        },

        loadPages: function () {
            var pagesContainer = document.getElementById(asg.conf.ids.app);
            asg.app.structure.container.ui = pagesContainer;
            var arrPages = asg.app.structure.pages;
            for (var i = 0; i < arrPages.length; i++) {
                var currPage = arrPages[i];
                var elPage = document.getElementById(currPage.id);
                if (elPage != null) {
                    currPage.ui = elPage;
                    if (currPage.visible != true) {
                        currPage.visible = false;
                    }
                    var initEvent = {
                        type: "page_load"
                    };
                    currPage.oninitialise(initEvent, currPage);
                }

            }
        },

        module: {
            get: function (strModuleName) {
                if (asg.app.fn.module.isModule(strModuleName)) {
                    for (var i = 0; i < asg.app.model.modules.length; i++) {
                        if (strModuleName.toLowerCase() == asg.app.model.modules[i].id.toLowerCase()) {
                            return asg.app.model.modules[i];
                            break;
                        }
                    }
                }
                return null;
            },
            isLoaded: function (strModuleName) {
                for (var i = 0; i < asg.app.model.modules.length; i++) {
                    if (strModuleName.toLowerCase() == asg.app.model.modules[i].id.toLowerCase()) {
                        return asg.app.model.modules[i].loaded;
                        break;
                    }
                }
                return false;
            },
            isModule: function (strModuleName) {
                for (var i = 0; i < asg.app.model.modules.length; i++) {
                    if (strModuleName.toLowerCase() == asg.app.model.modules[i].id.toLowerCase()) {
                        return true;
                        break;
                    }
                }
                return false;
            },
            isRequested: function (strModuleName) {
                for (var i = 0; i < asg.app.model.modules.length; i++) {
                    if (strModuleName.toLowerCase() == asg.app.model.modules[i].id.toLowerCase()) {
                        return asg.app.model.modules[i].requested;
                        break;
                    }
                }
                return false;
            },
            setLoaded: function (strModuleName) {
                for (var i = 0; i < asg.app.model.modules.length; i++) {
                    if (strModuleName.toLowerCase() == asg.app.model.modules[i].id.toLowerCase()) {
                        asg.app.model.modules[i].loaded = true;
                        return true;
                        break;
                    }
                }
                return false;
            },
        },

        modules: function (objOptions) {
            if (objOptions == null) {
                // Return the full list
                return asg.app.model.modules;
            } else {
                if (typeof objOptions == "string") {
                    alert("string")
                }
            }
        },

        populateBreadCrumbs: function () {
            var crumbContainer = document.getElementById(asg.conf.ids.breadcrumbs);
            var page = asg.app.structure.currentPage;
            if (page != null) {
                var crumbs = asg.app.fn.getBreadCrumbs(page.id);
                if (crumbs != null && crumbs.length > 0) {
                    var strCrumbHTML = '';
                    var arrCrumbs = [];
                    for (var i = 0; i < crumbs.length; i++) {
                        var currCrumb = crumbs[i];
                        if (currCrumb != null) {
                            if (currCrumb.id == 'page_home') {
                                strCrumbHTML = '<li><a class="breadcrumb-link" href="#!/" title="' + currCrumb.label + '"><i class="Icon-home--secondary Icon--small"></i></a></li>';
                            } else {
                                if (currCrumb.id == page.id) {
                                    strCrumbHTML = '<li><span>' + currCrumb.label + '</span></li>';
                                } else {
                                    strCrumbHTML = '<li><a class="breadcrumb-link" href="#!' + currCrumb.route + '"><span>' + currCrumb.label + '</span></a></li>';
                                }
                            }
                            arrCrumbs.push(strCrumbHTML);
                        }
                    }
                    strCrumbHTML = arrCrumbs.join(' ');
                    if (crumbContainer != null) {
                        crumbContainer.innerHTML = strCrumbHTML;
                    }
                }
            }
        },

        require: function (arrModules) {
            var loaded = false;
            var error = false;

            for (var i = 0; i < arrModules.length; i++) {
                var strModule = arrModules[i];
                if (asg.app.fn.module.isModule(strModule)) {
                    var objModule = asg.app.fn.module.get(strModule);
                    if (!objModule.requested) {
                        objModule.requested = true;

                        var loadError = function (oError) {
                            objModule.error = true;
                        }
                        var notify = function (evt) {
                            objModule.loaded = true;
                        }


                        if (asg.app.fn.module.get(strModule))
                            var strModule = arrModules[i];
                        if (asg.app.fn.module.isModule(strModule)) {
                            var newScript = document.createElement("script");
                            newScript.onerror = loadError;
                            newScript.onload = notify;
                            document.head.appendChild(newScript);

                            newScript.src = "./assets/js/" + strModule + ".js";
                        }
                    }
                }

            }
        },

        showFirstPage: function () {
            // Check for route
            var route = asg.util.getRouteObject();
            if (route.page != null) {
                asg.app.fn.showPage(route.page.id);
                return;
            }

            // Check for default page 
            var page = asg.app.fn.getDefaultPage();
            if (page != null) {
                asg.app.fn.showPage(page.id);
                return;
            }

            // Check for an identified home page: id = 'page_home'
            var page = asg.app.fn.getHomePage();
            if (page != null) {
                asg.app.fn.showPage(page.id);
                return;
            }

            // Out of desperation show the first page in the array
            var arrPages = asg.app.structure.pages;
            if (arrPages.length > 0) {
                var page = arrPages[0];
                asg.app.fn.showPage(page.id);
                return;
            } else {
                // All out of ideas. If there aren't pages to show I can't show a page
                return false;
            }
        },

        showPage: function (strPageID) {
            var currPage = asg.app.fn.getPageById(strPageID);
            if (currPage != null) {
                asg.app.fn.hideOtherPages(strPageID);

                var showEvent = {
                    type: "page_show"
                };

                currPage.visible = true;

                var loaded = currPage.onshow(showEvent, currPage);
                asg.app.structure.currentPage = currPage;
                asg.app.fn.populateBreadCrumbs();

                currPage.ui.style.display = "none";
                $(currPage.ui).toggle('fade');

            }
        },

        updateLoadingScreen: function (strWhat) {
            var objWhat = document.getElementById(asg.conf.ids.ldr_text);
            objWhat.innerHTML = strWhat;
        }
    },

    model: {
        modules: [
            {
                error: false,
                id: "components",
                loaded: false,
                requested: false,

            }
        ],

        ready: function () {
            for (var i = 0; i < asg.app.model.modules.length; i++) {
                var currModule = asg.app.model.modules[i];
                var moduleReady = (!currModule.requested || (currModule.requested && currModule.loaded));
                if (!moduleReady) {
                    return false; // If one ain't ready, they all ain't ready
                }
            }
            return true;
        }

    },

    structure: {
        container: {
            id: asg.conf.ids.app,
            ui: null
        },
        currentPage: null,
        pages: [
            {
                id: "page_home",
                ui: null,
                default: true,
                route: "/",
                label: "Home",
                oninitialise: function (evt, objPage) {
                    //alert(objPage.label);
                },
                onshow: function (evt, objPage) {

                },
                onhide: function (evt, objPage) {
                    return true;
                }
            },
            {
                id: "page_blank",
                ui: null,
                default: false,
                route: "/blank",
                label: "",
                oninitialise: function (evt, objPage) {

                },
                onshow: function (evt, objPage) {

                },
                onhide: function (evt, objPage) {
                    return true;
                }
            },
            {
                id: "page_loading",
                ui: null,
                default: false,
                visible: true,
                route: "/loading",
                label: "Loading",
                oninitialise: function (evt, objPage) {

                },
                onshow: function (evt, objPage) {

                },
                onhide: function (evt, objPage) {
                    return true;
                }
            },
            {
                id: "page_sdl",
                ui: null,
                default: false,
                route: "/sdl",
                label: "Secure Development Lifecycle",
                oninitialise: function (evt, objPage) {

                },
                onshow: function (evt, objPage) {

                },
                onhide: function (evt, objPage) {
                    return true;
                }
            },
            {
                id: "page_sdl_dfd",
                ui: null,
                default: false,
                route: "/sdl/dfd",
                label: "Data Flow Diagram",
                oninitialise: function (evt, objPage) {

                },
                onshow: function (evt, objPage) {
                    window.setTimeout(asg.util.diagram.initialise, 500);
                },
                onhide: function (evt, objPage) {
                    return true;
                }
            }, // END SDL Block 

            /**** Vulnerabilities ****/
            {
                id: "page_vuln",
                ui: null,
                default: false,
                route: "/vuln",
                label: "Vulnerability & Patching Portal",
                oninitialise: function (evt, objPage) {

                },
                onshow: function (evt, objPage) {
                    asg.util.vdash.initialise();
                },
                onhide: function (evt, objPage) {
                    return true;
                }
            },
            /**** Testing - to be removed ****/
            {
                id: "page_test",
                ui: null,
                default: false,
                route: "/test",
                label: "Testing scratchpad",
                oninitialise: function (evt, objPage) {
                    asg.app.fn.require(['components']);
                },
                onshow: function (evt, objPage) {
                    /*  var bob = new asg.h2({
                          target: document.body,
                          label: "Meow Luke!"
                      }); */
                },
                onhide: function (evt, objPage) {
                    return true;
                }
            },
        ],
    }
};

asg.data = {
    lists: {
        diagram: {
            types: [
                {
                    id: "external_system",
                    value: "External System"
                    },
                {
                    id: "data_flow",
                    value: "Data Flow"
                    },

                ],
            ex_sys_subtypes: [
                {
                    id: 'api',
                    value: 'API',
                    icon: 'servers'
                    },
                {
                    id: 'web',
                    value: 'Web Page',
                    icon: 'window'
                    },
                {
                    id: 'database',
                    value: 'Database',
                    icon: 'database'
                    },
                {
                    id: 'file',
                    value: 'File',
                    icon: 'file'
                    },


                ],
            df_transports: [
                {
                    id: "https_jwt",
                    value: "HTTPS with JWT",
                    icon: "key"
                    },
                {
                    id: "https",
                    value: "HTTPS",
                    icon: "key"
                    },
                {
                    id: "lfs",
                    value: "Local FS",
                    icon: "tree"
                    },
                {
                    id: "ssl_sql",
                    value: "SSL-SQL",
                    icon: "db"
                    },
                {
                    id: "ssl_sql",
                    value: "SSL-SQL",
                    icon: "db"
                    },
                {
                    id: "jms ",
                    value: "JMS SOAP/XML",
                    icon: "code"
                    },
                ],
            shapes: [
                {
                    type: "data_flow",
                    details: {
                        source: {
                            id: ""
                        },
                        target: {
                            id: ""
                        },
                        attrs: {
                            '.marker-source': {
                                fill: '#145255',
                                stroke: '#145255',
                                d: 'M 10 0 L 10 10 L 0 10 L 0 0 z'
                            },
                            '.marker-target': {
                                fill: '#145255',
                                stroke: '#145255',
                                d: 'M 10 0 L 0 5 L 10 10 z'
                            }
                        },
                        labels: [
                            {
                                position: 0.5,
                                attrs: {
                                    text: {
                                        text: 'fancy label',
                                        'font-size': 10,
                                        fill: '#145255'
                                    },
                                    rect: {
                                        stroke: '#EDF2F2',
                                        fill: '#EDF2F2',
                                        'stroke-width': 20,
                                        rx: 5,
                                        ry: 5
                                    }
                                }
                                }
                            ]
                    }
                    },

                {
                    type: "external_system",
                    details: {
                        position: {
                            x: 150,
                            y: 80
                        },
                        size: {
                            width: 100,
                            height: 60
                        },
                        attrs: {
                            text: {
                                text: 'My Element'

                            },
                            image: {
                                'xlink:href': '/assets/img/database.png'
                            }
                        }
                    }
                },


                {
                    type: "system",
                    details: {
                        position: {
                            x: 0,
                            y: 0
                        },
                        size: {
                            width: 100,
                            height: 100
                        },
                        attrs: {
                            circle: {
                                fill: '#eeeeee',
                                stroke: '#333333',
                                "stroke-width": 1
                            },
                            text: {
                                text: '',
                                fill: '#000000',
                                'font-size': 10
                            }
                        }
                    }
                },

                {
                    type: "zone",
                    details: {
                        position: {
                            x: 100,
                            y: 100
                        },
                        size: {
                            width: 200,
                            height: 100
                        },
                        attrs: {
                            text: {
                                text: '',
                                fill: '#478081'
                            },
                            rect: {
                                strole: '#478081'
                            }
                        }
                    }
                }
            ]
        },
        site: {
            modals: [
                {
                    id: "addExternalSystem",
                    title: "Add External System",
                    template: "asg.data.templates.html.diagram.dialogs.addExternalSystem"
                    },
                {
                    id: "addDataFlow",
                    title: "Add Data Flow",
                    template: "asg.data.templates.html.diagram.dialogs.addDataFlow"
                    }
                ],
            stringTable: {
                addDFLow: "Add Data Flow",
                addExtSys: "Add External System",

                dFlowName2Shrt: "The data flow name needs to be five or more characters long",
                extSysName2Shrt: "The external system name needs to be five or more characters long",
                sysName2Shrt: "The system name needs to be five or more characters long",
                tooFewSystemsTitle: "Too few systems to link",
                tooFewSystemsText: "A data flow cannot link a system to itself. Try creating a few external systems before adding data flows."
            },
        },

    },

    elements: {
        diagram: {
            graph: null,
            paper: null
        }
    },

    system: {
        name: "Demo System",
        diagram: {
            model: {
                shapes: [
                    {
                        id: 'S0001',
                        type: 'system',
                        label: 'Demo System'
                    },
                    {
                        id: 'Z0001',
                        type: 'zone',
                        label: 'AWS Public'
                    }
                ],
                nextID: function (strType) {
                    var strID = "X0000";
                    var count = 0;
                    var shapes = asg.data.system.diagram.model.shapes;
                    var prefixes = {
                        system: 'P',
                        external_system: 'E',
                        data_flow: 'DF'
                    }

                    for (var i = 0; i < shapes.length; i++) {
                        var currShape = shapes[i];
                        if (currShape.type == strType) {
                            count++;
                        }
                    }
                    if (count == 0) {
                        strID = prefixes[strType] + "0001"
                    }

                    var inUse = true;
                    while (inUse) {
                        count++;
                        strID = "0000" + count;
                        strID = strID.slice((strID.length - 4), strID.length);
                        strID = prefixes[strType] + strID;
                        inUse = false;
                        for (var i = 0; i < shapes.length; i++) {
                            var currShape = shapes[i];
                            if (currShape.id == strID) {
                                inUse = true;
                                break;
                            }
                        }
                    }
                    return strID;
                },
            },
            view: null,
            selectedElement: null,
            resize: {
                isResizing: false,
                direction: '',
                element: null,
                coords: {
                    x: 0,
                    y: 0
                }
            }
        },
        vdash: {
            chartData: {
                labels: ["SQL Injection", "XSS", "Cipher", "Uncontrolled Redirection", "Information Disclosure", "Authentication"],
                datasets: [{
                    label: '# of Issues',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                            'rgba(0,111,102,0.3)',
                            'rgba(121,112,103,0.3)',
                            'rgba(235,100,17,0.3)',
                            'rgba(106,147,27,0.3)',
                            'rgba(235,188,0,0.3)',
                            'rgba(127,183,178,0.3)',
                        ],
                    borderColor: [
                            'rgba(0,111,102,1)',
                            'rgba(121,112,103,1)',
                            'rgba(235,100,17,1)',
                            'rgba(106,147,27,1)',
                            'rgba(235,188,0,1)',
                            'rgba(127,183,178,1)',

                        ],
                    hoverBackgroundColor: [
                            'rgba(0,111,102,0.7)',
                            'rgba(121,112,103,0.7)',
                            'rgba(235,100,17,0.7)',
                            'rgba(106,147,27,0.7)',
                            'rgba(235,188,0,0.7)',
                            'rgba(127,183,178,0.7)',

                        ],
                    hoverBorderColor: [
                            'rgba(0,111,102,1)',
                            'rgba(121,112,103,1)',
                            'rgba(235,100,17,1)',
                            'rgba(106,147,27,1)',
                            'rgba(235,188,0,1)',
                            'rgba(127,183,178,1)',

                        ],
                    borderWidth: 2,
                    hoverBorderWidth: 3,
                    }]
            },


            quickstats: [
                {
                    id: "issues_raised",
                    label: "Issues Raised</br>Last 30 Days",
                    number: 38,
                    delta: 12,
                    deltaDir: 'down',
                    display: {
                        bgcolour: '#fad8c3',
                        fgcolour: '#b04b0d',
                        bdrcolour: '#f5b188',
                    }
                },
                {
                    id: "issues_closed",
                    label: "Issues Closed</br>Last 30 Days",
                    number: 41,
                    delta: 7,
                    deltaDir: 'up',
                    display: {
                        bgcolour: '#bfdbd9',
                        fgcolour: '#00534c',
                        bdrcolour: '#7fb7b2',
                    }
                }
                ,
                {
                    id: "issues_open",
                    label: "Currently Open Issues",
                    number: 106,
                    delta: 0,
                    deltaDir: '',
                    display: {
                        bgcolour: '#d0cac4',
                        fgcolour: '#514a45',
                        bdrcolour: '#b9b0a7',
                    }
                }
            ]
        }
    },

    templates: {
        json: {
            diagram: {
                ex_sys: '{"id":"shape_100","type":"external_system","subtype":"file","name":"External System"}',
                sys: '{"id":"shape_000","type":"system","name":"This System"}',
            }
        },
        html: {
            diagram: {
                dialogs: {
                    addExternalSystem: {
                        content: '<fieldset>' +
                            '<legend>External System Details</legend>' +
                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_subtype">External System Type:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_subtype"></select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_name">External System Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<input type="text" placeholder="Enter system name" id="asg_shape_name" />' +
                            '</div>' +
                            '</div>' +
                            '</fieldset>',
                        buttons: [
                            {
                                class: 'secondary',
                                label: 'Cancel',
                                handler: 'asg.ui.closeDialog'
                                },
                            {
                                class: 'primary',
                                label: 'Add',
                                handler: 'asg.util.diagram.addExternalSystem'
                                }
                            ]
                    },

                    addDataFlow: {
                        content: '<fieldset>' +
                            '<legend>Data Flow Details</legend>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_from">From:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_from"></select>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_to">To:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_to"></select>' +
                            '<i class="fas fa-retweet" title="Swap from and to targets"></i>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_name">Data Flow Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<input type="text" placeholder="Enter data flow name" id="asg_shape_name" />' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_transport">Data Transport Layer:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_transport"></select>' +
                            '</div>' +
                            '</div>' +

                            '</fieldset>',
                        buttons: [
                            {
                                class: 'secondary',
                                label: 'Cancel',
                                handler: 'asg.ui.closeDialog'
                                },
                            {
                                class: 'primary',
                                label: 'Add',
                                handler: 'asg.util.diagram.addDataFlow'
                                }
                            ]
                    }
                },

                panels: {
                    editSystem: {
                        content: '<fieldset>' +
                            '   <legend>Primary System Details</legend>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">System ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +

                            '   <div class="row">' +
                            '      <div class="col-xs-12">' +
                            '          <label for="asg_shape_name">System Name:</label>' +
                            '      </div>' +
                            '      <div class="col-xs-12">' +
                            '          <input type="text" placeholder="Enter system name" id="asg_shape_name" />' +
                            '      </div>' +
                            '   </div>' +
                            '</fieldset>',
                        buttons: [
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetPrimarySystem'
                            },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updatePrimarySystem'
                            }
                        ]
                    },

                    editExternalSystem: {
                        content: '<fieldset>' +
                            '    <legend>External System - <span id="asg_shape_label_display"></span></legend>' +

                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">External System ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-12">' +
                            '            <label for="asg_shape_subtype">External System Type:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-12">' +
                            '            <select id="asg_shape_subtype"></select>' +
                            '            <span id="asg_shape_type_image"></span>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-12">' +
                            '            <label for="asg_shape_name">External System Name:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-12">' +
                            '            <input type="text" placeholder="Enter system name" id="asg_shape_name" />' +
                            '        </div>' +
                            '    </div>' +
                            '</fieldset>',
                        buttons: [
                            {
                                class: 'tertiary',
                                label: 'Delete',
                                handler: 'asg.util.diagram.deleteShape'
                            },
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetExternalSystem'
                            },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updateExternalSystem'
                            }
                        ]
                    },

                    editDataFlow: {
                        content: '<fieldset>' +
                            '<legend>Data Flow Details</legend>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">Data Flow ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +
                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_from">From:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<select id="asg_shape_from"></select>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_to">To:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<select id="asg_shape_to"></select>' +
                            '<i class="fas fa-retweet" title="Swap from and to targets"></i>' +

                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_name">Data Flow Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<input type="text" placeholder="Enter data flow name" id="asg_shape_name" />' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_transport">Data Transport Layer:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<select id="asg_shape_transport"></select>' +
                            '</div>' +
                            '</div>' +

                            '</fieldset>',
                        buttons: [
                            {
                                class: 'tertiary',
                                label: 'Delete',
                                handler: 'asg.util.diagram.deleteShape'
                            },
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetDataFlow'
                                },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updateDataFlow'
                            }
                        ]
                    }
                }
            },

        }
    }
};

asg.ui = {
    attachErrorMsg: function (objEl, strMsg) {
        var msg = document.createElement('div');
        msg.className = "field_error_msg";
        msg.innerHTML = strMsg;
        if (objEl != null) {
            var parEl = objEl.parentElement;
            parEl.appendChild(msg);
            asg.ui.setModalHeight(true);
        }

    },

    closeDialog: function () {
        document.getElementById('modal_body_content').innerHTML = "";
        document.getElementById('modal_button_content').innerHTML = "";
        document.getElementById('modal_header_text').innerHTML = "";
        $('#modal_dialog').hide(400, 'swing', function () {
            asg.ui.hideDialogScreen();
        });
    },

    diagram: {
        addExternalSystem: function () {
            asg.util.diagram.clearPanel();
            var types = asg.data.lists.diagram.ex_sys_subtypes;
            asg.ui.showDialog('addExternalSystem', {
                size: 'medium'
            });
            var typeSelect = document.getElementById('asg_shape_subtype');
            for (var i = 0; i < types.length; i++) {
                var currType = types[i];
                var objOpt = new Option();
                objOpt.value = currType.id;
                objOpt.innerHTML = currType.value;
                typeSelect.appendChild(objOpt);
            }

            var labelField = document.getElementById('asg_shape_name');
            labelField.focus();
        },

        addDataFlow: function () {
            asg.util.diagram.clearPanel();
            var shapes = asg.data.system.diagram.model.shapes;
            if (shapes.length < 2) {
                asg.ui.showMsg('too_few_systems', 'error', asg.s.tooFewSystemsTitle, asg.s.tooFewSystemsText);
                return;
            } else {
                var transports = asg.data.lists.diagram.df_transports;

                asg.ui.showDialog('addDataFlow', {
                    size: 'medium'
                });
                var swapOptions = function () {
                    var fromSelect = document.getElementById('asg_shape_from');
                    var toSelect = document.getElementById('asg_shape_to');
                    var fromIndex = fromSelect.selectedIndex;
                    var toIndex = toSelect.selectedIndex;

                    var fromOpt = fromSelect.options[toIndex];
                    var fromPrev = fromSelect.options[fromIndex];

                    var toOpt = toSelect.options[fromIndex];
                    var toPrev = toSelect.options[toIndex];

                    fromOpt.disabled = false;
                    fromOpt.selected = true;
                    fromPrev.disabled = true

                    toOpt.disabled = false;
                    toOpt.selected = true;
                    toPrev.disabled = true
                };

                var disableToOption = function () {
                    var fromSelect = document.getElementById('asg_shape_from');
                    var toSelect = document.getElementById('asg_shape_to');

                    var fromVal = fromSelect.value;

                    for (var i = 0; i < toSelect.options.length; i++) {
                        var currOpt = toSelect.options[i];
                        if (currOpt.value == fromVal) {
                            currOpt.disabled = true;
                        } else {
                            currOpt.disabled = false;
                        }
                    }
                };

                var disableFromOption = function () {
                    var fromSelect = document.getElementById('asg_shape_from');
                    var toSelect = document.getElementById('asg_shape_to');

                    var toVal = toSelect.value;

                    for (var i = 0; i < fromSelect.options.length; i++) {
                        var currOpt = fromSelect.options[i];
                        if (currOpt.value == toVal) {
                            currOpt.disabled = true;
                        } else {
                            currOpt.disabled = false;
                        }
                    }
                };

                var shapes = asg.data.system.diagram.model.shapes;
                var fromSelect = document.getElementById('asg_shape_from');
                for (var i = 0; i < shapes.length; i++) {
                    var currShape = shapes[i];
                    if (currShape.type != "data_flow") {
                        var objOpt = new Option();
                        objOpt.value = currShape.id;
                        objOpt.innerHTML = currShape.label;
                        fromSelect.appendChild(objOpt);
                    }
                }
                fromSelect.onchange = disableToOption;


                var toSelect = document.getElementById('asg_shape_to');
                for (var i = 0; i < shapes.length; i++) {
                    var currShape = shapes[i];
                    if (currShape.type != "data_flow") {
                        var objOpt = new Option();
                        objOpt.value = currShape.id;
                        objOpt.innerHTML = currShape.label;
                        toSelect.appendChild(objOpt);
                    }
                }
                toSelect.onchange = disableFromOption;


                if (toSelect.options.length >= 2) {
                    toSelect.selectedIndex = 1;
                }


                disableToOption();
                disableFromOption();

                var swapButton = toSelect.nextElementSibling;
                if (swapButton != null) {
                    swapButton.onclick = swapOptions;
                }

                var transSelect = document.getElementById('asg_shape_transport');
                for (var i = 0; i < transports.length; i++) {
                    var currTrans = transports[i];
                    var objOpt = new Option();
                    objOpt.value = currTrans.id;
                    objOpt.innerHTML = currTrans.value;
                    transSelect.appendChild(objOpt);
                }

                var labelField = document.getElementById('asg_shape_name');
                labelField.focus();
            }
        }
    },

    hideDialogScreen: function () {
        $("#dialog_screen").hide();
    },

    setDialogDefaultAction: function () {
        var modal = document.getElementById('modal_dialog');
        var buttonBar = document.getElementById('modal_button_content');
        if (buttonBar.children.length > 0) {
            var button = buttonBar.lastElementChild;
            modal.onkeydown = function (evt) {
                evt = evt || window.event;
                if (evt.keyCode == 13) {
                    // Enter key pressed
                    button.click();
                }
            }
        }
    },

    setModalButtons: function (arrButtons) {
        var buttonBar = document.getElementById('modal_button_content');
        for (var i = 0; i < arrButtons.length; i++) {
            var currButton = arrButtons[i];
            var objButton = document.createElement('button');

            var strClass = 'sg-Btn sg-Btn--' + currButton.class;
            objButton.className = strClass;
            objButton.innerHTML = currButton.label;
            objButton.onclick = eval(currButton.handler);

            buttonBar.appendChild(objButton);
        }
    },

    setModalContent: function (objTemplate, objArgs) {
        var objContainer = document.getElementById('modal_body_content');
        objContainer.innerHTML = objTemplate;
    },

    setModalHeight: function (blVisible) {
        var objContainer = document.getElementById('modal_body_content');
        var buttonBar = document.getElementById('modal_body_footer');
        var objTitle = document.getElementById('modal_body_header');

        var objDialog = document.getElementById('modal_dialog');

        objDialog.style.display = "block";
        //debugger;
        var totalHeight = objContainer.clientHeight +
            buttonBar.clientHeight +
            objTitle.clientHeight;
        if (blVisible != true) {
            objDialog.style.display = "none";
        }
        objDialog.style.height = totalHeight + "px";
    },

    setModalTitle: function (strTitle) {
        var objTitle = document.getElementById('modal_header_text');
        objTitle.innerHTML = strTitle;
    },

    showDialog: function (strDialogId, objArgs) {
        asg.ui.closeDialog();
        var objDialog = asg.util.getDialog(strDialogId);
        if (objDialog != null) {
            asg.ui.setModalTitle(objDialog.title);
            var objDialogContent = eval(objDialog.template)
            var strTemplateHTML = objDialogContent.content;
            asg.ui.setModalContent(strTemplateHTML);

            if (objDialogContent.buttons != null && objDialogContent.buttons.length > 0) {
                asg.ui.setModalButtons(objDialogContent.buttons);
            }
        }

        asg.ui.setDialogDefaultAction();

        var width = 200;
        var height = 200;

        if (objArgs != null) {


            if (objArgs.size != null) {
                switch (objArgs.size) {
                    case "large":
                        {
                            width = 800;
                            height = 600;
                            break;
                        }
                    case "medium":
                        {
                            width = 600;
                            height = 480;
                            break;
                        }
                    case "small":
                        {
                            width = 400;
                            height = 300;
                            break;
                        }
                    default:
                        {
                            if (objArgs.size.width != null) {
                                width = objArgs.size.width;
                            }
                            if (objArgs.size.height != null) {
                                height = objArgs.size.height;
                            }
                            break;
                        }

                }
            }
        }

        var top = Math.round((document.body.clientHeight - height) / 2);
        if (top <= 5) {
            top = 5;
        }

        var left = Math.round((document.body.clientWidth - width) / 2);
        if (left <= 0) {
            left = 0;
        }

        var dialog = document.getElementById('modal_dialog');
        dialog.setAttribute(
            "style",
            "width:" + width + "px;" +
            "heightL auto;" +
            "top:" + top + "px;" +
            "left:" + left + "px;"
        );
        asg.ui.setModalHeight();

        asg.ui.showDialogScreen();

        $('#modal_dialog').show(400, 'swing', function () {
            //
        });
    },

    showDialogScreen: function () {
        $("#dialog_screen").show();
    },

    showMsg: function (strMsgID, strMsgType, strMsgTitle, strMsgText) {
        // strMsgType = ['dark', 'error', 'highlight', 'light', neutral', 'primary', 'secondary' ]
        strClass = 'sg-Box sg-Box--' + strMsgType;
        strID = 'browser_message_' + strMsgID;

        var objMsgDiv = document.createElement('div');
        objMsgDiv.setAttribute('class', strClass);
        objMsgDiv.setAttribute('id', strID);
        objMsgDiv.setAttribute('title', 'Click to close');

        var objMsgWrap = document.createElement('div');
        objMsgWrap.setAttribute('class', 'default rte');

        if (strMsgTitle != null && strMsgTitle.length > 0) {
            var objMsgTitle = document.createElement('h3');
            objMsgTitle.innerHTML = strMsgTitle;
            objMsgWrap.appendChild(objMsgTitle);
        }

        var objMsgBody = document.createElement('p');
        objMsgBody.innerHTML = strMsgText;
        objMsgWrap.appendChild(objMsgBody);


        objMsgDiv.appendChild(objMsgWrap);

        var objMsgContainer = document.getElementById('browser-messages');
        if (objMsgContainer != null) {
            objMsgContainer = objMsgContainer.firstElementChild.firstElementChild.firstElementChild;
            objMsgContainer.appendChild(objMsgDiv);
        }

        $(objMsgContainer).click(function () {
            $(objMsgDiv).hide(400, 'swing', function () {
                objMsgDiv.remove();
            });
        });
    }
};

asg.util = {

    AppError: function (name, message) {
        this.name = name;
        this.message = message;
        var _this = this;
        this.toString = function () {
            return _this.name + ": " + this.message;
        }
    },

    clearSelect: function (objSelect) {
        if (objSelect != null && objSelect.options != null && objSelect.options.length > 0) {
            while (objSelect.options[0]) {
                objSelect.options.remove(0);
            }
        }
    },

    createElement(objOptions) {
        var objEl = null;
        if (objOptions != null && typeof objOptions == "object") {

            if (objOptions.tag != null) {
                objEl = document.createElement(objOptions.tag);
            }

            if (objOptions.attrs != null) {
                for (var attr in objOptions.attrs) {
                    objEl.setAttribute(attr, objOptions.attrs[attr]);
                }
            }

            if (objOptions.innerHTML != null) {
                objEl.innerHTML = objOptions.innerHTML;
            }

            if (objOptions.children != null) {
                for (var i = 0; i < objOptions.children.length; i++) {
                    var currChild = objOptions.children[i];
                    var objChild = asg.util.createElement(currChild);
                    if (objChild != null) {
                        objEl.appendChild(objChild);
                    }
                }
            }
        }
        return objEl;
    },

    createFromFragment: function (strHTMLFragment) {
        var container = document.createElement('div');
        container.innerHTML = strHTMLFragment;
        var objEl = container.firstElementChild;
        return objEl;
    },

    /* SDL Diagram Editor */
    diagram: {

        addDataFlow: function () {
            var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
            var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);
            var transSelect = document.getElementById(asg.conf.ids.dia_shape_transport);
            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

            if (fromSelect != null && toSelect != null && transSelect != null && labelField != null) {
                if (labelField.value.length >= 5) {

                    var strId = asg.data.system.diagram.model.nextID('data_flow');
                    var strLabel = labelField.value;
                    var objTransport = asg.util.diagram.getDataFlowTransport(transSelect.value);
                    var strTransport = objTransport.value;
                    var strTransportIcon = objTransport.icon;

                    var strFrom = fromSelect.value;
                    var strTo = toSelect.value;

                    var shape = {
                        id: strId,
                        type: 'data_flow',
                        label: strLabel,
                        icon: strTransportIcon,
                        transport: strTransport,
                        from: strFrom,
                        to: strTo
                    }

                    asg.data.system.diagram.model.shapes.push(shape);
                    asg.u.diagram.redraw();
                    asg.ui.closeDialog();
                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.extSysName2Shrt);
                }
            }

        },

        addExternalSystem: function () {
            var typeSelect = document.getElementById('asg_shape_subtype');
            var labelField = document.getElementById('asg_shape_name');

            if (typeSelect != null && labelField != null) {
                if (labelField.value.length >= 5) {
                    // All valid input
                    var strId = asg.data.system.diagram.model.nextID('external_system');
                    var strLabel = labelField.value;

                    var objSubtype = asg.util.diagram.getExternalSystemSubtype(typeSelect.value);
                    var strSubType = objSubtype.id;
                    var strSubTypeIcon = objSubtype.icon;

                    var shape = {
                        id: strId,
                        type: 'external_system',
                        subtype: strSubType,
                        label: strLabel,
                        icon: strSubTypeIcon
                    }

                    asg.data.system.diagram.model.shapes.push(shape);
                    asg.u.diagram.redraw();
                    asg.ui.closeDialog();
                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.dFlowName2Shrt);
                }
            }

        },

        addShape: function (objShape) {
            var graph = asg.data.elements.diagram.graph;
            if (graph != null) {
                switch (objShape.type) {
                    case "system":
                        {
                            //debugger;
                            var strLabel = objShape.label;
                            objShape.attrs.text.text = objShape.id + '\n\r' + strLabel;
                            if (objShape.position.x == 0 && objShape.position.y == 0) {
                                var centrePoint = asg.util.diagram.getDiagramCentre();
                                objShape.position.x = centrePoint.x;
                                objShape.position.y = centrePoint.y;
                            }

                            var shape = new joint.shapes.basic.Circle(objShape);
                            graph.addCell(shape);
                            break;
                        }

                    case "external_system":
                        {
                            //debugger;
                            var strLabel = objShape.label;
                            var strIcon = objShape.icon;
                            objShape.attrs.text.text = objShape.id + '\n\r' + strLabel;
                            objShape.attrs.image['xlink:href'] = '/assets/img/' + strIcon + '.png'
                            var shape = new joint.shapes.basic.ExternalSystem(objShape);
                            shape.on('change', function (shape, data) {
                                //debugger;
                                if (shape.changed.position != null) {
                                    var modelShape = asg.util.diagram.getModelShapeById(shape.id);
                                    modelShape.position = shape.changed.position;
                                }
                            });

                            graph.addCell(shape);
                            break;
                        }

                    case "data_flow":
                        {
                            var strLabel = objShape.label;
                            var strIcon = objShape.icon;
                            var strTransport = objShape.transport;
                            var strFrom = objShape.from;
                            var strTo = objShape.to;

                            objShape.source.id = strFrom;
                            objShape.target.id = strTo;
                            objShape.labels[0].attrs.text.text = objShape.id + '\n\r' + strLabel + '\n\r' + strTransport;
                            var link = new joint.dia.Link(objShape);
                            link.on('change', function (shape, data) {
                                //debugger;
                                if (shape.changed.vertices != null) {
                                    var modelShape = asg.util.diagram.getModelShapeById(shape.id);
                                    modelShape.vertices = shape.changed.vertices;
                                }
                            });
                            if (objShape.vertices != null) {
                                link.set('vertices', objShape.vertices);
                            }
                            link.addTo(graph);

                            break;
                        }

                    case "zone":
                        {
                            //debugger;
                            var strLabel = objShape.label;
                            objShape.attrs.text.text = objShape.id + '. ' + strLabel;
                            var shape = new joint.shapes.basic.Zone(objShape);
                            shape.on('change', function (shape, data) {
                                //debugger;
                                if (shape.changed.position != null) {
                                    var modelShape = asg.util.diagram.getModelShapeById(shape.id);
                                    modelShape.position = shape.changed.position;
                                }
                            });

                            graph.addCell(shape);
                            break;
                        }


                    default:
                        {
                            break;
                        }
                }
            }
        },

        clear: function () {
            asg.data.elements.diagram.graph.clear();
            asg.util.diagram.clearPanel();
        },

        clearPanel: function () {
            var panel = document.getElementById('properties_form');
            panel.innerHTML = '';
            var buttonBar = document.getElementById('properties_buttons');
            buttonBar.innerHTML = '';
        },

        deleteShape: function () {
            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {
                var arrEls = [];
                var shapes = asg.data.system.diagram.model.shapes;
                for (var i = 0; i < shapes.length; i++) {
                    var currShape = shapes[i];
                    if (currShape.id != currEl.id) {
                        if (currShape.type == 'data_flow') {
                            if (currShape.to == currEl.id) {
                                currShape.to = '';
                            }
                            if (currShape.from == currEl.id) {
                                currShape.from = '';
                            }
                        }
                        arrEls.push(currShape);
                    }

                }
                asg.data.system.diagram.model.shapes = arrEls;
                asg.data.system.diagram.selectedElement = null;
                asg.util.diagram.redraw();
            }
        },

        deSelectElements: function () {
            var shapes = asg.data.system.diagram.model.shapes;
            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                asg.util.diagram.unselectElement(currShape.id);
            }
            asg.data.system.diagram.selectedElement = null;
        },

        drawShape: function (objShape) {
            if (objShape != null) {
                asg.util.diagram.addShape(objShape);
            }
        },

        editDataFlow: function () {
            var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editDataFlow')
            var panel = document.getElementById('properties_form');
            panel.innerHTML = templateHTML.content;
            var arrButtons = templateHTML.buttons;
            var buttonBar = document.getElementById('properties_buttons');
            buttonBar.innerHTML = '';
            for (var i = 0; i < arrButtons.length; i++) {
                var currButton = arrButtons[i];
                var objButton = document.createElement('button');

                var strClass = 'sg-Btn sg-Btn--' + currButton.class;
                objButton.className = strClass;
                objButton.innerHTML = currButton.label;
                objButton.onclick = eval(currButton.handler);

                buttonBar.appendChild(objButton);
            }

            asg.util.diagram.resetDataFlow();

        },

        editExternalSystem: function () {

            var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editExternalSystem')
            var panel = document.getElementById('properties_form');
            panel.innerHTML = templateHTML.content;
            var arrButtons = templateHTML.buttons;
            var buttonBar = document.getElementById('properties_buttons');
            buttonBar.innerHTML = '';
            for (var i = 0; i < arrButtons.length; i++) {
                var currButton = arrButtons[i];
                var objButton = document.createElement('button');

                var strClass = 'sg-Btn sg-Btn--' + currButton.class;
                objButton.className = strClass;
                objButton.innerHTML = currButton.label;
                objButton.onclick = eval(currButton.handler);

                buttonBar.appendChild(objButton);
            }

            asg.util.diagram.resetExternalSystem();

        },

        editPrimarySystem: function () {

            var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editSystem')
            var panel = document.getElementById(asg.conf.ids.dia_prop_box);
            panel.innerHTML = templateHTML.content;
            var arrButtons = templateHTML.buttons;
            var buttonBar = document.getElementById(asg.conf.ids.dia_prop_btns);
            buttonBar.innerHTML = '';
            for (var i = 0; i < arrButtons.length; i++) {
                var currButton = arrButtons[i];
                var objButton = document.createElement('button');

                var strClass = 'sg-Btn sg-Btn--' + currButton.class;
                objButton.className = strClass;
                objButton.innerHTML = currButton.label;
                objButton.onclick = eval(currButton.handler);

                buttonBar.appendChild(objButton);
            }

            asg.util.diagram.resetPrimarySystem();

        },

        getDataFlowTransport: function (strTransID) {
            var transports = asg.data.lists.diagram.df_transports;
            for (var i = 0; i < transports.length; i++) {
                var currTrans = transports[i];
                if (currTrans.id == strTransID) {
                    return currTrans;
                }
            }
            return null;
        },

        getDiagramCentre: function () {
            var paperDiv = document.getElementById('dfd_container');
            var width = paperDiv.clientWidth;
            var height = paperDiv.clientHeight;
            var xVal = Math.round(width / 2);
            var yVal = Math.round(height / 2);
            return {
                x: xVal,
                y: yVal
            };
        },

        getExternalSystemSubtype: function (strSubTypeId) {
            var types = asg.data.lists.diagram.ex_sys_subtypes;
            for (var i = 0; i < types.length; i++) {
                var currType = types[i];
                if (currType.id == strSubTypeId) {
                    return currType;
                }
            }
            return null;
        },

        getModelShapeById: function (strID) {
            var shapes = asg.data.system.diagram.model.shapes;

            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                if (currShape.id == strID) {
                    return currShape;
                }
            }
            return null;
        },

        getShapeDefaults: function (strShapeType) {
            for (var i = 0; i < asg.data.lists.diagram.shapes.length; i++) {
                var currShape = asg.data.lists.diagram.shapes[i];
                if (currShape.type == strShapeType) {
                    return currShape;
                }
            }
            return null;
        },

        getShapeFromTemplate: function (objTemplateRef) {
            var strShapeText = objTemplateRef;
            if (strShapeText != null && strShapeText.length > 0) {
                var shape = JSON.parse(strShapeText);
                return shape;
            }
            return null;
        },

        initialise: function () {
            asg.data.elements.diagram.graph = new joint.dia.Graph;

            asg.data.elements.diagram.paper = new joint.dia.Paper({
                el: $('#dfd_container'),
                width: '95%',
                height: 600,
                model: asg.data.elements.diagram.graph,
                gridSize: 1,
                interactive: false,
            });

            asg.data.elements.diagram.paper.on('cell:pointerup', function (elementView, evt) {
                var r = asg.data.system.diagram.resize;
                r.coords = {
                    x: 0,
                    y: 0
                };
                r.direction = '';
                r.isResizing = false;
                r.element = null;
                asg.util.diagram.selectElement(elementView);

            });

            var isBorderClicked = function (bbox, mX, mY, strokeWidth) {
                var borderRanges = {
                    left: {
                        start: (bbox.x),
                        end: (bbox.x + strokeWidth)
                    },
                    top: {
                        start: (bbox.y),
                        end: (bbox.y + strokeWidth)
                    },
                    right: {
                        start: ((bbox.x + bbox.width) - strokeWidth),
                        end: (bbox.x + bbox.width)
                    },
                    bottom: {
                        start: ((bbox.y + bbox.height) - strokeWidth),
                        end: (bbox.y + bbox.height)
                    },
                    check: function (objPoint) {
                        var isInRange = false;
                        var border = 'none';

                        if (objPoint.x >= this.left.start && objPoint.x <= this.left.end &&
                            objPoint.y >= this.top.start && objPoint.y <= this.bottom.end) {
                            // in the left border zone
                            isInRange = true;
                            border = 'left';
                        }
                        if (objPoint.x >= this.right.start && objPoint.x <= this.right.end &&
                            objPoint.y >= this.top.start && objPoint.y <= this.bottom.end) {
                            // in the right border zone
                            isInRange = true;
                            border = 'right';
                        }
                        if (objPoint.x >= this.left.start && objPoint.x <= this.right.end &&
                            objPoint.y >= this.top.start && objPoint.y <= this.top.end) {
                            // in the top border zone
                            isInRange = true;
                            border = 'top';
                        }
                        if (objPoint.x >= this.left.start && objPoint.x <= this.right.end &&
                            objPoint.y >= this.bottom.start && objPoint.y <= this.bottom.end) {
                            // in the bottom border zone
                            isInRange = true;
                            border = 'bottom';
                        }

                        return {
                            inRange: isInRange,
                            direction: border
                        }
                    }
                }
                return borderRanges.check({
                    x: mX,
                    y: mY
                });

            }

            asg.data.elements.diagram.paper.on('cell:pointerdown', function (elementView, evt) {
                var bbox = elementView.getBBox();
                var stroke = elementView.model.attr('rect/stroke-width') || 3;
                var isBorder = isBorderClicked(bbox, evt.offsetX, evt.offsetY, stroke)
                if (isBorder.inRange) {
                    var r = asg.data.system.diagram.resize;
                    r.isResizing = true;
                    r.direction = isBorder.direction;
                    r.element = elementView;
                    r.coords.x = evt.offsetX;
                    r.coords.y = evt.offsetY;
                }
            });

            asg.data.elements.diagram.paper.on('cell:pointermove', function (elementView, evt, x, y) {
                evt.stopImmediatePropagation();

                evt.stopPropagation();
                evt.cancelBubble = true;
                var r = asg.data.system.diagram.resize;
                var g = asg.data.elements.diagram.graph;
                var bbox = elementView.getBBox();
                var dx = x - r.coords.x;
                var dy = y - r.coords.y;
                var modelData = elementView.model;
                var shape = asg.util.diagram.getModelShapeById(modelData.id);
                var cell = asg.data.elements.diagram.graph.getCell(modelData.id);

                r.coords.x = x;
                r.coords.y = y;


                switch (r.direction) {
                    case 'left':
                        {
                            cell.attr('rect/width', cell.attributes.width + dx);
                            break;
                        }
                    case 'right':
                        {
                            var _x = bbox.x;
                            var _y = bbox.y;
                            var repos = function () {
                                cell.attr('rect/position/x', bbox.x);
                                cell.attr('rect/position/y', bbox.y);
                            }
                            var newWidth = bbox.width + dx;

                            cell.attr('rect/width', bbox.width + dx);
                            window.setTimeout(repos, 1);
                            break;
                        }
                    case 'top':
                        {

                            break;
                        }
                    case 'bottom':
                        {

                            break;
                        }
                    default:
                        {

                            break;
                        }
                }
                cell.attr('rect/stroke', '#ff0000');
                return false;
            });


            var e = asg.data.elements;

            e.controlPanel = document.createElement('div');

            e.controlPanel.className = "asg-control-surface-panel";
            e.btnAddExternalSystem = document.createElement('button');
            e.btnAddExternalSystem.className = "sg-Btn";
            e.btnAddExternalSystem.innerHTML = '<i class="fas fa-plus-circle"></i> ' + asg.s.addExtSys;
            e.btnAddExternalSystem.onclick = asg.ui.diagram.addExternalSystem;
            e.controlPanel.appendChild(e.btnAddExternalSystem);

            e.btnAddDataFlow = document.createElement('button');
            e.btnAddDataFlow.className = "sg-Btn";
            e.btnAddDataFlow.innerHTML = '<i class="fas fa-plus-circle"></i> ' + asg.s.addDFLow;
            e.btnAddDataFlow.onclick = asg.ui.diagram.addDataFlow;
            e.controlPanel.appendChild(e.btnAddDataFlow);

            var p = document.getElementById('asg_tools_panel');
            p.innerHTML = "";
            p.appendChild(e.controlPanel);
            asg.util.diagram.redraw();
        },

        redraw: function () {
            asg.util.diagram.clear();

            if (asg.data.system.diagram.view != null) {
                // Draw from saved data
            } else {
                // Draw from model data
                var shapes = asg.data.system.diagram.model.shapes;
                for (var i = 0; i < shapes.length; i++) {
                    var currShape = shapes[i];
                    var holdPosition = null;
                    if (currShape.position != null) {
                        holdPosition = currShape.position;
                    }

                    var holdVertices = null;
                    if (currShape.vertices != null) {
                        holdVertices = currShape.vertices;
                    }

                    var shapeDefaults = asg.util.diagram.getShapeDefaults(currShape.type);
                    for (var field in shapeDefaults.details) {
                        currShape[field] = shapeDefaults.details[field];
                    }

                    if (holdPosition != null) {
                        currShape.position = holdPosition;
                    }

                    if (holdVertices != null) {
                        currShape.vertices = holdVertices;
                    }

                    asg.util.diagram.drawShape(currShape);
                }
            }
        },

        resetDataFlow: function () {
            var types = asg.data.lists.diagram.ex_sys_subtypes;
            var shapes = asg.data.system.diagram.model.shapes;
            var transports = asg.data.lists.diagram.df_transports;
            var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
            var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);
            var transSelect = document.getElementById(asg.conf.ids.dia_shape_transport);
            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {
                asg.util.clearSelect(fromSelect);
                asg.util.clearSelect(toSelect);
                asg.util.clearSelect(transSelect);


                var disableToOption = function () {
                    var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
                    var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);

                    var fromVal = fromSelect.value;

                    for (var i = 0; i < toSelect.options.length; i++) {
                        var currOpt = toSelect.options[i];
                        if (currOpt.value == fromVal) {
                            currOpt.disabled = true;
                        } else {
                            currOpt.disabled = false;
                        }
                    }
                }

                var disableFromOption = function () {
                    var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
                    var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);

                    var toVal = toSelect.value;

                    for (var i = 0; i < fromSelect.options.length; i++) {
                        var currOpt = fromSelect.options[i];
                        if (currOpt.value == toVal) {
                            currOpt.disabled = true;
                        } else {
                            currOpt.disabled = false;
                        }
                    }
                }

                var swapOptions = function () {
                    var fromSelect = document.getElementById('asg_shape_from');
                    var toSelect = document.getElementById('asg_shape_to');
                    var fromIndex = fromSelect.selectedIndex;
                    var toIndex = toSelect.selectedIndex;

                    var fromOpt = fromSelect.options[toIndex];
                    var fromPrev = fromSelect.options[fromIndex];

                    var toOpt = toSelect.options[fromIndex];
                    var toPrev = toSelect.options[toIndex];

                    fromOpt.disabled = false;
                    fromOpt.selected = true;
                    fromPrev.disabled = true

                    toOpt.disabled = false;
                    toOpt.selected = true;
                    toPrev.disabled = true
                };


                for (var i = 0; i < shapes.length; i++) {
                    var currShape = shapes[i];
                    if (currShape.type != "data_flow") {
                        var objOpt = new Option();
                        objOpt.value = currShape.id;
                        objOpt.innerHTML = currShape.label;
                        if (currShape.id == currEl.from) {
                            objOpt.selected = true;
                        }
                        fromSelect.appendChild(objOpt);
                    }

                }
                fromSelect.onchange = disableToOption;

                for (var i = 0; i < shapes.length; i++) {
                    var currShape = shapes[i];
                    if (currShape.type != "data_flow") {
                        var objOpt = new Option();
                        objOpt.value = currShape.id;
                        objOpt.innerHTML = currShape.label;
                        if (currShape.id == currEl.to) {
                            objOpt.selected = true;
                        }
                        toSelect.appendChild(objOpt);
                    }

                }
                toSelect.onchange = disableFromOption;

                disableToOption();
                disableFromOption();

                var swapButton = toSelect.nextElementSibling;
                if (swapButton != null) {
                    swapButton.onclick = swapOptions;
                }


                for (var i = 0; i < transports.length; i++) {
                    var currTrans = transports[i];
                    var objOpt = new Option();
                    objOpt.value = currTrans.id;
                    objOpt.innerHTML = currTrans.value;
                    if (currTrans.id == currEl.transport) {
                        objOpt.selected = true;
                    }
                    transSelect.appendChild(objOpt);
                }


                var labelField = document.getElementById('asg_shape_name');
                labelField.value = currEl.label;


                var idField = document.getElementById('asg_shape_id_display');
                idField.innerHTML = currEl.id;


                labelField.focus();
            }
        },

        resetExternalSystem: function () {
            var types = asg.data.lists.diagram.ex_sys_subtypes;

            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {
                var typeSelect = document.getElementById('asg_shape_subtype');
                asg.util.clearSelect(typeSelect);
                for (var i = 0; i < types.length; i++) {
                    var currType = types[i];
                    var objOpt = new Option();
                    objOpt.value = currType.id;
                    objOpt.innerHTML = currType.value;
                    if (currType.id == currEl.subtype) {
                        objOpt.selected = true;
                    }
                    typeSelect.appendChild(objOpt);
                }

                var labelField = document.getElementById('asg_shape_name');
                labelField.value = currEl.label;


                var titleSpan = document.getElementById('asg_shape_label_display');
                titleSpan.innerHTML = currEl.label;

                var idField = document.getElementById('asg_shape_id_display');
                idField.innerHTML = currEl.id;

                var imgField = document.getElementById('asg_shape_type_image');
                imgField.innerHTML = "";
                var objImg = document.createElement('img');
                objImg.src = '/assets/img/' + currEl.icon + '.png';
                imgField.appendChild(objImg);

                labelField.focus();
            }
        },

        resetPrimarySystem: function () {
            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {

                var labelField = document.getElementById(asg.conf.ids.dia_shape_name);
                labelField.value = currEl.label;

                var idField = document.getElementById(asg.conf.ids.dia_shape_id_display);
                idField.innerHTML = currEl.id;

                labelField.focus();
            }
        },

        selectElement: function (objCellView) {
            asg.util.diagram.deSelectElements();
            var modelData = objCellView.model;
            var shape = asg.util.diagram.getModelShapeById(modelData.id);
            asg.data.system.diagram.selectedElement = shape;
            var cell = asg.data.elements.diagram.graph.getCell(modelData.id);

            switch (shape.type) {
                case "system":
                    {
                        cell.attr('circle/stroke', '#004346');
                        cell.attr('circle/stroke-width', 3);
                        cell.attr('circle/fill', '#9AB7B7');
                        asg.util.diagram.editPrimarySystem();
                        break;
                    }

                case "external_system":
                    {
                        cell.attr('rect/stroke', '#004346');
                        cell.attr('rect/stroke-width', 3);
                        cell.attr('rect/fill', '#9AB7B7');
                        asg.util.diagram.editExternalSystem();
                        break;
                    }

                case "data_flow":
                    {
                        //alert('boing');
                        //cell.attr('labels/0/rect/stroke', '#004346');
                        cell.label(0, {
                            attrs: {
                                rect: {
                                    fill: '#004346',
                                    stroke: '#004346',
                                },
                                text: {
                                    fill: '#ffffff'
                                }
                            }
                        });
                        asg.util.diagram.editDataFlow();
                        break;
                    }

                default:
                    {
                        break;
                    }
            }

        },

        unselectElement: function (strID) {
            var shape = asg.util.diagram.getModelShapeById(strID);
            var cell = asg.data.elements.diagram.graph.getCell(strID);
            switch (shape.type) {
                case "system":
                    {
                        cell.attr('circle/stroke', '#333333');
                        cell.attr('circle/stroke-width', 1);
                        cell.attr('circle/fill', '#eeeeee');
                        break;
                    }

                case "external_system":
                    {
                        cell.attr('rect/stroke', '#333333');
                        cell.attr('rect/stroke-width', 1);
                        cell.attr('rect/fill', '#ffffff');
                        break;
                    }

                case "data_flow":
                    {
                        cell.label(0, {
                            attrs: {
                                rect: {
                                    fill: '#EDF2F2',
                                    stroke: '#EDF2F2',
                                },
                                text: {
                                    fill: '#004346'
                                }
                            }
                        });
                        break;
                    }

                default:
                    {
                        break;
                    }
            }
        },

        updateDataFlow: function () {
            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {


                var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
                var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);
                var transSelect = document.getElementById(asg.conf.ids.dia_shape_transport);
                var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

                if (fromSelect != null && toSelect != null && transSelect != null && labelField != null) {
                    if (labelField.value.length >= 5) {

                        currEl.label = labelField.value;
                        var objTransport = asg.util.diagram.getDataFlowTransport(transSelect.value);
                        currEl.transport = objTransport.value;
                        currEl.icon = objTransport.icon;

                        currEl.from = fromSelect.value;
                        currEl.to = toSelect.value;

                        asg.u.diagram.redraw();
                        asg.ui.closeDialog();
                    } else {
                        asg.ui.attachErrorMsg(labelField, asg.s.extSysName2Shrt);
                    }
                }



                var typeSelect = document.getElementById('asg_shape_subtype');
                var labelField = document.getElementById('asg_shape_name');

                if (typeSelect != null && labelField != null) {
                    if (labelField.value.length >= 5) {
                        // All valid input
                        var strLabel = labelField.value;

                        var objSubtype = asg.util.diagram.getExternalSystemSubtype(typeSelect.value);
                        var strSubType = objSubtype.id;
                        var strSubTypeIcon = objSubtype.icon;

                        currEl.label = strLabel;
                        currEl.subtype = strSubType;
                        currEl.icon = strSubTypeIcon;

                        asg.u.diagram.redraw();
                        asg.u.diagram.clearPanel();

                    } else {
                        asg.ui.attachErrorMsg(labelField, asg.s.dFlowName2Shrt);
                    }

                }
            }

        },

        updateExternalSystem: function () {
            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {
                var typeSelect = document.getElementById('asg_shape_subtype');
                var labelField = document.getElementById('asg_shape_name');

                if (typeSelect != null && labelField != null) {
                    if (labelField.value.length >= 5) {
                        // All valid input
                        var strLabel = labelField.value;

                        var objSubtype = asg.util.diagram.getExternalSystemSubtype(typeSelect.value);
                        var strSubType = objSubtype.id;
                        var strSubTypeIcon = objSubtype.icon;

                        currEl.label = strLabel;
                        currEl.subtype = strSubType;
                        currEl.icon = strSubTypeIcon;

                        asg.u.diagram.redraw();
                        asg.u.diagram.clearPanel();

                    } else {
                        asg.ui.attachErrorMsg(labelField, asg.s.extSysName2Shrt);
                    }

                }
            }

        },

        updatePrimarySystem: function () {
            var currEl = asg.data.system.diagram.selectedElement;
            if (currEl != null) {
                var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

                if (labelField != null) {
                    if (labelField.value.length >= 5) {
                        // All valid input
                        var strLabel = labelField.value;
                        currEl.label = strLabel;
                        asg.u.diagram.redraw();
                        asg.u.diagram.clearPanel();

                    } else {
                        asg.ui.attachErrorMsg(labelField, asg.s.sysName2Shrt);
                    }

                }
            }

        },

    },

    generateGUID: function () {
        var str1 = "GUID-" + (Math.random() * 10000000000);
        str1.replace('.', '');
        return str1;
    },

    getDialog: function (strDialogID) {
        var dialogs = asg.data.lists.site.modals;
        for (var i = 0; i < dialogs.length; i++) {
            var currDialog = dialogs[i];
            if (currDialog.id == strDialogID) {
                return currDialog;
            }
        }
        return null;
    },

    getRouteObject: function () {

        var strH = window.location.hash;
        if (strH.length < 3) {
            strH = "#!/"
            window.location.hash = strH;
        }

        var strU = strH.slice(2, strH.length);


        var currPage = asg.app.fn.getPageByRoute(strU);
        var arrCrumbs = asg.app.fn.getBreadCrumbs(currPage.id);

        var objRoute = {
            hash: strH,
            uri: strU,
            breadcrumbs: arrCrumbs,
            page: currPage
        };

        return objRoute;

    },

    getTemplate: function (strTemplateID) {
        try {
            return eval(strTemplateID);
        } catch (e) {
            alert('error');
        }
    },

    handleError: function (objError) {
        asg.ui.showMsg(objError.name, 'error', objError.name, objError.message);
    },

    parseHashFromURL: function (strURL) {
        var strHash = strURL.slice(strURL.indexOf('#') + 2, strURL.length);
        if (strHash.indexOf('?') >= 0) {
            strHash = strHash.slice(0, strHash.indexOf('?'));
        }
        return strHash;
    },

    strReplace: function (strHaystack, arrNeedles) {
        if (arrNeedles != null) {
            for (var i = 1; i <= arrNeedles.length; i++) {
                var strNeedle = '%' + i + '%';
                var reNeedle = new RegExp(strNeedle, 'gi');
                strHaystack = strHaystack.replace(reNeedle, arrNeedles[i - 1]);
            }
        }
        return strHaystack;
    },

    /* Vulnerability & Patching Portal Dashboard */
    vdash: {
        drawPieChart: function () {
            var container = document.getElementById(asg.conf.ids.vdash_chart);
            container.innerHTML = "";
            var canvas = document.createElement('canvas');
            canvas.setAttribute('id', 'vdash_chart');
            canvas.setAttribute('width', '200');
            canvas.setAttribute('height', '200');
            container.appendChild(canvas);

            var chart = new Chart(canvas, {
                type: 'doughnut',
                data: asg.data.system.vdash.chartData,
                options: {
                    cutoutPercentage: 35,
                    layout: {
                        padding: 5
                    },
                    tooltips: {},
                    legend: {
                        position: 'bottom'
                    },
                    title: {
                        display: true,
                        position: 'top',
                        fontSize: 24,
                        fontColor: '#003733',
                        text: 'Detected Vulnerabilities - Past 180 Days'
                    },
                }
            });
        },

        drawQuickstats: function () {
            var arrItems = asg.data.system.vdash.quickstats;
            var container = document.getElementById(asg.conf.ids.vdash_qs);
            container.innerHTML = "";
            for (var i = 0; i < arrItems.length; i++) {
                var objItem = arrItems[i];
                asg.util.vdash.drawQuickstatsPanel(objItem, container);
            }
        },

        drawQuickstatsPanel: function (objPanel, container) {
            try {
                var panelHover = function () {
                    this.setAttribute('style',
                        asg.util.strReplace('color:#fff;background-color:%1%;border-color:%2%;', [
                                objPanel.display.fgcolour,
                                objPanel.display.fgcolour
                            ])
                    );
                };
                var panelOut = function () {
                    this.setAttribute('style',
                        asg.util.strReplace('color:%1%;background-color:%2%;border-color:%3%;', [
                            objPanel.display.fgcolour,
                            objPanel.display.bgcolour,
                            objPanel.display.bdrcolour
                        ])
                    );
                };
                var elPanel = asg.util.createElement({
                    tag: 'div',
                    attrs: {
                        id: objPanel.id,
                        class: 'asg-quickstats-panel',
                        style: asg.util.strReplace('color:%1%;background-color:%2%;border-color:%3%;', [
                            objPanel.display.fgcolour,
                            objPanel.display.bgcolour,
                            objPanel.display.bdrcolour
                        ]),
                    }
                });
                elPanel.onmouseover = panelHover;
                elPanel.onmouseout = panelOut;
                var elNumber = asg.util.createFromFragment('<h1>' + objPanel.number + (objPanel.delta != 0 ? '<sub><i class="fas fa-arrow-' + objPanel.deltaDir + '"></i> ' + objPanel.delta + '%</sub>' : '') + '</h1>');

                var elLabel = asg.util.createFromFragment(asg.util.strReplace('<h2>%1%</h2>', [objPanel.label]));

                elPanel.appendChild(elNumber);
                elPanel.appendChild(elLabel);


                container.appendChild(elPanel);

            } catch (err) {
                //asg.util.handleError(err);
                throw (err);
            }
        },

        initialise: function () {
            asg.util.vdash.drawQuickstats();
            asg.util.vdash.drawPieChart();
        },

    }

};

asg.main = {
    init: function () {
        //asg.ui.showMsg('100', 'secondary', 'booyah!', 'This is the message text.');
        //asg.util.diagram.initialise();
        //asg.ui.diagram.addExternalSystem();

        window.setTimeout(asg.app.fn.initialise, 200);

    }
};

// Syntactic Sugar is oh so tasty
asg.s = asg.data.lists.site.stringTable;
asg.u = asg.util;

// Fire 'er up!
$(document).ready(asg.main.init);


/************************* JointJS Custom Shapes **************************/
joint.shapes.basic.ExternalSystem = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.ExternalSystem',
        size: {
            width: 100,
            height: 60
        },
        attrs: {
            'rect': {
                position: {
                    x: 200,
                    y: 200
                },
                fill: '#FFFFFF',
                stroke: '#333333',
                width: 100,
                height: 60
            },
            'text': {
                'font-size': 10,
                text: '',
                'ref-x': .5,
                'ref-y': .5,
                ref: 'rect',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black'
            },
            'image': {
                'ref-x': 82,
                'ref-y': 42,
                ref: 'rect',
                width: 16,
                height: 16
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

joint.shapes.basic.Zone = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.Zone',
        size: {
            width: 100,
            height: 60
        },
        attrs: {
            'rect': {
                position: {
                    x: 100,
                    y: 100
                },
                stroke: '#6C999A',
                'stroke-width': 3,
                'stroke-dasharray': "5,10,5",
                'stroke-linecap': "round",
                fill: '#FFFFFF00',
                width: 200,
                height: 100
            },
            'text': {
                'font-size': 9,
                text: '',
                'ref-x': '99%',
                'ref-y': 2,
                ref: 'rect',
                'y-alignment': 'top',
                'x-alignment': 'right',
                fill: 'black'
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});





// EOF
