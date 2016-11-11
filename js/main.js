var locationData = function(data) {
    var self = this;

    this.name = data.name;
    this.summary = data.summary;
    this.lon = data.lon;
    this.lat = data.lat;
    this.errorInfo = ko.observable();
    this.mapMarker = new mapMarker(this); // allocate it, update in wiki api callbacks. 
    fetchWikiInfo(this);

    this.openInfoWindow = function() {
        self.mapMarker.openInfoWindow();    
    };

    this.summaryHTML = function() {
        return "<h2>" + self.name + "</h2>" 
             + "<p>" + self.summary + "</p>"
             + "<a href='https://en.wikipedia.org/wiki/" + self.name + "'>Wiki Link</a>";
    };
};

var viewModel = function() {
    var self = this;

    this.gMapError = ko.observable();
    loadMap(this); // Load Google Map

    this.locationList = [];	// If we ever dynamically add elements, need to make observable.
    initialLocations.forEach(function(locationItem) {
        self.locationList.push( new locationData(locationItem) );
    });

    this.filter = ko.observable("");
    this.filteredLocations = ko.computed(function() {
        closeInfoWindow();	// Close infoWindow
        if(!self.filter()) {
            self.locationList.forEach(function(locs) {
                 locs.mapMarker.setVisible(true);
            });
            return self.locationList; 
        } else {
            return ko.utils.arrayFilter(self.locationList, function(locs) {
                if (locs.name.toUpperCase().indexOf(self.filter().toUpperCase()) != -1) {
                    locs.mapMarker.setVisible(true);
                    return true;
                } else {
                    locs.mapMarker.setVisible(false);
                    return false;
                }
            });
        }
    });
};

ko.applyBindings(new viewModel());

