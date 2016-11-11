var locationInfo = function(data) {
    var self = this;

    this.name = ko.observable(data.name);
    this.summary = ko.observable(data.summary);
    this.lon = ko.observable(data.lon);
    this.lat = ko.observable(data.lat);
    this.marker = new mapMarker(this); // allocate it, update in wiki api callbacks. 
    fetchWikiInfo(this);

    function openInfoWindow() {
        console.log("works");
        self.marker.infoWindow.open();    
    };
};

var viewModel = function() {
    var self = this;

    this.locationList = ko.observableArray([]);
    initialLocations.forEach(function(locationItem) {
        self.locationList.push( new locationInfo(locationItem) );
    });

    this.filter = ko.observable("");
    this.filteredLocations = ko.computed(function() {
        if(!self.filter()) {
            self.locationList().forEach(function(locs) {
                 locs.marker.marker.setVisible(true);
            });
            return self.locationList(); 
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(locs) {
                if (locs.name().toUpperCase().indexOf(self.filter().toUpperCase()) != -1) {
                    locs.marker.marker.setVisible(true);
                    return true;
                } else {
                    locs.marker.marker.setVisible(false);
                    return false;
                }
            });
        }
    });
};

ko.applyBindings(new viewModel());

