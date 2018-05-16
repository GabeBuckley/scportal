asg.data = {
	user_data: {
		users: [
			{
				id: 'anonymous',
				name: 'Unknown User',
				systemUser: true,
				email: 'secportaladmin@suncorp.com.au',
				roles: []
			},
			{
				id: 'u206803',
				name: 'BUCKLEY, Gabe',
				email: 'gabe.buckley@suncorp.com.au',
				roles: []
			},
			{
				id: 'u345203',
				name: 'NERK, Fred',
				email: 'fred.nerk@suncorp.com.au',
				roles: []
			},
			{
				id: 'u206234',
				name: 'BANNER, Bruce',
				email: 'bruce.banner@suncorp.com.au',
				roles: []
			},
			{
				id: 'u224221',
				email: 'bruce.wayne@suncorp.com.au',
				name: 'WAYNE, Bruce',
				roles: []
			},
			{
				id: 'u435003',
				email: 'peter.parker@suncorp.com.au',
				name: 'PARKER, Peter',
				roles: []
			}

		],
		groups: [
			{
				id: 'administrators',
				label: 'Administrators',
				members: [
					'u206803',
					'u435003'
					],
				roles: [
					'can_access_settings',
					'can-access-user-settings'
				]
			},
			{
				id: 'sys_all_users',
				label: 'All Users',
				members: [],
				roles: [
					'can_access_system',
				]
			}
		],
		roles: [
			'can_access_system',
			'can_access_settings',
			'can-access-user-settings'
		]
	},

	lists: {
		site: {
			modals: [
				{
					id: "doLogin",
					title: "Log In",
					template: "asg.data.templates.html.site.dialogs.doLogin"
    			}
			],
			stringTable: {

			},
		},

	},

	elements: {

	},

	system: {
		current_user: {
			id: 'anonymous',
			name: 'Unknown User',
			email: 'secportaladmin@suncorp.com.au',
		},

		name: "Demo System",

		menu: {
			main: {
				id: 'main',
				menu_data: [

					{
						id: 'main',
						label: 'Main...',
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
								id: 'settings',
								label: 'Settings',
								icon: 'fas fa-cogs',
								link: '#!/settings'
                            },
                        ]

                    }
                ]
			}
		}
	},

	templates: {
		json: {

		},
		html: {
			site: {
				dialogs: {
					doLogin: {
						content: '<fieldset>' +
							'<input type="hidden" name="asg_on_success_route" id="asg_on_success_route" />' +
							'<input type="hidden" name="asg_on_fail_route" id="asg_on_fail_route" />' +
							'<legend>Log In</legend>' +
							'<div class="asg-login-message-display" id="asg_login_message"></div>' +
							'<div class="row">' +
							'<div class="col-xs-12 col-sm-5">' +
							'<label for="asg_site_login_username">User ID (u#):</label>' +
							'</div>' +
							'<div class="col-xs-12 col-sm-7">' +
							'<input name="asg_site_login_username" id="asg_site_login_username" type="text" />' +
							'</div>' +
							'</div>' +
							'<div class="row">' +
							'<div class="col-xs-12 col-sm-5">' +
							'<label for="asg_site_login_password">Password:</label>' +
							'</div>' +
							'<div class="col-xs-12 col-sm-7">' +
							'<input type="password" id="asg_site_login_password" name="asg_site_login_password" />' +
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
								label: 'Log In',
								handler: 'asg.app.fn.handleLoginSubmit'
                                }
                            ]
					}
				}
			}
		}
	}
}

asg.s = asg.data.lists.site.stringTable;




// EOF
