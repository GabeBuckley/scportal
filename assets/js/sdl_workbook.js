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
				template: ['<div id="sdl_process_flow">',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-green">Version Control<i class="fas fa-code-branch"></i><i class="fas fa-code-branch"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Complete the Version Control information for your project or enhancement.</li><li>',
					'Provide a brief description of the purpose of the project.',
					'</li></ol></div>',
					'</div>',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-pink">System Risk Profile<i class="fas fa-exclamation-triangle"></i><i class="fas fa-exclamation-triangle"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Evaluate your project using the System Risk Profile to identify its criticality and determine which steps of the SDL need to be performed.</li><li>',
					'Consider whether your system adheres to our Security Architechture Principals, found here: <a href="http://go/secprinciples" target="_new">http://go/secprinciples</a>',
					'</li></ol></div>',
					'</div>',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-orange">Security Controls Assessment<i class="fas fa-lock"></i><i class="fas fa-lock"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Complete the Security Controls Assessment for each of your project components including the Infrastructure, Platform, Middleware and Application.</li><li>',
					'For each component identify the standard Suncorp Security Controls in use. </li><li>',
					'Where a non-standard custom control is being used overwrite the drop down box with details of the control. Provide a full description and reason for the custom control within the Comments box provided.',
					'</li></div>',
					'</div>',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-blue">Data Flow Diagram<i class="fas fa-pencil-alt"></i><i class="fas fa-pencil-alt"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Using the Microsoft Threat Modelling tool, create a level 1 Data Flow Diagram for you System.</li><li>',
					'Name and number each element.',
					'</li></ol></div>',
					'</div>',


					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-red">Element List<i class="far fa-list-alt"></i><i class="far fa-list-alt"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'List each Element from the Data Flow Diagram. </li><li>',
					'Do not include elements that are not in scope such as underlying platform technologies that provide supporting services (e.g.. Firewalls, API Gateways etc.).',
					'</li></ol></div>',
					'</div>',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-purple">Assumptions<i class="far fa-comment"></i><i class="far fa-comment"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Document any assumptions that have been such has all including reliance on supporting services and technology.<br/>Example Assumptions:<ol type="a"><li>',
					'F5 WAF Boundary firewalls will filter all Internet requests</li><li>',
					'User access management is provided by Active Directory</li><li>',
					'Data flows within AWS are secure and are not subject to Information Disclosure or Tampering threats',
					'</li></ol></li></ol></div>',
					'</div>',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-brown">Threat List<i class="fas fa-user-secret"></i><i class="fas fa-user-secret"></i></div>',
					'<div class="orange_arrow_down"></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Identify Threats using STRIDE per Element for each element within scope within your Data Flow Diagram.</li><li>',
					'Only include threats that are NOT controlled by Suncorp standard security controls outlined within the SCA tab. </li><li>',
					'Document the Priority of all uncontrolled threats using  High, Medium and Low. </li><li>',
					'Identify a Residual Risk for each Threat using the Corporate Risk Matrix.</li><li>',
					'For all uncontrolled threats identify a residual risk and proposed further actions within the comments box.',
					'</li></div>',
					'</div>',
					'<div class="row">',
					'<div class="col-xs-3">',
					'<div class="sdl-process-box sdl-process-box-black">Recommendations<i class="fas fa-check"></i><i class="fas fa-check"></i></div>',
					'</div>',
					'<div class="col-xs-9"><ol><li>',
					'Document all threats which are pending further action including their Jira card reference</li><li>',
					'For all uncontrolled threats where no further action is available to control the threat, consult with your Security Consulting and your CRO Risk Representative to escalate the threat within an Initiative Risk Profile (IRP) for review by the Business Owner.',
					'</li></ol></div>',
					'</div>',
					'</div>'].join('')
            },
			{
				id: 'version',
				label: 'Version Control',
				icon: 'fas fa-code-branch',
				link: '#!/sdl/version',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Version Control</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'Use this section to give your project a title and description. You will also be able to review who has edited this workbook.',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/version">Go to Version Control</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'srp',
				label: 'System Risk Profile',
				icon: 'fas fa-exclamation-triangle',
				link: '#!/sdl/srp',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>System Risk Profile</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'This section comprises a short survey to identify the security controls and activities applicable to your project',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/srp">Go to System Risk Profile</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'sca',
				label: 'Security Controls Assessment',
				icon: 'fas fa-lock',
				link: '#!/sdl/sca',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Security Controls Assessment</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'For each component of your project, determine which controls will be used to ameliorate the risks posed by the potential threats identified.',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/sca">Go to Security Controls Assessment</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'dfd',
				label: 'Data Flow Diagram',
				icon: 'fas fa-pencil-alt',
				link: '#!/sdl/dfd',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Data Flow Diagram</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'This tool allows you to create a high-level data flow diagram of your project showing both inbound and outbound data flows.',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/dfd">Go to Data Flow Diagram</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'list',
				label: 'Element List',
				icon: 'far fa-list-alt',
				link: '#!/sdl/list',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Element List</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'The system elements identified in the Data Flow Diagram are listed here. Use STRIDE to evaluate the risks associated with each element.',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/list">Go to Element List</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'assumptions',
				label: 'Assumptions',
				icon: 'far fa-comment',
				link: '#!/sdl/assumptions',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Assumptions</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'Use this section to detail any assumptions and/or dependencies for your project.',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/assumptions">Go to Assumptions</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'threats',
				label: 'Threat List',
				icon: 'fas fa-user-secret',
				link: '#!/threats',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Threat List</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'For threats that are not controlled by Suncorp standard security controls, document the priority of the threat, identify a residual risk and detail proposed further actions in this section .',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/threats">Go to Threat List</a>',
					'</div></div>',
					'</div>'].join('')
            },
			{
				id: 'recommendations',
				label: 'Recommendations',
				icon: 'fas fa-check',
				link: '#!/recommendations',
				template: ['<div>',
					'<div class="row"><div class="col-xs-12"><h3>Recommendations</h3></div></div>',
					'<div class="row"><div class="col-xs-12">',
					'Use this section to document any threats which remain uncontrolled or are pending further action, including Jira ticket numbers.',
					'</div></div>',
					'<div class="row"><div class="col-xs-12">',
					'<a class="sg-Btn sg-Btn--next" href="#!/sdl/recommendations">Go to Recommendations</a>',
					'</div></div>',
					'</div>'].join('')
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
		srp: {
			completionDate: null,
			iterationManager: [{
				id: "u345203",
				name: "NERK, Fred",
				type: "user"
			}],
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
		elementList: [
			{
				"id": "S0001",
				"related": [],
				"comments": "",
				"stride": {
					"s": "S",
					"t": "T",
					"r": "R",
					"i": "I",
					"d": "D",
					"e": "E"
				},
				"label": "",
				"type": "system"
			}
		],
		assumptions: {
			assumptions: [],
			dependencies: []
		},
		recommendations: [],
		ins: {},
		vn: {},
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
					link: '#!/sdl/threats'
                },
				{
					id: 'recommendations',
					label: 'Recommendations',
					icon: 'fas fa-check',
					link: '#!/sdl/recommendations'
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
		id: "custom_control_details",
		title: "Custom Control Details",
		template: "asg.data.templates.html.sdl.dialogs.scaCustomControl"
    },
	{
		id: "control_comments",
		title: "Comments",
		template: "asg.data.templates.html.sdl.dialogs.scaSecReviewerComment"
    }
];
for (var i = 0; i < asg.__etc.dbModals.length; i++) {
	asg.data.lists.site.modals.push(asg.__etc.dbModals[i]);
}

