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
