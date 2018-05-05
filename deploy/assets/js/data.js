asg.data = {
    lists: {
        site: {
            modals: [],
            stringTable: {

            },
        },

    },

    elements: {

    },

    system: {
        name: "Demo System",

        menu: {
            main: {
                id: 'main',
                menu_data: [

                    {
                        id: 'view',
                        label: 'View...',
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
        html: {}
    }
};

asg.s = asg.data.lists.site.stringTable;




// EOF
