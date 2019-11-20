

var xx

mapboxgl.accessToken = 'pk.eyJ1IjoicGhpcmVtb3VzZSIsImEiOiJjazJocHkzajgwZm91M2xwaGQyMTR2eW1lIn0.jxXt-icQSzPX8oQYvzDpTQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/phiremouse/ck32i249n2ujw1cmmjkdyxp86',
  center: [-87.6269017, 41.88682729],
  zoom: 10
});

function myFunc(vars) {
  xx = vars
}



// var url = 'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=91ba8a537a8d440582dcc8e55fd5f657&rt=red&outputType=JSON'
map.on('load', function () {
  map.addSource('stations', {
    type: 'geojson',
    data: xx[0]
  });

  map.addLayer({
    "id": "station",
    "type": "circle",
    "source": "stations",
    "paint": {
      "circle-radius": 6,
      "circle-color": "#B42222"
    },
    "filter": ["==", "$type", "Point"],
  });
  // Create a popup, but don't add it to the map yet.
  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'station', function (e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.station_descriptive_name;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });

  map.on('mouseleave', 'station', function () {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  map.on('click', 'station', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.stop_name;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(description)
      .addTo(map);
  });
});

function Pyclick(this){
  $.ajax({
    type:'get',
    url:'/stationclick',
    cache: false,
    async:'asynchronous',
    datatype:'json',
    success: function(data){
      console.log(json.stringify(data))
    },
    error: function(request,status,error){
      console.log('Error: ' +error)
    }
  })
}