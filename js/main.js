var Location = function(name, summary, lat, lon) {
    this.name = name;
    this.summary = summary;
    this.lat = lat;
    this.lon = lon;
};

var viewModel = {
    locations: [
        new Location("The Long Center", "quick test summary", 30.2639, -97.77),
        new Location("The Long Centerq", "quick test summary", 30.2639, -97.77)
        ]
};
 
ko.applyBindings(viewModel);
