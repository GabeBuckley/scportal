asg.util = {

    AppError: function (name, message) {
        this.name = name;
        this.message = message;
        var _this = this;
        this.toString = function () {
            return _this.name + ": " + this.message;
        }
    },

    clearSelect: function (objSelect) {
        if (objSelect != null && objSelect.options != null && objSelect.options.length > 0) {
            while (objSelect.options[0]) {
                objSelect.options.remove(0);
            }
        }
    },

    createElement(objOptions) {
        var objEl = null;
        if (objOptions != null && typeof objOptions == "object") {

            if (objOptions.tag != null) {
                objEl = document.createElement(objOptions.tag);
            }

            if (objOptions.attrs != null) {
                for (var attr in objOptions.attrs) {
                    objEl.setAttribute(attr, objOptions.attrs[attr]);
                }
            }

            if (objOptions.innerHTML != null) {
                objEl.innerHTML = objOptions.innerHTML;
            }

            if (objOptions.children != null) {
                for (var i = 0; i < objOptions.children.length; i++) {
                    var currChild = objOptions.children[i];
                    var objChild = asg.util.createElement(currChild);
                    if (objChild != null) {
                        objEl.appendChild(objChild);
                    }
                }
            }
        }
        return objEl;
    },

    createFromFragment: function (strHTMLFragment) {
        var container = document.createElement('div');
        container.innerHTML = strHTMLFragment;
        var objEl = container.firstElementChild;
        return objEl;
    },

    /* SDL Diagram Editor */
    diagram: {

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

    },

    generateGUID: function () {
        var str1 = "GUID-" + (Math.random() * 10000000000);
        str1.replace('.', '');
        return str1;
    },

    getDialog: function (strDialogID) {
        var dialogs = asg.data.lists.site.modals;
        for (var i = 0; i < dialogs.length; i++) {
            var currDialog = dialogs[i];
            if (currDialog.id == strDialogID) {
                return currDialog;
            }
        }
        return null;
    },

    getRouteObject: function () {

        var strH = window.location.hash;
        if (strH.length < 3) {
            strH = "#!/"
            window.location.hash = strH;
        }

        var strU = strH.slice(2, strH.length);


        var currPage = asg.app.fn.getPageByRoute(strU);
        var arrCrumbs = asg.app.fn.getBreadCrumbs(currPage.id);

        var objRoute = {
            hash: strH,
            uri: strU,
            breadcrumbs: arrCrumbs,
            page: currPage
        };

        return objRoute;

    },

    getTemplate: function (strTemplateID) {
        try {
            return eval(strTemplateID);
        } catch (e) {
            alert('error');
        }
    },

    handleError: function (objError) {
        asg.ui.showMsg(objError.name, 'error', objError.name, objError.message);
    },

    parseHashFromURL: function (strURL) {
        var strHash = strURL.slice(strURL.indexOf('#') + 2, strURL.length);
        if (strHash.indexOf('?') >= 0) {
            strHash = strHash.slice(0, strHash.indexOf('?'));
        }
        return strHash;
    },

    strReplace: function (strHaystack, arrNeedles) {
        if (arrNeedles != null) {
            for (var i = 1; i <= arrNeedles.length; i++) {
                var strNeedle = '%' + i + '%';
                var reNeedle = new RegExp(strNeedle, 'gi');
                strHaystack = strHaystack.replace(reNeedle, arrNeedles[i - 1]);
            }
        }
        return strHaystack;
    },

    /* Vulnerability & Patching Portal Dashboard */
    vdash: {
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
            for (var i = 0; i < arrItems.length; i++) {
                var objItem = arrItems[i];
                asg.util.vdash.drawQuickstatsPanel(objItem, container);
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

        initialise: function () {
            asg.util.vdash.drawQuickstats();
            asg.util.vdash.drawPieChart();
        },

    }

};

asg.u = asg.util;


// EOF
