<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.googlemap/1.5/jquery.googlemap.js"></script>

<script>
    var marker, map, infowindow;
    var pagefunction = function() {
        var pos = { lat: 0, lng: 0};
        if (navigator.geolocation) { //check geolocation available
            navigator.geolocation.getCurrentPosition(function(position) {
                pos.lat = position.coords.latitude;
                pos.lng = position.coords.longitude;
            });
        }

        var mapOptions = {
            zoom: 10,
        };
        mapOptions.center = new google.maps.LatLng(pos.lat, pos.lng);
        map = new google.maps.Map(document.getElementById('gps'), mapOptions);

        $('input[name=gps]').val(JSON.stringify(pos));

        marker = new google.maps.Marker({
            position: mapOptions.center,
            map: map,
            draggable: true
        });
        infowindow = new google.maps.InfoWindow({
            content: '<p> MarkerLocation:' + marker.getPosition() + '</p>'
        });
        map.addListener('center_changed', function() {
            window.setTimeout(function() {
                $('input[name=gps]').val(JSON.stringify(marker.getPosition()));
                map.panTo(marker.getPosition());
            }, 1000);
        });
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });
    }

    $(window).unbind('gMapsLoaded');
    $(window).bind('gMapsLoaded', pagefunction);
    window.loadGoogleMaps();
    var contactDocument;
</script>