// Add Templates
asg.data.templates.html.sdl = {
	assumptions: [
		'<div class="asg-sdl-assumptions-page">',
		' <div class="asg-assumptions-header">',
		'  <h3>Assumptions for: <span id="asg_assumptions_title"></span></h3>',
		' </div>',
		' <div class="asg-assumptions-body">',
		'  <div class="asg-assumptions-table">',
		'   <table>',
		'    <thead>',
		'     <tr><th>&nbsp;</th><th>Assumptions</th><th>',
		'      <div id="asg_add_ass" class="asg-add-button" data-list="assumptions" title="Click to add...">',
		'		<i class="fas fa-plus-circle"></i>',
		'	   </div>',
		'     </th></tr>',
		'    </thead>',
		'    <tbody id="asg_assumptions_table"></tbody>',
		'   </table>',
		'  </div>',
		'  <div class="asg-dependencies-table">',
		'   <table>',
		'    <thead>',
		'     <tr><th>&nbsp;</th><th>Dependencies</th><th>',
		'      <div id="asg_add_dep" class="asg-add-button" data-list="dependencies" title="Click to add...">',
		'		<i class="fas fa-plus-circle"></i>',
		'	   </div>',
		'     </th></tr>',
		'    </thead>',
		'    <tbody id="asg_dependencies_table"></tbody>',
		'   </table>',
		'  </div>',
		' </div>',
		' <div class="button-bar">',
		'  <a href="#!/sdl/list" class="sg-Btn sg-Btn--prev">Back to Element List</a>',
		'  <a href="#!/sdl/threats" class="sg-Btn sg-Btn--next">Threat List</a>',
		' </div>',
		'</div>'
	].join(''),

	elementList: [
		'<div class="asg-sdl-element-list">',
		' <div class="row">',
		'  <div class="col-xs-12">',
		'   <h3 class="asg-element-list-head">Element List For: <span id="sdl_element_list_project_name"></span></h3>',
		'  </div>',
		' </div>',
		' <div class="row">',
		'  <div class="col-xs-12">',
		'   <table>',
		'    <thead>',
		'     <tr>',
		'      <th>Element ID</th>',
		'      <th>Element Type</th>',
		'      <th>Element Name</th>',
		'      <th>Related Elements <span>(If Applicable)</span></th>',
		'      <th>S</th>',
		'      <th>T</th>',
		'      <th>R</th>',
		'      <th>I</th>',
		'      <th>D</th>',
		'      <th>E</th>',
		'      <th>Comments</th>',
		'     </tr>',
		'    </thead>',
		'    <tbody id="asg-sdl-el-list-view"></tbody>',
		'   </table>',
		'  </div>',
		' </div>',
		'<div class="button-bar"><a href="#!/sdl/dfd" class="sg-Btn sg-Btn--prev">Back to Diagram</a><a href="#!/sdl/assumptions" class="sg-Btn sg-Btn--next">Assumptions</a></div>',
		'</div>'
	].join(''),

	elementListRow: [
		'<tr><td>%1%</td><td>%2%</td><td>%3%</td><td><span title="Click to select...">%4%</span></td><td>%5%</td><td>%6%</td>',
		'<td>%7%</td><td>%8%</td><td>%9%</td><td>%10%</td><td><p>%11%</p></td></tr>',
	].join(''),

	recommendations: [
		'<div class="asg-sdl-recommendations-page">',
		' <div class="asg-recommendations-header">',
		'  <h3>Recommendations for: <span id="asg_recommendations_title"></span></h3>',
		' </div>',
		' <div class="asg-recommendations-body">',
		'  <div class="asg-recommendations-table">',
		'   <table>',
		'    <thead>',
		'     <tr><th>&nbsp;</th><th>Recommendations</th><th>',
		'      <div id="asg_add_rec" class="asg-add-button" data-list="recommendations" title="Click to add...">',
		'		<i class="fas fa-plus-circle"></i>',
		'	   </div>',
		'     </th></tr>',
		'    </thead>',
		'    <tbody id="asg_recommendations_table"></tbody>',
		'   </table>',
		'  </div>',
		' <div class="button-bar">',
		'  <a href="#!/sdl/threats" class="sg-Btn sg-Btn--prev">Back to Threat List</a>',
		'  <a href="#!/sdl" class="sg-Btn sg-Btn--next">Done</a>',
		' </div>',
		'</div>'
	].join(''),

	relatedElementPicker: [
		'<div id="asg_related_element_picker" class="asg-element-picker">',
		' <div class="asg-element-picker-body">',
		' </div>',
		'</div>',
	].join(''),

	relatedElementPickerRow: [
		'<div class="asg-element-picker-row"',
		'			 data-parent-id="%5%"',
		'			 data-element-selected="%4%"',
		'            data-element-id="%1%">',
		' <i class="%2%"></i> %3%',
		'</div>'
	].join(''),

	commentEntry: [
		'<div id="asg_comment_picker" class="asg-comment-picker">',
		' <div class="asg-comment-picker-body">',
		'  <textarea>%1%</textarea>',
		' </div>',
		' <div class="asg-comment-picker-buttons">',
		'  <div class="asg-comment-button asg-comment-button-cancel">',
		'   <i class="fas fa-times-circle"></i> Cancel',
		'  </div>',
		'  <div class="asg-comment-button asg-comment-button-ok">',
		'   <i class="fas fa-check-circle"></i> Update',
		'  </div>',
		' </div>',
		'</div>',
	].join(''),

	workbook: ['<div class="sdl-workbook">',
		'<div class="sdl-workbook-tabs"></div>',
		'<div class="sdl-workbook-main"></div>',
		'</div>'].join(''),

	workbookTab: ['<div id="%1%" class="sdl-workbook-tab arrow_box">',
		'<i class="%2%"></i>',
		'<span>%3%</span>',
		'</div>'].join(''),

	versionControl: ['<div id="asg_sdl_version_control">',
		'<div class="row"><div class="col-xs-7"><h3 id="asg_sdl_project_name_disp"></h3></div>',
		'<div class="col-xs-5"><label for="asg_sdl_project_status">Project Status:</label> <span class="status-display" id="asg_sdl_project_status"></span></div></div>',
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_project_name">Project Name:</label></div></div>',
		'<div class="row"><div class="col-xs-12"><input type="text" id="asg_sdl_project_name" name="asg_sdl_project_name" placeholder="Enter the project name..." /></div></div>',
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_project_desc">Project Description:</label></div></div>',
		'<div class="row"><div class="col-xs-12"><textarea id="asg_sdl_project_desc" name="asg_sdl_project_desc"></textarea></div></div>',
		'<div id="asg_sdl_rev_table"></div>',
		'<div class="button-bar"><a href="#!/sdl" class="sg-Btn sg-Btn--prev">Back to Workbook</a><a href="#!/sdl/srp" class="sg-Btn sg-Btn--next">System Risk Profile</a></div>',
		'</div>'].join(''),

	systemRiskProfile: ['<div>',
		'<div class="row"><div class="col-xs-9">',
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_project_name">Project or Enhancement Name:</label></div></div>',
		'<div class="row"><div class="col-xs-12"><input type="text" id="asg_sdl_srp_project_name" name="asg_sdl_srp_project_name" placeholder="Enter the project name..." /></div></div>',
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_iteration_mgr">Iteration Manager(s):</label></div></div>',
		'<div class="row"><div class="col-xs-12" id="asg_sdl_srp_iteration_mgr"></div></div>',
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_completion_date">Completion Date:</label></div></div>',
		'<div class="row"><div class="col-xs-12" id="asg_sdl_srp_completion_date"></div></div>',
		'</div><div class="col-xs-3"><h4 class="security-rating">Security Rating</h4><div id="asg_sdl_security_rating">L</div></div></div>',
		'<div class="row"><div class="col-xs-9">',
		'<div class="row"><div class="col-xs-12"><label for="asg_sdl_srp_change_type">This system risk profile applies to a:</label></div></div>',
		'</div><div class="col-xs-3" id="asg_sdl_srp_change_type"></div></div>',
		'<div class="row"><div class="col-xs-12"><h3>System Risk Profile</h3></div></div>',
		'<div class="row"><div class="col-xs-12"><div id="asg_sdl_srp_qns"> </div></div></div>',
		'<div class="row"><div class="col-xs-12"><div id="asg_sdl_srp_activites"> </div></div></div>',
		'<div class="button-bar"><a href="#!/sdl/version" class="sg-Btn sg-Btn--prev">Back to Version Control</a><a href="#!/sdl/sca" class="sg-Btn sg-Btn--next">Security Controls Assessment</a></div>',
		'</div>'].join(''),

	revisionTable: [
		'<table id="asg_sdl_revision_table">',
		'<thead><tr><th>&nbsp;</th><th><h3>Date</h3></th>',
		'<th><h3>Version</h3></th><th><h3>Description</h3></th>',
		'<th><h3>Author</h3></th></tr></thead><tbody></tbody></table>'].join(''),

	revisionRow: ['<tr><td>%1%</td><td>%2%</td><td>%3%</td><td>%4%</td><td>%5%</td></tr>'].join(''),

	sca_component_selector: [
			'<div class="asg-sca-component-selector" data-component-id="%1%">',
			'	<legend><input type="checkbox" id="cb_%1%" /> %2%</legend>',
			'</div>'].join(''),

	sca_table_display: [
			'<div class="asg-sca-table-display">',
			'<div class="row">',
			'<div class="col-xs-12">',
			'<h3>Security Controls Assessment For: <span id="asg_sca_app_name">%1%</span></h3>',
			'<h4>Please select a System Component for each of the components within your system:</h4>',
			'<div class="asg-sca-component-select" id="asg_sca_component_select">%2%</div>',
			'<table class="asg-sca-table" id="asg_sca_table_component_1">%3%</table>',
			'<table class="asg-sca-table" id="asg_sca_table_component_2">%4%</table>',
			'<table class="asg-sca-table" id="asg_sca_table_component_3">%5%</table>',
			'<table class="asg-sca-table" id="asg_sca_table_component_4">%6%</table>',
			'</div>',
			'</div>',
			'</div>'].join(''),

	sca_table_head: [
			'<thead>',
			'<tr>',
			'<th colspan="2">System Component %1%</th>',
			'<th>%2%</th>',
			'<th>&nbsp;</th>',
			'<th>%3%</th>',
			'</tr>',
			'</thead>'].join(''),

	sca_table_body: [
			'<tbody>',
			'<tr>',
			'<th colspan="2">%1%</th>',
			'<th>Select Standard or Custom Control</th>',
			'<th>TSS Ref</th>',
			'<th>Comments by Security Reviewer</th>',
			'</tr>',
			'%2%',
			'</tbody>'].join(''),

	sca_table_row: [
			'<tr>',
			'<td>%1%</td>',
			'<td>%2%</td>',
			'<td>%3%</td>',
			'<td>%4%</td>',
			'<td title="Click to enter comments...">%5%</td>',
			'</tr>'].join(''),

	sca_table_select: '<select data-qn-id="%1%" data-comp-abbr="%2%">%3%</select>',
	sca_table_option: '<option data-ans-id="%1%" data-qn-id="%2%" data-tss-ref="%3%">%4%</option>',

	dialogs: {
		scaCustomControl: {
			content: [
				'<div class="asg-custom-control-dialog">',
				'<input type="hidden" id="asg_sca_select_ref" />',
				'<div class="asg-instructions">Please enter the details of the custom control:</div>',
				'<textarea id="asg_custom_control_text"></textarea>',
				'</div>'].join(''),

			buttons: [

				{
					class: 'secondary',
					label: 'Cancel',
					handler: 'asg.util.sdl.sca.revertCustomControl'
                },
				{
					class: '',
					label: 'Update',
					handler: 'asg.util.sdl.sca.updateCustomControl'
                }
            ]
		},

		scaSecReviewerComment: {
			content: [
				'<div class="asg-security-reviewer-dialog">',
				'<input type="hidden" id="asg_sca_select_ref" />',
				'<div class="asg-instructions">Please enter your comments:</div>',
				'<textarea id="asg_sec_review_text"></textarea>',
				'</div>'].join(''),

			buttons: [

				{
					class: 'secondary',
					label: 'Cancel',
					handler: 'asg.ui.closeDialog'
                },
				{
					class: '',
					label: 'Update',
					handler: 'asg.util.sdl.sca.updateComments'
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

	refreshAssumptions: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let _assData = _data.workbook.assumptions;

		var _assMain = _sdl.view.assumptions;

		var _removeRow = function (evt) {
			let _data = asg.data.system.sdl;
			let _sdl = asg.u.sdl;
			var _target = evt.currentTarget;
			var _index = parseInt(_target.getAttribute('data-index'), 10);
			var _tbody = _target.parentElement.parentElement.parentElement;
			var _list = _data.workbook.assumptions.dependencies;
			if (_tbody.id == 'asg_assumptions_table') {
				_list = _data.workbook.assumptions.assumptions;
			}
			var _newArray = [];
			for (var i = 0; i < _list.length; i++) {
				if (i != _index) {
					_newArray.push(_list[i]);
				}
			}
			if (_tbody.id == 'asg_assumptions_table') {
				_data.workbook.assumptions.assumptions = _newArray;
			} else {
				_data.workbook.assumptions.dependencies = _newArray;
			}
			_sdl.refreshAssumptions();
		};

		var _handleCommentBoxClick = function (evt) {
			evt.stopPropagation();
		}

		var _handleCellClick = function (evt) {
			let _data = asg.data.system.sdl;
			let _templates = asg.data.templates.html.sdl;
			document.body.click();
			evt.stopPropagation();
			var _target = evt.currentTarget;
			var _row = _target.parentElement;
			var _idCell = _row.firstElementChild;
			var _strRowIndex = parseInt(_idCell.innerText, 10) - 1;
			var _textData = _target.innerHTML;

			var _picker = asg.u.createFromFragment(
				asg.u.strReplace(
					_templates.commentEntry, [_textData]
				)
			);

			_picker.addEventListener('click', _handleCommentBoxClick);

			var pickerCloser = {
				target: _target,
				picker: _picker,
			};
			asg.ui.showDialogScreen();

			var closeFn = function (evt) {
				this.target.removeChild(this.picker);
				asg.ui.hideDialogScreen();
				document.body.removeEventListener('click', this.close);
			};

			pickerCloser.close = closeFn.bind(pickerCloser);

			document.body.addEventListener('click', pickerCloser.close);

			var _okBtn = _picker.lastElementChild.lastElementChild;
			var _doUpdate = function (evt) {
				evt.stopPropagation();
				let _data = asg.data.system.sdl;
				let _sdl = asg.u.sdl;
				var _target = evt.currentTarget;
				var _picker = _target.parentElement.parentElement;
				var _text = _picker.firstElementChild.firstElementChild;
				var _cell = _picker.parentElement;
				var _row = _cell.parentElement;
				var _tbody = _row.parentElement;
				var _idCell = _row.firstElementChild;
				var _index = parseInt(_idCell.innerText, 10) - 1;

				var _list = _data.workbook.assumptions.dependencies;
				if (_tbody.id == 'asg_assumptions_table') {
					_list = _data.workbook.assumptions.assumptions;
				}
				_list[_index] = _text.value;
				_sdl.refreshAssumptions();
				asg.ui.hideDialogScreen();
			}
			_okBtn.addEventListener('click', _doUpdate.bind(this));

			var _cancelBtn = _okBtn.previousElementSibling;
			_cancelBtn.addEventListener('click', pickerCloser.close);

			_target.appendChild(_picker);
			var _text = _picker.firstElementChild.firstElementChild;
			_text.onkeydown = function (evt) {
				evt = evt || window.event;
				if (evt.keyCode == 13) {
					// Enter key pressed
					_okBtn.click();
				}
			}
			_text.focus();
		};

		if (_assMain != null) {
			var _assHead = document.getElementById('asg_assumptions_title');
			if (_data.workbook != null && _data.workbook.version != null) {
				_assHead.innerHTML = _data.workbook.version.project_name;
			}

			var _assTable = document.getElementById('asg_assumptions_table');
			_assTable.innerHTML = '';
			for (var i = 0; i < _assData.assumptions.length; i++) {
				var _del = _util.strReplace(
							[
							'<div class="asg-delete-button" data-index="%1%" title="Click to remove...">',
							'<i class="fas fa-times-circle"></i>',
							'</div>'
							].join(''), [i]
				);

				var _row = _util.createFromFragment(
					_util.strReplace(
						'<tr><td>%1%</td><td title="Click to edit..." >%2%</td><td>%3%</td</tr>', [(i + 1), _assData.assumptions[i], _del]
					)
				);

				var _del = _row.lastElementChild.lastElementChild;
				_del.addEventListener('click', _removeRow.bind(this));

				var _cell = _del.parentElement.previousElementSibling;
				_cell.addEventListener('click', _handleCellClick.bind(this));

				_assTable.appendChild(_row);
			}

			var _depTable = document.getElementById('asg_dependencies_table');
			_depTable.innerHTML = '';
			for (var i = 0; i < _assData.dependencies.length; i++) {
				var _del = _util.strReplace(
							[
							'<div class="asg-delete-button" data-index="%1%" title="Click to remove...">',
							'<i class="fas fa-times-circle"></i>',
							'</div>'
							].join(''), [i]
				);


				var _row = _util.createFromFragment(
					_util.strReplace(
						'<tr><td>%1%</td><td>%2%</td><td>%3%</td</tr>', [(i + 1), _assData.dependencies[i], _del]
					)
				);
				var _del = _row.lastElementChild.lastElementChild;
				_del.addEventListener('click', _removeRow.bind(this));

				var _cell = _del.parentElement.previousElementSibling;
				_cell.addEventListener('click', _handleCellClick.bind(this));

				_depTable.appendChild(_row);
			}
		}
	},

	refreshDiagram: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let _dia = _util.diagram;
		if (_dia != null) {
			let _diaData = asg.data.system.diagram;
			if (_diaData != null && _diaData.model != null && _diaData.model.shapes != null) {
				let _shapes = _diaData.model.shapes;
				for (var i = 0; i < _shapes.length; i++) {
					var _s = _shapes[i];
					if (_s.type == "system") {
						if (_data.workbook != null && _data.workbook.version != null) {
							_s.label = _data.workbook.version.project_name;
							if (asg.data.system.diagram.initialised) {
								_dia.redraw();
							}
						}
					}
				}
			}
		}
	},

	refreshElementList: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;
		let _diagram = asg.data.system.diagram.model;

		var container = document.getElementById(_ids.el_list);
		var _tbody = document.getElementById("asg-sdl-el-list-view");
		if (_tbody != null) {
			var _nameDisplay = document.getElementById("sdl_element_list_project_name");
			_nameDisplay.innerHTML = _data.workbook.version.project_name;

			var currElList = _data.workbook.elementList;

			var _handleCommentBoxClick = function (evt) {
				evt.stopPropagation();
			}

			var getListData = function (strId) {
				var currElList = _data.workbook.elementList;
				for (var i = 0; i < currElList.length; i++) {
					var curEl = currElList[i];
					if (curEl.id == strId) {
						return curEl;
					}
				}
				return null;
			};

			var _handleCommentClick = function (evt) {
				let _data = asg.data.system.sdl;
				let _templates = asg.data.templates.html.sdl;

				evt.stopPropagation();
				var _target = evt.currentTarget;
				var _row = _target.parentElement;
				var _idCell = _row.firstElementChild;
				var _strRowId = _idCell.innerText;
				var _thisListData = getListData(_strRowId);
				var _para = _target.firstElementChild;

				var _picker = asg.u.createFromFragment(
					asg.u.strReplace(
						_templates.commentEntry, [_para.innerHTML]
					)
				);

				_picker.addEventListener('click', _handleCommentBoxClick);

				var pickerCloser = {
					target: _target,
					picker: _picker,
				}
				asg.ui.showDialogScreen();
				var closeFn = function (evt) {
					this.target.removeChild(this.picker);
					asg.ui.hideDialogScreen();
					document.body.removeEventListener('click', this.close);
				}

				pickerCloser.close = closeFn.bind(pickerCloser);

				document.body.addEventListener('click', pickerCloser.close);

				var _okBtn = _picker.lastElementChild.lastElementChild;
				var _doUpdate = function (evt) {
					evt.stopPropagation();
					var _target = evt.currentTarget;
					var _picker = _target.parentElement.parentElement;
					var _text = _picker.firstElementChild.firstElementChild;
					var _cell = _picker.parentElement;
					var _para = _cell.firstElementChild;
					var _row = _cell.parentElement;
					var _idCell = _row.firstElementChild;
					var _elId = _idCell.innerText;

					var _elData = getListData(_elId);
					_elData.comments = _text.value;
					_para.innerHTML = _elData.comments;
					pickerCloser.close();
				}
				_okBtn.addEventListener('click', _doUpdate.bind(this));

				var _cancelBtn = _okBtn.previousElementSibling;
				_cancelBtn.addEventListener('click', pickerCloser.close);

				_target.appendChild(_picker);
				var _text = _picker.firstElementChild.firstElementChild;
				_text.onkeydown = function (evt) {
					evt = evt || window.event;
					if (evt.keyCode == 13) {
						// Enter key pressed
						_okBtn.click();
					}
				}
				_text.focus();
			};

			var _handleSelectRow = function (evt) {
				evt.stopPropagation();
				var _target = evt.currentTarget;
				var _id = _target.getAttribute('data-element-id');
				var _parentId = _target.getAttribute('data-parent-id');

				var _picker = _target.parentElement.parentElement;
				var _disp = _picker.parentElement.firstElementChild;

				var _icon = _target.firstElementChild;
				var _listData = getListData(_parentId);

				var _isSelected = eval(_target.getAttribute('data-element-selected'));
				if (_isSelected) {
					_target.setAttribute('data-element-selected', 'false');
					_icon.setAttribute('class', 'far fa-square');
					_listData.related = asg.util.removeFromArray(_listData.related, _id);
				} else {
					_target.setAttribute('data-element-selected', 'true');
					_icon.setAttribute('class', 'fas fa-check-square');
					_listData.related.push(_id);
				}

				_disp.innerHTML = _listData.related.join(', ');
			};

			var _handleRelatedClick = function (evt) {
				evt.stopPropagation();
				let _data = asg.data.system.sdl;
				let _templates = asg.data.templates.html.sdl;
				asg.ui.showDialogScreen();
				var _target = evt.currentTarget;
				var _picker = asg.u.createFromFragment(
					_templates.relatedElementPicker,
				);
				var _pickerBody = _picker.firstElementChild;
				let _els = _data.workbook.elementList
				var _row = _target.parentElement;
				var _idCell = _row.firstElementChild;
				var _strRowId = _idCell.innerText;
				var _thisListData = getListData(_strRowId);

				for (var i = 0; i < _els.length; i++) {
					var _el = _els[i];
					if (_el.id != _thisListData.id) {
						// Current Element can't be related to itself
						var strIClass = 'far fa-square';
						var isSelected = 'false';
						if (asg.util.arrayContains(_thisListData.related, _el.id)) {
							strIClass = 'fas fa-check-square';
							isSelected = 'true';
						}
						var _elrow = asg.u.createFromFragment(
							asg.u.strReplace(
								_templates.relatedElementPickerRow, [
								_el.id,
								strIClass,
								_el.id + ': ' + _el.label,
								isSelected,
								_thisListData.id
							]
							)
						);
						_elrow.addEventListener('click', _handleSelectRow.bind(this))
						_pickerBody.appendChild(_elrow);
					}
				}

				var pickerCloser = {
					target: _target,
					picker: _picker,
				}

				var closeFn = function (evt) {
					this.target.removeChild(this.picker);
					asg.ui.hideDialogScreen();
					document.body.removeEventListener('click', this.close);
				}

				pickerCloser.close = closeFn.bind(pickerCloser);

				document.body.addEventListener('click', pickerCloser.close);

				_target.appendChild(_picker);
			};

			var validateStride = function (objEl, objElData) {
				if (objEl.type == 'system') {
					objElData.stride = {
						s: 'S',
						t: 'T',
						r: 'R',
						i: 'I',
						d: 'D',
						e: 'E'
					};
				}

				if (objEl.type == 'external_system') {
					objElData.stride = {
						s: 'S',
						t: 'T',
						r: 'R',
						i: 'I',
						d: 'D',
						e: 'E'
					};
				}

				if (objEl.type == 'data_flow') {
					objElData.stride = {
						s: '',
						t: 'T',
						r: '',
						i: 'I',
						d: 'D',
						e: ''
					};
				}

				if (objEl.type == 'data_store') {
					objElData.stride = {
						s: '',
						t: 'T',
						r: '?',
						i: 'I',
						d: 'D',
						e: ''
					};
				}

				return objElData;
			};

			var _shapesList = _diagram.shapes.slice(0);

			_shapesList.sort(function (a, b) {
				var aId = parseInt(a.id.slice(-4, a.id.length), 10);
				var bId = parseInt(b.id.slice(-4, b.id.length), 10);

				if (a.type == b.type) {
					return (aId - bId);
				}
				if (a.type == 'system') {
					return -1;
				}
				if (a.type == 'external_system' && (b.type == 'data_flow' || b.type == 'data_store')) {
					return -1;
				} else {
					return 1;
				}
				if (a.type == 'data_flow' && b.type == 'data_store') {
					return -1;
				} else {
					return 1;
				}
				if (a.type == 'data_store') {
					return 1;
				}
			});

			for (var i = 0; i < _shapesList.length; i++) {
				var _el = _shapesList[i];
				var _elData = getListData(_el.id);
				if (_elData == null) {
					_elData = {
						id: _el.id,
						related: [],
						comments: '',
						stride: {
							s: 'S',
							t: 'T',
							r: 'R',
							i: 'I',
							d: 'D',
							e: 'E'
						}
					}
					_data.workbook.elementList.push(_elData);
				}
				_elData.label = _el.label;
				_elData.type = _el.type;
				_elData = validateStride(_el, _elData);

				var _row = asg.u.createFromFragment(
					asg.u.strReplace(
						_templates.elementListRow, [
						_elData.id,
						_elData.type,
						_elData.label,
						_elData.related,
						_elData.stride.s,
						_elData.stride.t,
						_elData.stride.r,
						_elData.stride.i,
						_elData.stride.d,
						_elData.stride.e,
						_elData.comments
					]
					)
				);

				var _relCell = _row.children[3];
				_relCell.addEventListener('click', _handleRelatedClick.bind(this));

				var _comCell = _row.children[10];
				_comCell.addEventListener('click', _handleCommentClick.bind(this));

				_tbody.appendChild(_row);
			};
		}
	},

	refreshRecommendations: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let _recData = _data.workbook.recommendations;

		var _recMain = _sdl.view.recommendations;

		var _removeRow = function (evt) {
			let _data = asg.data.system.sdl;
			let _sdl = asg.u.sdl;
			var _target = evt.currentTarget;
			var _index = parseInt(_target.getAttribute('data-index'), 10);
			var _tbody = _target.parentElement.parentElement.parentElement;
			var _list = _data.workbook.recommendations;

			var _newArray = [];
			for (var i = 0; i < _list.length; i++) {
				if (i != _index) {
					_newArray.push(_list[i]);
				}
			}

			_data.workbook.recommendations = _newArray;

			_sdl.refreshRecommendations();
		};

		var _handleCommentBoxClick = function (evt) {
			evt.stopPropagation();
		}

		var _handleCellClick = function (evt) {
			let _data = asg.data.system.sdl;
			let _templates = asg.data.templates.html.sdl;
			document.body.click();
			evt.stopPropagation();
			var _target = evt.currentTarget;
			var _row = _target.parentElement;
			var _idCell = _row.firstElementChild;
			var _strRowIndex = parseInt(_idCell.innerText, 10) - 1;
			var _textData = _target.innerHTML;

			var _picker = asg.u.createFromFragment(
				asg.u.strReplace(
					_templates.commentEntry, [_textData]
				)
			);

			asg.ui.showDialogScreen();

			_picker.addEventListener('click', _handleCommentBoxClick);

			var pickerCloser = {
				target: _target,
				picker: _picker,
			};

			var closeFn = function (evt) {
				asg.ui.hideDialogScreen();
				this.target.removeChild(this.picker);
				document.body.removeEventListener('click', this.close);
			};

			pickerCloser.close = closeFn.bind(pickerCloser);

			document.body.addEventListener('click', pickerCloser.close);

			var _okBtn = _picker.lastElementChild.lastElementChild;
			var _doUpdate = function (evt) {
				evt.stopPropagation();
				let _data = asg.data.system.sdl;
				let _sdl = asg.u.sdl;
				var _target = evt.currentTarget;
				var _picker = _target.parentElement.parentElement;
				var _text = _picker.firstElementChild.firstElementChild;
				var _cell = _picker.parentElement;
				var _row = _cell.parentElement;
				var _tbody = _row.parentElement;
				var _idCell = _row.firstElementChild;
				var _index = parseInt(_idCell.innerText, 10) - 1;

				var _list = _data.workbook.recommendations;

				_list[_index] = _text.value;
				_sdl.refreshRecommendations();
			}
			_okBtn.addEventListener('click', _doUpdate.bind(this));

			var _cancelBtn = _okBtn.previousElementSibling;
			_cancelBtn.addEventListener('click', pickerCloser.close);

			_target.appendChild(_picker);
			var _text = _picker.firstElementChild.firstElementChild;
			_text.onkeydown = function (evt) {
				evt = evt || window.event;
				if (evt.keyCode == 13) {
					// Enter key pressed
					_okBtn.click();
				}
			}
			_text.focus();
		};

		if (_recMain != null) {
			var _recHead = document.getElementById('asg_recommendations_title');
			_recHead.innerHTML = _data.workbook.version.project_name;

			var _recTable = document.getElementById('asg_recommendations_table');
			_recTable.innerHTML = '';
			for (var i = 0; i < _recData.length; i++) {
				var _del = _util.strReplace(
							[
							'<div class="asg-delete-button" data-index="%1%" title="Click to remove...">',
							'<i class="fas fa-times-circle"></i>',
							'</div>'
							].join(''), [i]
				);

				var _row = _util.createFromFragment(
					_util.strReplace(
						'<tr><td>%1%</td><td title="Click to edit..." >%2%</td><td>%3%</td</tr>', [(i + 1), _recData[i], _del]
					)
				);

				var _del = _row.lastElementChild.lastElementChild;
				_del.addEventListener('click', _removeRow.bind(this));

				var _cell = _del.parentElement.previousElementSibling;
				_cell.addEventListener('click', _handleCellClick.bind(this));

				_recTable.appendChild(_row);
			}
		}
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

		let _itMgrContainer = document.getElementById('asg_sdl_srp_iteration_mgr');
		if (_itMgrContainer) {

			var itMgr = new asg.UserPicker({
				id: 'asg_wb_it_mgr',
				target: _itMgrContainer,
				value: _data.workbook.srp.iterationManager,
				userTree: asg.data.user_data,
				idField: ['id'],
				displayField: ['name', 'label'],
				onvaluechange: function (objUserPicker) {
					asg.u.sdl.updateModel('srp.iterationManager', objUserPicker.value);
				},
			});
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
		_sdl.refreshDiagram();
		_sdl.refreshElementList();
		_sdl.refreshAssumptions();
		_sdl.refreshRecommendations();
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

	sca: {

		collateAnswers: function (_abbr, _qn, _ans) {
			let _u = asg.u;
			let _sdl = asg.u.sdl;
			let _templates = asg.data.templates.html.sdl;

			var _matched = [];
			for (var i = 0; i < _ans.length; i++) {
				var _an = _ans[i];
				if (_an.qn_ref == _qn.id) {
					if (_an.applicable.indexOf(_abbr) >= 0) {
						var _formattedAnswer = _u.strReplace(
							_templates.sca_table_option, [
								_an.id,
								_an.qn_ref,
								_an.tss_ref,
								_an.label
							]
						);

						_matched.push(_formattedAnswer);
					}
				}
			}

			var _select = _u.strReplace(
				_templates.sca_table_select, [
					_qn.id,
					_abbr,
					_matched.join('')
				]
			);

			return _select;
		},

		compileSCATable: function (_qn, _ans) {
			let _u = asg.u;
			let _sdl = asg.u.sdl;
			let _templates = asg.data.templates.html.sdl;
			var _cats = _qn.categories;
			var _bs = [];
			for (var i = 0; i < _cats.length; i++) {
				var _cat = _cats[i];
				var _b = _sdl.sca.compileSCATableBody(_qn.abbr, _cat, _ans);
				_bs.push(_b);
			}

			var _head = _u.strReplace(
				_templates.sca_table_head, [
					_qn.id,
					_qn.label,
					'DESCRIPTION'
				]
			);

			return _head + _bs.join('');
		},

		compileSCATableBody: function (_abbr, _cat, _ans) {
			let _u = asg.u;
			let _sdl = asg.u.sdl;
			let _templates = asg.data.templates.html.sdl;
			let _qns = _cat.questions;
			var _qs = [];
			for (var i = 0; i < _qns.length; i++) {
				var _qn = _qns[i];
				var _answers = _sdl.sca.collateAnswers(_abbr, _qn, _ans);
				var _q = _u.strReplace(
					_templates.sca_table_row, [
						_qn.id,
						_qn.label,
						_answers,
						'',
						''
					]
				);

				_qs.push(_q);
			}

			var _body = _u.strReplace(
				_templates.sca_table_body, [
					_cat.label,
					_qs.join('')
				]
			);

			return _body;
		},

		setSelectorEvents: function () {
			var toggleTable = function (evt) {
				var componentNum = this.getAttribute('data-component-id');
				var componentTable = document.getElementById('asg_sca_table_component_' + componentNum);
				var _cb = this.firstElementChild.firstElementChild;
				var shown = _cb.checked;
				if (shown) {
					componentTable.style.display = "table";
				} else {
					componentTable.style.display = "none";
				}

			}

			var display = document.getElementById('asg_sca_component_select');
			var selectors = display.children;
			for (var i = 0; i < selectors.length; i++) {
				var selector = selectors[i];
				var cb = selector.firstElementChild.firstElementChild;
				cb.addEventListener('change', toggleTable.bind(selector));
			}
		},

		setAnswerEvents: function () {
			let _ids = asg.conf.ids;

			var _handleSelectChange = function (evt) {
				var selectedOpt = this.options[this.selectedIndex];
				if (selectedOpt.hasAttribute('data-tss-ref')) {
					// Standard Control Selected
					var _myCell = this.parentElement;
					var tssCell = _myCell.nextElementSibling;
					tssCell.innerHTML = selectedOpt.getAttribute('data-tss-ref');

					if (this.nextElementSibling != null) {
						this.parentElement.removeChild(this.nextElementSibling);
					}
				} else {
					if (selectedOpt.innerHTML == '-- Custom Control --') {
						asg.ui.showDialog('custom_control_details', {
							size: 'medium',
						});
						var idField = document.getElementById('asg_sca_select_ref');
						idField.value = this.getAttribute('data-comp-abbr') +
							'_' + this.getAttribute('data-qn-id');
						idField.nextElementSibling.nextElementSibling.focus();
					} else {
						if (this.nextElementSibling != null) {
							this.parentElement.removeChild(this.nextElementSibling);
						}
					}
					var _myCell = this.parentElement;
					var tssCell = _myCell.nextElementSibling;
					tssCell.innerHTML = '';
				}
			}

			var _handleCommentClick = function (evt) {
				var _sel = this.previousElementSibling.previousElementSibling.firstElementChild;

				asg.ui.showDialog('control_comments', {
					size: 'medium',
				});

				var idField = document.getElementById('asg_sca_select_ref');
				idField.value = _sel.getAttribute('data-comp-abbr') +
					'_' + _sel.getAttribute('data-qn-id');
				var _tarea = idField.nextElementSibling.nextElementSibling;
				_tarea.value = this.innerText;
				_tarea.focus();
			}

			var disp = document.getElementById(_ids.sca);
			var answerFields = disp.getElementsByTagName('select');
			for (var i = 0; i < answerFields.length; i++) {
				var _sel = answerFields[i];
				asg.util.insertOption(
					_sel, {
						innerHTML: '-- Please Select --'
					}, 0
				);
				asg.util.insertOption(
					_sel, {
						innerHTML: '-- Custom Control --'
					}
				);

				_sel.addEventListener('change', _handleSelectChange.bind(_sel));
				var _com = _sel.parentElement.nextElementSibling.nextElementSibling;
				_com.addEventListener('click', _handleCommentClick.bind(_com));
			}
		},

		revertCustomControl: function () {
			let _ids = asg.conf.ids;

			var idField = document.getElementById('asg_sca_select_ref');
			var arrId = idField.value.split('_');
			if (arrId.length > 1) {
				var compAbbr = arrId[0];
				var qndId = arrId[1];
				var disp = document.getElementById(_ids.sca);
				var answerFields = disp.getElementsByTagName('select');
				for (var i = 0; i < answerFields.length; i++) {
					var _sel = answerFields[i];
					if ((_sel.getAttribute('data-comp-abbr') == compAbbr) &&
						(_sel.getAttribute('data-qn-id') == qndId)) {
						_sel.selectedIndex = 0;
						if (_sel.nextElementSibling != null) {
							_sel.parentElement.removeChild(_sel.nextElementSibling);
						}
						break;
					}
				}
				asg.ui.closeDialog();
			}
		},

		updateCustomControl: function () {
			let _ids = asg.conf.ids;

			var idField = document.getElementById('asg_sca_select_ref');
			var arrId = idField.value.split('_');
			if (arrId.length > 1) {
				var compAbbr = arrId[0];
				var qndId = arrId[1];
				var disp = document.getElementById(_ids.sca);
				var answerFields = disp.getElementsByTagName('select');
				for (var i = 0; i < answerFields.length; i++) {
					var _sel = answerFields[i];
					if ((_sel.getAttribute('data-comp-abbr') == compAbbr) &&
						(_sel.getAttribute('data-qn-id') == qndId)) {
						if (_sel.nextElementSibling != null) {
							_sel.parentElement.removeChild(_sel.nextElementSibling);
						}
						var _details = document.createElement('div');
						var _text = idField.nextElementSibling.nextElementSibling.value;
						_details.innerText = _text;
						_sel.parentElement.appendChild(_details);
						break;
					}
				}
				asg.ui.closeDialog();
			}
		},

		updateComments: function () {
			let _ids = asg.conf.ids;

			var idField = document.getElementById('asg_sca_select_ref');
			var arrId = idField.value.split('_');
			if (arrId.length > 1) {
				var compAbbr = arrId[0];
				var qndId = arrId[1];
				var disp = document.getElementById(_ids.sca);
				var answerFields = disp.getElementsByTagName('select');
				for (var i = 0; i < answerFields.length; i++) {
					var _sel = answerFields[i];
					if ((_sel.getAttribute('data-comp-abbr') == compAbbr) &&
						(_sel.getAttribute('data-qn-id') == qndId)) {

						var _cell = _sel.parentElement.nextElementSibling.nextElementSibling;
						_cell.innerHTML = '';
						var _details = document.createElement('div');
						var _text = idField.nextElementSibling.nextElementSibling.value;
						_details.innerText = _text;
						_cell.appendChild(_details);
						break;
					}
				}
				asg.ui.closeDialog();
			}
		}

	},

	showSCA: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;
		let _ref = _data.ref;

		let container = document.getElementById(_ids.sca);
		container.innerHTML = '';

		let _qns = _ref.sca.tss_controls.qns;
		let _ans = _ref.sca.tss_controls.ans;

		var _cs = [];
		for (var i = 0; i < _qns.length; i++) {
			var _qn = _qns[i];
			_c = _util.strReplace(
				_templates.sca_component_selector, [
					_qn.id,
					_qn.label
				]
			);
			_cs.push(_c);
		}

		var _ts = [];

		for (var i = 0; i < _qns.length; i++) {
			var _qn = _qns[i];
			var _t = _sdl.sca.compileSCATable(_qn, _ans);
			_ts.push(_t);
		}

		var _tableDisp = _util.createFromFragment(
			_util.strReplace(
				_templates.sca_table_display, [
					_data.workbook.version.project_name,
					_cs.join(''),
					(_ts[0] != null ? _ts[0] : ''),
					(_ts[1] != null ? _ts[1] : ''),
					(_ts[2] != null ? _ts[2] : ''),
					(_ts[3] != null ? _ts[3] : '')
				]
			)
		);

		container.appendChild(_tableDisp);
		_sdl.sca.setSelectorEvents();
		_sdl.sca.setAnswerEvents();

	},

	showElementList: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.el_list);
		container.innerHTML = '';

		_sdl.view.elementList = _util.createFromFragment(_templates.elementList);
		container.appendChild(_sdl.view.elementList);


		_sdl.refreshUI();
	},

	showAssumptions: function () {
		let _sdl = asg.u.sdl;
		let _util = asg.util;
		let _ids = asg.conf.ids;
		let _data = asg.data.system.sdl;
		let _templates = asg.data.templates.html.sdl;
		let _app = asg.app.fn;

		let container = document.getElementById(_ids.assumptions);

		container.innerHTML = '';

		_sdl.view.assumptions = _util.createFromFragment(_templates.assumptions);
		container.appendChild(_sdl.view.assumptions);

		var _addRow = function (evt) {
			let _data = asg.data.system.sdl;
			let _sdl = asg.u.sdl;
			var _target = evt.currentTarget;
			var _list = _target.getAttribute("data-list");
			var _dataList = _data.workbook.assumptions[_list];
			_dataList.push('');
			_sdl.refreshAssumptions();

			var _tbody = _target.parentElement.parentElement.parentElement.nextElementSibling;
			var _cell = _tbody.lastElementChild.firstElementChild.nextElementSibling;
			var _clickMe = function () {
				this.click();
			};
			var _clickFn = _clickMe.bind(_cell);
			window.setTimeout(_clickFn, 50);
		};

		var _addAssBtn = document.getElementById('asg_add_ass')
		_addAssBtn.addEventListener('click', _addRow.bind(this));
		var _addDepBtn = document.getElementById('asg_add_dep')
		_addDepBtn.addEventListener('click', _addRow.bind(this));

		_sdl.refreshUI();
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

		container.innerHTML = '';

		_sdl.view.recommendations = _util.createFromFragment(_templates.recommendations);
		container.appendChild(_sdl.view.recommendations);

		var _addRow = function (evt) {
			let _data = asg.data.system.sdl;
			let _sdl = asg.u.sdl;
			var _target = evt.currentTarget;
			var _list = _target.getAttribute("data-list");
			var _dataList = _data.workbook[_list];
			_dataList.push('');
			_sdl.refreshRecommendations();

			var _tbody = _target.parentElement.parentElement.parentElement.nextElementSibling;
			var _cell = _tbody.lastElementChild.firstElementChild.nextElementSibling;
			var _clickMe = function () {
				this.click();
			};
			var _clickFn = _clickMe.bind(_cell);
			window.setTimeout(_clickFn, 50);
		};

		var _addRecBtn = document.getElementById('asg_add_rec')
		_addRecBtn.addEventListener('click', _addRow.bind(this));

		_sdl.refreshUI();
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
