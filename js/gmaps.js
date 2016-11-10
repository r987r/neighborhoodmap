function initMap() {
  var mapCanvas = document.getElementById("gmap");
  var mapOptions = {
    center: new google.maps.LatLng(30.2727934,-97.7609921), 
    zoom: 10
  }
  var gmap = new google.maps.Map(mapCanvas, mapOptions);
}
