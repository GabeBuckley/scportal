// This file contains the reference and lookup data for the SDL component
if (asg.__etc == null) {
	asg.__etc = {};
}

asg.__etc.SDL_DATA = {
	accessibility: {
		label: "Accessibility",
		options: [
			{
				value: "internal_only",
				label: "Internal Only"
			},
			{
				value: "public_facing",
				label: "Public Facing"
			}
		]
	},

	content_type: {
		label: "Content Type",
		options: [
			{
				value: "flat_static_text",
				label: "Flat Static Text"
			},
			{
				value: "database_driven_text",
				label: "Database Driven Text"
			},
			{
				value: "customer_account_access",
				label: "Customer Account Access"
			},
			{
				value: "bank_transactional",
				label: "Bank Transactional"
			}
		]
	},

	control_provider: {
		label: "Control Provider",
		options: [
			{
				value: "corporate",
				label: "Corporate"
			},
			{
				value: "aws",
				label: "AWS"
			},
			{
				value: "customer",
				label: "Customer"
			},
			{
				value: "custom",
				label: "Custom"
			}
		]
	},

	control_status: {
		label: "Control Status",
		options: [
			{
				value: "controlled",
				label: "Controlled - No Further Action Required"
			},
			{
				value: "will_not_be_controlled",
				label: "Will not be Controlled"
			},
			{
				value: "pending_further_action",
				label: "Pending further action"
			},
			{
				value: "na",
				label: "N/A"
			}
		]
	},

	data_flow: {
		label: "Data Flow",
		options: [
			{
				value: "tampering",
				label: "Tampering"
			},
			{
				value: "information_disclosure",
				label: "Information Disclosure"
			},
			{
				value: "dos",
				label: "Denial of Service"
			}
		]
	},

	data_store: {
		label: "Data Store",
		options: [
			{
				value: "tampering",
				label: "Tampering"
			},
			{
				value: "information_disclosure",
				label: "Information Disclosure"
			},
			{
				value: "dos",
				label: "Denial of Service"
			}
		]
	},

	dread: {
		label: "Dread",
		options: [
			{
				value: "high",
				label: "High"
			},
			{
				value: "med",
				label: "Med"
			},
			{
				value: "low",
				label: "Low"
			}
		]
	},

	entity_types: {
		label: "Entity Types",
		options: [
			{
				value: "external_entity",
				label: "External_Entity"
			},
			{
				value: "data_store",
				label: "Data_Store"
			},
			{
				value: "process",
				label: "Process"
			},
			{
				value: "data_flow",
				label: "Data_Flow"
			}
		]
	},

	external_entity: {
		label: "External Entity",
		options: [
			{
				value: "spoofing",
				label: "Spoofing"
			},
			{
				value: "repudiation",
				label: "Repudiation"
			}
		]
	},

	generateActiviesTable: function () {
		var _ref = asg.data.system.sdl.ref;
		var _model = asg.data.system.sdl.workbook;
		_model.srp['severity_rating'] = _ref.securityRating();

		var _table = document.createElement('table');
		var _thead = document.createElement('thead');
		var _tbody = document.createElement('tbody');

		var _trow = document.createElement('tr');
		var _cell = document.createElement('th');
		_cell.className = 'table-header';
		_cell.colSpan = 4;
		_cell.innerHTML = 'SDL Activities';
		_trow.appendChild(_cell);
		_thead.appendChild(_trow);

		var _phases = _ref.sdl_activity_phases;
		for (var a = 0; a < _phases.length; a++) {
			var _phase = _phases[a];
			_trow = document.createElement('tr');
			_cell = document.createElement('td');
			_cell.className = 'phase-header';
			_cell.colSpan = 5;
			_cell.innerHTML = _phase.label;
			_trow.appendChild(_cell);
			_tbody.appendChild(_trow);

			var _cats = _ref.sdl_activity_phase_categories[_phase.id];
			for (var b = 0; b < _cats.length; b++) {
				var _cat = _cats[b];
				_trow = document.createElement('tr');
				_cell = document.createElement('td');
				_cell.className = 'spacer-cell';
				_trow.appendChild(_cell);
				_cell = document.createElement('td');
				_cell.className = 'cat-header';
				_cell.colSpan = 4;
				_cell.innerHTML = _cat.label;
				_trow.appendChild(_cell);
				_tbody.appendChild(_trow);
				_table.appendChild(_thead);

				var _actCats = _ref.sdl_activities[_phase.id];
				var _acts = _actCats[_cat.id];
				for (var c = 0; c < _acts.length; c++) {
					var _act = _acts[c];
					if (!_model.srp.activities[_act.id]) {
						_model.srp.activities[_act.id] = _act;
					}
					var _modelAct = _model.srp.activities[_act.id];
					_modelAct.required = eval(_modelAct.threshold);
					_trow = document.createElement('tr');
					_trow.className = 'data-row';
					if (_modelAct.done) {
						_trow.className = 'data-row task-done';
					}

					_cell = document.createElement('td');
					_cell.className = 'spacer-cell';
					_trow.appendChild(_cell);

					_cell = document.createElement('td');
					_cell.innerHTML = _modelAct.text;
					_trow.appendChild(_cell);

					_cell = document.createElement('td');
					_cell.innerHTML = (_modelAct.required ? 'REQUIRED' : 'NOT REQUIRED');
					_cell.className = (_modelAct.required ? 'act-required' : 'act-optional');
					_trow.appendChild(_cell);

					_cell = document.createElement('td');
					var _cbox = document.createElement('input');
					_cbox.type = 'checkbox';
					_cbox.id = 'sdl_act_' + _modelAct.id;
					_cbox.checked = _modelAct.done;
					var _modelActID = _modelAct.id;
					var _updateField = function (evt) {
						var _target = evt.target;
						var _targetId = _target.id;
						var _arrId = _targetId.split('_');
						var _targetId = _arrId.pop();
						asg.u.sdl.updateModel('srp.activities.' + _targetId + '.done', this.checked);
					};
					_cbox.addEventListener('change', _updateField.bind(_cbox));

					_cell.appendChild(_cbox);
					_trow.appendChild(_cell);

					_cell = document.createElement('td');
					_cell.className = 'spacer-cell';
					_trow.appendChild(_cell);

					_tbody.appendChild(_trow);

				}
				_trow = document.createElement('tr');
				_cell = document.createElement('td');
				_cell.className = 'phase-header';
				_cell.colSpan = 5;
				_trow.appendChild(_cell);
				_tbody.appendChild(_trow);
				_table.appendChild(_tbody);
			}
		}

		return _table;
	},

	getThreatData: function (strSeverity, strLikelihood) {
		let level = asg.data.system.sdl.ref.threatMatrix(strSeverity, strLikelihood);
		if (level != null) {
			level.colours = asg.data.system.sdl.ref.threatColours[level.value];
		}
		return level;
	},

	likelihood: {
		label: "Likelihood",
		options: [
			{
				value: "rare",
				label: "Rare"
			},
			{
				value: "unlikely",
				label: "Unlikely"
			},
			{
				value: "possible",
				label: "Possible"
			},
			{
				value: "likely",
				label: "Likely"
			},
			{
				value: "certain",
				label: "Almost Certain"
			}
		]
	},

	process: {
		label: "Process",
		options: [
			{
				value: "spoofing",
				label: "Spoofing"
			},
			{
				value: "tampering",
				label: "Tampering"
			},
			{
				value: "repudiation",
				label: "Repudiation"
			},
			{
				value: "information_disclosure",
				label: "Information Disclosure"
			},
			{
				value: "dos",
				label: "Denial of Service"
			},
			{
				value: "elevation_of_privilege",
				label: "Elevation of Privilege"
			}
		]
	},

	project_status: {
		in_progress: "Review In Progress",
		completed: "Review Completed",
		ongoing: "Further Analysis Required"
	},

	project_type: {
		label: "Project Type",
		options: [
			{
				value: "static_website",
				label: "Simple Static Website"
			},
			{
				value: "dynamic_website",
				label: "Dynamic Website or Web Application"
			},
			{
				value: "scripting",
				label: "Scripting or Data Manipulation"
			},
			{
				value: "commercial_product",
				label: "Commercial Product (No Customisation)"
			},
			{
				value: "custom_product",
				label: "Commercial Product (with Customisation)"
			},
			{
				value: "api_middleware",
				label: "API or Middleware"
			},
			{
				value: "software",
				label: "Software or Physical Appliance"
			}
		]
	},

	sca: {
		tss_controls: {
			app_components: [
				{
					id: "platform",
					label: "Platform",
					abbr: "pl"
				},
				{
					id: "middleware",
					label: "Middleware",
					abbr: "mi"
				},
				{
					id: "application",
					label: "Application",
					abbr: "pl"
				},
				{
					id: "infrastructure",
					label: "Infrastructure",
					abbr: "in"
				}
			],

			control_categories: [
				{
					id: "1",
					label: "Access Control",
				},
				{
					id: "2",
					label: "Security Logging"
				},
				{
					id: "3",
					label: "Security Monitoring"
				},
				{
					id: "4",
					label: "Configuration Management"
				},
				{
					id: "5",
					label: "Encryption at Rest"
				},
				{
					id: "6",
					label: "Encryption In Transit"
				},
				{
					id: "7",
					label: "Network Security Controls"
				},
				{
					id: "8",
					label: "Malware Detection"
				},
				{
					id: "9",
					label: "Technology Change Management"
				},
				{
					id: "10",
					label: "Data Validation"
				},
				{
					id: "11",
					label: "Ongoing Assurance"
				}
			],

			qns: [
				{
					id: "1",
					label: "Platform",
					abbr: "pl",
					categories: [
						{
							id: "1",
							label: "Access Control",
							questions: [
								{
									id: "1.1",
									label: "User identity management"
								},
								{
									id: "1.2",
									label: "User lifecycle management (Added and Removed)"
								},
								{
									id: "1.3",
									label: "User authorisation (Access to functionality with system)"
								},
								{
									id: "1.4",
									label: "Privilege Account Management (Service and Privileged Accounts)"
								}
							]
						},
						{
							id: "2",
							label: "Security Logging",
							questions: [
								{
									id: "2.1",
									label: "Log capture - User logon and access events"
								},
								{
									id: "2.2",
									label: "Log capture - System events"
								},
								{
									id: "2.3",
									label: "Access to logs is logged"
								},
								{
									id: "2.4",
									label: "Access to logs is restricted"
								}
							]
						},
						{
							id: "3",
							label: "Security Monitoring",
							questions: [
								{
									id: "3.1",
									label: "Security event log monitoring and alerting"
								},
								{
									id: "3.2",
									label: "Event log monitoring and alerting"
								}
							]
						},
						{
							id: "4",
							label: "Configuration Management",
							questions: [
								{
									id: "4.1",
									label: "Asset management discovery"
								},
								{
									id: "4.2",
									label: "Asset management removal"
								},
								{
									id: "4.3",
									label: "Configuration integrity or change monitoring"
								}
							]
						},
						{
							id: "5",
							label: "Encryption at Rest",
							questions: [
								{
									id: "5.1",
									label: "Hardware level encryption"
								},
								{
									id: "5.2",
									label: "Software level encryption"
								},
								{
									id: "5.3",
									label: "Key management"
								}
							]
						},
						{
							id: "6",
							label: "Encryption in Transit",
							questions: [
								{
									id: "6.1",
									label: "Hardware level encryption"
								},
								{
									id: "6.2",
									label: "Software level encryption"
								},
								{
									id: "6.3",
									label: "Key Management"
								}
							]
						},
						{
							id: "7",
							label: "Network Security Controls",
							questions: [
								{
									id: "7.1",
									label: "Intrusion prevention"
								},
								{
									id: "7.2",
									label: "Intrusion prevention monitoring and alerting checks"
								},
								{
									id: "7.3",
									label: "Network segregation"
								},
								{
									id: "7.4",
									label: "DDOS protection Service"
								}
							]
						},
						{
							id: "8",
							label: "Malware Detection",
							questions: [
								{
									id: "8.1",
									label: "Host based Antivirus"
								},
								{
									id: "8.2",
									label: "Network based Antivirus"
								},
								{
									id: "8.3",
									label: "Web Application Firewall"
									}
							]
						},
						{
							id: "9",
							label: "Technology Change Management",
							questions: [
								{
									id: "9.1",
									label: "Change management process"
								},
								{
									id: "9.2",
									label: "Source code repositories"
								},
								{
									id: "9.3",
									label: "Integrity checking"
								},
								{
									id: "9.4",
									label: "Build and Test"
								},
								{
									id: "9.5",
									label: "Release"
								},
								{
									id: "9.6",
									label: "Security patch management"
								}
							]
						},
						{
							id: "10",
							label: "Data Validation",
							questions: [
								{
									id: "10.1",
									label: "Data type validation"
								},
								{
									id: "10.2",
									label: "Validation against templates"
								},
								{
									id: "10.3",
									label: "Data Access Authorisation"
								}
							]
						},
						{
							id: "11",
							label: "Ongoing Assurance",
							questions: [
								{
									id: "11.1",
									label: "Third Part External Party Security Assessments"
								},
								{
									id: "11.2",
									label: "Regular MSB compliance checks."
								},
								{
									id: "11.3",
									label: "Regular Controls Testing"
								},
								{
									id: "11.4",
									label: "Patch Reporting"
								},
								{
									id: "11.5",
									label: "AV Reporting"
								},
								{
									id: "11.6",
									label: "Compliance Regime Requirements"
								},
								{
									id: "11.7",
									label: "Privilege Account Reviews"
								}
							]
						},
					]
				},
				{
					id: "2",
					label: "Middleware",
					abbr: "mi",
					categories: [
						{
							id: "1",
							label: "Access Control",
							questions: [
								{
									id: "1.1",
									label: "User identity management"
								},
								{
									id: "1.2",
									label: "User lifecycle management (Starters and Leavers)"
								},
								{
									id: "1.3",
									label: "User authorisation (Access to functionality with system)"
								},
								{
									id: "1.4",
									label: "Privilege Account Management (Service and Privileged Accounts)"
								}
							]
						},
						{
							id: "2",
							label: "Security Logging",
							questions: [
								{
									id: "2.1",
									label: "Log capture - User access Logs"
								},
								{
									id: "2.2",
									label: "Log capture - Usage logs"
								},
								{
									id: "2.3",
									label: "Access to logs is logged"
								},
								{
									id: "2.4",
									label: "Access to logs is restricted"
								}
							]
						},
						{
							id: "3",
							label: "Security Monitoring",
							questions: [
								{
									id: "3.1",
									label: "Security event log monitoring"
								},
								{
									id: "3.2",
									label: "Event log reporting and alerting"
								}
							]
						},
						{
							id: "4",
							label: "Configuration Management",
							questions: [
								{
									id: "4.1",
									label: "Asset management discovery"
								},
								{
									id: "4.2",
									label: "Asset management removal"
								},
								{
									id: "4.3",
									label: "Configuration integrity or change monitoring"
								}
							]
						},
						{
							id: "5",
							label: "Encryption at Rest",
							questions: [
								{
									id: "5.1",
									label: "Hardware level encryption"
								},
								{
									id: "5.2",
									label: "Software level encryption"
								},
								{
									id: "5.3",
									label: "Key management"
								}
							]
						},
						{
							id: "6",
							label: "Encryption in Transit",
							questions: [
								{
									id: "6.1",
									label: "Hardware level encryption"
								},
								{
									id: "6.2",
									label: "Software level encryption"
								},
								{
									id: "6.3",
									label: "Key Management"
								}
							]
						},
						{
							id: "7",
							label: "Network Security Controls",
							questions: [
								{
									id: "7.1",
									label: "Intrusion prevention"
								},
								{
									id: "7.2",
									label: "Intrusion prevention monitoring and alerting checks"
								},
								{
									id: "7.3",
									label: "Network segregation"
								},
								{
									id: "7.4",
									label: "DDOS protection Service"
								}
							]
						},
						{
							id: "8",
							label: "Malware Detection",
							questions: [
								{
									id: "8.1",
									label: "Host based Antivirus"
								},
								{
									id: "8.2",
									label: "Network based Antivirus"
								},
								{
									id: "8.3",
									label: "Web Application Firewall"
								}
							]
						},
						{
							id: "9",
							label: "Technology Change Management",
							questions: [
								{
									id: "9.1",
									label: "Change management process"
								},
								{
									id: "9.2",
									label: "Source code repositories"
								},
								{
									id: "9.3",
									label: "Integrity checking"
								},
								{
									id: "9.4",
									label: "Build and Test"
								},
								{
									id: "9.5",
									label: "Release"
								},
								{
									id: "9.6",
									label: "Security patch management"
								}
							]
						},
						{
							id: "10",
							label: "Data Validation",
							questions: [
								{
									id: "10.1",
									label: "Data type validation"
								},
								{
									id: "10.2",
									label: "Validation against templates"
								},
								{
									id: "10.3",
									label: "Credential checking"
								}
							]
						},
						{
							id: "11",
							label: "Ongoing Assurance",
							questions: [
								{
									id: "11.1",
									label: "Annual EPSS"
								},
								{
									id: "11.2",
									label: "Regular MSB compliance checks."
								},
								{
									id: "11.3",
									label: "Regular Controls Testing"
								},
								{
									id: "11.4",
									label: "Patch Reporting"
								},
								{
									id: "11.5",
									label: "AV Reporting"
								},
								{
									id: "11.6",
									label: "Compliance Regime Requirements"
								},
								{
									id: "11.7",
									label: "Privilege Account Reviews"
								}
							]
						},

					]
				},
				{
					id: "3",
					label: "Application",
					abbr: "ap",
					categories: [
						{
							id: "1",
							label: "Access Control",
							questions: [
								{
									id: "1.1",
									label: "User identity management"
								},
								{
									id: "1.2",
									label: "User lifecycle management (Starters and Leavers)"
								},
								{
									id: "1.3",
									label: "User authorisation (Access to functionality with system)"
								},
								{
									id: "1.4",
									label: "Privilege Account Management (Service and Privileged Accounts)"
								}
							]
						},
						{
							id: "2",
							label: "Security Logging",
							questions: [
								{
									id: "2.1",
									label: "Log capture - User access Logs"
								},
								{
									id: "2.2",
									label: "Log capture - Usage logs"
								},
								{
									id: "2.3",
									label: "Access to logs is logged"
								},
								{
									id: "2.4",
									label: "Access to logs is restricted"
								}
							]
						},
						{
							id: "3",
							label: "Security Monitoring",
							questions: [
								{
									id: "3.1",
									label: "Security event log monitoring"
								},
								{
									id: "3.2",
									label: "Event log reporting and alerting"
								}
							]
						},
						{
							id: "4",
							label: "Configuration Management",
							questions: [
								{
									id: "4.1",
									label: "Asset management discovery"
								},
								{
									id: "4.2",
									label: "Asset management removal"
								},
								{
									id: "4.3",
									label: "Configuration integrity or change monitoring"
								}
							]
						},
						{
							id: "5",
							label: "Encryption at Rest",
							questions: [
								{
									id: "5.1",
									label: "Hardware level encryption"
								},
								{
									id: "5.2",
									label: "Software level encryption"
								},
								{
									id: "5.3",
									label: "Key management"
								}
							]
						},
						{
							id: "6",
							label: "Encryption in Transit",
							questions: [
								{
									id: "6.1",
									label: "Hardware level encryption"
								},
								{
									id: "6.2",
									label: "Software level encryption"
								},
								{
									id: "6.3",
									label: "Key Management"
								}
							]
						},
						{
							id: "7",
							label: "Network Security Controls",
							questions: [
								{
									id: "7.1",
									label: "Intrusion prevention"
								},
								{
									id: "7.2",
									label: "Intrusion prevention monitoring and alerting checks"
								},
								{
									id: "7.3",
									label: "Network segregation"
								},
								{
									id: "7.4",
									label: "DDOS protection Service"
								}
							]
						},
						{
							id: "8",
							label: "Malware Detection",
							questions: [
								{
									id: "8.1",
									label: "Host based Antivirus"
								},
								{
									id: "8.2",
									label: "Network based Antivirus"
								},
								{
									id: "8.3",
									label: "Web Application Firewall"
								}
							]
						},
						{
							id: "9",
							label: "Technology Change Management",
							questions: [
								{
									id: "9.1",
									label: "Change management process"
								},
								{
									id: "9.2",
									label: "Source code repositories"
								},
								{
									id: "9.3",
									label: "Integrity checking"
								},
								{
									id: "9.4",
									label: "Build and Test"
								},
								{
									id: "9.5",
									label: "Release"
								},
								{
									id: "9.6",
									label: "Security patch management"
								}
							]
						},
						{
							id: "10",
							label: "Data Validation",
							questions: [
								{
									id: "10.1",
									label: "Data type validation"
								},
								{
									id: "10.2",
									label: "Validation against templates"
								},
								{
									id: "10.3",
									label: "Credential checking"
								}
							]
						},
						{
							id: "11",
							label: "Ongoing Assurance",
							questions: [
								{
									id: "11.1",
									label: "Annual EPSS"
								},
								{
									id: "11.2",
									label: "Regular MSB compliance checks."
								},
								{
									id: "11.3",
									label: "Regular Controls Testing"
								},
								{
									id: "11.4",
									label: "Patch Reporting"
								},
								{
									id: "11.5",
									label: "AV Reporting"
								},
								{
									id: "11.6",
									label: "Compliance Regime Requirements"
								},
								{
									id: "11.7",
									label: "Privilege Account Reviews"
								}
							]
						},
					]
				},
				{
					id: "4",
					label: "Infrastructure",
					abbr: "in",
					categories: [
						{
							id: "1",
							label: "Access Control",
							questions: [
								{
									id: "1.1",
									label: "User identity management"
								},
								{
									id: "1.2",
									label: "User lifecycle management (Starters and Leavers)"
								},
								{
									id: "1.3",
									label: "User authorisation (Access to functionality with system)"
								},
								{
									id: "1.4",
									label: "Privilege Account Management (Service and Privileged Accounts)"
								}
							]
						},
						{
							id: "2",
							label: "Security Logging",
							questions: [
								{
									id: "2.1",
									label: "Log capture - User access Logs"
								},
								{
									id: "2.2",
									label: "Log capture - Usage logs"
								},
								{
									id: "2.3",
									label: "Access to logs is logged"
								},
								{
									id: "2.4",
									label: "Access to logs is restricted"
								}
							]
						},
						{
							id: "3",
							label: "Security Monitoring",
							questions: [
								{
									id: "3.1",
									label: "Security event log monitoring"
								},
								{
									id: "3.2",
									label: "Event log reporting and alerting"
								}
							]
						},
						{
							id: "4",
							label: "Configuration Management",
							questions: [
								{
									id: "4.1",
									label: "Asset management discovery"
								},
								{
									id: "4.2",
									label: "Asset management removal"
								},
								{
									id: "4.3",
									label: "Configuration integrity or change monitoring"
								}
							]
						},
						{
							id: "5",
							label: "Encryption at Rest",
							questions: [
								{
									id: "5.1",
									label: "Hardware level encryption"
								},
								{
									id: "5.2",
									label: "Software level encryption"
								},
								{
									id: "5.3",
									label: "Key management"
								}
							]
						},
						{
							id: "6",
							label: "Encryption in Transit",
							questions: [
								{
									id: "6.1",
									label: "Hardware level encryption"
								},
								{
									id: "6.2",
									label: "Software level encryption"
								},
								{
									id: "6.3",
									label: "Key Management"
								}
							]
						},
						{
							id: "7",
							label: "Network Security Controls",
							questions: [
								{
									id: "7.1",
									label: "Intrusion prevention"
								},
								{
									id: "7.2",
									label: "Intrusion prevention monitoring and alerting checks"
								},
								{
									id: "7.3",
									label: "Network segregation"
								},
								{
									id: "7.4",
									label: "DDOS protection Service"
								}
							]
						},
						{
							id: "8",
							label: "Malware Detection",
							questions: [
								{
									id: "8.1",
									label: "Host based Antivirus"
								},
								{
									id: "8.2",
									label: "Network based Antivirus"
								},
								{
									id: "8.3",
									label: "Web Application Firewall"
								}
							]
						},
						{
							id: "9",
							label: "Technology Change Management",
							questions: [
								{
									id: "9.1",
									label: "Change management process"
								},
								{
									id: "9.2",
									label: "Source code repositories"
								},
								{
									id: "9.3",
									label: "Integrity checking"
								},
								{
									id: "9.4",
									label: "Build and Test"
								},
								{
									id: "9.5",
									label: "Release"
								},
								{
									id: "9.6",
									label: "Security patch management"
								}
							]
						},
						{
							id: "10",
							label: "Data Validation",
							questions: [
								{
									id: "10.1",
									label: "Data type validation"
								},
								{
									id: "10.2",
									label: "Validation against templates"
								},
								{
									id: "10.3",
									label: "Credential checking"
								}
							]
						},
						{
							id: "11",
							label: "Ongoing Assurance",
							questions: [
								{
									id: "11.1",
									label: "Annual EPSS"
								},
								{
									id: "11.2",
									label: "Regular MSB compliance checks."
								},
								{
									id: "11.3",
									label: "Regular Controls Testing"
								},
								{
									id: "11.4",
									label: "Patch Reporting"
								},
								{
									id: "11.5",
									label: "AV Reporting"
								},
								{
									id: "11.6",
									label: "Compliance Regime Requirements"
								},
								{
									id: "11.7",
									label: "Privilege Account Reviews"
								}
							]
						}
					]
				}
			],

			ans: [
				{
					id: "1",
					label: "Active Directory Integrated",
					qn_ref: "1.1",
					tss_ref: "(TSS.48,49,50,57)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "2",
					label: "Oracle Identity Manager (OIM) Integrated",
					qn_ref: "1.1",
					tss_ref: "(TSS.48,49,50,57)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "3",
					label: "Mainframe RACF ",
					qn_ref: "1.1",
					tss_ref: "(TSS.48,49,50,57)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "4",
					label: "AWS IAM",
					qn_ref: "1.1",
					tss_ref: "(TSS.48,49,50)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "5",
					label: "AWS AD Integration with STS",
					qn_ref: "1.1",
					tss_ref: "(TSS.48,49,50,57)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "6",
					label: "Local User Accounts",
					qn_ref: "1.1",
					tss_ref: "(TSS.48,49,50,57)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "7",
					label: "Default AD Group Access for All Users",
					qn_ref: "1.2",
					tss_ref: "(TSS.51)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "8",
					label: "Identity Management Service Request",
					qn_ref: "1.2",
					tss_ref: "(TSS.51)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "9",
					label: "Local Add and Remove",
					qn_ref: "1.2",
					tss_ref: "(TSS.51)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "10",
					label: "Active Directory Group Membership Require",
					qn_ref: "1.3",
					tss_ref: "(TSS.49)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "11",
					label: "Managed Internally within the Application",
					qn_ref: "1.3",
					tss_ref: "(TSS.49)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "12",
					label: "TACACS (AD Integrated)",
					qn_ref: "1.3",
					tss_ref: "(TSS.49)",
					applicable: "in,pl"
				},
				{
					id: "13",
					label: "OPAM (Oracle Privilege Account Management)",
					qn_ref: "1.4",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "14",
					label: "Local KeePass",
					qn_ref: "1.4",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "15",
					label: "AWS Cloudtrail (AWS API Events)",
					qn_ref: "2.1",
					tss_ref: "(TSS.10,39,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "16",
					label: "Active Directory Audit Logging to Splunk",
					qn_ref: "2.1",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "17",
					label: "Local Authentication Logs ",
					qn_ref: "2.1",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "18",
					label: "Splunk",
					qn_ref: "2.1",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "19",
					label: "AWS Cloudtrail (AWS API Events)",
					qn_ref: "2.2",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "20",
					label: "Active Directory Audit Logging to Splunk",
					qn_ref: "2.2",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "21",
					label: "Local Authentication Logs ",
					qn_ref: "2.2",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "22",
					label: "Splunk",
					qn_ref: "2.2",
					tss_ref: "(TSS.10,60)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "23",
					label: "AWS Cloudtrail (AWS API Events)",
					qn_ref: "2.3",
					tss_ref: "(TSS.10,60,61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "24",
					label: "Active Directory Audit Logging to Splunk",
					qn_ref: "2.3",
					tss_ref: "(TSS.10,60,61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "25",
					label: "Local Authentication Logs ",
					qn_ref: "2.3",
					tss_ref: "(TSS.10,60,61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "26",
					label: "Splunk",
					qn_ref: "2.3",
					tss_ref: "(TSS.61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "27",
					label: "Splunk Access is logged",
					qn_ref: "2.3",
					tss_ref: "(TSS.61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "28",
					label: "Local Access Restrictions",
					qn_ref: "2.4",
					tss_ref: "(TSS.61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "29",
					label: "AWS Account Restrictions",
					qn_ref: "2.4",
					tss_ref: "(TSS.61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "30",
					label: "Active Directory Access Controls",
					qn_ref: "2.4",
					tss_ref: "(TSS.61)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "31",
					label: "Application Authorisation",
					qn_ref: "2.4",
					tss_ref: "(TSS.61)",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "32",
					label: "AWS Cloudtrail ",
					qn_ref: "3.1",
					tss_ref: "(TSS.62)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "33",
					label: "Splunk",
					qn_ref: "3.1",
					tss_ref: "(TSS.62)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "34",
					label: "Manual Audits and Reviews",
					qn_ref: "3.1",
					tss_ref: "(TSS.62)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "35",
					label: "AWS Cloudtrail ",
					qn_ref: "3.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "36",
					label: "Splunk",
					qn_ref: "3.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "37",
					label: "AWS Cloudtrail and Splunk",
					qn_ref: "3.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "38",
					label: "Manual Audits and Reviews",
					qn_ref: "3.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "39",
					label: "Automated AWS Inventory",
					qn_ref: "4.1",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "40",
					label: "Manual Asset Inventory",
					qn_ref: "4.1",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "41",
					label: "Host Based Agent",
					qn_ref: "4.1",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "42",
					label: "Automated AWS Account Management",
					qn_ref: "4.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "43",
					label: "Manual Asset Management",
					qn_ref: "4.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "44",
					label: "AWS Asset Management Reporting",
					qn_ref: "4.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "45",
					label: "Host Based Integrity Agent (Trend)",
					qn_ref: "4.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "46",
					label: "Physical Disk Embedded",
					qn_ref: "5.1",
					tss_ref: "",
					applicable: ""
				},
				{
					id: "47",
					label: "Infrastructure Appliance Embedded",
					qn_ref: "5.1",
					tss_ref: "",
					applicable: "in"
				},
				{
					id: "48",
					label: "Application Encryption",
					qn_ref: "5.2",
					tss_ref: "",
					applicable: "pl,mi,ap"
				},
				{
					id: "49",
					label: "AWS S3 Encryption",
					qn_ref: "5.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "50",
					label: "AWS EBS Encryption",
					qn_ref: "5.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "51",
					label: "Database Guardiam Object Level Encryption",
					qn_ref: "5.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "52",
					label: "Application Encryption",
					qn_ref: "5.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "53",
					label: "Microsoft Bitlocker",
					qn_ref: "5.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "54",
					label: "Trend Full Disk Encryption",
					qn_ref: "5.2",
					tss_ref: "(TSS.59)",
					applicable: "pl"
				},
				{
					id: "55",
					label: "File Level Encryption",
					qn_ref: "5.2",
					tss_ref: "",
					applicable: "pl,mi,ap"
				},
				{
					id: "56",
					label: "AWS KMS",
					qn_ref: "5.3",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "57",
					label: "Self Managed Key Management Server (KMS)",
					qn_ref: "5.3",
					tss_ref: "",
					applicable: "pl,mi,ap"
				},
				{
					id: "58",
					label: "Application Key Management",
					qn_ref: "5.3",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "59",
					label: "Internal Root CA",
					qn_ref: "5.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "60",
					label: "Manual Recording of Encryption Keys",
					qn_ref: "5.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "61",
					label: "Layer 2 Hardware Network Encryption Device",
					qn_ref: "6.1",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "62",
					label: "Transport Layer Security (HTTPS)",
					qn_ref: "6.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "63",
					label: "IPSEC VPN",
					qn_ref: "6.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "64",
					label: "Packet Level Encryption",
					qn_ref: "6.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "65",
					label: "Application Payload Encryption",
					qn_ref: "6.2",
					tss_ref: "(TSS.59)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "66",
					label: "Internal Certificate Authority",
					qn_ref: "6.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "67",
					label: "External Public Certificate Authority (eg. Verisign, GlobalTrust)",
					qn_ref: "6.3",
					tss_ref: "",
					applicable: ""
				},
				{
					id: "68",
					label: "Application Managed Self Signed Certificates",
					qn_ref: "6.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "69",
					label: "Self Managed Key Management Server (KMS)",
					qn_ref: "6.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "70",
					label: "AWS Key Management Service (KMS)",
					qn_ref: "6.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "71",
					label: "Network Intrusion Prevention (Palo Alto, Checkpoint, F5 WAF)",
					qn_ref: "7.1",
					tss_ref: "(TSS.33)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "72",
					label: "Host Intrusion Prevention (Trend Deep Security)",
					qn_ref: "7.1",
					tss_ref: "(TSS.33)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "73",
					label: "Trend Management Console",
					qn_ref: "7.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "74",
					label: "Splunk Audit Logging",
					qn_ref: "7.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "75",
					label: "Corporate Firewalls and Security Zones",
					qn_ref: "7.3",
					tss_ref: "(TSS.33)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "76",
					label: "Trend Deep Security HBF",
					qn_ref: "7.3",
					tss_ref: "(TSS.33,43,44)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "77",
					label: "VLAN",
					qn_ref: "7.3",
					tss_ref: "(TSS.33)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "78",
					label: "Dual Homed Networking Interfaces",
					qn_ref: "7.3",
					tss_ref: "(TSS.33)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "79",
					label: "Application - e.g ModSecurity",
					qn_ref: "7.4",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "80",
					label: "Incapsula, Imperva",
					qn_ref: "7.4",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "81",
					label: "Corporate Trend or Symantec  Antivirus ",
					qn_ref: "8.1",
					tss_ref: "(TSS.46)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "82",
					label: "Palo Alto, Symantec, Bluecoat AV Offloading",
					qn_ref: "8.2",
					tss_ref: "(TSS.46)",
					applicable: "pl,mi,ap"
				},
				{
					id: "83",
					label: "F5 Web Application Firewall",
					qn_ref: "8.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "84",
					label: "Internal Gating\Change Management",
					qn_ref: "9.1",
					tss_ref: "(TSS.27,28,41)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "85",
					label: "Internal Stash/Git",
					qn_ref: "9.2",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "86",
					label: "Trend Host Based Integrity Monitoring",
					qn_ref: "9.3",
					tss_ref: "(TSS.27)",
					applicable: "pl,mi,ap"
				},
				{
					id: "87",
					label: "Ansible",
					qn_ref: "9.4",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "88",
					label: "Jenkins/Hudson",
					qn_ref: "9.4",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "89",
					label: "Chef Delivery",
					qn_ref: "9.4",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "90",
					label: "Ansible",
					qn_ref: "9.5",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "91",
					label: "Jenkins/Hudson",
					qn_ref: "9.5",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "92",
					label: "Tableaux",
					qn_ref: "9.5",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "93",
					label: "Chef Delivery",
					qn_ref: "9.5",
					tss_ref: "(TSS.27)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "94",
					label: "Qualys Scan Reporting",
					qn_ref: "9.6",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "95",
					label: "Patchlink Reporting",
					qn_ref: "9.6",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "96",
					label: "Vendor Security Advisories",
					qn_ref: "9.6",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},

				{
					id: "97",
					label: "HTML Encoding",
					qn_ref: "10.1",
					tss_ref: "(TSS.13)",
					applicable: "pl,mi,ap"
				},
				{
					id: "98",
					label: "Data Sanitisation",
					qn_ref: "10.1",
					tss_ref: "(TSS.13,15)",
					applicable: "pl,mi,ap"
				},
				{
					id: "99",
					label: "Strong Data Typing",
					qn_ref: "10.1",
					tss_ref: "(TSS.13,15)",
					applicable: "pl,mi,ap"
				},
				{
					id: "100",
					label: "Boundary Checking",
					qn_ref: "10.1",
					tss_ref: "(TSS.13,15)",
					applicable: "pl,mi,ap"
				},
				{
					id: "101",
					label: "<All of the above Data Validations>",
					qn_ref: "10.1",
					tss_ref: "(TSS.13,15)",
					applicable: "pl,mi,ap"
				},
				{
					id: "102",
					label: "Format and Syntax Checking",
					qn_ref: "10.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "103",
					label: "Blacklisting/Whitelisting",
					qn_ref: "10.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "104",
					label: "Transaction Level Authorisation Checking",
					qn_ref: "10.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},


				{
					id: "105",
					label: "Annual EPSS ",
					qn_ref: "11.1",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "106",
					label: "Annual MSB Review",
					qn_ref: "11.2",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "107",
					label: "Annual Controls Testing",
					qn_ref: "11.3",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "108",
					label: "Vendor Patch Reporting",
					qn_ref: "11.4",
					tss_ref: "(TSS.29)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "109",
					label: "Corporate Patchlink Reporting",
					qn_ref: "11.4",
					tss_ref: "(TSS.29)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "110",
					label: "Corporate AV Reporting through Trend Console",
					qn_ref: "11.5",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "111",
					label: "Corporate AV Reporting through Splunk",
					qn_ref: "11.5",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "112",
					label: "Corporate Compliance Checks - TSS, TRP",
					qn_ref: "11.6",
					tss_ref: "",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "113",
					label: "Monthly Account Reviews - Manual",
					qn_ref: "11.7",
					tss_ref: "(TSS.51,56)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "114",
					label: "Quarterly Account Reviews - Manual",
					qn_ref: "11.7",
					tss_ref: "(TSS.51,56)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "115",
					label: "Annual Account Reviews - Manual",
					qn_ref: "11.7",
					tss_ref: "(TSS.51,56)",
					applicable: "in,pl,mi,ap"
				},
				{
					id: "116",
					label: "Access Reporter",
					qn_ref: "11.7",
					tss_ref: "(TSS.51,56)",
					applicable: "in,pl,mi,ap"
				}

				 ]
		},
	},

	sdl_activities: {
		discover_phase: {
			security_controls_assessment: [
				{
					id: "200",
					text: "Complete the Security Controls Asessment",
					required: true,
					done: false,
					threshold: 'true'
				}
			],
			threat_modelling: [
				{
					id: "201",
					text: "Create a Data Flow Diagram",
					required: true,
					done: false,
					threshold: 'true'
				},
				{
					id: "202",
					text: "Identify system threats using STRIDE",
					required: true,
					done: false,
					threshold: 'true'
				},
				{
					id: "203",
					text: "Rate threats identified using DREAD",
					required: true,
					done: false,
					threshold: 'true'
				},
				{
					id: "204",
					text: "Identify controls to mitigate threats",
					required: true,
					done: false,
					threshold: 'true'
				},
				{
					id: "205",
					text: "Validate your security model",
					required: true,
					done: false,
					threshold: 'true'
				}
			],
			security_design_review: [
				{
					id: "206",
					text: "Review  the Solution Design",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				},
				{
					id: "207",
					text: "Review the Threat Model",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				},
				{
					id: "208",
					text: "Produce recommendations including threats that cannot be controlled satisfactorily",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				},
				{
					id: "209",
					text: "Create formal risks for threats that cannot be controlled",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				}
			]
		},
		deliver_phase: {
			secure_requirements_and_secure_stories: [
				{
					id: "210",
					text: "Create Secure Acceptance Criteria for the threats identified within the initiate phase",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				},
				{
					id: "211",
					text: "Create Secure Stories for the threats identified within the Initiate Phase",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				}
			],
			secure_coding_and_code_reviews: [
				{
					id: "212",
					text: "Static code analysis - internal Fortify review before delivery",
					required: true,
					done: false,
					threshold: ['((asg.data.system.sdl.workbook.srp.severity_rating.value > 0) && ',
						'(asg.data.system.sdl.workbook.srp.change_type != "commercial_product") && ',
						'(asg.data.system.sdl.workbook.srp.change_type != "software"))'].join('')
				},
				{
					id: "213",
					text: "Manual code review - internal manual code review before delivery",
					required: true,
					done: false,
					threshold: ['((asg.data.system.sdl.workbook.srp.severity_rating.value > 0) && ',
						'(asg.data.system.sdl.workbook.srp.change_type != "commercial_product") && ',
						'(asg.data.system.sdl.workbook.srp.change_type != "software"))'].join('')
				}
			],
			security_testing: [
				{
					id: "214",
					text: "Security Testing - testing the acceptance criteria and the secure Stories",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 0)'
				}
			],

			penetration_testing: [
				{
					id: "215",
					text: "Internal Web Application Scan using automated scanner Qualys WAS",
					required: true,
					done: false,
					threshold: '((asg.data.system.sdl.workbook.srp.change_type != "commercial_product") && ' +
						'(asg.data.system.sdl.workbook.srp.change_type != "scripting"))'
				},
				{
					id: "216",
					text: "Internal platform vulnerability scanning using Qualys Guard",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.severity_rating.value > 1)'
				},
				{
					id: "217",
					text: "Penetration Test using external testing agency",
					required: true,
					done: false,
					threshold: '((asg.data.system.sdl.workbook.srp.accessibility != "internal_only") || ' +
						'(asg.data.system.sdl.workbook.srp.creditCardData != "no"))'
				}
			]
		},
		deploy_phase: {
			incident_management: [
				{
					id: "218",
					text: "Onboard system with Security Operations for Incident Management and audit logging",
					required: true,
					done: false,
					threshold: '((asg.data.system.sdl.workbook.srp.accessibility != "internal_only") || ' +
						'(asg.data.system.sdl.workbook.externalManaged == "yes"))'
				}
			]
		},
		additional_security_requirements: {
			documentation: [
				{
					id: "219",
					text: "Complete an EPSS for all external parties that have access to group information",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.srp.accessibility != "internal_only")'
				},
				{
					id: "220",
					text: "Complete  a Minimum Security Baseline assessment",
					required: true,
					done: false,
					threshold: '(asg.data.system.sdl.workbook.msb == "yes")'
				}
			]
		}
	},

	sdl_activity_phases: [
		{
			id: "discover_phase",
			label: "Discover Phase"
		},
		{
			id: "deliver_phase",
			label: "Deliver Phase"
		},
		{
			id: "deploy_phase",
			label: "Deploy Phase"
		},
		{
			id: "additional_security_requirements",
			label: "Additional Security Requirements"
		}
	],

	sdl_activity_phase_categories: {
		discover_phase: [
			{
				id: "security_controls_assessment",
				label: "Security Controls Assessment"
			},
			{
				id: "threat_modelling",
				label: "Threat Modelling"
			},
			{
				id: "security_design_review",
				label: "Security Design Review"
			},
		],
		deliver_phase: [
			{
				id: "secure_requirements_and_secure_stories",
				label: "Secure Requirements and Secure Stories"
			},
			{
				id: "secure_coding_and_code_reviews",
				label: "Secure Coding and Code Reviews"
			},
			{
				id: "security_testing",
				label: "Security Testing"
			},
			{
				id: "penetration_testing",
				label: "Penetration Testing"
			},
		],
		deploy_phase: [
			{
				id: "incident_management",
				label: "Incident Management"
			},
		],
		additional_security_requirements: [
			{
				id: "documentation",
				label: "Documentation"
			}
		]
	},

	securityRating: function () {
		let _ref = asg.data.system.sdl.ref;
		let _rat = _ref.severity_ratings;
		let _model = asg.data.system.sdl.workbook.srp;

		var rating = _rat.low;

		var changeTypeSeverity = _rat.med;
		if (_model.accessibility == 'internal_only' && _model.dataStored == 'public_data') {
			changeTypeSeverity = _rat.low;
		}

		var ccDataSeverity = _rat.hi;
		if (_model.creditCardData == 'no') {
			ccDataSeverity = _rat.low;
		}

		var newTechSeverity = _rat.med;
		if (_model.newTechnology == 'no') {
			newTechSeverity = _rat.low;
		}

		var dataSeverity = _rat.hi;
		if (_model.dataStored == 'suncorp_operational' || _model.dataStored == 'suncorp_confidential') {
			dataSeverity = _rat.med;
		}
		if (_model.dataStored == 'public_data') {
			dataSeverity = _rat.low;
		}

		var accessSeverity = _rat.med;
		if (_model.accessControl == 'no') {
			accessSeverity = _rat.low;
		}

		var externalSeverity = _rat.med;
		if (_model.dataStored == 'public_data') {
			externalSeverity = _rat.low;
		}

		var arrSeverities = [changeTypeSeverity, ccDataSeverity, newTechSeverity,
							 dataSeverity, accessSeverity, externalSeverity];

		for (let i = 0; i < arrSeverities.length; i++) {
			var _sev = arrSeverities[i];
			if (_sev.value == 2) {
				rating = _rat.hi;
				break;
			}
			if (_sev.value == 1) {
				rating = _rat.med;
			}
		}

		return rating;

	},

	sensitivity: {
		label: "Sensitivity",
		options: [
			{
				value: "public_data",
				label: "Public Data"
			},
			{
				value: "suncorp_operational",
				label: "Suncorp Operational"
			},
			{
				value: "suncorp_confidential",
				label: "Suncorp Confidential"
			},
			{
				value: "customer_data",
				label: "Customer Data (PII) Including Bank Data"
			}
		]
	},

	severity_ratings: {
		low: {
			value: 0,
			text: 'Low',
			abbr: 'L',
			className: 'severity-low'
		},

		med: {
			value: 1,
			text: 'Medium',
			abbr: 'M',
			className: 'severity-med'
		},

		hi: {
			value: 2,
			text: 'High',
			abbr: 'H',
			className: 'severity-hi'
		}
	},

	srp_qns: [
		{
			id: "accessibility",
			text: "Can the system be accessed from the external networks including the Internet or just from the internal network?",
			required: true,
			dataset: "accessibility",
			response: ""
		},
		{
			id: "accessControl",
			text: "Does the system restrict access through the use of access controls like usernames and passwords?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "dataStored",
			text: "What is the sensitivity of the data that is used or processed by the system?",
			required: true,
			dataset: "sensitivity",
			response: ""
		},
		{
			id: "sanitisedNonProd",
			text: "Will data used in non-production systems be sanitised?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "critical",
			text: "Is the system on the business critical list?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "newTechnology",
			text: "Does the system use new technology that has not been used previously in Suncorp?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "creditCardData",
			text: "Does the system store or process credit card data or is it part of the Card Data Environment?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "externalManaged",
			text: "Will the system be managed, supported or require regular access by an external party outside of Suncorp?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "aws",
			text: "Will the system be hosted on the Suncorp cloud platforms (AWS,Azure)?",
			required: true,
			dataset: "yes_no",
			response: ""
		},
		{
			id: "msb",
			text: "Will the system be used as a standard platform service?",
			required: true,
			dataset: "yes_no",
			response: ""
		}
	],

	system_component: {
		label: "System Component",
		options: [

			{
				value: "select",
				label: "<SELECT>"
			},
			{
				value: "platform",
				label: "Platform"
			},
			{
				value: "middleware",
				label: "Middleware"
			},
			{
				value: "application",
				label: "Application"
			},
			{
				value: "infrastructure",
				label: "Infrastructure"
			}
		]
	},

	threatColours: {
		critical: {
			bg: '#FFCDD2',
			fg: '#B71C1C'
		},
		severe: {
			bg: '#f5b188',
			fg: '#753208'
		},
		moderate: {
			bg: '#FFF9C4',
			fg: '#F57F17'
		},
		sustainable: {
			bg: '#40938c',
			fg: '#003733'
		},
		na: {
			bg: '#a2a2a2',
			fg: '#232323'
		}
	},

	threatMatrix: function (strSeverity, strLikelihood) {
		switch (strSeverity) {
			case "extreme":
				{
					return {
						value: "critical",
						label: "Critical"
					};
					break;
				}
			case "serious":
				{
					if (strLikelihood == 'certain' || strLikelihood == 'likely') {
						return {
							value: "critical",
							label: "Critical"
						};
					} else if (strLikelihood == 'possible' || strLikelihood == 'unlikely') {
						return {
							value: "severe",
							label: "Severe"
						};
					} else {
						return {
							value: "moderate",
							label: "Moderate"
						};
					}
					break;
				}
			case "high":
				{
					if (strLikelihood == 'certain' || strLikelihood == 'likely') {
						return {
							value: "severe",
							label: "Severe"
						};
					} else if (strLikelihood == 'possible' || strLikelihood == 'unlikely') {
						return {
							value: "moderate",
							label: "Moderate"
						};
					} else {
						return {
							value: "sustainable",
							label: "Sustainable"
						};
					}
					break;
				}
			case "medium":
				{
					if (strLikelihood == 'certain') {
						return {
							value: "severe",
							label: "Severe"
						};
					} else if (strLikelihood == 'likely' || strLikelihood == 'possible') {
						return {
							value: "moderate",
							label: "Moderate"
						};
					} else {
						return {
							value: "sustainable",
							label: "Sustainable"
						};
					}
					break;
				}
			case "low":
				{
					if (strLikelihood == 'certain' || strLikelihood == 'likely') {
						return {
							value: "moderate",
							label: "Moderate"
						};

					} else {
						return {
							value: "sustainable",
							label: "Sustainable"
						};
					}
					break;
				}
		}
		return {
			value: "na",
			label: "N/A"
		};
	},

	threat_severity: {
		label: "Threat Severity",
		options: [
			{
				value: "low",
				label: "Low"
			},
			{
				value: "medium",
				label: "Medium"
			},
			{
				value: "high",
				label: "High"
			},
			{
				value: "serious",
				label: "Serious"
			},
			{
				value: "extreme",
				label: "Extreme"
			},
			{
				value: "na",
				label: "N/A"
			}
		]
	},

	threat_type: {
		label: "Threat Type",
		options: [
			{
				value: "spoofing",
				label: "Spoofing"
			},
			{
				value: "tampering",
				label: "Tampering"
			},
			{
				value: "repudiation",
				label: "Repudiation"
			},
			{
				value: "information_disclosure",
				label: "Information Disclosure"
			},
			{
				value: "dos",
				label: "Denial of Service"
			},
			{
				value: "elevation_of_privilege",
				label: "Elevation of Privilege"
			}
		]
	},

	yes_no: {
		label: '',
		options: [
			{
				value: "yes",
				label: "Yes"
			},
			{
				value: "no",
				label: "No"
			}
		]
	}
}

let _etc = asg.__etc;

asg.__etc.loadSDLData = function () {
	let _myEtc = _etc;
	if (asg.data.system.sdl != null) {
		asg.data.system.sdl.ref = _myEtc.SDL_DATA;
	} else {
		window.setTimeout(asg.__etc.loadSDLData, 100);
	}
};

window.setTimeout(asg.__etc.loadSDLData, 100);
