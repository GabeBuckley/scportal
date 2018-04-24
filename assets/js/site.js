// TO DO LIST
/**
ToDo
---------------------------------
Dev:
    Put the rest of the ids into the ids table
    Put the rest of the strings into the strings table
    Use strReplace function for string operations
    
 
        
    Vuln Portal:
        Build Data Tables
    Fix bug with < 30 days chart multiple additions, clear html    

 
    Admin:
         Create UI data model
        Set up build pipeline


Done
---------------------------------
Automated, configurable menus
Dashboard split off into separate file

*/

var asg = {};

asg.conf = {
    ids: {
        // Main App Components
        app: 'asg_app_container',
        app_menu: 'asg_main_menu',
        ldr_text: 'asg_loading_what',
        breadcrumbs: 'asg_site_breadcrumbs',
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
            asg.app.fn.loadSiteModules();

            var doLoad = function () {
                if (asg.app.model.ready()) {
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
                } else {
                    window.setTimeout(doLoad, 200);
                }
            }
            doLoad();
        },

        load: function () {
            asg.app.fn.loadPages();
        },

        loadPages: function () {
            asg.app.fn.updateLoadingScreen("Pages Collection");
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

        loadSiteModules: function () {
            asg.app.fn.updateLoadingScreen("Site Modules");
            asg.app.fn.require(['util', 'data', 'ui']);
        },

        menu: {
            init: function () {
                var menuBar = document.getElementById(asg.conf.ids.app_menu);
                if (menuBar != null) {
                    menuBar.innerHTML = '';

                    var _data = asg.data.system.menu.main.menu_data;
                    for (var i = 0; i < _data.length; i++) {
                        var elMenu = asg.app.fn.menu._processMenu(_data[i]);
                        menuBar.appendChild(elMenu);
                    }
                }
            },





            _processMenu: function (objMenu) {
                var elMenu = null;
                if (objMenu.id != null && objMenu.label != null) {
                    elMenu = asg.util.createFromFragment(
                        asg.util.strReplace(
                            [
                                '<li class="sg-Menu-item">',
                                '   <a id="menu_%1%" class="sg-Menu-link js--ensighten-event" href="%2%" aria-haspopup="true" aria-expanded="false">',
                                '        <span class="sg-Menu-text">%3%</span>',
                                '   </a>',
                                '   <div class="asg-Menu-MenuBody">',
                                '       <ol class="sg-Menu sg-Menu--list" aria-hidden="true"></ol>',
                                '   </div>',
                                '</li>'
                            ].join(''), [
                                objMenu.id,
                                objMenu.link || '#',
                                objMenu.label
                            ]
                        )
                    );

                    if (objMenu.menu_data != null) {
                        var elMenuBody = elMenu.lastElementChild.lastElementChild;
                        for (var i = 0; i < objMenu.menu_data.length; i++) {
                            var elItem = asg.app.fn.menu._processMenuItem(objMenu.menu_data[i]);
                            elMenuBody.appendChild(elItem);
                        }
                    }
                }
                return elMenu;
            },

            _processMenuItem: function (objItem) {
                var elItem = asg.util.createFromFragment(
                    asg.util.strReplace(
                        [
                            '<li id="menuitem_%1%" class="sg-Menu-item">',
                            '   <a class="sg-Menu-link" href="%2%">',
                            '       <i class="%3%"></i>',
                            '       <span class="sg-Menu-text">%4%</span>',
                            '   </a>',
                            '</li>'
                        ].join(''), [
                            objItem.id,
                            objItem.link || '#',
                            objItem.icon || '',
                            objItem.label
                        ]
                    )
                );

                if (objItem.click != null) {
                    elItem.onclick = objItem.click;
                }

                return elItem;
            },

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
                        };
                        var notify = function (evt) {
                            var strModule = evt.srcElement.getAttribute('name');
                            var objModule = asg.app.fn.module.get(strModule);
                            objModule.loaded = true;
                        };

                        var newScript = document.createElement("script");
                        newScript.setAttribute('name', strModule);
                        newScript.onerror = loadError;
                        newScript.onload = notify;
                        document.head.appendChild(newScript);

                        newScript.src = "./assets/js/" + strModule + ".js";
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
                asg.app.fn.menu.init();
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
            },
            {
                error: false,
                id: "data",
                loaded: false,
                requested: false,
            },
            {
                error: false,
                id: "diagram",
                loaded: false,
                requested: false,
            },
            {
                error: false,
                id: "ui",
                loaded: false,
                requested: false,
            },
            {
                error: false,
                id: "util",
                loaded: false,
                requested: false,
            },
            {
                error: false,
                id: "vdash",
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
                    asg.app.fn.require(['diagram']);
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
                    asg.app.fn.require(['vdash']);
                },
                onshow: function (evt, objPage) {
                    var doInit = function () {
                        if (asg.app.model.ready()) {
                            asg.util.vdash.initialise();
                        } else {
                            window.setTimeout(doInit, 200);
                        }
                    };

                    doInit();
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

asg.main = {
    init: function () {
        window.setTimeout(asg.app.fn.initialise, 200);
    }
};

// Fire 'er up!
$(document).ready(asg.main.init);

// EOF
