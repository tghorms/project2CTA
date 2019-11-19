var myMap = L.map("map", {
  center: [41.8781, -87.6298],
  zoom: 13
});

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);


var url = "/stop_data"

d3.json(url).then(function (data) {
  console.log(data);

  trainStops(data)
  
});


// d3.json(url, function(response) {

//   console.log(response);

//   var heatArray = [];

//   for (var i = 0; i < response.length; i++) {
//     var location = response[i];

//     if (location) {
//       heatArray.push([location.lon, location.lat]);
//     }
//   }

//   var heat = L.heatLayer(heatArray, {
//     radius: 20,
//     blur: 35
//   }).addTo(myMap);

//   console.log(heatArray)
// });
// // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);