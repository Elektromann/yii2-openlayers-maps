var event = {
    markerClick: function()
    {
        var description = this.parentNode.children[1];
        var maxHeight = document.getElementById(this.dataset.mapid).offsetHeight;
        var maxWidth = document.getElementById(this.dataset.mapid).offsetWidth;
        var dsPosition = this.dataset.dsposition;
        var width, height, elementPosition;
        
        maxWidth = maxWidth > 500 ? 500 : maxWidth;
        maxWidth -= 30;
        maxHeight -= 70;
        
        if(window.getComputedStyle(description).display === "none") {
            description.style.display = "block";
        } else {
            description.style.display = "none";
        }
        
        height = description.offsetHeight;
        width = description.offsetWidth;
        
        description.style.whiteSpace = "nowrap";
        description.style.maxHeight = maxHeight + "px";
        description.children[0].style.maxHeight = (maxHeight - 20) + "px";
        
        for(width; width < maxWidth && height > description.offsetHeight; width++) {
            description.style.removeProperty("white-space");
            description.style.width = width + "px";
            height = description.offsetHeight;
            description.style.whiteSpace = "nowrap";
        }
        
        description.style.removeProperty("white-space");
        
        elementPosition = new position([width, height], this).
            getDescriptionPosition(dsPosition);
        
        description.style.bottom = elementPosition.bottom;
        description.style.left = elementPosition.left;
        description.style.right = elementPosition.right;
        description.style.top = elementPosition.top;
    },

    markerClose: function()
    {
        var description = this.parentNode;

        description.style.display = "none";
    }
};