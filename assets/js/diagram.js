/* SDL Diagram Editor */

// Add data lists
asg.data.lists.diagram = {
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
};

// Add modals
if (asg.__etc == null) {
    asg.__etc = {};
}
asg.__etc.diagramModals = [
    {
        id: "addExternalSystem",
        title: "Add External System",
        template: "asg.data.templates.html.diagram.dialogs.addExternalSystem"
    }, {
        id: "addDataFlow",
        title: "Add Data Flow",
        template: "asg.data.templates.html.diagram.dialogs.addDataFlow"
    }, {
        id: "addZone",
        title: "Add Zone",
        template: "asg.data.templates.html.diagram.dialogs.addZone"
    }
];
for (var i = 0; i < asg.__etc.diagramModals.length; i++) {
    asg.data.lists.site.modals.push(asg.__etc.diagramModals[i]);
}

// Add System Data
asg.data.system.diagram = {
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
}

// Add Templates
asg.data.templates.html.diagram = {
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
};

// Add StringTable Entries
asg.__etc.diagram = {
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
    }
};
for (var stringID in asg.__etc.diagram.stringTable) {
    asg.data.lists.site.stringTable[stringID] = asg.__etc.diagram.stringTable[stringID];
}

// Add Element Placeholders
asg.data.elements.diagram = {
    graph: null,
    paper: null
};

// Copy in configuration items
asg.__etc.diagram = {
    conf: {
        ids: {
            //Diagram Components
            dia_prop_box: 'properties_form',
            dia_prop_btns: 'properties_buttons',

            // Diagram data fields
            dia_shape_name: 'asg_shape_name',
            dia_shape_label_display: 'asg_shape_label_display',
            dia_shape_id_display: 'asg_shape_id_display',
            dia_shape_type_image: 'asg_shape_type_image',
            dia_shape_from: 'asg_shape_from',
            dia_shape_to: 'asg_shape_to',
            dia_shape_transport: 'asg_shape_transport',
        }
    }
};
for (var confidID in asg.__etc.diagram.conf.ids) {
    asg.conf.ids[confidID] = asg.__etc.diagram.conf.ids[confidID];
};

// Add UI Functions
asg.ui.diagram = {
    addExternalSystem: function () {
        asg.util.diagram.clearPanel();
        var types = asg.data.lists.diagram.ex_sys_subtypes;
        asg.ui.showDialog('addExternalSystem', {
            size: 'medium'
        });
        var typeSelect = document.getElementById('asg_shape_subtype');
        for (var i = 0; i < types.length; i++) {
            var currType = types[i];
            var objOpt = new Option();
            objOpt.value = currType.id;
            objOpt.innerHTML = currType.value;
            typeSelect.appendChild(objOpt);
        }

        var labelField = document.getElementById('asg_shape_name');
        labelField.focus();
    },

    addDataFlow: function () {
        asg.util.diagram.clearPanel();
        var shapes = asg.data.system.diagram.model.shapes;
        var sysShapes = [];
        for (var i = 0; i < shapes.length; i++) {
            if (shapes[i].type == 'external_system' || shapes[i].type == 'system') {
                sysShapes.push(shapes[i]);
            }
        }
        if (sysShapes.length < 2) {
            asg.ui.showMsg('too_few_systems', 'error', asg.s.tooFewSystemsTitle, asg.s.tooFewSystemsText);
            return;
        } else {
            var transports = asg.data.lists.diagram.df_transports;

            asg.ui.showDialog('addDataFlow', {
                size: 'medium'
            });
            var swapOptions = function () {
                var fromSelect = document.getElementById('asg_shape_from');
                var toSelect = document.getElementById('asg_shape_to');
                var fromIndex = fromSelect.selectedIndex;
                var toIndex = toSelect.selectedIndex;

                var fromOpt = fromSelect.options[toIndex];
                var fromPrev = fromSelect.options[fromIndex];

                var toOpt = toSelect.options[fromIndex];
                var toPrev = toSelect.options[toIndex];

                fromOpt.disabled = false;
                fromOpt.selected = true;
                fromPrev.disabled = true

                toOpt.disabled = false;
                toOpt.selected = true;
                toPrev.disabled = true
            };

            var disableToOption = function () {
                var fromSelect = document.getElementById('asg_shape_from');
                var toSelect = document.getElementById('asg_shape_to');

                var fromVal = fromSelect.value;

                for (var i = 0; i < toSelect.options.length; i++) {
                    var currOpt = toSelect.options[i];
                    if (currOpt.value == fromVal) {
                        currOpt.disabled = true;
                    } else {
                        currOpt.disabled = false;
                    }
                }
            };

            var disableFromOption = function () {
                var fromSelect = document.getElementById('asg_shape_from');
                var toSelect = document.getElementById('asg_shape_to');

                var toVal = toSelect.value;

                for (var i = 0; i < fromSelect.options.length; i++) {
                    var currOpt = fromSelect.options[i];
                    if (currOpt.value == toVal) {
                        currOpt.disabled = true;
                    } else {
                        currOpt.disabled = false;
                    }
                }
            };

            var fromSelect = document.getElementById('asg_shape_from');
            for (var i = 0; i < sysShapes.length; i++) {
                var currShape = sysShapes[i];
                if (currShape.type != "data_flow") {
                    var objOpt = new Option();
                    objOpt.value = currShape.id;
                    objOpt.innerHTML = currShape.label;
                    fromSelect.appendChild(objOpt);
                }
            }
            fromSelect.onchange = disableToOption;


            var toSelect = document.getElementById('asg_shape_to');
            for (var i = 0; i < sysShapes.length; i++) {
                var currShape = sysShapes[i];
                if (currShape.type != "data_flow") {
                    var objOpt = new Option();
                    objOpt.value = currShape.id;
                    objOpt.innerHTML = currShape.label;
                    toSelect.appendChild(objOpt);
                }
            }
            toSelect.onchange = disableFromOption;


            if (toSelect.options.length >= 2) {
                toSelect.selectedIndex = 1;
            }


            disableToOption();
            disableFromOption();

            var swapButton = toSelect.nextElementSibling;
            if (swapButton != null) {
                swapButton.onclick = swapOptions;
            }

            var transSelect = document.getElementById('asg_shape_transport');
            for (var i = 0; i < transports.length; i++) {
                var currTrans = transports[i];
                var objOpt = new Option();
                objOpt.value = currTrans.id;
                objOpt.innerHTML = currTrans.value;
                transSelect.appendChild(objOpt);
            }

            var labelField = document.getElementById('asg_shape_name');
            labelField.focus();
        }
    },

    addZone: function () {
        asg.util.diagram.clearPanel();
        asg.ui.showDialog('addZone', {
            size: 'medium'
        });
        var labelField = document.getElementById('asg_shape_name');
        labelField.focus();
    }
};


