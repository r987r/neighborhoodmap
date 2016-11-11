var gmapQuery = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAFHYSaEcJT_JEtu4r2Vxips8SRdowPmfE&callback=initMap";
var gmap;
var infoWindow; 
var pendingMarkers = [];

function loadMap() {

  $.getScript(gmapQuery)
    // if getting the script fails
   .fail(function() {

    });
}

function initMap() {
  var mapCanvas = document.getElementById("gmap");
  var mapOptions = {
    center: new google.maps.LatLng(30.2727934,-97.7609921), 
    zoom: 13
  }
  gmap = new google.maps.Map(mapCanvas, mapOptions);
  infoWindow = new google.maps.InfoWindow
  
  pendingMarkers.forEach(function(mapMarker) {
      console.log("set markers");
    mapMarker.createMarker();
  });
};

var mapMarker = function(locationInfo){
  /*
   *  Adds a new marker given locationInfo object.
   */
  var self = this;
  this.locationInfo = locationInfo;
  this.marker;
  
  if (typeof google !== 'undefined') {
    this.createMarker();
  } else {
    pendingMarkers.push(this);
  }

  this.createMarker = function() {
    self.marker = new google.maps.Marker({
      position: {lat: locationInfo.lat(), lng: locationInfo.lon()},
      map: gmap,
      title: locationInfo.name()
    });

    self.marker.addListener('click', function() {
      self.openInfoWindow();
    });
  }

  this.openInfoWindow = function() {
    infoWindow.setContent(self.locationInfo.summary());
    infoWindow.open(gmap, self.marker);
  }
 
  this.setPosition = function(coords) {
    if (typeof self.marker !== 'undefined') {
      self.marker.setPosition(coords);
    }
  }
     
  this.setVisible = function(visible) {
    if (typeof self.marker !== 'undefined') {
      self.marker.setVisible(visible);
    }
  }

};

