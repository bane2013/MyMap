function initMap() {
  var MapStartLocation = { lat: 49.1913033, lng: -122.849143 };

  var KPULibraryLocation = { lat: 49.1326014, lng: -122.8706705 };

  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: MapStartLocation,
  });

    navigator.geolocation.getCurrentPosition(function (position) {
      var CurrentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      var marker = new google.maps.Marker({
        position: CurrentPosition,
        map: map,
        title: "Current Location",
      });

      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [CurrentPosition],
          destinations: [KPULibraryLocation],
          travelMode: "DRIVING",
          unitSystem: google.maps.UnitSystem.METRIC,
        },

        function (response, status) {
          var distance = response.rows[0].elements[0].distance.text;

          var infoWindow = new google.maps.InfoWindow({
            content: "Distance: " + distance,
          });

          infoWindow.setPosition(KPULibraryLocation);
          infoWindow.open(map);
        }
      );

      var bounds = new google.maps.LatLngBounds();
      bounds.extend(CurrentPosition);
      bounds.extend(KPULibraryLocation);
      map.fitBounds(bounds);
    });
}
