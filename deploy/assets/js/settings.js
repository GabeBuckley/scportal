/* SDL Workbook */
if (asg.__etc == null) {
	asg.__etc = {};
}

// Add system data
asg.data.system.settings = {

	menu_data: [
		{
			id: 'settings',
			label: 'Settings...',
			menu_data: [
				{
					id: 'users_groups',
					label: 'Users, Roles &amp; Groups',
					icon: 'fas fa-users-cog',
					link: '#!/settings/users'
                },
				{
					id: 'version',
					label: 'Version Control',
					icon: 'fas fa-code-branch',
					link: '#!/sdl/version'
                },
				{
					id: 'srp',
					label: 'System Risk Profile',
					icon: 'fas fa-exclamation-triangle',
					link: '#!/sdl/srp'
                },
				{
					id: 'sca',
					label: 'Security Controls Assessment',
					icon: 'fas fa-lock',
					link: '#!/sdl/sca'
                },
				{
					id: 'dfd',
					label: 'Data Flow Diagram',
					icon: 'fas fa-pencil-alt',
					link: '#!/sdl/dfd'
                },
				{
					id: 'list',
					label: 'Element List',
					icon: 'far fa-list-alt',
					link: '#!/sdl/list'
                },
				{
					id: 'assumptions',
					label: 'Assumptions',
					icon: 'far fa-comment',
					link: '#!/sdl/assumptions'
                },
				{
					id: 'threats',
					label: 'Threat List',
					icon: 'fas fa-user-secret',
					link: '#!/threats'
                },
				{
					id: 'recommendations',
					label: 'Recommendations',
					icon: 'fas fa-check',
					link: '#!/recommendations'
                }
            ]

        },
    ],

	lists: {},
};

asg.__etc.dbModals = [
	{
		id: "settingstest",
		title: "",
		template: "asg.data.templates.html.vdash.dialogs.addDataListItem"
    }
];
for (var i = 0; i < asg.__etc.dbModals.length; i++) {
	asg.data.lists.site.modals.push(asg.__etc.dbModals[i]);
}

// Add Templates
asg.data.templates.html.settings = {
	templatename: '<div id="%1%">%2%</div>',

	home_page_button: ['<a id="%1%" href="%2%" class="sg-Btn sg-Btn--iconLeftXlarge">',
					   '<i class="%3%"></i> %4%</a>'].join(''),

	dialogs: {
		dialoghandle: {
			content: '<html>',
			buttons: [
				{
					class: 'secondary',
					label: 'Cancel',
					handler: 'asg.ui.closeDialog'
                },
				{
					class: 'warning',
					label: 'Delete',
					handler: 'asg.util.vdash.deleteDataListItems'
                }
            ]
		},
	},
	sys: {
		dl_button: '<button class="sg-Btn sg-Btn--iconLeftLarge sg-Btn--huge sg-Btn--next" data-href="%1%"><i class="sg-Btn-icon %2%"></i> %3%</button>',
	},
};

// Copy in configuration items
asg.__etc.conf = {
	conf: {
		ids: {
			settings_page_home: 'asg_system_settings'
		},
		endpoints: {
			DEV: {
				get_support_teams_list: './site/assets/ws/mocks/get_support_teams_list.json',
			},
			TEST: {
				get_support_teams_list: './site/assets/ws/mocks/get_support_teams_list.json',
			}
		}
	}
};

for (var confidID in asg.__etc.conf.conf.ids) {
	asg.conf.ids[confidID] = asg.__etc.conf.conf.ids[confidID];
};
for (var confEP in asg.__etc.conf.conf.endpoints.DEV) {
	asg.conf.endpoints.DEV[confEP] = asg.__etc.conf.conf.endpoints.DEV[confEP];
};
for (var confEP in asg.__etc.conf.conf.endpoints.TEST) {
	asg.conf.endpoints.TEST[confEP] = asg.__etc.conf.conf.endpoints.TEST[confEP];
};

// Add StringTable Entries
asg.__etc.settings = {
	stringTable: {
		// Quick Stats

	}
};
for (var stringID in asg.__etc.settings.stringTable) {
	asg.data.lists.site.stringTable[stringID] = asg.__etc.settings.stringTable[stringID];
}

// Copy in dashboard utility functions 
asg.util.settings = {


	data: {
		loaded: function () {
			let _settings = asg.util.settings;
			let _loaded = true;

			return _loaded;
		},
		permissions: ['can_access_system', 'can_access_settings'],
		main: {
			home: {
				buttons: [
					{
						id: 'asg_settings_user_link',
						href: '#!/settings/users',
						icon: 'fas fa-users-cog',
						label: 'Manage Users, Roles &amp; Groups',
						perms: ['can-access-user-settings']
					}
				]
			}
		}

	},

	getData: function () {
		let _settings = asg.util.settings;
	},

	getDatasetAsOptions: function (strDatasetName, strDefaultValue) {
		let _ref = asg.data.system.settings.ref;
		let _data = _ref[strDatasetName].options;
		let _tempSelect = document.createElement('select');
		if (_data != null) {
			for (let i = 0; i < _data.length; i++) {
				let _opt = _data[i];
				let _newOpt = document.createElement('option');
				_newOpt.value = _opt.value;
				_newOpt.text = _opt.label;
				if (_opt.value == strDefaultValue) {
					_newOpt.selected = true;
				}
				_tempSelect.options.add(_newOpt);
			}
		}
		return _tempSelect;
	},

	getMenuById: function (strMenuId) {
		var _menus = asg.data.system.settings.menu_data;
		for (let i = 0; i < _menus.length; i++) {
			var _menu = _menus[i];
			if (_menu.id == strMenuId) {
				return _menu;
			}
		}
		return null;
	},

	initialise: function () {
		let _settings = asg.util.settings;
		let _fn = asg.app.fn;
		var _d = asg.data.system;
		let _init = function () {
			if (_fn.resolvePermissions(_settings.data.permissions)) {
				if (_settings.data.loaded()) {
					_settings.initSettingsHome();
				} else {
					window.setTimeout(_init, 200);
				}
			} else {
				_fn.handleUnauthorisedAccess(_d.current_user, _settings.data.permissions);
			}
		};
		_init();
	},

	initSettingsHome: function () {
		let _settings = asg.util.settings;
		let _ids = asg.conf.ids;
		let _fn = asg.app.fn;
		let _u = asg.util;
		let _templates = asg.data.templates.html.settings;

		let _links = _settings.data.main.home.buttons;
		let _container = document.getElementById(_ids.settings_page_home);
		_container.innerHTML = '';

		for (let i = 0; i < _links.length; i++) {
			let _link = _links[i];
			if (_fn.resolvePermissions(_link.perms)) {
				var objLink = _u.createFromFragment(
					_u.strReplace(_templates.home_page_button, [_link.id, _link.href, _link.icon, _link.label])
				);
				_container.appendChild(objLink);
			}
		}
	},


	view: {
		workbook: null
	},
}

// EOF
