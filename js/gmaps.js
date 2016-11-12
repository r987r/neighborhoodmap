var gmapQuery = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAFHYSaEcJT_JEtu4r2Vxips8SRdowPmfE&callback=initMap";
var gmap;
var infoWindow; 
var pendingMarkers = [];	// Incase wikipedia coordinate info comes before google map init.

function loadMap(viewModel) {
  var timeout = setTimeout(function() {
    viewModel.gMapError(true);
  }, 4000);

  $.getScript(gmapQuery, function(){
    clearTimeout(timeout);
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
  pendingMarkers.forEach(function(marker) {
    marker.createMarker();
  });
};

function closeInfoWindow() {
  if (typeof infoWindow !== 'undefined') {
    infoWindow.close();
  }
}

var mapMarker = function(locationInfo){
  /*
   *  Adds a new marker given locationInfo object.
   */
  var self = this;
  this.locationInfo = locationInfo;
  this.marker;

  this.createMarker = function() {
    if (typeof google !== 'undefined') {
      self.marker = new google.maps.Marker({
        position: {lat: locationInfo.lat, lng: locationInfo.lon},
        map: gmap,
        title: locationInfo.name
      });

      self.marker.addListener('click', function() {
        self.openInfoWindow();
      });
    } else {
      pendingMarkers.push(this);
    }
  }

  this.openInfoWindow = function() {
    if (typeof self.marker != 'undefined') {
      if(infoWindow.anchor) {
        infoWindow.anchor.setAnimation(null);
      }
      self.marker.setAnimation(google.maps.Animation.BOUNCE);
      infoWindow.setContent(self.locationInfo.summaryHTML());
      infoWindow.open(gmap, self.marker);
    }
  }
     
  this.setVisible = function(visible) {
    if (typeof self.marker !== 'undefined') {
      self.marker.setVisible(visible);
    }
  }

};

