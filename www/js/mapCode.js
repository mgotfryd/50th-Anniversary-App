var directionsDisplay;
var map;
var directionsService = new google.maps.DirectionsService();

function initialize() {


    directionsDisplay = new google.maps.DirectionsRenderer();
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(33.5248, -86.8127)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
       mapOptions);
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('directions-panel'));

    //current location
    var geo = window.navigator.geolocation;
    if (geo) {
        geo.getCurrentPosition(showPos, showErr);
    }

    function showPos(pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;

        var start = lat + "," + lng;
        var end = "3021 7th ave south birmingham, al";
        var request = {
            origin: start,
            destination: end,
            travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }

    function showErr(err) {
        console.log(err);
    }






}

google.maps.event.addDomListener(window, 'load', initialize);

var marker = null;

function autoUpdate() {
    console.log("updating");
    navigator.geolocation.getCurrentPosition(function (position) {
        var newPoint = new google.maps.LatLng(position.coords.latitude,
                                              position.coords.longitude);

        if (marker) {
            // Marker already created - Move it
            marker.setPosition(newPoint);
        }
        else {
            // Marker does not exist - Create it
            marker = new google.maps.Marker({
                position: newPoint,
                map: map
            });
        }

        // Center the map on the new position
        map.setCenter(newPoint);
    });

    // Call the autoUpdate() function every 5 seconds
    setTimeout(autoUpdate, 5000);
}

autoUpdate();