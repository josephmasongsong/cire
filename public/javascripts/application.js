

var delay = 100;
var infowindow = new google.maps.InfoWindow();
var latlng = new google.maps.LatLng(49.2827, -123.1207);
var mapOptions = {
  zoom: 6,
  center: latlng,
  mapTypeId: google.maps.MapTypeId.ROADMAP
}
var geocoder = new google.maps.Geocoder(); 
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
var bounds = new google.maps.LatLngBounds();

function geocodeAddress(address, next) {
  geocoder.geocode({address:address}, function (results,status)
    { 
       if (status == google.maps.GeocoderStatus.OK) {
        var p = results[0].geometry.location;
        var lat=p.lat();
        var lng=p.lng();
        createMarker(address,lat,lng);
      }
      else {
         if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          nextAddress--;
          delay++;
        } else {
                      }   
      }
      next();
    }
  );
}
function createMarker(add,lat,lng) {
 var contentString = add;
 var marker = new google.maps.Marker({
   position: new google.maps.LatLng(lat,lng),
   // icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
   map: map,
         });

google.maps.event.addListener(marker, 'click', function() {
   infowindow.setContent(contentString); 
   infowindow.open(map,marker);
 });

 bounds.extend(marker.position);

}
var locations = [
  "122 Powell Street, Vancouver, BC",
  "30 West Hastings Street, Vancouver, BC",
  "337 Gore Avenue, Vancouver, BC",
  "319 Carrall Street, Vancouver, BC",
  "555 Homer Street, Vancouver, BC",
  "920 East Hastings Street, Vancouver, BC",
  "421 East Cordova Street, Vancouver, BC",
  "55 Powell Street, Vancouver, BC",



];
var nextAddress = 0;
function theNext() {
  if (nextAddress < locations.length) {
    setTimeout('geocodeAddress("'+locations[nextAddress]+'",theNext)', delay);
    nextAddress++;
  } else {
    map.fitBounds(bounds);
  }
}
theNext();



