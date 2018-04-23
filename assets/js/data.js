asg.data = {
    lists: {
        diagram: {
            types: [
                {
                    id: "external_system",
                    value: "External System"
                    },
                {
                    id: "data_flow",
                    value: "Data Flow"
                    },

                ],
            ex_sys_subtypes: [
                {
                    id: 'api',
                    value: 'API',
                    icon: 'servers'
                    },
                {
                    id: 'web',
                    value: 'Web Page',
                    icon: 'window'
                    },
                {
                    id: 'database',
                    value: 'Database',
                    icon: 'database'
                    },
                {
                    id: 'file',
                    value: 'File',
                    icon: 'file'
                    },


                ],
            df_transports: [
                {
                    id: "https_jwt",
                    value: "HTTPS with JWT",
                    icon: "key"
                    },
                {
                    id: "https",
                    value: "HTTPS",
                    icon: "key"
                    },
                {
                    id: "lfs",
                    value: "Local FS",
                    icon: "tree"
                    },
                {
                    id: "ssl_sql",
                    value: "SSL-SQL",
                    icon: "db"
                    },
                {
                    id: "ssl_sql",
                    value: "SSL-SQL",
                    icon: "db"
                    },
                {
                    id: "jms ",
                    value: "JMS SOAP/XML",
                    icon: "code"
                    },
                ],
            shapes: [
                {
                    type: "data_flow",
                    details: {
                        source: {
                            id: ""
                        },
                        target: {
                            id: ""
                        },
                        attrs: {
                            '.marker-source': {
                                fill: '#145255',
                                stroke: '#145255',
                                d: 'M 10 0 L 10 10 L 0 10 L 0 0 z'
                            },
                            '.marker-target': {
                                fill: '#145255',
                                stroke: '#145255',
                                d: 'M 10 0 L 0 5 L 10 10 z'
                            }
                        },
                        labels: [
                            {
                                position: 0.5,
                                attrs: {
                                    text: {
                                        text: 'fancy label',
                                        'font-size': 10,
                                        fill: '#145255'
                                    },
                                    rect: {
                                        stroke: '#EDF2F2',
                                        fill: '#EDF2F2',
                                        'stroke-width': 20,
                                        rx: 5,
                                        ry: 5
                                    }
                                }
                                }
                            ]
                    }
                    },

                {
                    type: "external_system",
                    details: {
                        position: {
                            x: 150,
                            y: 80
                        },
                        size: {
                            width: 100,
                            height: 60
                        },
                        attrs: {
                            text: {
                                text: 'My Element'

                            },
                            image: {
                                'xlink:href': '/assets/img/database.png'
                            }
                        }
                    }
                },


                {
                    type: "system",
                    details: {
                        position: {
                            x: 0,
                            y: 0
                        },
                        size: {
                            width: 100,
                            height: 100
                        },
                        attrs: {
                            circle: {
                                fill: '#eeeeee',
                                stroke: '#333333',
                                "stroke-width": 1
                            },
                            text: {
                                text: '',
                                fill: '#000000',
                                'font-size': 10
                            }
                        }
                    }
                },

                {
                    type: "zone",
                    details: {
                        position: {
                            x: 100,
                            y: 100
                        },
                        size: {
                            width: 200,
                            height: 100
                        },
                        attrs: {
                            text: {
                                text: '',
                                fill: '#478081'
                            },
                            rect: {
                                strole: '#478081'
                            }
                        }
                    }
                }
            ]
        },
        site: {
            modals: [
                {
                    id: "addExternalSystem",
                    title: "Add External System",
                    template: "asg.data.templates.html.diagram.dialogs.addExternalSystem"
                },
                {
                    id: "addDataFlow",
                    title: "Add Data Flow",
                    template: "asg.data.templates.html.diagram.dialogs.addDataFlow"
                },
                {
                    id: "addZone",
                    title: "Add Zone",
                    template: "asg.data.templates.html.diagram.dialogs.addZone"
                }
            ],
            stringTable: {
                addDFLow: "Add Data Flow",
                addExtSys: "Add External System",
                addZone: "Add Zone",

                dFlowName2Shrt: "The data flow name needs to be five or more characters long",
                extSysName2Shrt: "The external system name needs to be five or more characters long",
                sysName2Shrt: "The system name needs to be five or more characters long",
                zoneName2Shrt: "The zone name needs to be five or more characters long",
                tooFewSystemsTitle: "Too few systems to link",
                tooFewSystemsText: "A data flow cannot link a system to itself. Try creating a few external systems before adding data flows."
            },
        },

    },

    elements: {
        diagram: {
            graph: null,
            paper: null
        }
    },

    system: {
        name: "Demo System",
        diagram: {
            model: {
                shapes: [
                    {
                        id: 'S0001',
                        type: 'system',
                        label: 'Demo System'
                    },
                    {
                        id: 'Z0001',
                        type: 'zone',
                        label: 'AWS Public'
                    }
                ],
                nextID: function (strType) {
                    var strID = "X0000";
                    var count = 0;
                    var shapes = asg.data.system.diagram.model.shapes;
                    var prefixes = {
                        system: 'P',
                        external_system: 'E',
                        data_flow: 'DF',
                        zone: 'Z',
                    }

                    for (var i = 0; i < shapes.length; i++) {
                        var currShape = shapes[i];
                        if (currShape.type == strType) {
                            count++;
                        }
                    }
                    if (count == 0) {
                        strID = prefixes[strType] + "0001"
                    }

                    var inUse = true;
                    while (inUse) {
                        count++;
                        strID = "0000" + count;
                        strID = strID.slice((strID.length - 4), strID.length);
                        strID = prefixes[strType] + strID;
                        inUse = false;
                        for (var i = 0; i < shapes.length; i++) {
                            var currShape = shapes[i];
                            if (currShape.id == strID) {
                                inUse = true;
                                break;
                            }
                        }
                    }
                    return strID;
                },
            },
            view: null,
            selectedElement: null,
            resize: {
                isResizing: false,
                direction: '',
                element: null,
                coords: {
                    x: 0,
                    y: 0
                }
            }
        },
        vdash: {
            chartData: {
                labels: ["SQL Injection", "XSS", "Cipher", "Uncontrolled Redirection", "Information Disclosure", "Authentication"],
                datasets: [{
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
                    }]
            },


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
                }
                ,
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
            ]
        }
    },

    templates: {
        json: {
            diagram: {
                ex_sys: '{"id":"shape_100","type":"external_system","subtype":"file","name":"External System"}',
                sys: '{"id":"shape_000","type":"system","name":"This System"}',
            }
        },
        html: {
            diagram: {
                dialogs: {
                    addExternalSystem: {
                        content: '<fieldset>' +
                            '<legend>External System Details</legend>' +
                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_subtype">External System Type:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_subtype"></select>' +
                            '</div>' +
                            '</div>' +
                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_name">External System Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<input type="text" placeholder="Enter system name" id="asg_shape_name" />' +
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
                                label: 'Add',
                                handler: 'asg.util.diagram.addExternalSystem'
                                }
                            ]
                    },

                    addDataFlow: {
                        content: '<fieldset>' +
                            '<legend>Data Flow Details</legend>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_from">From:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_from"></select>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_to">To:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_to"></select>' +
                            '<i class="fas fa-retweet" title="Swap from and to targets"></i>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_name">Data Flow Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<input type="text" placeholder="Enter data flow name" id="asg_shape_name" />' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_transport">Data Transport Layer:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<select id="asg_shape_transport"></select>' +
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
                                label: 'Add',
                                handler: 'asg.util.diagram.addDataFlow'
                                }
                            ]
                    },
                    addZone: {
                        content: '<fieldset>' +
                            '<legend>Zone Details</legend>' +
                            '<div class="row">' +
                            '<div class="row">' +
                            '<div class="col-xs-12 col-sm-5">' +
                            '<label for="asg_shape_name">Zone Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-7">' +
                            '<input type="text" placeholder="Enter zone name" id="asg_shape_name" />' +
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
                                label: 'Add',
                                handler: 'asg.util.diagram.addZone'
                                }
                            ]
                    },
                },

                panels: {
                    editSystem: {
                        content: '<fieldset>' +
                            '   <legend>Primary System Details</legend>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">System ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +

                            '   <div class="row">' +
                            '      <div class="col-xs-12">' +
                            '          <label for="asg_shape_name">System Name:</label>' +
                            '      </div>' +
                            '      <div class="col-xs-12">' +
                            '          <input type="text" placeholder="Enter system name" id="asg_shape_name" />' +
                            '      </div>' +
                            '   </div>' +
                            '</fieldset>',
                        buttons: [
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetPrimarySystem'
                            },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updatePrimarySystem'
                            }
                        ]
                    },

                    editExternalSystem: {
                        content: '<fieldset>' +
                            '    <legend>External System - <span id="asg_shape_label_display"></span></legend>' +

                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">External System ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-12">' +
                            '            <label for="asg_shape_subtype">External System Type:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-12">' +
                            '            <select id="asg_shape_subtype"></select>' +
                            '            <span id="asg_shape_type_image"></span>' +
                            '        </div>' +
                            '    </div>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-12">' +
                            '            <label for="asg_shape_name">External System Name:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-12">' +
                            '            <input type="text" placeholder="Enter system name" id="asg_shape_name" />' +
                            '        </div>' +
                            '    </div>' +
                            '</fieldset>',
                        buttons: [
                            {
                                class: 'tertiary',
                                label: 'Delete',
                                handler: 'asg.util.diagram.deleteShape'
                            },
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetExternalSystem'
                            },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updateExternalSystem'
                            }
                        ]
                    },

                    editDataFlow: {
                        content: '<fieldset>' +
                            '<legend>Data Flow Details</legend>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">Data Flow ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +
                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_from">From:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<select id="asg_shape_from"></select>' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_to">To:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<select id="asg_shape_to"></select>' +
                            '<i class="fas fa-retweet" title="Swap from and to targets"></i>' +

                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_name">Data Flow Name:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<input type="text" placeholder="Enter data flow name" id="asg_shape_name" />' +
                            '</div>' +
                            '</div>' +

                            '<div class="row">' +
                            '<div class="col-xs-12">' +
                            '<label for="asg_shape_transport">Data Transport Layer:</label>' +
                            '</div>' +
                            '<div class="col-xs-12">' +
                            '<select id="asg_shape_transport"></select>' +
                            '</div>' +
                            '</div>' +

                            '</fieldset>',
                        buttons: [
                            {
                                class: 'tertiary',
                                label: 'Delete',
                                handler: 'asg.util.diagram.deleteShape'
                            },
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetDataFlow'
                                },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updateDataFlow'
                            }
                        ]
                    },
                    editZone: {
                        content: '<fieldset>' +
                            '   <legend>Zone Details</legend>' +
                            '    <div class="row">' +
                            '        <div class="col-xs-7">' +
                            '            <label for="asg_shape_id_display">Zone ID:</label>' +
                            '        </div>' +
                            '        <div class="col-xs-5">' +
                            '            <span id="asg_shape_id_display"></span>' +
                            '        </div>' +
                            '    </div>' +

                            '   <div class="row">' +
                            '      <div class="col-xs-12">' +
                            '          <label for="asg_shape_name">Zone Name:</label>' +
                            '      </div>' +
                            '      <div class="col-xs-12">' +
                            '          <input type="text" placeholder="Enter zone name" id="asg_shape_name" />' +
                            '      </div>' +
                            '   </div>' +
                            '</fieldset>',
                        buttons: [
                            {
                                class: 'tertiary',
                                label: 'Delete',
                                handler: 'asg.util.diagram.deleteShape'
                            },
                            {
                                class: 'secondary',
                                label: 'Reset',
                                handler: 'asg.util.diagram.resetZone'
                            },
                            {
                                class: 'primary',
                                label: 'Update',
                                handler: 'asg.util.diagram.updateZone'
                            }
                        ]
                    },
                }
            },

        }
    }
};

asg.s = asg.data.lists.site.stringTable;




// EOF