// Add Util functions
asg.util.diagram = {

    addDataFlow: function () {
        var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
        var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);
        var transSelect = document.getElementById(asg.conf.ids.dia_shape_transport);
        var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

        if (fromSelect != null && toSelect != null && transSelect != null && labelField != null) {
            if (labelField.value.length >= 5) {

                var strId = asg.data.system.diagram.model.nextID('data_flow');
                var strLabel = labelField.value;
                var objTransport = asg.util.diagram.getDataFlowTransport(transSelect.value);
                var strTransport = objTransport.value;
                var strTransportIcon = objTransport.icon;

                var strFrom = fromSelect.value;
                var strTo = toSelect.value;

                var shape = {
                    id: strId,
                    type: 'data_flow',
                    label: strLabel,
                    icon: strTransportIcon,
                    transport: strTransport,
                    from: strFrom,
                    to: strTo
                }

                asg.data.system.diagram.model.shapes.push(shape);
                asg.u.diagram.redraw();
                asg.ui.closeDialog();
            } else {
                asg.ui.attachErrorMsg(labelField, asg.s.extSysName2Shrt);
            }
        }

    },

    addExternalSystem: function () {
        var typeSelect = document.getElementById('asg_shape_subtype');
        var labelField = document.getElementById('asg_shape_name');

        if (typeSelect != null && labelField != null) {
            if (labelField.value.length >= 5) {
                // All valid input
                var strId = asg.data.system.diagram.model.nextID('external_system');
                var strLabel = labelField.value;

                var objSubtype = asg.util.diagram.getExternalSystemSubtype(typeSelect.value);
                var strSubType = objSubtype.id;
                var strSubTypeIcon = objSubtype.icon;

                var shape = {
                    id: strId,
                    type: 'external_system',
                    subtype: strSubType,
                    label: strLabel,
                    icon: strSubTypeIcon
                }

                asg.data.system.diagram.model.shapes.push(shape);
                asg.u.diagram.redraw();
                asg.ui.closeDialog();
            } else {
                asg.ui.attachErrorMsg(labelField, asg.s.dFlowName2Shrt);
            }
        }

    },

    addShape: function (objShape) {
        var graph = asg.data.elements.diagram.graph;
        if (graph != null) {
            switch (objShape.type) {
                case "system":
                    {
                        //debugger;
                        var strLabel = objShape.label;
                        objShape.attrs.text.text = objShape.id + '\n\r' + strLabel;
                        if (objShape.position.x == 0 && objShape.position.y == 0) {
                            var centrePoint = asg.util.diagram.getDiagramCentre();
                            objShape.position.x = centrePoint.x;
                            objShape.position.y = centrePoint.y;
                        }

                        var shape = new joint.shapes.basic.Circle(objShape);
                        graph.addCell(shape);
                        break;
                    }

                case "external_system":
                    {
                        //debugger;
                        var strLabel = objShape.label;
                        var strIcon = objShape.icon;
                        objShape.attrs.text.text = objShape.id + '\n\r' + strLabel;
                        objShape.attrs.image['xlink:href'] = '/assets/img/' + strIcon + '.png'
                        var shape = new joint.shapes.basic.ExternalSystem(objShape);
                        shape.on('change', function (shape, data) {
                            //debugger;
                            if (shape.changed.position != null) {
                                var modelShape = asg.util.diagram.getModelShapeById(shape.id);
                                modelShape.position = shape.changed.position;
                            }
                        });

                        graph.addCell(shape);
                        break;
                    }

                case "data_flow":
                    {
                        var strLabel = objShape.label;
                        var strIcon = objShape.icon;
                        var strTransport = objShape.transport;
                        var strFrom = objShape.from;
                        var strTo = objShape.to;

                        objShape.source.id = strFrom;
                        objShape.target.id = strTo;
                        objShape.labels[0].attrs.text.text = objShape.id + '\n\r' + strLabel + '\n\r' + strTransport;
                        var link = new joint.dia.Link(objShape);
                        link.on('change', function (shape, data) {
                            //debugger;
                            if (shape.changed.vertices != null) {
                                var modelShape = asg.util.diagram.getModelShapeById(shape.id);
                                modelShape.vertices = shape.changed.vertices;
                            }
                        });
                        if (objShape.vertices != null) {
                            link.set('vertices', objShape.vertices);
                        }
                        link.addTo(graph);

                        break;
                    }

                case "zone":
                    {
                        //debugger;
                        var strLabel = objShape.label;
                        objShape.attrs.text.text = objShape.id + '. ' + strLabel;
                        var shape = new joint.shapes.basic.Zone(objShape);
                        /**
                            shape.on('change', function (shape, data) {
                                //debugger;
                                if (shape.changed.position != null) {
                                    var modelShape = asg.util.diagram.getModelShapeById(shape.id);
                                    modelShape.position = shape.changed.position;
                                }
                            });
**/
                        var g = graph.addCell(shape);
                        var el = g.getCell(objShape.id);
                        el.toBack();
                        break;
                    }


                default:
                    {
                        break;
                    }
            }
        }
    },

    addZone: function () {
        var labelField = document.getElementById('asg_shape_name');
        if (labelField != null && labelField.value.length >= 5) {
            var strId = asg.data.system.diagram.model.nextID('zone');
            var strLabel = labelField.value;
            var shape = {
                id: strId,
                type: 'zone',
                label: strLabel,
            }
            asg.data.system.diagram.model.shapes.push(shape);
            asg.u.diagram.redraw();
            asg.ui.closeDialog();
        } else {
            asg.ui.attachErrorMsg(labelField, asg.s.zoneName2Shrt);
        }
    },

    clear: function () {
        asg.data.elements.diagram.graph.clear();
        asg.util.diagram.clearPanel();
    },

    clearPanel: function () {
        var panel = document.getElementById('properties_form');
        panel.innerHTML = '';
        var buttonBar = document.getElementById('properties_buttons');
        buttonBar.innerHTML = '';
    },

    deleteShape: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {
            var arrEls = [];
            var shapes = asg.data.system.diagram.model.shapes;
            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                if (currShape.id != currEl.id) {
                    if (currShape.type == 'data_flow') {
                        if (currShape.to == currEl.id) {
                            currShape.to = '';
                        }
                        if (currShape.from == currEl.id) {
                            currShape.from = '';
                        }
                    }
                    arrEls.push(currShape);
                }

            }
            asg.data.system.diagram.model.shapes = arrEls;
            asg.data.system.diagram.selectedElement = null;
            asg.util.diagram.redraw();
        }
    },

    deSelectElements: function () {
        var shapes = asg.data.system.diagram.model.shapes;
        for (var i = 0; i < shapes.length; i++) {
            var currShape = shapes[i];
            asg.util.diagram.unselectElement(currShape.id);
        }
        asg.data.system.diagram.selectedElement = null;
    },

    drawShape: function (objShape) {
        if (objShape != null) {
            asg.util.diagram.addShape(objShape);
        }
    },

    editDataFlow: function () {
        var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editDataFlow')
        var panel = document.getElementById('properties_form');
        panel.innerHTML = templateHTML.content;
        var arrButtons = templateHTML.buttons;
        var buttonBar = document.getElementById('properties_buttons');
        buttonBar.innerHTML = '';
        for (var i = 0; i < arrButtons.length; i++) {
            var currButton = arrButtons[i];
            var objButton = document.createElement('button');

            var strClass = 'sg-Btn sg-Btn--' + currButton.class;
            objButton.className = strClass;
            objButton.innerHTML = currButton.label;
            objButton.onclick = eval(currButton.handler);

            buttonBar.appendChild(objButton);
        }

        asg.util.diagram.resetDataFlow();

    },

    editExternalSystem: function () {

        var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editExternalSystem')
        var panel = document.getElementById('properties_form');
        panel.innerHTML = templateHTML.content;
        var arrButtons = templateHTML.buttons;
        var buttonBar = document.getElementById('properties_buttons');
        buttonBar.innerHTML = '';
        for (var i = 0; i < arrButtons.length; i++) {
            var currButton = arrButtons[i];
            var objButton = document.createElement('button');

            var strClass = 'sg-Btn sg-Btn--' + currButton.class;
            objButton.className = strClass;
            objButton.innerHTML = currButton.label;
            objButton.onclick = eval(currButton.handler);

            buttonBar.appendChild(objButton);
        }

        asg.util.diagram.resetExternalSystem();

    },

    editPrimarySystem: function () {

        var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editSystem')
        var panel = document.getElementById(asg.conf.ids.dia_prop_box);
        panel.innerHTML = templateHTML.content;
        var arrButtons = templateHTML.buttons;
        var buttonBar = document.getElementById(asg.conf.ids.dia_prop_btns);
        buttonBar.innerHTML = '';
        for (var i = 0; i < arrButtons.length; i++) {
            var currButton = arrButtons[i];
            var objButton = document.createElement('button');

            var strClass = 'sg-Btn sg-Btn--' + currButton.class;
            objButton.className = strClass;
            objButton.innerHTML = currButton.label;
            objButton.onclick = eval(currButton.handler);

            buttonBar.appendChild(objButton);
        }

        asg.util.diagram.resetPrimarySystem();

    },

    editZone: function () {

        var templateHTML = asg.util.getTemplate('asg.data.templates.html.diagram.panels.editZone')
        var panel = document.getElementById(asg.conf.ids.dia_prop_box);
        panel.innerHTML = templateHTML.content;
        var arrButtons = templateHTML.buttons;
        var buttonBar = document.getElementById(asg.conf.ids.dia_prop_btns);
        buttonBar.innerHTML = '';
        for (var i = 0; i < arrButtons.length; i++) {
            var currButton = arrButtons[i];
            var objButton = document.createElement('button');

            var strClass = 'sg-Btn sg-Btn--' + currButton.class;
            objButton.className = strClass;
            objButton.innerHTML = currButton.label;
            objButton.onclick = eval(currButton.handler);

            buttonBar.appendChild(objButton);
        }

        asg.util.diagram.resetZone();



    },

    getDataFlowTransport: function (strTransID) {
        var transports = asg.data.lists.diagram.df_transports;
        for (var i = 0; i < transports.length; i++) {
            var currTrans = transports[i];
            if (currTrans.id == strTransID) {
                return currTrans;
            }
        }
        return null;
    },

    getDiagramCentre: function () {
        var paperDiv = document.getElementById('dfd_container');
        var width = paperDiv.clientWidth;
        var height = paperDiv.clientHeight;
        var xVal = Math.round(width / 2);
        var yVal = Math.round(height / 2);
        return {
            x: xVal,
            y: yVal
        };
    },

    getExternalSystemSubtype: function (strSubTypeId) {
        var types = asg.data.lists.diagram.ex_sys_subtypes;
        for (var i = 0; i < types.length; i++) {
            var currType = types[i];
            if (currType.id == strSubTypeId) {
                return currType;
            }
        }
        return null;
    },

    getModelShapeById: function (strID) {
        var shapes = asg.data.system.diagram.model.shapes;

        for (var i = 0; i < shapes.length; i++) {
            var currShape = shapes[i];
            if (currShape.id == strID) {
                return currShape;
            }
        }
        return null;
    },

    getShapeDefaults: function (strShapeType) {
        for (var i = 0; i < asg.data.lists.diagram.shapes.length; i++) {
            var currShape = asg.data.lists.diagram.shapes[i];
            if (currShape.type == strShapeType) {
                return currShape;
            }
        }
        return null;
    },

    getShapeFromTemplate: function (objTemplateRef) {
        var strShapeText = objTemplateRef;
        if (strShapeText != null && strShapeText.length > 0) {
            var shape = JSON.parse(strShapeText);
            return shape;
        }
        return null;
    },

    initialise: function () {
        asg.data.elements.diagram.graph = new joint.dia.Graph;

        asg.data.elements.diagram.paper = new joint.dia.Paper({
            el: $('#dfd_container'),
            width: '95%',
            height: 600,
            model: asg.data.elements.diagram.graph,
            gridSize: 1,
            interactive: true,
        });

        asg.data.elements.diagram.paper.on('cell:pointerup', function (elementView, evt) {
            var r = asg.data.system.diagram.resize;
            var g = asg.data.elements.diagram.graph;
            var modelData = elementView.model;
            var cell = asg.data.elements.diagram.graph.getCell(modelData.id);
            var objPaper = asg.data.elements.diagram.paper;
            var objView = objPaper.findViewByModel(cell);
            objView.options.interactive = true;


            r.coords = {
                x: 0,
                y: 0
            };
            r.direction = '';
            r.isResizing = false;
            r.element = null;
            asg.util.diagram.selectElement(elementView);

        });

        var isBorderClicked = function (bbox, mX, mY, strokeWidth) {
            var borderRanges = {
                left: {
                    start: (bbox.x),
                    end: (bbox.x + strokeWidth)
                },
                top: {
                    start: (bbox.y),
                    end: (bbox.y + strokeWidth)
                },
                right: {
                    start: ((bbox.x + bbox.width) - strokeWidth),
                    end: (bbox.x + bbox.width)
                },
                bottom: {
                    start: ((bbox.y + bbox.height) - strokeWidth),
                    end: (bbox.y + bbox.height)
                },
                check: function (objPoint) {
                    var isInRange = false;
                    var border = 'none';

                    if (objPoint.x >= this.left.start && objPoint.x <= this.left.end &&
                        objPoint.y >= this.top.start && objPoint.y <= this.bottom.end) {
                        // in the left border zone
                        isInRange = true;
                        border = 'left';
                    }
                    if (objPoint.x >= this.right.start && objPoint.x <= this.right.end &&
                        objPoint.y >= this.top.start && objPoint.y <= this.bottom.end) {
                        // in the right border zone
                        isInRange = true;
                        border = 'right';
                    }
                    if (objPoint.x >= this.left.start && objPoint.x <= this.right.end &&
                        objPoint.y >= this.top.start && objPoint.y <= this.top.end) {
                        // in the top border zone
                        isInRange = true;
                        border = 'top';
                    }
                    if (objPoint.x >= this.left.start && objPoint.x <= this.right.end &&
                        objPoint.y >= this.bottom.start && objPoint.y <= this.bottom.end) {
                        // in the bottom border zone
                        isInRange = true;
                        border = 'bottom';
                    }

                    return {
                        inRange: isInRange,
                        direction: border
                    }
                }
            }
            return borderRanges.check({
                x: mX,
                y: mY
            });

        }

        asg.data.elements.diagram.paper.on('cell:pointerdown', function (elementView, evt) {
            var g = asg.data.elements.diagram.graph;
            var bbox = elementView.getBBox();
            var modelData = elementView.model;
            var shape = asg.util.diagram.getModelShapeById(modelData.id);
            var cell = asg.data.elements.diagram.graph.getCell(modelData.id);
            var objPaper = asg.data.elements.diagram.paper;
            var objView = objPaper.findViewByModel(cell);


            var stroke = elementView.model.attr('rect/stroke-width') || 3;
            var isBorder = isBorderClicked(bbox, evt.offsetX, evt.offsetY, stroke)

            if (shape.type == "zone") {

                if (isBorder.inRange) {
                    objView.options.interactive = false;

                    var r = asg.data.system.diagram.resize;
                    r.isResizing = true;
                    r.direction = isBorder.direction;
                    r.element = elementView;
                    r.coords.x = evt.offsetX;
                    r.coords.y = evt.offsetY;
                }
            } else {
                objView.options.interactive = true;
            }
        });

        asg.data.elements.diagram.paper.on('cell:pointermove', function (elementView, evt, x, y) {

            var modelData = elementView.model;
            var shape = asg.util.diagram.getModelShapeById(modelData.id);
            var cell = asg.data.elements.diagram.graph.getCell(modelData.id);
            var r = asg.data.system.diagram.resize;
            var objPaper = asg.data.elements.diagram.paper;
            var objView = objPaper.findViewByModel(cell);



            if (shape.type == "zone") {

                var r = asg.data.system.diagram.resize;
                var g = asg.data.elements.diagram.graph;
                var bbox = elementView.getBBox();

                var stroke = elementView.model.attr('rect/stroke-width') || 3;
                var isBorder = isBorderClicked(bbox, bbox.x + evt.offsetX, bbox.y + evt.offsetY, stroke)

                if (r.isResizing) {

                    evt.preventDefault();
                    evt.stopPropagation();
                    var dx = x - r.coords.x;
                    var dy = y - r.coords.y;

                    r.coords.x = x;
                    r.coords.y = y;

                    switch (r.direction) {
                        case 'left':
                            {
                                cell.position(bbox.x + dx, bbox.y)
                                var oldWidth = elementView.model.attr('rect/width');
                                var newWidth = parseInt(oldWidth, 10) - dx;

                                cell.attr('rect/width', parseInt(newWidth, 10));
                                break;
                            }
                        case 'right':
                            {
                                cell.position(bbox.x, bbox.y)
                                var oldWidth = elementView.model.attr('rect/width');
                                var newWidth = parseInt(oldWidth, 10) + dx;

                                cell.attr('rect/width', parseInt(newWidth, 10));
                                break;
                            }
                        case 'top':
                            {
                                cell.position(bbox.x, bbox.y + dy)
                                var oldHeight = elementView.model.attr('rect/height');
                                var newHeight = parseInt(oldHeight, 10) - dy;
                                cell.attr('rect/height', newHeight);
                                break;
                            }
                        case 'bottom':
                            {
                                cell.position(bbox.x, bbox.y)
                                var oldHeight = elementView.model.attr('rect/height');
                                var newHeight = parseInt(oldHeight, 10) + dy;
                                cell.attr('rect/height', newHeight);
                                break;
                            }
                        default:
                            {

                                break;
                            }
                    }
                    //bbox = elementView.getBBox();
                    shape.position.x = bbox.x;
                    shape.position.y = bbox.y;
                    shape.size.height = parseInt(bbox.height, 10);
                    shape.size.width = parseInt(bbox.width, 10);
                    cell.attr('rect/stroke', '#ff0000');

                    return false;

                } else {
                    if (isBorder.inRange) {
                        /*
                                                   switch (isBorder.direction) {
                                                       case 'left':
                                                       case 'right':
                                                           {
                                                               elementView.el.style.cursor = "ew-resize";
                                                               break;
                                                           }
                                                       case 'top':
                                                       case 'bottom':
                                                           {
                                                               elementView.el.style.cursor = "ns-resize";
                                                               break;
                                                           }
                                                       default:
                                                           {

                                                               break;
                                                           }
                                                   }*/
                        cell.attr('rect/stroke', '#ff0000');
                    } else {
                        elementView.el.style.cursor = "move";
                    }
                }
            } else {
                objView.options.interactive = true;
            }
        });


        var e = asg.data.elements;

        e.controlPanel = document.createElement('div');

        e.controlPanel.className = "asg-control-surface-panel";
        e.btnAddExternalSystem = document.createElement('button');
        e.btnAddExternalSystem.className = "sg-Btn";
        e.btnAddExternalSystem.innerHTML = '<i class="fas fa-plus-circle"></i> ' + asg.s.addExtSys;
        e.btnAddExternalSystem.onclick = asg.ui.diagram.addExternalSystem;
        e.controlPanel.appendChild(e.btnAddExternalSystem);

        e.btnAddDataFlow = document.createElement('button');
        e.btnAddDataFlow.className = "sg-Btn";
        e.btnAddDataFlow.innerHTML = '<i class="fas fa-plus-circle"></i> ' + asg.s.addDFLow;
        e.btnAddDataFlow.onclick = asg.ui.diagram.addDataFlow;
        e.controlPanel.appendChild(e.btnAddDataFlow);

        e.btnAddZone = document.createElement('button');
        e.btnAddZone.className = "sg-Btn";
        e.btnAddZone.innerHTML = '<i class="fas fa-plus-circle"></i> ' + asg.s.addZone;
        e.btnAddZone.onclick = asg.ui.diagram.addZone;
        e.controlPanel.appendChild(e.btnAddZone);

        var p = document.getElementById('asg_tools_panel');
        p.innerHTML = "";
        p.appendChild(e.controlPanel);
        asg.util.diagram.redraw();
    },

    redraw: function () {
        asg.util.diagram.clear();

        if (asg.data.system.diagram.view != null) {
            // Draw from saved data
        } else {
            // Draw from model data
            var shapes = asg.data.system.diagram.model.shapes;
            // Zones first
            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                if (currShape.type == 'zone') {
                    var holdPosition = null;
                    if (currShape.position != null) {
                        holdPosition = currShape.position;
                    }

                    var holdVertices = null;
                    if (currShape.vertices != null) {
                        holdVertices = currShape.vertices;
                    }

                    var holdSize = null;
                    if (currShape.size != null) {
                        holdSize = currShape.size;
                    }

                    var shapeDefaults = asg.util.diagram.getShapeDefaults(currShape.type);
                    for (var field in shapeDefaults.details) {
                        currShape[field] = shapeDefaults.details[field];
                    }

                    if (holdPosition != null) {
                        currShape.position = holdPosition;
                    }

                    if (holdVertices != null) {
                        currShape.vertices = holdVertices;
                    }

                    if (holdSize != null) {
                        currShape.size = holdSize;
                    }

                    asg.util.diagram.drawShape(currShape);
                }

            }


            // Then the rest
            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                if (currShape.type != 'zone') {
                    var holdPosition = null;
                    if (currShape.position != null) {
                        holdPosition = currShape.position;
                    }

                    var holdVertices = null;
                    if (currShape.vertices != null) {
                        holdVertices = currShape.vertices;
                    }

                    var holdSize = null;
                    if (currShape.size != null) {
                        holdSize = currShape.size;
                    }

                    var shapeDefaults = asg.util.diagram.getShapeDefaults(currShape.type);
                    for (var field in shapeDefaults.details) {
                        currShape[field] = shapeDefaults.details[field];
                    }

                    if (holdPosition != null) {
                        currShape.position = holdPosition;
                    }

                    if (holdVertices != null) {
                        currShape.vertices = holdVertices;
                    }

                    if (holdSize != null) {
                        currShape.size = holdSize;
                    }

                    asg.util.diagram.drawShape(currShape);
                }
            }

        }
    },

    resetDataFlow: function () {
        var types = asg.data.lists.diagram.ex_sys_subtypes;
        var shapes = asg.data.system.diagram.model.shapes;
        var transports = asg.data.lists.diagram.df_transports;
        var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
        var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);
        var transSelect = document.getElementById(asg.conf.ids.dia_shape_transport);
        var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {
            asg.util.clearSelect(fromSelect);
            asg.util.clearSelect(toSelect);
            asg.util.clearSelect(transSelect);


            var disableToOption = function () {
                var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
                var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);

                var fromVal = fromSelect.value;

                for (var i = 0; i < toSelect.options.length; i++) {
                    var currOpt = toSelect.options[i];
                    if (currOpt.value == fromVal) {
                        currOpt.disabled = true;
                    } else {
                        currOpt.disabled = false;
                    }
                }
            }

            var disableFromOption = function () {
                var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
                var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);

                var toVal = toSelect.value;

                for (var i = 0; i < fromSelect.options.length; i++) {
                    var currOpt = fromSelect.options[i];
                    if (currOpt.value == toVal) {
                        currOpt.disabled = true;
                    } else {
                        currOpt.disabled = false;
                    }
                }
            }

            var swapOptions = function () {
                var fromSelect = document.getElementById('asg_shape_from');
                var toSelect = document.getElementById('asg_shape_to');
                var fromIndex = fromSelect.selectedIndex;
                var toIndex = toSelect.selectedIndex;

                var fromOpt = fromSelect.options[toIndex];
                var fromPrev = fromSelect.options[fromIndex];

                var toOpt = toSelect.options[fromIndex];
                var toPrev = toSelect.options[toIndex];

                fromOpt.disabled = false;
                fromOpt.selected = true;
                fromPrev.disabled = true

                toOpt.disabled = false;
                toOpt.selected = true;
                toPrev.disabled = true
            };


            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                if (currShape.type != "data_flow") {
                    var objOpt = new Option();
                    objOpt.value = currShape.id;
                    objOpt.innerHTML = currShape.label;
                    if (currShape.id == currEl.from) {
                        objOpt.selected = true;
                    }
                    fromSelect.appendChild(objOpt);
                }

            }
            fromSelect.onchange = disableToOption;

            for (var i = 0; i < shapes.length; i++) {
                var currShape = shapes[i];
                if (currShape.type != "data_flow") {
                    var objOpt = new Option();
                    objOpt.value = currShape.id;
                    objOpt.innerHTML = currShape.label;
                    if (currShape.id == currEl.to) {
                        objOpt.selected = true;
                    }
                    toSelect.appendChild(objOpt);
                }

            }
            toSelect.onchange = disableFromOption;

            disableToOption();
            disableFromOption();

            var swapButton = toSelect.nextElementSibling;
            if (swapButton != null) {
                swapButton.onclick = swapOptions;
            }


            for (var i = 0; i < transports.length; i++) {
                var currTrans = transports[i];
                var objOpt = new Option();
                objOpt.value = currTrans.id;
                objOpt.innerHTML = currTrans.value;
                if (currTrans.id == currEl.transport) {
                    objOpt.selected = true;
                }
                transSelect.appendChild(objOpt);
            }


            var labelField = document.getElementById('asg_shape_name');
            labelField.value = currEl.label;


            var idField = document.getElementById('asg_shape_id_display');
            idField.innerHTML = currEl.id;


            labelField.focus();
        }
    },

    resetExternalSystem: function () {
        var types = asg.data.lists.diagram.ex_sys_subtypes;

        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {
            var typeSelect = document.getElementById('asg_shape_subtype');
            asg.util.clearSelect(typeSelect);
            for (var i = 0; i < types.length; i++) {
                var currType = types[i];
                var objOpt = new Option();
                objOpt.value = currType.id;
                objOpt.innerHTML = currType.value;
                if (currType.id == currEl.subtype) {
                    objOpt.selected = true;
                }
                typeSelect.appendChild(objOpt);
            }

            var labelField = document.getElementById('asg_shape_name');
            labelField.value = currEl.label;


            var titleSpan = document.getElementById('asg_shape_label_display');
            titleSpan.innerHTML = currEl.label;

            var idField = document.getElementById('asg_shape_id_display');
            idField.innerHTML = currEl.id;

            var imgField = document.getElementById('asg_shape_type_image');
            imgField.innerHTML = "";
            var objImg = document.createElement('img');
            objImg.src = '/assets/img/' + currEl.icon + '.png';
            imgField.appendChild(objImg);

            labelField.focus();
        }
    },

    resetPrimarySystem: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {

            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);
            labelField.value = currEl.label;

            var idField = document.getElementById(asg.conf.ids.dia_shape_id_display);
            idField.innerHTML = currEl.id;

            labelField.focus();
        }
    },

    resetZone: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {

            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);
            labelField.value = currEl.label;

            var idField = document.getElementById(asg.conf.ids.dia_shape_id_display);
            idField.innerHTML = currEl.id;

            labelField.focus();
        }
    },

    selectElement: function (objCellView) {
        asg.util.diagram.deSelectElements();
        var modelData = objCellView.model;
        var shape = asg.util.diagram.getModelShapeById(modelData.id);
        asg.data.system.diagram.selectedElement = shape;
        var cell = asg.data.elements.diagram.graph.getCell(modelData.id);

        switch (shape.type) {
            case "system":
                {
                    cell.attr('circle/stroke', '#004346');
                    cell.attr('circle/stroke-width', 3);
                    cell.attr('circle/fill', '#9AB7B7');
                    asg.util.diagram.editPrimarySystem();
                    break;
                }

            case "external_system":
                {
                    cell.attr('rect/stroke', '#004346');
                    cell.attr('rect/stroke-width', 3);
                    cell.attr('rect/fill', '#9AB7B7');
                    asg.util.diagram.editExternalSystem();
                    break;
                }

            case "data_flow":
                {
                    //alert('boing');
                    //cell.attr('labels/0/rect/stroke', '#004346');
                    cell.label(0, {
                        attrs: {
                            rect: {
                                fill: '#004346',
                                stroke: '#004346',
                            },
                            text: {
                                fill: '#ffffff'
                            }
                        }
                    });
                    asg.util.diagram.editDataFlow();
                    break;
                }

            case "zone":
                {
                    cell.attr('rect/stroke', '#478081');
                    cell.attr('rect/fill', '#edf7f766');
                    asg.util.diagram.editZone();
                    break;
                }

            default:
                {
                    break;
                }
        }

    },

    unselectElement: function (strID) {
        var shape = asg.util.diagram.getModelShapeById(strID);
        var cell = asg.data.elements.diagram.graph.getCell(strID);
        switch (shape.type) {
            case "system":
                {
                    cell.attr('circle/stroke', '#333333');
                    cell.attr('circle/stroke-width', 1);
                    cell.attr('circle/fill', '#eeeeee');
                    break;
                }

            case "external_system":
                {
                    cell.attr('rect/stroke', '#333333');
                    cell.attr('rect/stroke-width', 1);
                    cell.attr('rect/fill', '#ffffff');
                    break;
                }

            case "data_flow":
                {
                    cell.label(0, {
                        attrs: {
                            rect: {
                                fill: '#EDF2F2',
                                stroke: '#EDF2F2',
                            },
                            text: {
                                fill: '#004346'
                            }
                        }
                    });
                    break;
                }

            default:
                {
                    break;
                }
        }
    },

    updateDataFlow: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {


            var fromSelect = document.getElementById(asg.conf.ids.dia_shape_from);
            var toSelect = document.getElementById(asg.conf.ids.dia_shape_to);
            var transSelect = document.getElementById(asg.conf.ids.dia_shape_transport);
            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

            if (fromSelect != null && toSelect != null && transSelect != null && labelField != null) {
                if (labelField.value.length >= 5) {

                    currEl.label = labelField.value;
                    var objTransport = asg.util.diagram.getDataFlowTransport(transSelect.value);
                    currEl.transport = objTransport.value;
                    currEl.icon = objTransport.icon;

                    currEl.from = fromSelect.value;
                    currEl.to = toSelect.value;

                    asg.u.diagram.redraw();
                    asg.ui.closeDialog();
                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.extSysName2Shrt);
                }
            }



            var typeSelect = document.getElementById('asg_shape_subtype');
            var labelField = document.getElementById('asg_shape_name');

            if (typeSelect != null && labelField != null) {
                if (labelField.value.length >= 5) {
                    // All valid input
                    var strLabel = labelField.value;

                    var objSubtype = asg.util.diagram.getExternalSystemSubtype(typeSelect.value);
                    var strSubType = objSubtype.id;
                    var strSubTypeIcon = objSubtype.icon;

                    currEl.label = strLabel;
                    currEl.subtype = strSubType;
                    currEl.icon = strSubTypeIcon;

                    asg.u.diagram.redraw();
                    asg.u.diagram.clearPanel();

                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.dFlowName2Shrt);
                }

            }
        }

    },

    updateExternalSystem: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {
            var typeSelect = document.getElementById('asg_shape_subtype');
            var labelField = document.getElementById('asg_shape_name');

            if (typeSelect != null && labelField != null) {
                if (labelField.value.length >= 5) {
                    // All valid input
                    var strLabel = labelField.value;

                    var objSubtype = asg.util.diagram.getExternalSystemSubtype(typeSelect.value);
                    var strSubType = objSubtype.id;
                    var strSubTypeIcon = objSubtype.icon;

                    currEl.label = strLabel;
                    currEl.subtype = strSubType;
                    currEl.icon = strSubTypeIcon;

                    asg.u.diagram.redraw();
                    asg.u.diagram.clearPanel();

                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.extSysName2Shrt);
                }

            }
        }

    },

    updatePrimarySystem: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {
            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

            if (labelField != null) {
                if (labelField.value.length >= 5) {
                    // All valid input
                    var strLabel = labelField.value;
                    currEl.label = strLabel;
                    asg.u.diagram.redraw();
                    asg.u.diagram.clearPanel();

                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.sysName2Shrt);
                }

            }
        }

    },

    updateZone: function () {
        var currEl = asg.data.system.diagram.selectedElement;
        if (currEl != null) {
            var labelField = document.getElementById(asg.conf.ids.dia_shape_name);

            if (labelField != null) {
                if (labelField.value.length >= 5) {
                    // All valid input
                    var strLabel = labelField.value;
                    currEl.label = strLabel;
                    asg.u.diagram.redraw();
                    asg.u.diagram.clearPanel();

                } else {
                    asg.ui.attachErrorMsg(labelField, asg.s.zoneName2Shrt);
                }

            }
        }

    },

};


