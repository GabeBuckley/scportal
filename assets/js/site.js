// TO DO LIST
/**
ToDo
---------------------------------
Dev:
    Put the rest of the ids into the ids table
    Put the rest of the strings into the strings table
    Use strReplace function for string operations
    IE11 Polyfil classes
 
        
    Vuln Portal:
 		Tie in reports with data from API
		
		
    Admin:
         Create UI data model
        Set up build pipeline


Done
---------------------------------


Endpoints that need to be created:
------------------------------------------
GetSupportTeamsList: 
  	Return an array of SupportTeam objects referenced in GetIssueReport

	eg 	[
			{
				Id: "STRING",
				TeamName: "STRING"
			},
			{
				Id: "STRING",
				TeamName: "STRING"
			}
		]
	
GetOpenIssuesByTeam:
	Return an array of Issues that are open (ie have no DateResolved value) 
	along with the Support Team that manages the application that the ussue
	relates to
	
	eg:	[
			{
				Id: "STRING",
				Title: "STRING"
				SupportTeam: {
					Id: "STRING",
					TeamName: "STRING"
				}
			},
			{
				Id: "STRING",
				Title: "STRING"
				SupportTeam: {
					Id: "STRING",
					TeamName: "STRING"
				}
			}
		]
*/

var asg = {};

asg.conf = {
	hosts: {
		dev: ['\:8080', '127\.0\.0\.1', '.+\.dev'],
		test: ['\:57373', '10\.75\.17\.43', '.+\.test'],
		prod: []
	},

	endpoints: {
		DEV: {
			get_current_user_data: '/assets/ws/mocks/GetUserInfo.json',
		},
		TEST: {
			get_current_user_data: '/api/Account/GetUserInfo'
		}
	},

	ids: {
		// Main App Components
		app: 'asg_app_container',
		app_menu: 'asg_main_menu',
		ldr_text: 'asg_loading_what',
		breadcrumbs: 'asg_site_breadcrumbs',
	},

	tests: [
		{
			id: 'Test User Roles',
			assert: 'asg.app.user.hasRole("u262303","can_delete_workbook")',
			result: true,
			msg: 'Unable to find role for user'
		},
	],

	type_maps: {
		current_user: {
			id: 'Username',
			name: 'DisplayName',
			email: 'Email'
		}
	}
};

