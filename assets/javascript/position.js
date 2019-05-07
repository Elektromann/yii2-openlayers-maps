function position(size, marker = null)
{
    var markerWidth = 0, markerHeight = 0, different = 0;
    var dsPosition = "";
    
    if(marker !== null) {
        markerWidth = marker.offsetWidth;
        markerHeight = marker.offsetHeight;
        dsPosition = marker.dataset.dsposition;
        
        if(marker.offsetLeft === -(marker.offsetWidth / 2) && marker.offsetTop === -(marker.offsetHeight / 2)) {
            markerWidth /= 2;
            markerHeight /= 2;
        }
        
        if((marker.offsetLeft === 0 && dsPosition === 'left') || ((marker.offsetLeft + marker.offsetWidth) === 0 && dsPosition === 'right')) {
            markerWidth = 0;
        }
        
        if((marker.offsetTop === 0 && dsPosition === 'top') || ((marker.offsetTop + marker.offsetHeight) === 0 && dsPosition === 'bottom')) {
            markerHeight = 0;
        }
        
        if(marker.classList.contains("marker-default")) {
            if(dsPosition === 'bottom') {
                markerHeight = 0;
            } else {
                calc = Math.pow(markerWidth, 2) + Math.pow(markerHeight, 2);
                markerWidth = markerHeight = Math.sqrt(calc);
            }
            
            if(dsPosition === 'left' || dsPosition === 'right') {
                markerWidth /= 2;
                markerHeight /= 2;
                
                different = markerHeight;
            }
        }
    }
    
    var markerPosition = {
        bottom: {
            bottom: "auto",
            left: "-" + (size[0] / 2) + "px",
            right: "auto",
            top: "0"
        },
        
        center: {
            bottom: "auto",
            left: "-" + (size[0] / 2) + "px",
            right: "auto",
            top: "-" + (size[1] / 2) + "px"
        },
        
        left: {
            bottom: "auto",
            left: "auto",
            right: "0",
            top: "-" + (size[1] / 2) + "px"
        },
        
        right: {
            bottom: "auto",
            left: "0",
            right: "auto",
            top: "-" + (size[1] / 2) + "px"
        },
        
        top: {
            bottom: "0",
            left: "-" + (size[0] / 2) + "px",
            right: "auto",
            top: "auto"
        }
    };
    
    var descriptionPosition = {
        bottom: {
            bottom: "auto",
            left: "-" + (size[0] / 2) + "px",
            right: "auto",
            top: markerHeight + "px"
        },
        
        left: {
            bottom: "auto",
            left: "auto",
            right: markerWidth + "px",
            top: "-" + ((size[1] / 2) + different) + "px"
        },
        
        right: {
            bottom: "auto",
            left: markerWidth + "px",
            right: "auto",
            top: "-" + ((size[1] / 2) + different) + "px"
        },
        
        top: {
            bottom: markerHeight + "px",
            left: "-" + (size[0] / 2) + "px",
            right: "auto",
            top: "auto"
        }
    };
    
    this.getMarkerPosition = function(position) {
        return markerPosition[position];
    };
    
    this.getDescriptionPosition = function(position) {
        return descriptionPosition[position];
    };
}