/************************* JointJS Custom Shapes **************************/
joint.shapes.basic.ExternalSystem = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><image/><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.ExternalSystem',
        size: {
            width: 100,
            height: 60
        },
        attrs: {
            'rect': {
                position: {
                    x: 200,
                    y: 200
                },
                fill: '#FFFFFF',
                stroke: '#333333',
                width: 100,
                height: 60
            },
            'text': {
                'font-size': 10,
                text: '',
                'ref-x': .5,
                'ref-y': .5,
                ref: 'rect',
                'y-alignment': 'middle',
                'x-alignment': 'middle',
                fill: 'black'
            },
            'image': {
                'ref-x': 82,
                'ref-y': 42,
                ref: 'rect',
                width: 16,
                height: 16
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

joint.shapes.basic.Zone = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>',

    defaults: joint.util.deepSupplement({

        type: 'basic.Zone',
        size: {
            width: 100,
            height: 60
        },
        attrs: {
            'rect': {
                position: {
                    x: 100,
                    y: 100
                },
                stroke: '#6C999A',
                'stroke-width': 3,
                'stroke-dasharray': "5,10,5",
                'stroke-linecap': "round",
                fill: '#FFFFFF00',
                width: 200,
                height: 100
            },
            'text': {
                'font-size': 9,
                text: '',
                'ref-x': '99%',
                'ref-y': 2,
                ref: 'rect',
                'y-alignment': 'top',
                'x-alignment': 'right',
                fill: 'black'
            }
        }

    }, joint.shapes.basic.Generic.prototype.defaults)
});

asg.__etc = null;

// EOF
