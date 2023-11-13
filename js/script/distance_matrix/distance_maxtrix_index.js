/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// @ts-nocheck TODO remove when fixed
// [START maps_distance_matrix]
function initMap() {
    var zipcode = "00501";
    var latitude ='';
    var longitude='';
    var geocoder = new google.maps.Geocoder();
    var address = zipcode;
    geocoder.geocode({ 'address': 'zipcode '+address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
             latitude = results[0].geometry.location.lat();
             longitude = results[0].geometry.location.lng();
            console.log("Latitude: " + latitude + "\nLongitude: " + longitude);
            //
            const bounds = new google.maps.LatLngBounds();
            const markersArray = [];
            const map = new google.maps.Map(document.getElementById("map"), {
                center: { lat: latitude, lng: longitude },
                zoom: 10
            });
            // initialize services
            const service = new google.maps.DistanceMatrixService();
            // build request
            const origin1 = { lat: latitude, lng: longitude };
            //const origin2 = "2109 S Oak Park Ave, Berwyn, IL 60402, USA;
            const destinationA = "6401 E 46th st Forest View, IL 60402";
            const destinationB   ="Village Hall 925 Burlington Avenue Lisle, IL 60532";
            //const destinationB = { lat: 50.087, lng: 14.421 };
            const request = {
                // origins: [origin1, origin2],
                origins: [origin1],
                destinations: [destinationB,destinationA],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            };

            // put request on page
            document.getElementById("request").innerText = JSON.stringify(
                request,
                null,
                2
            );

            // get distance matrix response
            service.getDistanceMatrix(request).then((response) => {
                // put response
                document.getElementById("response").innerText = JSON.stringify(
                response,
                null,
                2,
            );

            // show on map
            const originList = response.originAddresses;
            const destinationList = response.destinationAddresses;

            deleteMarkers(markersArray);

            const showGeocodedAddressOnMap = (asDestination) => {
                const handler = ({ results }) => {
                    map.fitBounds(bounds.extend(results[0].geometry.location));
                    markersArray.push(
                        new google.maps.Marker({
                            map,
                            position: results[0].geometry.location,
                            label: asDestination ? "D" : "O",
                        }),
                    );
                };
                return handler;
            };

            for (let i = 0; i < originList.length; i++) {
                const results = response.rows[i].elements;

                geocoder
                    .geocode({ address: originList[i] })
                    .then(showGeocodedAddressOnMap(false));

                for (let j = 0; j < results.length; j++) {
                    geocoder
                        .geocode({ address: destinationList[j] })
                        .then(showGeocodedAddressOnMap(true));
                }
            }
        });
            //
        } else {
            alert("Request failed.")
        }
    });

}

function deleteMarkers(markersArray) {
  for (let i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }

  markersArray = [];
}

window.initMap = initMap;
// [END maps_distance_matrix]
