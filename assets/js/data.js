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

        },
        html: {}
    }
};

asg.s = asg.data.lists.site.stringTable;




// EOF
