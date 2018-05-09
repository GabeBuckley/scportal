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
					threshold: '((asg.data.system.sdl.workbook.srp.severity_rating.value > 0) && ' +
						'(asg.data.system.sdl.workbook.srp.change_type != "commercial_product") && ' +
						'(asg.data.system.sdl.workbook.srp.change_type != "software"))'
				},
				{
					id: "213",
					text: "Manual code review - internal manual code review before delivery",
					required: true,
					done: false,
					threshold: '((asg.data.system.sdl.workbook.srp.severity_rating.value > 0) && ' +
						'(asg.data.system.sdl.workbook.srp.change_type != "commercial_product") && ' +
						'(asg.data.system.sdl.workbook.srp.change_type != "software"))'
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
