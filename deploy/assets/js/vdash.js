/* Vulnerabilities Dashboard */

if (asg.__etc == null) {
	asg.__etc = {};
}


// Add system data
asg.data.system.vdash = {
	chartData: {
		labels: ["SQL Injection", "XSS", "Cipher", "Uncontrolled Redirection", "Information Disclosure", "Authentication"],
		datasets: [
			{
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
            }
        ]
	},

	menu_data: [
		{
			id: 'reports',
			label: 'Reports...',
			menu_data: [
				{
					id: 'home',
					label: 'Home',
					icon: 'fas fa-home',
					link: '#!/'
                },
				{
					id: 'sdl',
					label: 'Secure Development Life Cycle',
					icon: 'fab fa-connectdevelop',
					link: '#!/sdl'
                },
				{
					id: 'vuln',
					label: 'Vulnerability &amp; Patching Portal',
					icon: 'fas fa-bug',
					link: '#!/vuln'
                },
				{
					id: 'dba',
					label: 'Database Administration',
					icon: 'fas fa-database',
					link: '#!/test'
                },
				{
					id: 'test',
					label: 'Settings',
					icon: 'fas fa-cogs',
					link: '#!/test'
                }
            ]

        },
		{
			id: 'repdata',
			label: 'Data Lists',
			menu_data: [
				{
					id: 'source',
					label: 'Notification Sources',
					icon: 'fas fa-bell',
					link: '#!/vuln/data/source'
                },
				{
					id: 'severity',
					label: 'Severity Levels',
					icon: 'fas fa-sort-amount-down',
					link: '#!/vuln/data/severity'
                },
				{
					id: 'type',
					label: 'Issue Types',
					icon: 'fas fa-bug',
					link: '#!/vuln/data/type'
                },
				{
					id: 'tech',
					label: 'Technologies',
					icon: 'fas fa-microchip',
					link: '#!/vuln/data/tech'
                }
            ]

        }
    ],

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
        },
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
    ],

	openIssuesByDays: {
		panels: [
			{
				label: '&lt; 30 Days',
				numIssues: 31,
				class: 'asg-chart-bg-green'
            },
			{
				label: '30 - 90 Days',
				numIssues: 63,
				class: 'asg-chart-bg-grad'
            },
			{
				label: '&gt; 90 Days',
				numIssues: 12,
				class: 'asg-chart-bg-red'
            }
        ],
		severeIssuesOver30: 17,
	},

	lists: {
		lookupTables: [
			{
				id: 'source',
				label: 'Source',
				prefix: 's',
				data: [
					{
						id: 's001',
						label: 'Pen Test'
                    },
					{
						id: 's002',
						label: 'Code Review'
                    },
					{
						id: 's003',
						label: 'WAS Scan'
                    },
					{
						id: 's004',
						label: 'App Review'
                    },
					{
						id: 's005',
						label: 'Fortify'
                    },
					{
						id: 's006',
						label: 'Manual Detection'
                    }
                ]
            },
			{
				id: 'severity',
				label: 'Severity',
				prefix: 'v',
				data: [
					{
						id: 'v001',
						label: 'Critical'
                    },
					{
						id: 'v002',
						label: 'High'
                    },
					{
						id: 'v003',
						label: 'Medium'
                    },
					{
						id: 'v004',
						label: 'Low'
                    },
					{
						id: 'v005',
						label: 'Informational'
                    }
                ]
            },
			{
				id: 'type',
				label: 'Issue Type',
				prefix: 't',
				data: [
					{
						id: 't001',
						label: 'SQL Injection'
                    },
					{
						id: 't002',
						label: 'XSS'
                    },
					{
						id: 't003',
						label: 'Cipher'
                    },
					{
						id: 't004',
						label: 'Uncontrolled Redirection'
                    },
					{
						id: 't005',
						label: 'Information Disclosure'
                    },
					{
						id: 't006',
						label: 'Authentication'
                    },
					{
						id: 't007',
						label: 'Cookies'
                    },
					{
						id: 't008',
						label: 'Request Forgery'
                    }
                ]
            },
			{
				id: 'technology',
				label: 'Technology',
				prefix: 'x',
				data: [
					{
						id: 'x001',
						label: 'Drupal'
                    },
					{
						id: 'x002',
						label: 'AEM'
                    },
					{
						id: 'x003',
						label: 'Wordpress'
                    }
                ]
            }
        ]
	},
};

