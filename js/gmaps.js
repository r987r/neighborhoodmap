var gmap;
var prev_infowindow = false; 

function initMap() {
  var mapCanvas = document.getElementById("gmap");
  var mapOptions = {
    center: new google.maps.LatLng(30.2727934,-97.7609921), 
    zoom: 13
  }
  gmap = new google.maps.Map(mapCanvas, mapOptions);
};

var mapMarker = function(locationInfo){
  /*
   *  Adds a new marker given locationInfo object.
   */
  var self = this;
  this.locationInfo = locationInfo;

  this.infoWindow = new google.maps.InfoWindow({
    content: ""
  });

  this.marker = new google.maps.Marker({
    position: {lat: locationInfo.lat(), lng: locationInfo.lon()},
    map: gmap,
    title: locationInfo.name()
  });


  this.marker.addListener('click', function() {
    self.openInfoWindow();
  });

  this.openInfoWindow = function() {
    if(prev_infowindow) {
      prev_infowindow.close();
    }
    prev_infowindow = self.infoWindow;
    self.infoWindow.setContent(self.locationInfo.summary());
    self.infoWindow.open(gmap, self.marker);
  }
  
  this.setVisible = function(visible) {
    self.marker.setVisible(visible);
  }

};

