/* SDL Workbook */
if (asg.__etc == null) {
	asg.__etc = {};
}

// Add system data
asg.data.system.sdl = {

	getModel: function () {
		return JSON.stringify(asg.data.system.sdl.workbook);
	},

	workbook: {
		selectedTabIndex: 0,
		tabs: [],
		tabPages: [
			{
				id: 'instructions',
				label: 'Instructions',
				icon: 'fas fa-info-circle',
				link: '#!/test',
				template: '<div id="sdl_process_flow">' +
					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-green">Version Control<i class="fas fa-code-branch"></i><i class="fas fa-code-branch"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Complete the Version Control information for your project or enhancement.</li><li>' +
					'Provide a brief description of the purpose of the project.' +
					'</li></ol></div>' +
					'</div>' +

					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-pink">System Risk Profile<i class="fas fa-exclamation-triangle"></i><i class="fas fa-exclamation-triangle"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Evaluate your project using the System Risk Profile to identify its criticality and determine which steps of the SDL need to be performed.</li><li>' +
					'Consider whether your system adheres to our Security Architechture Principals, found here: <a href="http://go/secprinciples" target="_new">http://go/secprinciples</a>' +
					'</li></ol></div>' +
					'</div>' +

					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-orange">Security Controls Assessment<i class="fas fa-lock"></i><i class="fas fa-lock"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Complete the Security Controls Assessment for each of your project components including the Infrastructure, Platform, Middleware and Application.</li><li>' +
					'For each component identify the standard Suncorp Security Controls in use. </li><li>' +
					'Where a non-standard custom control is being used overwrite the drop down box with details of the control. Provide a full description and reason for the custom control within the Comments box provided.' +
					'</li></div>' +
					'</div>' +

					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-blue">Data Flow Diagram<i class="fas fa-pencil-alt"></i><i class="fas fa-pencil-alt"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Using the Microsoft Threat Modelling tool, create a level 1 Data Flow Diagram for you System.</li><li>' +
					'Name and number each element.' +
					'</li></ol></div>' +
					'</div>' +


					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-red">Element List<i class="far fa-list-alt"></i><i class="far fa-list-alt"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'List each Element from the Data Flow Diagram. </li><li>' +
					'Do not include elements that are not in scope such as underlying platform technologies that provide supporting services (e.g.. Firewalls, API Gateways etc.).' +
					'</li></ol></div>' +
					'</div>' +

					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-purple">Assumptions<i class="far fa-comment"></i><i class="far fa-comment"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Document any assumptions that have been such has all including reliance on supporting services and technology.<br/>Example Assumptions:<ol type="a"><li>' +
					'F5 WAF Boundary firewalls will filter all Internet requests</li><li>' +
					'User access management is provided by Active Directory</li><li>' +
					'Data flows within AWS are secure and are not subject to Information Disclosure or Tampering threats' +
					'</li></ol></li></ol></div>' +
					'</div>' +


					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-brown">Threat List<i class="fas fa-user-secret"></i><i class="fas fa-user-secret"></i></div>' +
					'<div class="orange_arrow_down"></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Identify Threats using STRIDE per Element for each element within scope within your Data Flow Diagram.</li><li>' +
					'Only include threats that are NOT controlled by Suncorp standard security controls outlined within the SCA tab. </li><li>' +
					'Document the Priority of all uncontrolled threats using  High, Medium and Low. </li><li>' +
					'Identify a Residual Risk for each Threat using the Corporate Risk Matrix.</li><li>' +
					'For all uncontrolled threats identify a residual risk and proposed further actions within the comments box.' +
					'</li></div>' +
					'</div>' +


					'<div class="row">' +
					'<div class="col-xs-3">' +
					'<div class="sdl-process-box sdl-process-box-black">Recommendations<i class="fas fa-check"></i><i class="fas fa-check"></i></div>' +
					'</div>' +
					'<div class="col-xs-9"><ol><li>' +
					'Document all threats which are pending further action including their Jira card reference</li><li>' +
					'For all uncontrolled threats where no further action is available to control the threat, consult with your Security Consulting and your CRO Risk Representative to escalate the threat within an Initiative Risk Profile (IRP) for review by the Business Owner.' +
					'</li></ol></div>' +
					'</div>' +


					'</div>'
            },
			{
				id: 'version',
				label: 'Version Control',
				icon: 'fas fa-code-branch',
				link: '#!/sdl/version',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Version Control</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'Use this section to give your project a title and description. You will also be able to review who has edited this workbook.' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/version">Go to Version Control</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'srp',
				label: 'System Risk Profile',
				icon: 'fas fa-exclamation-triangle',
				link: '#!/sdl/srp',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>System Risk Profile</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'This section comprises a short survey to identify the security controls and activities applicable to your project' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/srp">Go to System Risk Profile</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'sca',
				label: 'Security Controls Assessment',
				icon: 'fas fa-lock',
				link: '#!/sdl/sca',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Security Controls Assessment</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'For each component of your project, determine which controls will be used to ameliorate the risks posed by the potential threats identified.' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/sca">Go to Security Controls Assessment</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'dfd',
				label: 'Data Flow Diagram',
				icon: 'fas fa-pencil-alt',
				link: '#!/sdl/dfd',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Data Flow Diagram</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'This tool allows you to create a high-level data flow diagram of your project showing both inbound and outbound data flows.' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/dfd">Go to Data Flow Diagram</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'list',
				label: 'Element List',
				icon: 'far fa-list-alt',
				link: '#!/sdl/list',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Element List</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'The system elements identified in the Data Flow Diagram are listed here. Use STRIDE to evaluate the risks associated with each element.' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/list">Go to Element List</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'assumptions',
				label: 'Assumptions',
				icon: 'far fa-comment',
				link: '#!/sdl/assumptions',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Assumptions</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'Use this section to detail any assumptions and/or dependencies for your project.' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/assumptions">Go to Assumptions</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'threats',
				label: 'Threat List',
				icon: 'fas fa-user-secret',
				link: '#!/threats',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Threat List</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'For threats that are not controlled by Suncorp standard security controls, document the priority of the threat, identify a residual risk and detail proposed further actions in this section .' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/threats">Go to Threat List</a>' +
					'</div></div>' +
					'</div>'
            },
			{
				id: 'recommendations',
				label: 'Recommendations',
				icon: 'fas fa-check',
				link: '#!/recommendations',
				template: '<div>' +
					'<div class="row"><div class="col-xs-12"><h3>Recommendations</h3></div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'Use this section to document any threats which remain uncontrolled or are pending further action, including Jira ticket numbers.' +
					'</div></div>' +
					'<div class="row"><div class="col-xs-12">' +
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/recommendations">Go to Recommendations</a>' +
					'</div></div>' +
					'</div>'
            }
		],
		version: {
			project_name: 'New Project',
			project_desc: 'Add a description of your project here',
			project_status: 'in_progress',
			entries: [
				{
					date: '2018-05-05T14:30',
					version: '0.01',
					description: 'Initial Creation',
					author: 'Gabe Buckley'
				},
				{
					date: '2018-05-07T11:45',
					version: '0.02',
					description: 'Updated Element List',
					author: 'Fred Nurk'
				}
			]
		},
		ins: {},
		vn: {},
		srp: {
			completionDate: null,
			accessControl: 'no',
			accessibility: 'internal_only',
			activities: {},
			aws: 'no',
			change_type: 'static_website',
			creditCardData: 'no',
			critical: 'no',
			dataStored: 'suncorp_operational',
			externalManaged: 'no',
			msb: 'no',
			newTechnology: 'no',
			sanitisedNonProd: 'no',


		},
		sca: {},

	},

	menu_data: [
		{
			id: 'view',
			label: 'View...',
			menu_data: [
				{
					id: 'instructions',
					label: 'Instructions',
					icon: 'fas fa-info-circle',
					link: '#!/sdl'
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
		{
			id: 'file',
			label: 'File...',
			menu_data: [
				{
					id: 'new_workbook',
					label: 'New Workbook',
					icon: 'fas fa-plus-circle',
					link: '#!/sdl'
                },
				{
					id: 'open_workbool',
					label: 'Open Workbook...',
					icon: 'fas fa-folder-open',
					link: '#!/sdl/version'
                },
				{
					id: 'save_workbook',
					label: 'Save Workbook...',
					icon: 'fas fa-save',
					link: '#!/sdl/srp'
                }
            ]

        }
    ],

	lists: {
		lookupTables: [
			{
				id: '',
				label: '',
				prefix: '',
				data: [
					{
						id: '',
						label: ''
                    }
                ]
            },
        ]
	},
};

asg.__etc.dbModals = [
	{
		id: "",
		title: "",
		template: "asg.data.templates.html.vdash.dialogs.addDataListItem"
    }
];
for (var i = 0; i < asg.__etc.dbModals.length; i++) {
	asg.data.lists.site.modals.push(asg.__etc.dbModals[i]);
}

// Add Templates
asg.data.templates.html.sdl = {
	workbook: '<div class="sdl-workbook">' +
		'<div class="sdl-workbook-tabs"></div>' +
		'<div class="sdl-workbook-main"></div>' +
		'</div>',

	workbookTab: '<div id="%1%" class="sdl-workbook-tab arrow_box">' +
		'<i class="%2%"></i><' +
		'span>%3%</span>' +
		'</div>',

	versionControl: '<div id="asg_sdl_version_control">' +
		'<div class="row"><div class="col-xs-7"><h3 id="asg_sdl_project_name_disp"></h3></div>' +
		'<div class="col-xs-5"><label for="asg_sdl_project_status">Project Status:</label> <span class="status-display" id="asg_sdl_project_status"></span></div></div>' +
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_project_name">Project Name:</label></div></div>' +
		'<div class="row"><div class="col-xs-12"><input type="text" id="asg_sdl_project_name" name="asg_sdl_project_name" placeholder="Enter the project name..." /></div></div>' +
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_project_desc">Project Description:</label></div></div>' +
		'<div class="row"><div class="col-xs-12"><textarea id="asg_sdl_project_desc" name="asg_sdl_project_desc"></textarea></div></div>' +
		'<div id="asg_sdl_rev_table"></div>' +
		'<div class="button-bar"><a href="#!/sdl" class="sg-Btn sg-Btn--prev">Back to Workbook</a><a href="#!/sdl/srp" class="sg-Btn sg-Btn--next">System Risk Profile</a></div>' +
		'</div>',

	systemRiskProfile: '<div>' +
		'<div class="row"><div class="col-xs-9">' +
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_project_name">Project or Enhancement Name:</label></div></div>' +
		'<div class="row"><div class="col-xs-12"><input type="text" id="asg_sdl_srp_project_name" name="asg_sdl_srp_project_name" placeholder="Enter the project name..." /></div></div>' +
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_iteration_mgr">Iteration Manager(s):</label></div></div>' +
		'<div class="row"><div class="col-xs-12"><input type="text" id="asg_sdl_srp_iteration_mgr" name="asg_sdl_srp_iteration_mgr" placeholder="Click to select..." /></div></div>' +
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_completion_date">Completion Date:</label></div></div>' +
		'<div class="row"><div class="col-xs-12" id="asg_sdl_srp_completion_date"></div></div>' +
		'</div><div class="col-xs-3"><h4 class="security-rating">Security Rating</h4><div id="asg_sdl_security_rating">L</div></div></div>' +
		'<div class="row"><div class="col-xs-9">' +
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_change_type">This system risk profile applies to a:</label></div></div>' +
		'</div><div class="col-xs-3" id="asg_sdl_srp_change_type"></div></div>' +
		'<div class="row"><div class="col-xs-12"><h3>System Risk Profile</h3></div></div>' +
		'<div class="row"><div class="col-xs-12"><div id="asg_sdl_srp_qns"> </div></div></div>' +
		'<div class="row"><div class="col-xs-12"><div id="asg_sdl_srp_activites"> </div></div></div>' +
		'<div class="button-bar"><a href="#!/sdl/version" class="sg-Btn sg-Btn--prev">Back to Version Control</a><a href="#!/sdl/sca" class="sg-Btn sg-Btn--next">Security Controls Assessment</a></div>' +
		'</div>',


	revisionTable: '<table id="asg_sdl_revision_table">' +
		'<thead><tr><th>&nbsp;</th><th><h3>Date</h3></th><th><h3>Version</h3></th><th><h3>Description</h3></th><th><h3>Author</h3></th></tr></thead><tbody></tbody></table>',

	revisionRow: '<tr><td>%1%</td><td>%2%</td><td>%3%</td><td>%4%</td><td>%5%</td></tr>',

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
			// Workbook elements
			workbook: 'asg_sdl_workbook',
			vn_control: 'asg_sdl_version',
			srp: 'asg_sdl_srp',
			sca: 'asg_sdl_sca',
			el_list: 'asg_sdl_list',
			assumptions: 'asg_sdl_assumptions',
			threats: 'asg_sdl_threats',
			recommendations: 'asg_sdl_recommendations',
		},
		endpoints: {
			DEV: {
				get_support_teams_list: '/site/assets/ws/mocks/get_support_teams_list.json',
			},
			TEST: {
				get_support_teams_list: '/site/assets/ws/mocks/get_support_teams_list.json',
			}
		}
	}
};
for (var confidID in asg.__etc.conf.conf.ids) {
	asg.conf.ids[confidID] = asg.__etc.conf.conf.ids[confidID];
};
for (var confEP in asg.__etc.conf.conf.endpoints) {
	asg.conf.endpoints[confEP] = asg.__etc.conf.conf.endpoints[confEP];
};

// Add StringTable Entries
asg.__etc.sdl = {
	stringTable: {
		// Quick Stats
		qs_chart_title: "Quick Stats:",

		// Open By Days Chart
		obd_chart_tile: "Open Issues (%2%) by Days Open:",
		obd_chart_subtile_1: '* Includes 1 <span class="primary-orange">severe</span> or <span class="primary-orange-dark-25">critical</span> issue that has been open for &gt; 30 days.',
		obd_chart_subtile_2: '* Includes %2% <span class="primary-orange">severe</span> or <span class="primary-orange-dark-25">critical</span> issues that have been open for &gt; 30 days.',

		dl_label2shrt: 'Please enter a value in the Label field',
	}
};
for (var stringID in asg.__etc.sdl.stringTable) {
	asg.data.lists.site.stringTable[stringID] = asg.__etc.sdl.stringTable[stringID];
}

// Copy in dashboard utility functions 
asg.util.sdl = {

	blockUpdate: false,

	data: {
		loaded: function () {
			let _sdl = asg.util.sdl;
			let _loaded = true;

			return _loaded;
		},

	},

	deselectAllTabs: function () {
		let _sdl = asg.u.sdl;
		let _app = asg.app.fn;
		let _data = asg.data.system.sdl;
		let _tabBar = _sdl.view.tabBar;
		let _tabs = _tabBar.children;
		for (let i = 0; i < _tabs.length; i++) {
			let _tab = _tabs[i];
			_app.removeClass(_tab, 'selected');
		}
		_data.workbook.selectedTabIndex = -1;
	},

	drawWorkbook: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.workbook);
		container.innerHTML = "";

		_sdl.view.workbook = _util.createFromFragment(_templates.workbook);

		let _workbook = _sdl.view.workbook;

		let _menu = _sdl.getMenuById('view');

		let _tabBar = _workbook.firstElementChild;


		let _items = _menu.menu_data;

		for (let i = 0; i < _items.length; i++) {
			let _item = _items[i];
			_data.workbook.tabs.push(_item);
			let _tab = _util.createFromFragment(
				_util.strReplace(_templates.workbookTab, [
						'wbtab_' + _item.id,
						_item.icon,
						_item.label
					])
			);
			if (i == _data.workbook.selectedTabIndex) {
				_app.toggleClass(_tab, '', 'selected');
			}
			var _handleClick = function (evt) {
				let _target = evt.currentTarget;
				let _tid = _target.id;
				let _arrId = _tid.split('_');
				if (_arrId.length > 1) {
					let _strId = _arrId[1];
					let _sdl = asg.u.sdl;

					_sdl.selectTab(_strId);
				}
			}
			_tab.addEventListener('click', _handleClick.bind(_tab));

			_tabBar.appendChild(_tab);

		}

		_sdl.view.tabBar = _tabBar;
		_sdl.view.coverPage = _tabBar.nextElementSibling;

		let pageHTML = _sdl.getWorkbookPageHTML(_data.workbook.selectedTabIndex);
		_sdl.view.coverPage.innerHTML = '';
		_sdl.view.coverPage.appendChild(pageHTML);

		container.appendChild(_sdl.view.workbook);
		container.appendChild(_util.createFromFragment('<div class="clear-both margin-below"/>'));
	},

	getData: function () {
		let _sdl = asg.util.sdl;
	},

	getDatasetAsOptions: function (strDatasetName, strDefaultValue) {
		let _ref = asg.data.system.sdl.ref;
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
		var _menus = asg.data.system.sdl.menu_data;
		for (let i = 0; i < _menus.length; i++) {
			var _menu = _menus[i];
			if (_menu.id == strMenuId) {
				return _menu;
			}
		}
		return null;
	},

	getWorkbookPageHTML: function (intIndex) {
		let _data = asg.data.system.sdl;
		let _util = asg.util;
		let _page = _data.workbook.tabPages[intIndex];
		if (_page != null) {
			let _template = _page.template;
			var objEl = _util.createFromFragment(_template);
			return objEl;
		}
		return null;
	},

	initialise: function () {
		let _sdl = asg.util.sdl;
		_sdl.getData();

		let _init = function () {
			if (_sdl.data.loaded()) {
				// initialisation routines here
				asg.u.sdl.drawWorkbook();
			} else {
				window.setTimeout(_init, 200);
			}
		};
		_init();
	},

	refreshSRP: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _ref = _data.ref;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;
		let _titleField = document.getElementById('asg_sdl_srp_project_name');
		if (_titleField) {
			_titleField.value = _data.workbook.version.project_name;
			var _updateField = function () {
				asg.u.sdl.updateModel('version.project_name', this.value);
			}
			_titleField.addEventListener('change', _updateField.bind(_titleField));
		}
		let _changeTypeFieldContainer = document.getElementById('asg_sdl_srp_change_type');
		if (_changeTypeFieldContainer) {
			_changeTypeFieldContainer.innerHTML = '';
			let _changeTypeField = _sdl.getDatasetAsOptions('project_type', _data.workbook.srp.change_type);
			_changeTypeField.id = "asg_sdl_srp_change_type_select";
			var _updateField = function () {
				asg.u.sdl.updateModel('srp.change_type', this.value);
			}
			_changeTypeField.addEventListener('change', _updateField.bind(_changeTypeField));
			_changeTypeFieldContainer.appendChild(_changeTypeField);
		}

		let _compDateContainer = document.getElementById('asg_sdl_srp_completion_date');
		if (_compDateContainer) {

			var compDate = new asg.DatePicker({
				id: 'asg_wb_comp_date',
				target: _compDateContainer,
				value: _data.workbook.srp.completionDate,
				onvaluechange: function (objDatePicker) {
					asg.u.sdl.updateModel('srp.completionDate', objDatePicker.value);
				},
			});
		}
		let _qnsTableContainer = document.getElementById('asg_sdl_srp_qns');
		if (_qnsTableContainer) {
			_qnsTableContainer.innerHTML = '';
			let _qnsTable = document.createElement('table');
			let _qnsTBody = document.createElement('tbody');
			_qnsTable.appendChild(_qnsTBody);

			let _qns = asg.data.system.sdl.ref.srp_qns;
			for (let i = 0; i < _qns.length; i++) {
				let _qn = _qns[i];
				let _tr = document.createElement('tr');
				_tr.id = 'srp_qn_' + _qn.id;
				var _td = document.createElement('td');
				_td.innerHTML = _qn.text;
				_tr.appendChild(_td);

				var _td = document.createElement('td');
				let _sel = _sdl.getDatasetAsOptions(_qn.dataset, _data.workbook.srp[_qn.id]);
				_sel.id = 'srp_qn_resp_' + _qn.id;
				var _updateField = function () {
					asg.u.sdl.updateModel('srp.' + _qn.id, this.value);
				}
				_sel.addEventListener('change', _updateField.bind(_sel));

				_td.appendChild(_sel);
				_tr.appendChild(_td);

				_qnsTBody.appendChild(_tr);
			}
			_qnsTableContainer.appendChild(_qnsTable);
		}

		let _ratingDisplay = document.getElementById('asg_sdl_security_rating');
		if (_ratingDisplay) {
			let severityRating = _ref.securityRating();
			_util.removeClass(_ratingDisplay, 'severity-low');
			_util.removeClass(_ratingDisplay, 'severity-med');
			_util.removeClass(_ratingDisplay, 'severity-hi');
			_util.addClass(_ratingDisplay, severityRating.className);
			_ratingDisplay.innerHTML = severityRating.abbr;
			_ratingDisplay.setAttribute('title', 'This system carries a ' + severityRating.text + ' level of risk.');
		}

		let _activitiesContainer = document.getElementById('asg_sdl_srp_activites');
		if (_activitiesContainer) {
			_activitiesContainer.innerHTML = '';
			var _table = _ref.generateActiviesTable();
			_activitiesContainer.appendChild(_table);
		}
	},

	refreshUI: function () {
		let _sdl = asg.u.sdl;
		let _d1 = new Date();
		_sdl.refreshVersionControl();
		_sdl.refreshSRP();
		let _d2 = new Date();
		return {
			success: true,
			duration: (_d2 - _d1)
		};
	},

	refreshVersionControl: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _ref = _data.ref;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let _nameField = document.getElementById('asg_sdl_project_name');
		let _nameFieldDisp = document.getElementById('asg_sdl_project_name_disp');
		let _descField = document.getElementById('asg_sdl_project_desc');
		if (_nameField) {
			_nameField.value = _data.workbook.version.project_name;
			var _updateField = function () {
				asg.u.sdl.updateModel('version.project_name', this.value);
			};
			_nameField.addEventListener('change', _updateField.bind(_nameField));
		}
		if (_nameFieldDisp) {
			_nameFieldDisp.innerHTML = _data.workbook.version.project_name;
		}
		if (_descField) {
			_descField.innerHTML = _data.workbook.version.project_desc;
		}

		let _statusField = document.getElementById('asg_sdl_project_status');
		if (_statusField) {
			_statusField.setAttribute('data-status', _data.workbook.version.project_status);
			_statusField.innerHTML = _ref.project_status[_data.workbook.version.project_status];
		}

		let _revBlock = document.getElementById('asg_sdl_rev_table');
		if (_revBlock) {
			_revBlock.innerHTML = '';
			let _revs = _data.workbook.version.entries;
			let _revTable = _util.createFromFragment(_templates.revisionTable);
			let _revBody = _revTable.firstElementChild.nextElementSibling;
			for (let i = 0; i < _revs.length; i++) {
				let _rev = _revs[i];
				let _row = _util.createFromFragment(
					_util.strReplace(
						_templates.revisionRow, [
						i + 1,
						moment(_rev.date).format('MMMM Do YYYY, h:mm:ss a'),
						_rev.version,
						_rev.description,
						_rev.author
					]
					)
				);
				_revBody.appendChild(_row);
			}
			_revBlock.appendChild(_revTable);
		}
	},

	selectTab: function (strId) {
		let _sdl = asg.u.sdl;
		let _app = asg.app.fn;
		let _data = asg.data.system.sdl;
		let _tabBar = _sdl.view.tabBar;
		let _tabs = _tabBar.children;
		let _tabPages = _data.workbook.tabPages;

		_sdl.deselectAllTabs();

		for (let i = 0; i < _tabs.length; i++) {
			let _tab = _tabs[i];
			if (_tab.id == 'wbtab_' + strId) {
				_data.workbook.selectedTabIndex = i;
				let pageHTML = _sdl.getWorkbookPageHTML(i);
				_sdl.view.coverPage.innerHTML = '';
				_sdl.view.coverPage.appendChild(pageHTML);
				_app.addClass(_tab, 'selected');
			}
		}
	},

	showVersionControl: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.vn_control);
		container.innerHTML = "";
		_sdl.view.vn = _util.createFromFragment(_templates.versionControl);
		container.appendChild(_sdl.view.vn);

		_sdl.refreshUI();
	},

	showSRP: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.srp);
		container.innerHTML = "";
		_sdl.view.srp = _util.createFromFragment(_templates.systemRiskProfile);
		container.appendChild(_sdl.view.srp);

		_sdl.refreshUI();
	},

	showSCA: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.sca);
	},

	showElementList: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.el_list);
	},

	showAssumptions: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.assumptions);
	},

	showThreatList: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.threats);
	},

	showRecommendations: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.recommendations);
	},

	updateModel: function (strPath, value) {
		let _sdl = asg.u.sdl;
		if (!_sdl.blockUpdate) {
			_sdl.blockUpdate = true;

			var arrPath = strPath.split('.');
			var target = asg.data.system.sdl.workbook;
			var targetParent = asg.data.system.sdl.workbook;
			var strPathFragment = '';
			for (var i = 0; i < arrPath.length; i++) {
				strPathFragment = arrPath[i];
				if (target.hasOwnProperty(strPathFragment)) {
					targetParent = target;
					target = target[strPathFragment];
				}
			}

			targetParent[strPathFragment] = value;
			_sdl.refreshUI();
			_sdl.blockUpdate = false;
		}
	},

	view: {
		workbook: null
	},
}

// EOF
