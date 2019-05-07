function getLayer(options)
{
    if(typeof options === "object") {
        var type = options[0];
    } else {
        var type = options;
    }
    
    var layers = {
        simple: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],

        xyzEsri: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
                      'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
                      'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                })
            })
        ],

        stamenWaterColor: [
            new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'watercolor'
                })
            }),
            new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'terrain-labels'
                })
            })
        ],

        stamenTerrain: [
            new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'terrain'
                })
            }),
            new ol.layer.Tile({
                source: new ol.source.Stamen({
                    layer: 'terrain-labels'
                })
            })
        ],
        
        bingMaps: [
            new ol.layer.Tile({
                source: new ol.source.BingMaps({
                    key: typeof options.apiKey === "string" ? options.apiKey : '',
                    imagerySet: typeof options.mapType === "string" ? options.mapType : '',
                    maxZoom: 19
                })
            })
        ]
    };
    
    return layers[type];
};