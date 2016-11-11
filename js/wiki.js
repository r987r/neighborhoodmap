function fetchWikiInfo(locationInfo){
    getLocation(locationInfo);
    getSummary(locationInfo);
}

function getSummary(locationInfo) {
    var summaryURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=" + locationInfo.name();

    $.ajax({
        url: summaryURL,
        dataType: "jsonp",
        success: function (response) {
            console.log(response);
            var lat = -1;
            var lon = -1;
            $.each(response['query']['pages'], function(key, value) {
                locationInfo.summary(value['extract']);
            });
        },
        error: function (errorMessage) {
        }
    });
};

function getLocation(locationInfo) {
    var coordsURL = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=coordinates&titles=" + locationInfo.name();
    $.ajax({
        url: coordsURL,
        dataType: "jsonp",
        success: function (response) {
            console.log(response);
            var lat = -1;
            var lon = -1;
            $.each(response['query']['pages'], function(key, value) {
                locationInfo.lat(value['coordinates']['0']['lat']);
                locationInfo.lon(value['coordinates']['0']['lon']);
            });
        },
        error: function (errorMessage) {
        }
    });
};
