var locationData = function(data) {
    var self = this;

    this.name = ko.observable(data.name);
    this.summary = ko.observable(data.summary);
    this.lon = ko.observable(data.lon);
    this.lat = ko.observable(data.lat);
    this.mapMarker = new mapMarker(this); // allocate it, update in wiki api callbacks. 
    fetchWikiInfo(this);

    this.openInfoWindow = function() {
        self.mapMarker.openInfoWindow();    
    };
};

var viewModel = function() {
    var self = this;

    this.locationList = [];	// If we ever dynamically add elements, need to make observable.
    initialLocations.forEach(function(locationItem) {
        self.locationList.push( new locationData(locationItem) );
    });

    this.filter = ko.observable("");
    this.filteredLocations = ko.computed(function() {
        if(!self.filter()) {
            self.locationList.forEach(function(locs) {
                 locs.mapMarker.setVisible(true);
            });
            return self.locationList; 
        } else {
            return ko.utils.arrayFilter(self.locationList, function(locs) {
                if (locs.name().toUpperCase().indexOf(self.filter().toUpperCase()) != -1) {
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

