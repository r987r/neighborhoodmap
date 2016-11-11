var locationInfo = function(data) {
    self = this;

    this.name = ko.observable(data.name);
    this.summary = ko.observable(data.summary);
    this.lon = ko.observable(data.lon);
    this.lat = ko.observable(data.lat);
    this.marker = new mapMarker(this); // allocate it, update in wiki api callbacks. 
    fetchWikiInfo(this);

    function openInfoWindow() {
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
            return self.locationList(); 
        } else {
            return ko.utils.arrayFilter(self.locationList(), function(locs) {
                return (locs.name().toUpperCase().indexOf(self.filter().toUpperCase()) != -1);
            });
        }
    });
};

ko.applyBindings(new viewModel());

