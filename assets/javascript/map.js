var xhttp, xhttpbm;
var mapList = [];
var mapIndex = 0;
var mapListBM = [];
var mapIndexBM = 0;
var bmLimit = 0;

function map(options)
{
    var map = new ol.Map();
    var geocoding = [];
    var geocodingBM = [];
    var geocodeUrl = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q=";
    
    var getCenter = function(index = 0)
    {
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttp = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        if(mapList[mapIndex] !== options.id) {
            setTimeout(getCenter, 1000, index);
            return ;
        }
        
        xhttp.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200) {
                try {
                    var result = JSON.parse(this.responseText)[0];
                    var center = [parseFloat(result.lon), parseFloat(result.lat)];
                    
                    if(geocoding[index].type === "marker") {
                        geocoding[index].target.center = center;
                        addMarker(geocoding[index].target);
                    } else if(geocoding[index].type === "map") {
                        map.getView().setCenter(ol.proj.fromLonLat(center));
                    }
                }
                catch(e) {
                    console.log("Can't find: " + geocoding[index].address);
                }
            }
        };
        xhttp.open("GET", geocodeUrl + "'" + geocoding[index].address + "'", true);
        xhttp.send();
        
        next = index + 1;
        
        if(next === geocoding.length) {
            setTimeout(function() { mapIndex++; }, 1000);
        }
        
        if(next < geocoding.length) {
            setTimeout(getCenter, 1000, next);
        }
    };
    
    var bmCenter = function(index = 0)
    {
        
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xhttpbm = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            xhttpbm = new ActiveXObject("Microsoft.XMLHTTP");
        }
        
        if(mapListBM[mapIndexBM] !== options.id || bmLimit >= options.geocoding.limit) {
            setTimeout(bmCenter, 20, index);
            return ;
        }
        
        bmLimit++;
        
        var url = "http://dev.virtualearth.net/REST/v1/Locations/";
        url += "'" + geocodingBM[index].address + "'";
        url += "?include=queryParse&o=json&key=";
        url += options.geocoding.apiKey;
        
        xhttpbm.onreadystatechange = function(){
            if (this.readyState === 4 && this.status === 200) {
                try {
                    var result = JSON.parse(this.responseText).resourceSets[0].resources[0].point.coordinates;
                    var center = [result[1], result[0]];
                    
                    if(geocodingBM[index].type === "marker") {
                        geocodingBM[index].target.center = center;
                        addMarker(geocodingBM[index].target);
                    } else if(geocodingBM[index].type === "map") {
                        map.getView().setCenter(ol.proj.fromLonLat(center));
                    }
                }
                catch(e) {
                    console.log("Can't find: " + geocodingBM[index].address);
                }
            }
            
            if(this.readyState === 4) {
                bmLimit--;
            }
        };
        xhttpbm.open("GET", url, true);
        xhttpbm.send();
        
        next = index + 1;
        
        if(next === geocodingBM.length) {
            mapIndexBM++;
        }
        
        if(next < geocodingBM.length) {
            bmCenter(next);
        }
    };
    
    var addMarker = function(markerOptions) {
        var overLay;
        var markerElement;
        var descriptionElement;
        var descriptionContent;
        var marker;
        var size = [];
        var elementPosition;
        
        if(typeof markerOptions.iconSize !== "object") {
            markerOptions.iconSize = {
                0: "30px",
                1: "30px"
            };
        }
        
        if(typeof markerOptions.iconPosition === "undefined") {
            markerOptions.iconPosition = "top";
        }
        
        markerElement = document.createElement("div");
        markerElement.dataset.mapid = options.id;
        markerElement.classList.add("marker");
        
        if(typeof markerOptions.icon === "undefined") {
            markerElement.classList.add("marker-default");
        } else {
            markerElement.style.backgroundImage = "url('" + markerOptions.icon + "')";
            markerElement.style.backgroundSize = markerOptions.iconSize[0] + " " + markerOptions.iconSize[1];
            markerElement.style.height = markerOptions.iconSize[1];
            markerElement.style.width = markerOptions.iconSize[0];
        }
        
        if(typeof markerOptions.title !== "undefined") {
            markerElement.setAttribute('title', markerOptions.title);
        }
        
        if(typeof markerOptions.description !== "undefined") {
            
            if(typeof markerOptions.descriptionPosition === "undefined") {
                markerOptions.descriptionPosition = markerOptions.iconPosition === "center" ? "top" : markerOptions.iconPosition;
            }
            
            markerElement.dataset.dsposition = markerOptions.descriptionPosition;
            
            overLay = document.createElement("div");
            
            descriptionElement = document.createElement("div");
            descriptionElement.classList.add("marker-description");
            
            descriptionContent = document.createElement("div");
            descriptionContent.classList.add("marker-description-content");
            descriptionContent.innerHTML = markerOptions.description;
            
            descriptionElement.appendChild(descriptionContent);
            
            markerElement.onclick = event.markerClick;
            
            overLay.appendChild(markerElement);
            overLay.appendChild(descriptionElement);
        } else {
            overLay = markerElement;
        }
        
        marker = new ol.Overlay({
            position: ol.proj.fromLonLat([0,0]),
            positioning: 'center-center',
            element: overLay,
            stopEvent: true
        });
        
        marker.setPosition(ol.proj.fromLonLat(markerOptions.center));
        
        map.addOverlay(marker);
        
        if(typeof markerOptions.icon !== "undefined") {
            if(document.readyState === "complete"){
                size[0] = markerElement.offsetWidth;
                size[1] = markerElement.offsetHeight;
                
                elementPosition = new position(size).getMarkerPosition(markerOptions.iconPosition);

                markerElement.style.bottom = elementPosition.bottom;
                markerElement.style.left = elementPosition.left;
                markerElement.style.right = elementPosition.right;
                markerElement.style.top = elementPosition.top;
            } else {
                markerElement.style.display = "none";
                
                document.onreadystatechange = function() {
                    if(document.readyState === "complete") {
                        markerElement.style.display = "block";
                        
                        size[0] = markerElement.offsetWidth;
                        size[1] = markerElement.offsetHeight;

                        elementPosition = new position(size).getMarkerPosition(markerOptions.iconPosition);

                        markerElement.style.bottom = elementPosition.bottom;
                        markerElement.style.left = elementPosition.left;
                        markerElement.style.right = elementPosition.right;
                        markerElement.style.top = elementPosition.top;
                    }
                };
            }
        }
    };

    this.addMap = function()
    {
        if(options.fullScreenButton) {
            map.addControl(new ol.control.FullScreen());
        }
        
        map.setTarget(options.id);
        map.getLayers().extend(getLayer(options.type));
        map.getView().setCenter([0,0]);
        map.getView().setZoom(options.zoom);
        
        if(typeof options.center === "string") {
            if(options.geocoding[0] === "bingMaps") {
                geocodingBM.push({
                    type : "map",
                    address: options.center
                });
            } else {
                geocoding.push({
                    type : "map",
                    address: options.center
                });
            }
        } else {
            map.getView().setCenter(ol.proj.fromLonLat(options.center));
        }
        
        for(var i = 0; i < options.markers.length; i++) {
            
            if(typeof options.markers[i].center === "undefined") {
                options.markers[i].center = options.center;
            }
            
            if(typeof options.markers[i].center === "string") {
                if(options.geocoding[0] === "bingMaps") {
                    geocodingBM.push({
                        type : "marker",
                        target: options.markers[i],
                        address: options.markers[i].center
                    });
                } else {
                    geocoding.push({
                        type : "marker",
                        target: options.markers[i],
                        address: options.markers[i].center
                    });
                }
            } else {
                addMarker(options.markers[i]);
            }
        }
        
        if(options.geocoding[0] === "bingMaps" && geocodingBM.length > 0) {
            mapListBM.push(options.id);
            bmCenter();
        } else if(geocoding.length > 0) {
            mapList.push(options.id);
            getCenter();
        }
    };
};
