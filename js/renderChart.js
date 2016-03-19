FusionCharts.ready(function () {
    var strokeThickness = 1,
        TRUE = true,
        width = 500,
        height = 300,
        xaxisminvalue = 0,
        xaxismaxvalue = 100,
        yaxisminvalue = 0,
        yaxismaxvalue = 100,
        randomNumberGenerator = function (isAbscissa) {
            return (isAbscissa ? xaxisminvalue : yaxisminvalue) + (Math.random() *
                (isAbscissa ? (xaxismaxvalue - xaxisminvalue) : (yaxismaxvalue - yaxisminvalue)))
        },
        railwayChart = new FusionCharts({
        type: 'dragnode',
        renderAt: 'chart-container',
        width: width,
        height: height,
        dataFormat: 'json',
        dataSource: {
            "chart":{
                "xaxisminvalue":xaxisminvalue,
                "xaxismaxvalue":xaxismaxvalue,
                "yaxisminvalue":yaxisminvalue,
                "yaxismaxvalue":yaxismaxvalue,
                "viewmode":"1",
                "theme":"fint",
                "showXAxisLine": "0"
            },
            "dataset":[
                {
                    "data":[
                        {
                            "id":"01",
                            "color":"#ffffff",
                            "x":randomNumberGenerator(TRUE),
                            "y":randomNumberGenerator(),
                            "height":strokeThickness,
                            "width": strokeThickness,
                            "shape":"rectangle",
                            "color": "#fec110"
                        },
                        {
                            "id":"02",
                            "color":"#ffffff",
                            "x":randomNumberGenerator(TRUE),
                            "y":randomNumberGenerator(),
                            "height":strokeThickness,
                            "width": strokeThickness,
                            "shape":"rectangle",
                            "color": "#fec110"
                        },
                        {
                            "id":"03",
                            "color":"#ffffff",
                            "x":randomNumberGenerator(TRUE),
                            "y":randomNumberGenerator(),
                            "height":strokeThickness,
                            "width": strokeThickness,
                            "shape":"rectangle",
                            "color": "#fec110"
                        },
                        {
                            "id":"05",
                            "color":"#ffffff",
                            "x":randomNumberGenerator(TRUE),
                            "y":randomNumberGenerator(),
                            "height":strokeThickness,
                            "width": strokeThickness,
                            "shape":"rectangle",
                            "color": "#fec110"
                        },
                        {
                            "id":"04",
                            "color":"#ffffff",
                            "x":randomNumberGenerator(TRUE),
                            "y":randomNumberGenerator(),
                            "height":strokeThickness,
                            "width": strokeThickness,
                            "shape":"rectangle",
                            "color": "#fec110"
                        }
                    ]
                }
            ],
            "connectors":[
                {
                    "color":"#ffffff",
                    "stdThickness":strokeThickness,
                    "connector":[
                        {
                            "from":"01",
                            "to":"02",
                            "color":"#fec110",
                            "arrowatstart":"0",
                            "arrowatend":"0"
                        },
                        {
                            "from":"02",
                            "to":"03",
                            "color":"#fec110",
                            "arrowatstart":"0",
                            "arrowatend":"0"
                        },
                        {
                            "from":"03",
                            "to":"04",
                            "color":"#fec110",
                            "arrowatstart":"0",
                            "arrowatend":"0"
                        },
                        {
                            "from":"04",
                            "to":"05",
                            "color":"#fec110",
                            "arrowatstart":"0",
                            "arrowatend":"0"
                        },
                        {
                            "from":"05",
                            "to":"01",
                            "color":"#fec110",
                            "arrowatstart":"0",
                            "arrowatend":"0"
                        }
                    ]
                }
            ]
        },
        "events": {
            "rendered": function () {
                var image = new Image(),
                    canvasElem = document.getElementById("tempCanvas");
                if (!canvasElem) {
                    canvasElem = document.createElement('canvas');
                    canvasElem.id = "tempCanvas";
                    canvasElem.width = width;
                    canvasElem.height = height;
                    document.getElementsByTagName("body")[0].appendChild(canvasElem);
                }
                image.src = 'data:image/svg+xml;base64,'+window.btoa(railwayChart.getSVGString());
                canvasElem.getContext("2d").drawImage(image, 0, 0);
            }
        }
    }).render();
});