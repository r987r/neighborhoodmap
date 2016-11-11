/*
 *  The functions below after we receive the information from wikipedia
 *  will update both the model used in knockout as well as the markers
 *  used on google maps. The InfoWindow in google maps doesnt need to be updated.
 *
 */
function fetchWikiInfo(locationInfo){
    getLocation(locationInfo);
    getSummary(locationInfo);
}

function getSummary(locationInfo) {
    var summaryURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + locationInfo.name();
    var timeout = setTimeout(function() {
        locationInfo.summary("could not retrieve summary");
    }, 8000);
        
    $.ajax({
        url: summaryURL,
        dataType: "jsonp",
        success: function (response) {
            $.each(response['query']['pages'], function(key, value) {
                locationInfo.summary(value['extract']);
            });
            clearTimeout(timeout);
        },
    });
};

function getLocation(locationInfo) {
    var coordsURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=coordinates&titles=" + locationInfo.name();
    var timeout = setTimeout(function() {
        locationInfo.name(locationInfo.name() + " :could not get coords");
    }, 8000);

    $.ajax({
        url: coordsURL,
        dataType: "jsonp",
        success: function (response) {
            $.each(response['query']['pages'], function(key, value) {
                locationInfo.lat(value['coordinates']['0']['lat']);
                locationInfo.lon(value['coordinates']['0']['lon']);
                locationInfo.mapMarker.marker.setPosition({lat: locationInfo.lat(), lng: locationInfo.lon()});
            });
            clearTimeout(timeout);
        },
    });
};
