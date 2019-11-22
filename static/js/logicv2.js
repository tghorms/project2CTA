var xx
var rider
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
function knightrider(vars) {
  var array = vars
  var obj = {};

  Object.entries(array).forEach(function (data) {
    obj[data[0]] = data[1]
  });
  rider = obj
}

$(window).resize(function(){
  map.resize();
});


// var url = 'http://lapi.transitchicago.com/api/1.0/ttpositions.aspx?key=91ba8a537a8d440582dcc8e55fd5f657&rt=red&outputType=JSON'
map.on('load', function () {


  map.resize();
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
    var station_id = e.features[0].properties.map_id
    Station_Infor(station_id)
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }
    new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(e.features[0].properties.map_id)
      .addTo(map);
  });
});

function unpack(data, index) {
  return data.map(function (row) {
    return row[index];
  });
}

function Station_Infor(statID) {
  var url = `/station_Api/${statID}`
  d3.json(url).then(
    function (x) {
      temp = x
      MakeMyTable(temp['ctatt']['eta'])
    });
}


function MakeMyTable2(info) {
  d3.json('data.json', function (error,data) {

    function tabulate(data, columns) {
      var table = d3.select('#data-table').append('table')
      var thead = table.append('thead')
      var	tbody = table.append('tbody');
  
      // append the header row
      thead.append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
          .text(function (column) { return column; });
  
      // create a row for each object in the data
      var rows = tbody.selectAll('tr')
        .data(data)
        .enter()
        .append('tr');
  
      // create a cell in each row for each column
      var cells = rows.selectAll('td')
        .data(function (row) {
          return columns.map(function (column) {
            return {column: column, value: row[column]};
          });
        })
        .enter()
        .append('td')
          .text(function (d) { return d.value; });
  
      return table;
    }
  
    // render the table(s)
    tabulate(data, ['date', 'close']); // 2 column table
  
  });
}






function MakeMyTable(info) {
  var descr = ['Stop ID', 'Stop Description', 'Destination Name', 'Arrival Time']
  var values = []
  Object.entries(info).forEach(([key, value]) => {
    var stpID = value.stpId
    var stpde = value.stpDe
    var destname = value.destNm
    var arrt = value.arrT
    var arr = [stpID, stpde, destname, arrt]

    for (var i = 0; i < arr.length; i++) {
      values= arr[i]
      // console.log(`Key: ${key} and Value ${String(arr[i])}`)
    }
  })
  console.log(values)
  
  
  
  
  //create table
  var table = d3.select('.byford').append('table')
  var thead = table.append('thead')
  var tbody = table.append('tbody')
  //create table header
  thead.append("tr")
    .selectAll("th")
    .data(descr)
    .enter().append('th')
    .text(d => d)

  table.append('tbody')
    .selectAll('tr')
    .data(info)
    .enter()
    .append('tr')
    
    .select('td')
    .data('x')
    
  console.log(info)
  // Object.entries(info).forEach(([key, value]) => {
  //   var stpID = value.stpId
  //   var stpde = value.stpDe
  //   var destname = value.destNm
  //   var arrt = value.arrT
  //   var arr = [stpID, stpde, destname, arrt]

  //   for (var i = 0; i < arr.length; i++) {
  //     console.log(`Key: ${key} and Value ${String(arr[i])}`)
  //   }
  // });
}
  
// creates the graph.
var rider_url = "/ridership"
d3.json(rider_url).then(function (stuff) {
  var station_ids = stuff.map(d => d[0]);
  var average_rides = stuff.map(d => d[1]);
  var trace1 = {
    x: station_ids,
    y: average_rides,
    text: stuff.map(d => d[0].toString()),
    name: "Ridership",
    type: "bar",
    orientation: "v"
  };
  plot_data = [trace1]
  // Apply the group bar mode to the layout
  var layout = {
    title: "CTA Ridership - January 2001 to June 2019",
    margin: {
      l: 50,
      r: 50,
      t: 50,
      b: 50
    },
    hovermode: "closest",
    xaxis: {
      title: "Station",
      showticklabels: false
    },
    yaxis: {
      title: "Average Riders per Month"
    }
  };
  // Render the plot to the div tag with id "plot"
  Plotly.plot("graph_table", plot_data, layout);
});