asg.__etc.dbModals = [
	{
		id: "addDataListItem",
		title: "Add Data List Item",
		template: "asg.data.templates.html.vdash.dialogs.addDataListItem"
    }, {
		id: "editDataListItem",
		title: "Edit Data List item",
		template: "asg.data.templates.html.vdash.dialogs.editDataListItem"
    }, {
		id: "deleteDataListItems",
		title: "Delete Data List items",
		template: "asg.data.templates.html.vdash.dialogs.deleteDataListItems"
    }
];
for (var i = 0; i < asg.__etc.dbModals.length; i++) {
	asg.data.lists.site.modals.push(asg.__etc.dbModals[i]);
}

// Add Templates
asg.data.templates.html.vdash = {
	dialogs: {
		addDataListItem: {
			content: '<fieldset>' +
				'<input type="hidden" id="dlg_datalist_id" />' +
				'<input type="hidden" id="dlg_dataitem_id" data-accessor="Id"/>' +
				'<legend id="dlg_legend"></legend>' +
				'<div class="row">' +
				'   <div class="col-xs-12 col-sm-5">' +
				'       <label for="dlg_dataitem_id"></label>' +
				'   </div>' +
				'   <div class="col-xs-12 col-sm-7">' +
				'      <div id="dlg_dataitem_id_display"></div>' +
				'   </div>' +
				'</div>' +
				'<div class="row">' +
				'   <div class="col-xs-12 col-sm-5">' +
				'       <label for="dlg_dataitem_label"></label>' +
				'   </div>' +
				'   <div class="col-xs-12 col-sm-7">' +
				'       <input type="text" placeholder="Enter label" id="dlg_dataitem_label"  data-accessor="Name" />' +
				'   </div>' +
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
					handler: 'asg.util.vdash.addDataListItem'
                }
            ]
		},

		editDataListItem: {
			content: '<fieldset>' +
				'<input type="hidden" id="dlg_datalist_id" />' +
				'<input type="hidden" id="dlg_dataitem_id" data-accessor="Id"/>' +
				'<legend id="dlg_legend"></legend>' +
				'<div class="row">' +
				'   <div class="col-xs-12 col-sm-5">' +
				'       <label for="dlg_dataitem_id"></label>' +
				'   </div>' +
				'   <div class="col-xs-12 col-sm-7">' +
				'      <div id="dlg_dataitem_id_display"></div>' +
				'   </div>' +
				'</div>' +
				'<div class="row">' +
				'   <div class="col-xs-12 col-sm-5">' +
				'       <label for="dlg_dataitem_label"></label>' +
				'   </div>' +
				'   <div class="col-xs-12 col-sm-7">' +
				'       <input type="text" placeholder="Enter label" id="dlg_dataitem_label" data-accessor="Name" />' +
				'   </div>' +
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
					label: 'Update',
					handler: 'asg.util.vdash.updateDataListItem'
                }
            ]
		},

		deleteDataListItems: {
			content: '<fieldset>' +
				'<legend>Delete Items</legend>' +
				'<div class="row">' +
				'   <div class="col-xs-4">' +
				'       <i class="fas fa-exclamation-triangle fa-7x primary-orange-dark-50"></i>' +
				'   </div>' +
				'   <div class="col-xs-8">' +
				'       <div id="dlg_warning_box"></div>' +
				'   </div>' +
				'</div>' +
				'</fieldset>',
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
			// Vulnerability & Patching Dashboard Regions
			vdash: 'asg-vuln-dashboard',
			vdash_qs: 'asg_vdash_quickstats',
			vdash_chart: 'asg_vdash_chart',
			vdash_obd: 'asg_vdash_openbydays',
			vdash_teams: 'asg_vdash_top_teams',
			vdash_iiris: 'asg_vdash_iiris',
			vdash_lists: 'asg_vdash_lists',
		},
		endpoints: {
			DEV: {
				get_support_teams_list: '/site/assets/ws/mocks/get_support_teams_list.json',
				get_teams_issues_list: '/site/assets/ws/mocks/get_open_issues_by_team.json',
				get_iiris_issues_list: '/site/assets/ws/mocks/get_iiris_issues.json',
				get_data_list_severity: '/site/assets/ws/mocks/get_data_list_severity.json',
				get_data_list_source: '/site/assets/ws/mocks/get_data_list_source.json',
				get_data_list_tech: '/site/assets/ws/mocks/get_data_list_tech.json',
				get_data_list_type: '/site/assets/ws/mocks/get_data_list_type.json',
				add_data_list_severity: '/site/assets/ws/mocks/get_data_list_severity.json',
				add_data_list_source: '/site/assets/ws/mocks/get_data_list_source.json',
				add_data_list_tech: '/site/assets/ws/mocks/get_data_list_tech.json',
				add_data_list_type: '/site/assets/ws/mocks/get_data_list_type.json',
				upd_data_list_severity: '/site/assets/ws/mocks/get_data_list_severity.json',
				upd_data_list_source: '/site/assets/ws/mocks/get_data_list_source.json',
				upd_data_list_tech: '/site/assets/ws/mocks/get_data_list_tech.json',
				upd_data_list_type: '/site/assets/ws/mocks/get_data_list_type.json',
			},
			TEST: {
				get_support_teams_list: '/site/assets/ws/mocks/get_support_teams_list.json',
				get_teams_issues_list: '/site/assets/ws/mocks/get_open_issues_by_team.json',
				get_iiris_issues_list: '/site/assets/ws/mocks/get_iiris_issues.json',
				get_data_list_severity: '/site/assets/ws/mocks/get_data_list_severity.json',
				get_data_list_source: 'http://localhost:57373/api/Source/GetSource',
				get_data_list_tech: 'http://localhost:57373/api/Source/GetTechnology',
				get_data_list_type: 'http://localhost:57373/api/Source/GetIssueType',
				add_data_list_severity: 'http://localhost:57373/api/Source/GetSeverity',
				add_data_list_source: '/site/assets/ws/mocks/get_data_list_source.json',
				add_data_list_tech: '/site/assets/ws/mocks/get_data_list_tech.json',
				add_data_list_type: '/site/assets/ws/mocks/get_data_list_type.json',
				upd_data_list_severity: '/site/assets/ws/mocks/get_data_list_severity.json',
				upd_data_list_source: '/site/assets/ws/mocks/get_data_list_source.json',
				upd_data_list_tech: '/site/assets/ws/mocks/get_data_list_tech.json',
				upd_data_list_type: '/site/assets/ws/mocks/get_data_list_type.json',
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
asg.__etc.dash = {
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
for (var stringID in asg.__etc.dash.stringTable) {
	asg.data.lists.site.stringTable[stringID] = asg.__etc.dash.stringTable[stringID];
}

// Copy in dashboard utility functions 
asg.util.vdash = {
	addDataListItem: function () {
		var listId = document.getElementById('dlg_datalist_id').value;
		var objList = asg.util.vdash.getListById(listId);
		var idField = document.getElementById('dlg_dataitem_id');
		var itemId = idField.value;
		var strIdProp = idField.getAttribute('data-accessor');

		var labelField = document.getElementById('dlg_dataitem_label')
		var itemLabel = labelField.value;
		var strLabelProp = labelField.getAttribute('data-accessor');
		if (itemLabel.length > 0) {
			var newItem = {};
			newItem[strIdProp] = itemId;
			newItem[strLabelProp] = itemLabel;

			objList.data.push(newItem);
			asg.ui.closeDialog();
			asg.u.vdash.data.currDataListView.redraw();
		} else {
			asg.ui.attachErrorMsg(labelField, asg.s.dl_label2shrt);
		}
	},

	data: {
		loaded: function () {
			let _dash = asg.util.vdash;
			let _loaded = true &&
				_dash.data.teamsListLoaded &&
				_dash.data.teamsIssuesLoaded &&
				_dash.data.iirisIssuesLoaded;

			return _loaded;
		},

		teamsListLoaded: false,
		teamsIssuesLoaded: false,
		iirisIssuesLoaded: false,

		currDataListId: '',
		currDataListView: null,

		severityDataListLoaded: false,
	},

	deleteDataListItems: function () {
		var _view = asg.u.vdash.data.currDataListView
		var selRows = _view.getSelectedRows();
		for (var i = 0; i < selRows.length; i++) {
			var currRow = selRows[i];
			var rowID = currRow.id;
			var arrID = rowID.split('_');
			var itemID = arrID[2];
			var listID = asg.u.vdash.data.currDataListView._id;
			var objList = asg.u.vdash.getListById(listID);

			asg.u.vdash.removeDataListItem(objList, itemID);
		}
		asg.ui.closeDialog();
		_view.setData(objList.data);
	},

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
		var header = asg.util.createFromFragment(
			asg.util.strReplace(
				'<h2>%1%</h2>', [asg.s.qs_chart_title]
			)
		);

		container.appendChild(header);

		var statsPanel = asg.util.createFromFragment('<div class="asg-dashboard-quickstats" />');
		container.appendChild(statsPanel);


		for (var i = 0; i < arrItems.length; i++) {
			var objItem = arrItems[i];
			asg.util.vdash.drawQuickstatsPanel(objItem, statsPanel);
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

	drawOpenByDaysChart: function () {
		var _me = asg.util.vdash;
		var _data = asg.data.system.vdash.openIssuesByDays;
		var _util = asg.util;

		var totalIssues = 0;
		for (var i = 0; i < _data.panels.length; i++) {
			var currPanel = _data.panels[i];
			totalIssues = totalIssues + currPanel.numIssues;
		}
		for (var i = 0; i < _data.panels.length; i++) {
			var currPanel = _data.panels[i];
			currPanel.percentage = Math.round(((currPanel.numIssues / totalIssues) * 100), 0);
		}
		if (_data.panels[0].percentage < 20 ||
			_data.panels[1].percentage < 20 ||
			_data.panels[2].percentage < 20) {

			if (_data.panels[0].percentage < 20) {
				_data.panels[0].percentage = 20;
			}

			if (_data.panels[2].percentage < 20) {
				_data.panels[2].percentage = 20;
			}

			if (_data.panels[1].percentage < 20) {
				_data.panels[1].percentage = 20;
			} else {
				_data.panels[1].percentage = 100 - _data.panels[2].percentage - _data.panels[0].percentage;
			}
		}

		// Create the chart container
		_me.view.openByDaysChart = document.getElementById(asg.conf.ids.vdash_obd);
		_me.view.openByDaysChart.innerHTML = '';

		// Create the chart title
		_me.view.openByDaysChart.appendChild(
			_util.createFromFragment(
				_util.strReplace(
					"<h2>%1%</h2>", [asg.s.obd_chart_tile, totalIssues]
				)
			)
		);

		// Add in the panel
		var panelContainer = _util.createFromFragment('<div class="asg-dashboard-openbydays-chart" />');
		for (var i = 0; i < _data.panels.length; i++) {
			var currPanel = _data.panels[i];
			var objPanel = _util.createFromFragment(_util.strReplace(
                ['<div class="asg-openbydays-panel %3%" style="width:%4%%;">',
                 '   <h3>%2%</h2>',
                 '   <h4>(%1%)</h4>',
                 '</div>'
                ].join(''), [currPanel.label, currPanel.numIssues, currPanel.class, currPanel.percentage]
			));
			panelContainer.appendChild(objPanel);
		}
		_me.view.openByDaysChart.appendChild(panelContainer);

		// If there are severe/critical issues open over 30 days
		if (_data.severeIssuesOver30 > 0) {
			_me.view.openByDaysChart.firstElementChild.innerHTML += '*';
			_me.view.openByDaysChart.appendChild(
				_util.createFromFragment(
					_util.strReplace(
						'<h5 class="primary-green-light-25">%1%</h5>', [
							(_data.severeIssuesOver30 > 1 ? asg.s.obd_chart_subtile_2 : asg.s.obd_chart_subtile_1),
                            _data.severeIssuesOver30
                        ]
					)
				)
			);
		}
	},

	drawTeamsList: function () {
		var container = document.getElementById(asg.conf.ids.vdash_teams);
		var view = new asg.ViewComponent({
			id: 'view_team_issues',
			title: 'Top 5 Teams - Open Issues',
			target: container,
			height: '300px',
			width: '100%',
			columns: [
				{
					label: 'Team',
					sorted: true,
					sortkey: 'numrecords',
					sortdir: 'desc',
					grouped: true,
					source: 'support_group/label'
                },
				{
					label: 'Issue',
					sorted: true,
					source: 'name',
					linked: true,
					linkPattern: '#!/vuln/issue/<id>'
                }
            ],
			row_data: asg.data.system.vdash.lists.issues_by_support_team,
			on_init: function () {
				this.redraw();
				this.collapseAll();
			}
		});
	},

	draw_IIRIS_list: function () {
		var container = document.getElementById(asg.conf.ids.vdash_iiris);

		var view = new asg.ViewComponent({
			id: 'view_team_issues',
			title: 'Open Issues with IIRIS Records',
			target: container,
			height: '300px',
			width: '100%',
			columns: [
				{
					label: 'ID',
					sorted: true,
					sortkey: 'alpha',
					sortdir: 'desc',
					source: 'id',
					sortable: true,
					width: '50%',
                },
				{
					label: 'Issue',
					source: 'name',
					linked: true,
					linkPattern: '#!/vuln/issue/<id>',
					sortable: true,
					width: '50%',
                }
            ],
			row_data: asg.data.system.vdash.lists.issues_with_iiris_records,
			on_init: function () {
				this.redraw();
				this.collapseAll();
			}
		});
	},

	getData: function () {
		let _dash = asg.util.vdash;

		_dash.getTeamsListData();
		_dash.getTeamsIssuesData();
		_dash.getIIRISIssuesData();
	},

	getDataListData: function (strlist, strTarget) {
		var _self = this;
		var _endpointBase = asg.conf.endpoints[asg.app.fn.mode()];
		var _endpoint = _endpointBase[strlist];

		var _onResult = function () {
			let _me = _self;
			let _this = this;
			let _options = _this.options;

			let _data = _this.result;
			let _target = this.options.target;

			let _targetBase = asg.data.system.vdash.lists.lookupTables;
			for (let i = 0; i < _targetBase.length; i++) {
				if (_targetBase[i].id == _target) {
					_targetBase[i].data = _data;
				}
			}

			asg.util.vdash.data[strTarget + 'DataListLoaded'] = true;
		}

		let objOptions = {
			on_result: _onResult,
			target: strTarget
		};

		asg.app.fn.ws.fetch(_endpoint, objOptions);

	},

	getDataListItem: function (objList, strId, strIdField) {
		_id = strIdField || 'id';
		var arrNew = [];
		for (var i = 0; i < objList.data.length; i++) {
			if (objList.data[i][_id] == strId) {
				return objList.data[i];
			}
		}
		return null;
	},

	getListById: function (strListId) {
		var _lists = asg.data.system.vdash.lists.lookupTables;
		for (var i = 0; i < _lists.length; i++) {
			var currList = _lists[i];
			if (currList.id == strListId) {
				return currList;
			}
		}
		return null;
	},

	getMenuById: function (strMenuId) {
		var _menus = asg.data.system.vdash.menu_data;
		for (let i = 0; i < _menus.length; i++) {
			var _menu = _menus[i];
			if (_menu.id == strMenuId) {
				return _menu;
			}
		}
		return null;
	},

	getNextDataListID: function (strListId) {
		var objList = asg.util.vdash.getListById(strListId);
		var prefix = objList.prefix;

		if (objList != null) {
			var _data = objList.data;
			var nextId = 0;
			for (var i = 0; i < _data.length; i++) {
				var _row = _data[i];
				var strId = _row.id;
				strId = strId.replace(/\D/gi, '');
				var intId = parseInt(strId, 10);
				if (intId > nextId) {
					nextId = intId;
				}
			}
			nextId = nextId + 1;
			strIdNo = '000000' + nextId;
			strIdNo = strIdNo.substr(-3, 3);
			strIdNo = prefix + strIdNo;
			return strIdNo;
		}
		return 'ERROR';
	},

	getIIRISIssuesData: function () {
		let objOptions = {
			on_result: asg.util.vdash.updateIIRISList
		};
		asg.app.fn.ws.fetch(asg.conf.endpoints[asg.app.fn.mode()].get_iiris_issues_list, objOptions);
	},

	getTeamsListData: function () {
		let objOptions = {
			on_result: asg.util.vdash.updateTeamsList
		};
		asg.app.fn.ws.fetch(asg.conf.endpoints[asg.app.fn.mode()].get_support_teams_list, objOptions);
	},

	getTeamsIssuesData: function () {
		let objOptions = {
			on_result: asg.util.vdash.updateTeamsIssuesData
		};
		asg.app.fn.ws.fetch(asg.conf.endpoints[asg.app.fn.mode()].get_teams_issues_list, objOptions);
	},

	initialise: function () {
		let _dash = asg.util.vdash;
		_dash.getData();

		let _init = function () {
			if (_dash.data.loaded()) {
				_dash.drawQuickstats();
				_dash.drawPieChart();
				_dash.drawOpenByDaysChart();
				_dash.drawTeamsList();
				_dash.draw_IIRIS_list();
			} else {
				window.setTimeout(_init, 200);
			}
		};

		_init();
	},

	initDataList: function (strListId, strTargetID) {
		asg.u.vdash.showDataList(strListId, strTargetID);
	},

	removeDataListItem: function (objList, strId) {
		var arrNew = [];
		for (var i = 0; i < objList.data.length; i++) {
			if (objList.data[i].id != strId) {
				arrNew.push(objList.data[i]);
			}
		}
		objList.data = arrNew;
	},

	showAddDataListItemDlg: function (objEvt) {
		var btn = objEvt.target;
		var arrIdComponents = btn.id.split("_");
		var viewId = arrIdComponents[1];
		var btnId = arrIdComponents[3];
		asg.ui.showDialog('addDataListItem', {
			size: 'medium'
		});

		var _form = document.getElementById('modal_body_content');
		var objList = asg.u.vdash.getListById(viewId);
		var _newId = null;

		var listIdField = document.getElementById('dlg_datalist_id');
		listIdField.value = viewId;

		var idField = document.getElementById('dlg_dataitem_id');
		idField.value = _newId;
		var idDisplay = document.getElementById('dlg_dataitem_id_display');
		idDisplay.innerHTML = '---';

		var legend = document.getElementById('dlg_legend');
		legend.innerHTML = "Add " + objList.label;
		var allLabels = _form.getElementsByTagName('label');
		for (var i = 0; i < allLabels.length; i++) {
			var currLabel = allLabels[i];
			if (currLabel.getAttribute('for') == 'dlg_dataitem_id') {
				currLabel.innerHTML = objList.label + ' ID:';
			}
			if (currLabel.getAttribute('for') == 'dlg_dataitem_label') {
				currLabel.innerHTML = objList.label + ' Label:';
			}
		}
	},

	showAllDataListLinks: function () {
		var _container = document.getElementById(asg.conf.ids.vdash_lists);
		var _menu = asg.u.vdash.getMenuById('repdata');
		var _templates = asg.data.templates.html.vdash.sys;

		_container.innerHTML = '';
		if (_menu != null) {
			var _data = _menu.menu_data;
			for (var i = 0; i < _data.length; i++) {
				var _item = _data[i];
				var objItem = asg.u.createFromFragment(
					asg.u.strReplace(
						_templates.dl_button, [_item.link, _item.icon, _item.label]
					)
				);

				var _onclick = function () {
					var strURL = this.getAttribute('data-href');
					if (strURL != null && strURL != '') {
						window.location = strURL;
					}
				}

				objItem.addEventListener('click', _onclick.bind(objItem));
				_container.appendChild(objItem);
			}
		}
	},

	showDeleteDataListitemDlg: function (objEvt) {
		var btn = objEvt.target;
		var arrIdComponents = btn.id.split("_");
		var viewId = arrIdComponents[1];
		var btnId = arrIdComponents[3];
		asg.ui.showDialog('deleteDataListItems', {
			size: 'medium'
		});

		var strMessage = "Are you sure you wish to delete this item?";
		var selRows = asg.u.vdash.data.currDataListView.getSelectedRows();
		if (selRows.length > 1) {
			strMessage = "Are you sure you would like to delete the " + selRows.length + " selected items?";
		}

		var warningBox = document.getElementById('dlg_warning_box');
		warningBox.innerHTML = strMessage;
	},

	showEditDataListItemDlg: function (objEvt) {
		var btn = objEvt.target;
		var arrIdComponents = btn.id.split("_");
		var viewId = arrIdComponents[1];
		var btnId = arrIdComponents[3];
		asg.ui.showDialog('editDataListItem', {
			size: 'medium'
		});

		var _rows = asg.u.vdash.data.currDataListView.getSelectedRows();
		if (_rows.length > 0) {
			var _row = _rows[0];
			var rowID = _row.id;
			var arrID = rowID.split('_');
			var itemID = arrID[2];
			var objList = asg.u.vdash.getListById(viewId);
			var objItem = asg.u.vdash.getDataListItem(objList, itemID, 'Id');
			var _form = document.getElementById('modal_body_content');
			var objList = asg.u.vdash.getListById(viewId);

			var listIdField = document.getElementById('dlg_datalist_id');
			listIdField.value = viewId;

			var idField = document.getElementById('dlg_dataitem_id');
			var strIdField = idField.getAttribute('data-accessor');
			idField.value = objItem[strIdField];

			var idDisplay = document.getElementById('dlg_dataitem_id_display');
			idDisplay.innerHTML = objItem[strIdField];

			var labelField = document.getElementById('dlg_dataitem_label')
			var strLabelField = labelField.getAttribute('data-accessor');
			labelField.value = objItem[strLabelField];

			var legend = document.getElementById('dlg_legend');
			legend.innerHTML = "Edit " + objList.label;
			var allLabels = _form.getElementsByTagName('label');
			for (var i = 0; i < allLabels.length; i++) {
				var currLabel = allLabels[i];
				if (currLabel.getAttribute('for') == 'dlg_dataitem_id') {
					currLabel.innerHTML = objList.label + ' ID:';
				}
				if (currLabel.getAttribute('for') == 'dlg_dataitem_label') {
					currLabel.innerHTML = objList.label + ' Label:';
				}
			}
		}
	},

	showDataList: function (strListId, strTargetID) {
		var container = document.getElementById(strTargetID);
		var list = asg.u.vdash.getListById(strListId);
		if (container != null && list != null) {
			asg.u.vdash.data.currDataListView = new asg.ViewComponent({
				id: strListId,
				title: 'Data Items:',
				target: container,
				height: '400px',
				width: '100%',
				selectable: true,
				buttons: [
					{
						id: 'del',
						label: 'Delete...',
						icon: 'fas fa-trash-alt',
						class: 'dark',
						requires_selection: true,
						handler: asg.util.vdash.showDeleteDataListitemDlg
                    },
					{
						id: 'edit',
						label: 'Edit...',
						icon: 'fas fa-edit',
						class: 'secondary',
						requires_selection: true,
						handler: asg.util.vdash.showEditDataListItemDlg
                    },
					{
						id: 'add',
						label: 'Add...',
						icon: 'fas fa-plus-circle',
						class: 'primary',
						requires_selection: false,
						handler: asg.util.vdash.showAddDataListItemDlg
                    }
                ],
				columns: [
					{
						label: 'ID',
						sorted: false,
						source: 'Id',
						width: '20%',
						sortable: true,
						is_id: true,
                    },
					{
						label: 'Label',
						sorted: true,
						sortkey: 'alpha',
						sortdir: 'asc',
						source: 'Name',
						width: '75%',
						sortable: true
                    }
                ],
				row_data: list.data,
				on_init: function () {
					this.redraw();
				}
			});
		}
	},

	updateDataListData: function (evt, data) {
		debugger;
	},

	updateDataListItem: function () {
		var listId = document.getElementById('dlg_datalist_id').value;
		var objList = asg.util.vdash.getListById(listId);
		var itemId = document.getElementById('dlg_dataitem_id').value;
		var objItem = asg.util.vdash.getDataListItem(objList, itemId);

		var labelField = document.getElementById('dlg_dataitem_label')
		var itemLabel = labelField.value;
		if (itemLabel.length > 0) {
			objItem.label = itemLabel
			asg.ui.closeDialog();
			asg.u.vdash.data.currDataListView.redraw();
		} else {
			asg.ui.attachErrorMsg(labelField, asg.s.dl_label2shrt);
		}
	},

	updateIIRISList: function () {
		let _this = this;
		let _data = _this.result.response.response_data;
		asg.data.system.vdash.lists.issues_with_iiris_records = _data;
		asg.util.vdash.data.iirisIssuesLoaded = true;
	},

	updateTeamsIssuesData: function () {
		let _this = this;
		let _data = _this.result.response.response_data;
		asg.data.system.vdash.lists.issues_by_support_team = _data;
		asg.util.vdash.data.teamsIssuesLoaded = true;
	},

	updateTeamsList: function () {
		let _this = this;
		let _data = _this.result.response.response_data;
		asg.data.system.vdash.lists.support_groups = _data;
		asg.util.vdash.data.teamsListLoaded = true;
	},

	view: {
		openByDaysChart: null,
	},

}

// EOF