asg.app = {
	fn: {
		addClass: function (objEl, strClassName) {
			let strCurrentClass = objEl.className;
			strNewClass = strCurrentClass + ' ' + strClassName;
			objEl.setAttribute('class', strNewClass);
		},

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

		deepClone: function (objSource) {
			var newObj = new Object();
			for (var _prop in objSource) {
				var _propVal = objSource[_prop];
				if (_propVal.constructor === Array) {
					var newArray = [];
					for (var i = 0; i < _propVal.length; i++) {
						var _member = _propVal[i];
						var newMember = asg.app.fn.deepClone(_member);
						newArray.push(newMember);
					}
					newObj[_prop] = newArray;
				} else if (_propVal.constructor === Object) {
					newObj[_prop] = asg.app.fn.deepClone(_propVal);
				} else {
					newObj[_prop] = _propVal;
				}
			}
			return newObj;
		},

		devMode: function () {
			var strHost = window.location;
			var _hosts = asg.conf.hosts.dev;
			for (let i = 0; i < _hosts.length; i++) {
				var reHost = new RegExp(_hosts[i], 'gi');
				if (reHost.test(strHost)) {
					return true;
				}
			}
			return false;
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
			var page = null;
			var arrPages = asg.app.structure.pages;
			strRoute = strRoute.toLowerCase();

			while (strRoute.length != '' && page == null) {
				for (var i = 0; i < arrPages.length; i++) {
					var currPage = arrPages[i];
					if (currPage.route.toLowerCase() == strRoute) {
						page = currPage;
					}
				}

				if (page == null) {
					// shrink the route by one component and try again;
					var arrRoute = strRoute.split('/');
					arrRoute.pop();
					strRoute = arrRoute.join('/');
				}
			}

			return page;
		},

		handleLoginAttempt: function (objLoginData) {
			var _fn = asg.app.fn;
			var _u = asg.app.user;
			var _o = objLoginData;
			var _auth = _u.validateUser(_o)
			if (_auth) {
				_u.setCurrentUser(_auth);
				var _page = _fn.getPageByRoute(_o.passRoute);
				if (_page != null) {
					_fn.showPage(_page.id);
				}
			} else {
				_fn.showPage('page_error');
			}
		},

		handleLoginSubmit: function () {
			var _fn = asg.app.fn;
			var _user = document.getElementById('asg_site_login_username');
			var _pw = document.getElementById('asg_site_login_password');
			var _passroute = document.getElementById('asg_on_success_route');
			var _failroute = document.getElementById('asg_on_fail_route');
			var _msg = document.getElementById('asg_login_message');
			var loginData = {
				username: _user.value,
				password: _pw.value,
				passRoute: _passroute.value,
				failRoute: _failroute.value,
				message: _msg.innerHTML
			}
			asg.ui.closeDialog();

			_fn.handleLoginAttempt(loginData);
		},

		handleUnauthorisedAccess: function (objExceptionData) {
			var _u = objExceptionData.user;
			var _fn = asg.app.fn;
			if (_u = null || _u.id == 'anonymous') {
				_fn.showLoginDialog(objExceptionData);
			}
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
				if (currPage.ui != null) {
					currPage.ui.style.display = 'block';
					$(currPage.ui).toggle('fade');
				}
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
							asg.app.test.runAll();
							if (asg.app.fn.devMode()) {
								asg.app.test.output();
							}
						} else {
							window.setTimeout(display, 200);
						}
					}

					display();
				} else {
					window.setTimeout(doLoad, 200);
				}
			}
			asg.app.test.loadTests();
			doLoad();
		},

		load: function () {
			asg.app.fn.siteData.fetch({
				on_complete: asg.app.fn.loadPages()
			});
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

			isLoaded: function (strMenuID) {
				let _data = asg.data.system.menu.main.menu_data;
				for (var i = 0; i < _data.length; i++) {
					var currMenu = _data[i];
					if (currMenu.id == strMenuID) {
						return true;
					}
				}
				return false;
			},

			load: function (arrMenuObjects) {
				for (var i = 0; i < arrMenuObjects.length; i++) {
					let currMenu = arrMenuObjects[i];
					if (!asg.app.fn.menu.isLoaded(currMenu.id)) {
						asg.data.system.menu.main.menu_data.push(currMenu);
					}
				}
				asg.app.fn.menu.init();
			},

			unload: function (arrMenuIds) {
				let unLoadedMenus = [];
				for (var i = 0; i < arrMenuIds.length; i++) {
					let currId = arrMenuIds[i];

					var unloadedMenu = asg.app.fn.menu.unloadItem(currId);
					if (unloadedMenu != null) {
						unLoadedMenus.push(unloadedMenu);
					}
				}
				asg.app.fn.menu.init();
				return unLoadedMenus;
			},

			unloadItem: function (strMenuId) {
				let newMenu = [];
				let removedMenu = null;
				let _menuData = asg.data.system.menu.main.menu_data;
				for (let i = 0; i < _menuData.length; i++) {
					let currMenu = _menuData[i];
					if (currMenu.id != strMenuId) {
						newMenu.push(currMenu);
					} else {
						removedMenu = currMenu;
					}
				}
				asg.data.system.menu.main.menu_data = newMenu;
				return removedMenu;
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

		mode: function () {
			if (asg.app.fn.devMode()) {
				return 'DEV';
			}
			if (asg.app.fn.testMode()) {
				return 'TEST';
			}
			if (asg.app.fn.prodMode()) {
				return 'PROD';
			}
			return 'UNKNOWN';
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
									strCrumbHTML = '<li><span> ' + currCrumb.label + '</span></li>';
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

		prodMode: function () {
			var strHost = window.location.host;
			var _hosts = asg.conf.hosts.prod;
			for (let i = 0; i < _hosts.length; i++) {
				var reHost = new RegExp(_hosts[i], 'gi');
				if (reHost.test(strHost)) {
					return true;
				}
			}
			return false;
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

		removeClass: function (objEl, strClass) {
			let strCurrentClass = objEl.getAttribute('class');
			let arrClassNames = strCurrentClass.split(' ');
			let newArray = [];
			for (let i = 0; i < arrClassNames.length; i++) {
				if (arrClassNames[i] != strClass) {
					newArray.push(arrClassNames[i]);
				}
			}
			let strNewClass = newArray.join(' ');
			objEl.setAttribute('class', strNewClass);
		},

		resolvePermissions: function (arrPerms) {
			return asg.app.user.resolvePermissions(asg.data.system.current_user, arrPerms);
		},

		setSiteTitle: function (strTitle) {
			window.document.title = strTitle;
		},

		siteData: {
			complete: function (strFn, strEndpoint, objData, strOnComplete) {
				var _reqs = asg.app.fn.siteData.requests;
				for (var i = 0; i < _reqs.length; i++) {
					var _req = _reqs[i];
					if (_req.name == strFn && !_req.completed) {
						_req.endpoint = strEndpoint;
						_req.responseData = objData;

						var _doOnComplete = eval(strOnComplete);
						if (_doOnComplete != null) {
							_doOnComplete();
						}
					}
				}
			},

			fetch: function () {
				asg.app.fn.siteData.request(
					asg.app.fn.siteData.getCurrUserInfo
				);
			},

			getCurrUserInfo: function () {
				asg.app.fn.siteData.handleRequest(
					'asg.data.system.current_user',
					asg.conf.endpoints[asg.app.fn.mode()].get_current_user_data,
					this.name,
					'current_user',
                    'asg.ui.updateUserBlob'
				);
			},

			handleRequest: function (strTarget, strEndpoint, strFn, strTypeMap, strOnComplete) {
				var _fnName = strFn;
				var _endPoint = strEndpoint;
				var _strTypeMap = strTypeMap;
				var _strTarget = strTarget;
				var _onComplete = strOnComplete;

				asg.app.fn.ws.fetch(_endPoint, {
					on_result: function () {
						let _this = this;
						let _data = _this.result;

						var _processed = asg.app.fn.ws.mapObjectToType(_data, _strTypeMap);

						var arrTargetPath = this.options.target.split('.');

						var strPath = arrTargetPath.shift();

						var objTarget = eval(strPath);

						while (arrTargetPath.length > 1) {
							strPath = arrTargetPath.shift();
							objTarget = objTarget[strPath];
						}

						strPath = arrTargetPath.shift();
						objTarget[strPath] = _processed;

						asg.app.fn.siteData.complete(_fnName, _endPoint, this.result, _onComplete);
					},
					target: _strTarget
				});
			},

			request: function (fnRequest) {
				var _objReq = {
					name: fnRequest.name,
					requested: true,
					completed: false,
					endpoint: '',
					responseData: '',
					run: fnRequest
				};
				asg.app.fn.siteData.requests.push(_objReq);
				_objReq.run();
			},

			requests: [],
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

		showLoginDialog: function (objExceptionData) {
			asg.ui.showDialog('doLogin', {
				size: 'medium'
			});
			var toField = document.getElementById('asg_on_success_route');
			if (objExceptionData.route != null) {
				toField.value = objExceptionData.route;
			} else {
				toField.value = '/';
			}

			var failField = document.getElementById('asg_on_fail_route');
			failField.value = '/error';

			var msgBlock = document.getElementById('asg_login_message');
			if (objExceptionData.message != null) {
				msgBlock.innerHTML = objExceptionData.message;
				msgBlock.style.display = 'block';
			}

			var uNameField = document.getElementById('asg_site_login_username');
			uNameField.focus();
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
				asg.app.fn.setSiteTitle(eval(asg.app.structure.title) + ' - ' + currPage.label);
				asg.app.fn.menu.init();
				asg.app.fn.populateBreadCrumbs();

				if (currPage.ui != null) {
					currPage.ui.style.display = "none";
					$(currPage.ui).toggle('fade');
				}
			}
		},

		testMode: function () {
			var strHost = window.location.host;
			var _hosts = asg.conf.hosts.test;
			for (let i = 0; i < _hosts.length; i++) {
				var reHost = new RegExp(_hosts[i], 'gi');
				if (reHost.test(strHost)) {
					return true;
				}
			}
			return false;
		},

		toggleClass: function (objEl, strClassFrom, strClassTo) {
			let _app = asg.app.fn;
			_app.removeClass(objEl, strClassFrom);
			_app.addClass(objEl, strClassTo);
		},

		updateLoadingScreen: function (strWhat) {
			var objWhat = document.getElementById(asg.conf.ids.ldr_text);
			objWhat.innerHTML = strWhat;
		},

		ws: {
			queue: {

			},

			request: {
				factory: function (strEndPoint, objOptions) {
                    
					this.objRet = {
						oHTTP: null,
						uri: strEndPoint,
						options: objOptions,
					};

					this.send = function () {
                        var _options = this.objRet.options;
                        var _method = _options.method || 'GET';
                        
						this.objRet.oHTTP.open(_method, strEndPoint, true);
                        if(_method.toLowerCase() == 'post' || _method.toLowerCase() == 'put'){
                            if(_options.post_headers != null){
                                for(var i = 0; i < _options.post_headers.length; i++){
                                    var _header = _options.post_headers[i];
                                    this.objRet.oHTTP.setRequestHeader(_header.name, _header.value);
                                }
                            }
                        }
                        
                        var _data = null;
                        if(_options.post_data != null){
                            _data = JSON.stringify(_options.post_data);
                        }
                        
						this.objRet.oHTTP.send(_data);
					}

					if (window.XMLHttpRequest) {
						// code for IE7+, Firefox, Chrome, Opera, Safari
						this.objRet.oHTTP = new XMLHttpRequest();
					} else {
						// code for IE6, IE5
						this.objRet.oHTTP = new ActiveXObject("Microsoft.XMLHTTP");
					}

					var _this = this;
					var _options = this.objRet.options;
					this.objRet.oHTTP.onreadystatechange = function () {
						if (this.readyState == 4 && this.status == 200) {
							let response = JSON.parse(this.responseText);
							asg.app.fn.ws.processResponse(response, _options);
						}
					}
					return this;
				}
			},

			fetch: function (strEndPoint, objOptions) {
				var oRequest = new asg.app.fn.ws.request.factory(strEndPoint, objOptions);
				oRequest.send();
			},

			resolveTypeMap: function (objTarget, objSource) {
				for (var _key in objTarget) {
					if (objTarget[_key].constructor === Array) {
						for (var i = 0; i < objTarget[_key].length; i++) {
							if (objTarget[_key][i].constructor === Object) {
								_target = asg.app.fn.deepClone(objTarget[_key][i]);
								objTarget[_key][i] = asg.app.fn.ws.resolveTypeMap(_target, objSource);
							} else {
								objTarget[_key][i] = asg.app.fn.ws.resolveTypeMap(objTarget[_key][i], objSource);
							}
						}
					} else if (objTarget[_key].constructor === Object) {
						_target = asg.app.fn.deepClone(objTarget[_key]);
						objTarget[_key] = asg.app.fn.ws.resolveTypeMap(_target, objSource);
					} else {
						var strKey = objTarget[_key];
						var arrKeyParts = strKey.split('.');
						var strKeyPart = arrKeyParts.shift();
						var objKeyPart = objSource[strKeyPart];
						while (arrKeyParts.length > 0) {
							strKeyPart = arrKeyParts.shift();
							objKeyPart = objKeyPart[strKeyPart];
						}

						objTarget[_key] = objKeyPart;
					}
				}

				return objTarget;
			},

			mapObjectToType: function (objSource, _strTypeMap) {
				var _typeTemplate = asg.conf.type_maps[_strTypeMap];
				var _typeMap = asg.app.fn.deepClone(_typeTemplate);

				// Check if we're dealing with an object or an array of objects
				if (objSource.constructor === Array) {
					var _arr = [];
					for (var i = 0; i < objSource.length; i++) {
						var _src = objSource[i];
						var _map = asg.app.fn.deepClone(_typeMap);

						_obj = asg.app.fn.ws.resolveTypeMap(_map, _src);

						_arr.push(_obj);
					}
					return _arr;
				} else {
					var _obj = {};
					for (var _key in _typeMap) {
						_obj[_key] = objSource[_typeMap[_key]];
					}
					return _obj;
				}
			},

			processResponse: function (objResult, objOptions) {
				let objResponse = {
					result: objResult,
					options: objOptions
				};

				if (objOptions.on_result != null) {
					objOptions.on_result.apply(objResponse, objOptions);
				}
			},


		}
	},

	test: {

		tests: [],

		test_cases: {},

		add: function (objTestSettings) {
			let _t = asg.app.test;

			var _c = {
				type: 'test_case',
				passed: false,
				status: 'not_yet_run',
				executionResult: {
					type: 'test_result',
					msg: 'This test has not yet been run',
					result: null
				},
				run: function () {
					let _t = asg.app.test;
					let _result = {
						type: 'test_result'
					};

					this.executionResult.testId = this.id;

					try {
						var _test = eval(this.assert);
						if (_.isEqual(_test, this.result)) {
							this.executionResult.result = _test;
							this.executionResult.msg = 'Test Passed';
							this.status = 'passed';
							this.passed = true;
						} else {
							this.executionResult.result = _test;
							this.executionResult.msg = this.msg;
							this.status = 'failed';
							this.passed = false;
						}
					} catch (e) {
						this.executionResult.result = e;
						this.executionResult.msg = this.msg;
						this.status = 'execution_error';
						this.passed = false;
					}
					return Object.assign({}, this.executionResult);
				}
			};

			if (objTestSettings.hasOwnProperty('id')) {
				if (objTestSettings.hasOwnProperty('assert')) {
					if (objTestSettings.hasOwnProperty('result')) {
						if (objTestSettings.hasOwnProperty('msg')) {
							_t.addTest(Object.assign(objTestSettings, _c));
						} else {
							return {
								type: 'test_error',
								msg: 'No msg property specified'
							}
						}
					} else {
						return {
							type: 'test_error',
							msg: 'No result property specified'
						}
					}
				} else {
					return {
						type: 'test_error',
						msg: 'No assert property specified'
					}
				}
			} else {
				return {
					type: 'test_error',
					msg: 'No id property specified'
				}
			}
		},

		addTest: function (objTest) {
			let _t = asg.app.test;
			if (objTest.type == 'test_case') {
				_t.tests.push(objTest);
				_t.test_cases[objTest.id] = objTest;
			}
		},

		loadTests: function () {
			var _d = asg.conf.tests;
			for (var i = 0; i < _d.length; i++) {
				this.add(_d[i]);
			}
		},

		output: function () {
			console.group('TEST RESULTS  -  ' + new Date());
			console.log('Test:                     | Status:                   | Message:');
			console.log('---------------------------------------------------------------------------------');
			for (var i = 0; i < this.tests.length; i++) {
				var _t = this.tests[i];

				var _strTest = _t.id + '                         ';
				_strTest = _strTest.slice(0, 25);

				var _strStatus = _t.status + '                         ';
				_strStatus = _strStatus.slice(0, 25);

				var _strMessage = _t.executionResult.msg;
				var _strOutput = _strTest + ' | ' + _strStatus + ' | ' + _strMessage;

				if (_t.status == 'not_yet_run') {
					console.info(_strOutput);
				}

				if (_t.status == 'execution_error') {
					console.error(_strOutput);
				}

				if (_t.status == 'passed') {
					console.log(_strOutput);
				}

				if (_t.status == 'failed') {
					console.warn(_strOutput);
				}
			}
			console.log('---------------------------------------------------------------------------------');

			console.groupEnd('// END TEST RESULTS');
		},

		run: function (strTestId) {
			let _t = asg.app.test;
			if (typeof strTestId != "string") {
				return {
					type: 'test_error',
					msg: 'Invalid strTestId ( ' + strTestId.toString() + ' ) supplied. String expected.'
				}
			}
			if (_t.test_cases[strTestId]) {
				return _t.runTest(_t.test_cases[strTestId]);
			} else {
				return {
					type: 'test_error',
					msg: 'Unknown strTestId ( ' + strTestId + ' ) supplied.'
				}
			}
		},

		runAll: function () {
			let _t = asg.app.test;
			var _results = [];
			for (var i = 0; i < _t.tests.length; i++) {
				_results.push(_t.runTest(_t.tests[i].id));
			}
			return _results;
		},

		runTest: function (strTestId) {
			let _c = asg.app.test.test_cases[strTestId];

			return _c.run();
		}

	},

	user: {
		data: 'asg.data.user_data',

		getGroupById: function (strGroup) {
			let _d = eval(asg.app.user.data);
			var objGroup = null;
			for (var i = 0; i < _d.groups.length; i++) {
				_g = _d.groups[i];
				if (_g.id == strGroup) {
					objGroup = Object.assign({}, _d.groups[i]);
				}
			}
			return objGroup;
		},

		getGroups: function () {
			let _d = eval(asg.app.user.data);
			var groupList = [];
			for (var i = 0; i < _d.groups.length; i++) {
				groupList.push(Object.assign({}, _d.groups[i]));
			}
			return groupList;
		},

		getUsers: function () {
			let _d = eval(asg.app.user.data);
			var userList = [];
			for (var i = 0; i < _d.users.length; i++) {
				userList.push(Object.assign({}, _d.users[i]));
			}
			return userList;
		},

		getUserById: function (strId) {
			let _d = eval(asg.app.user.data);
			var objUser = null;
			for (var i = 0; i < _d.users.length; i++) {
				var strUserId = _d.users[i].id;
				if (strUserId == strId) {
					objUser = Object.assign({}, _d.users[i]);
					break;
				}
			}
			return objUser;
		},

		getUserGroups: function (objUser) {
			let _u = asg.app.user;
			let _d = eval(asg.app.user.data);
			if (typeof objUser == 'string') {
				objUser = _u.getUserById(objUser);
			}
			var groupList = [];
			if (objUser != null) {
				for (var i = 0; i < _d.groups.length; i++) {
					var _g = _d.groups[i];
					if (_u.isMember(objUser.id, _g.id)) {
						groupList.push(Object.assign({}, _g));
					}
				}
			}
			return groupList;
		},

		groupHasRole(objGroup, strRole) {
			let _u = asg.app.user;
			let _d = eval(asg.app.user.data);
			if (typeof objGroup == 'string') {
				objGroup = _u.getGroupById(objGroup);
			}
			if (objGroup != null) {

				for (var i = 0; i < objGroup.roles.length; i++) {
					let _r = objGroup.roles[i];
					if (_r == strRole) {
						return true;
					}
				}
				return false;
			}
			return false;
		},

		hasRole: function (objUser, strRole) {
			let _u = asg.app.user;
			let _d = eval(asg.app.user.data);
			if (typeof objUser == 'string') {
				objUser = _u.getUserById(objUser);
			}
			if (objUser != null) {
				for (var i = 0; i < objUser.roles.length; i++) {
					if (objUser.roles[i] == strRole) {
						return true;
					}
				}
				var _g = _u.getUserGroups(objUser);
				for (var i = 0; i < _g.length; i++) {
					if (_u.groupHasRole(_g[i].id, strRole)) {
						return true;
					}
				}
				return false;
			}
			return false;
		},

		isMember: function (objUser, strGroup) {
			let _u = asg.app.user;
			let _d = eval(asg.app.user.data);

			if (typeof objUser == 'string') {
				objUser = _u.getUserById(objUser);
			}

			if (objUser != null) {
				if (strGroup == 'sys_all_users') {
					return true;
				}

				var _g = _u.getGroupById(strGroup);

				for (var i = 0; i < _g.members.length; i++) {
					if (_g.members[i] == objUser.id) {
						return true;
					}
				}

				return false;
			}

			return false;
		},

		resolvePermissions: function (objUser, arrPerms) {
			let _u = asg.app.user;
			for (var i = 0; i < arrPerms.length; i++) {
				if (!_u.hasRole(objUser.id, arrPerms[i])) {
					return false;
				}
			}
			return true;
		},

		searchUsers: function (strQuery) {
			let _d = eval(asg.app.user.data);
			var userList = [];
			var strAdded = '';
			var strTest = new String(strQuery);
			var intMatchStrength = 100;
			while (strTest.length > 0) {
				for (var i = 0; i < _d.users.length; i++) {
					if (_d.users[i].name.indexOf(strTest) >= 0 && strAdded.indexOf(_d.users[i].id) < 0) {
						userList.push(Object.assign({
							match: intMatchStrength
						}, _d.users[i]));
						strAdded = strAdded + _d.users[i].id;
					}
				}
				strTest = strTest.slice(0, strTest.length - 1);
				intMatchStrength = intMatchStrength - 5;
			}
			return userList;
		},

		setCurrentUser: function (objUser) {
			let _u = asg.app.user;
			var _s = asg.data.system;
			var _user = _u.getUserById(objUser.id);
			if (_user != null) {
				_s.current_user = _user;
				var usrBtn = document.getElementById('asg_user_button');
				usrBtn.innerHTML = '<i class="fas fa-user-lock"></i> ' + _s.current_user.name;
				return true;
			} else {
				var usrBtn = document.getElementById('asg_user_button');
				usrBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> <span>Login</span>';
				return false;
			}
		},

		validateUser: function (objLoginData) {
			var _u = asg.app.user;
			var _o = objLoginData;
			// TODO: Put actual verification in here
			var _user = _u.getUserById(_o.username);
			if (_user != null) {
				return _user;
			} else {
				return false;
			}
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
            },
			{
				error: false,
				id: "sdl_workbook",
				loaded: false,
				requested: false,
            },
			{
				error: false,
				id: "sdl_refdata",
				loaded: false,
				requested: false,
            },
			{
				error: false,
				id: "settings",
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
				id: "page_error",
				ui: null,
				default: false,
				route: "/error",
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

			/**** SDL ****/
			{
				id: "page_sdl",
				ui: null,
				default: false,
				route: "/sdl",
				label: "Secure Development Lifecycle",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();
						} else {
							window.setTimeout(doInit, 200);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },
			{
				id: "page_sdl_version",
				ui: null,
				default: false,
				route: "/sdl/version",
				label: "Version Control",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showVersionControl();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			{
				id: "page_sdl_srp",
				ui: null,
				default: false,
				route: "/sdl/srp",
				label: "System Risk Profile",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showSRP();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			{
				id: "page_sdl_sca",
				ui: null,
				default: false,
				route: "/sdl/sca",
				label: "Security Controls Assessment",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showSCA();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
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
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata', 'diagram']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.diagram.initialise();
							window.setTimeout(asg.util.diagram.redraw, 30);
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			{
				id: "page_sdl_list",
				ui: null,
				default: false,
				route: "/sdl/list",
				label: "Element List",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showElementList();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			{
				id: "page_sdl_assumptions",
				ui: null,
				default: false,
				route: "/sdl/assumptions",
				label: "Assumptions",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showAssumptions();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			{
				id: "page_sdl_threats",
				ui: null,
				default: false,
				route: "/sdl/threats",
				label: "Threat List",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showThreatList();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			{
				id: "page_sdl_recommendations",
				ui: null,
				default: false,
				route: "/sdl/recommendations",
				label: "Recommendations",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['sdl_workbook', 'sdl_refdata']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready() && asg.app.fn.module.isLoaded('sdl_workbook') && asg.app.fn.module.isLoaded('sdl_refdata')) {
							asg.app.fn.menu.load(asg.data.system.sdl.menu_data);
							asg.util.sdl.initialise();

							asg.util.sdl.showRecommendations();
						} else {
							window.setTimeout(doInit, 20);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['view', 'file']);
					return true;
				}
            },
			// END SDL Block 

            /**** Vulnerabilities ****/
			{
				id: "page_vuln",
				ui: null,
				default: false,
				route: "/vuln",
				label: "Vulnerability & Patching Portal",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready()) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.util.vdash.initialise();
						} else {
							window.setTimeout(doInit, 200);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },
 // Log new Vulnerability
			{
				id: "page_vuln_new",
				ui: null,
				default: false,
				route: "/vuln/new",
				label: "New Vulnerability",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready()) {
                            asg.util.vdash.loadListData();
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.util.vdash.showNewVulnForm();
						} else {
							window.setTimeout(doInit, 200);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {
						asg.u.vdash.removeNewVulnForm();
					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },

            // Vulnerability List View
			{
				id: "page_vuln_list",
				ui: null,
				default: false,
				route: "/vuln/list",
				label: "Vulnerability & Patching Portal",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready()) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
						} else {
							window.setTimeout(doInit, 200);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },

            // Vulnerability View / Add / Edit page
			{
				id: "page_vuln_view",
				ui: null,
				default: false,
				route: "/vuln/view",
				label: "Vulnerability & Patching Portal",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready()) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
						} else {
							window.setTimeout(doInit, 200);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },

            // Vulnerability Data List Pages
			{
				id: "page_vuln_data",
				ui: null,
				default: false,
				route: "/vuln/data",
				label: "Data Lists",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						if (asg.app.model.ready()) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.util.vdash.showAllDataListLinks();
						} else {
							window.setTimeout(doInit, 200);
						}
					};

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },
			{
				id: "page_vuln_data_source",
				ui: null,
				default: false,
				route: "/vuln/data/source",
				label: "Vulnerability Report Sources",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						let _data = asg.u.vdash.data;
						if (asg.app.model.ready() && _data.sourceDataListLoaded) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.u.vdash.initDataList('source', 'asg_vdash_lists_source');
						} else {
							window.setTimeout(doInit, 200);
						}
					};
					asg.u.vdash.getDataListData('get_data_list_source', 'source');

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },
			{
				id: "page_vuln_data_severity",
				ui: null,
				default: false,
				route: "/vuln/data/severity",
				label: "Vulnerability Severity Levels",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						let _data = asg.u.vdash.data;
						if (asg.app.model.ready() && _data.severityDataListLoaded) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.u.vdash.initDataList('severity', 'asg_vdash_lists_sev');
						} else {
							window.setTimeout(doInit, 200);
						}
					};
					asg.u.vdash.getDataListData('get_data_list_severity', 'severity');

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },
			{
				id: "page_vuln_data_type",
				ui: null,
				default: false,
				route: "/vuln/data/type",
				label: "Vulnerability & Patching Portal",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						let _data = asg.u.vdash.data;
						if (asg.app.model.ready() && _data.typeDataListLoaded) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.u.vdash.initDataList('type', 'asg_vdash_lists_type');
						} else {
							window.setTimeout(doInit, 200);
						}
					};
					asg.u.vdash.getDataListData('get_data_list_type', 'type');

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },
			{
				id: "page_vuln_data_tech",
				ui: null,
				default: false,
				route: "/vuln/data/tech",
				label: "Vulnerability & Patching Portal",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['vdash', 'components']);
				},
				onshow: function (evt, objPage) {
					var doInit = function () {
						let _data = asg.u.vdash.data;
						if (asg.app.model.ready() && _data.technologyDataListLoaded) {
							asg.app.fn.menu.load(asg.data.system.vdash.menu_data);
							asg.u.vdash.initDataList('technology', 'asg_vdash_lists_tech');
						} else {
							window.setTimeout(doInit, 200);
						}
					};
					asg.u.vdash.getDataListData('get_data_list_tech', 'technology');

					doInit();
				},
				onhide: function (evt, objPage) {
					asg.app.fn.menu.unload(['reports', 'repdata', 'issues']);
					var doUnload = function () {

					}
					window.setTimeout(doUnload, 2);
					return true;
				}
            },

            // END Vulnerabilities Block             

			/**** Settings, Manage Users, Groups, Roles etc ****/
			{
				id: "page_settings",
				ui: null,
				default: false,
				route: "/settings",
				label: "System Settings",
				oninitialise: function (evt, objPage) {
					asg.app.fn.require(['components', 'settings']);
				},
				onshow: function (evt, objPage) {
					var _perms = ['can_access_system', 'can_access_settings'];
					let _fn = asg.app.fn;
					var _d = asg.data.system;
					if (asg.app.fn.resolvePermissions(_perms)) {
						var doInit = function () {
							let _settings = asg.util.settings;
							if (asg.app.model.ready() && _settings != null) {
								_settings.initialise();
							} else {
								window.setTimeout(doInit, 200);
							}
						};
						doInit();
					} else {

						_fn.handleUnauthorisedAccess({
							user: _d.current_user,
							permissions: _perms,
							route: this.route,
							message: 'You must be logged in to access this system'
						});
					}
				},
				onhide: function (evt, objPage) {
					return true;
				}
					},

					// END Settings Block             

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

				},
				onhide: function (evt, objPage) {
					return true;
				}
			},
        ],
		title: 'asg.data.system.name',
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
