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
    }

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
        }
    }
};
for (var confidID in asg.__etc.conf.conf.ids) {
    asg.conf.ids[confidID] = asg.__etc.conf.conf.ids[confidID];
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
    }
};
for (var stringID in asg.__etc.dash.stringTable) {
    asg.data.lists.site.stringTable[stringID] = asg.__etc.dash.stringTable[stringID];
}



// Copy in dashboard utility functions 
asg.util.vdash = {

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

        // Create the chart title
        _me.view.openByDaysChart.appendChild(
            _util.createFromFragment(
                _util.strReplace(
                    "<h2>%1%</h2>", [asg.s.obd_chart_tile, totalIssues]
                )
            )
        );

        // Add in the three panels
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

    },

    draw_IIRIS_list: function () {

    },

    initialise: function () {
        asg.util.vdash.drawQuickstats();
        asg.util.vdash.drawPieChart();
        asg.util.vdash.drawOpenByDaysChart();
    },

    view: {
        openByDaysChart: null,
    },

}

// EOF
