// Display stock financials and graphs for 9 stocks in interactive webpage.
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

// d3.csv("stockprice_daily_aapl.csv", function(data) {
//     for (var i = 0; i < data.length; i++) {
//         console.log(data[i].date);
//         console.log(data[i].close);
//     }
// });
//
// d3.csv("stockprice_daily_aapl.csv")
//     .row(function(d) { return {key: d.key, value: +d.value}; })
//     .get(function(error, rows) { console.log(rows); });




function makeplot() {
  d3.csv("stockprice_daily_aapl.csv", function(data){ processData(data) } );

};

function processData(allRows) {

  // console.log(allRows);
  var x = [], y = [], standard_deviation = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    console.log(row);
    x.push( row['date'] );
    y.push( row['close'] );
  }
  console.log( 'X',x, 'Y',y, 'SD',standard_deviation );
  makePlotly( x, y, standard_deviation );
}

function makePlotly( x, y, standard_deviation ){
  var plotDiv = document.getElementById("plot");
  var traces = [{
    x: x,
    y: y
  }];

  Plotly.newPlot('line', traces,
    {title: 'Plotting CSV data from AAPL call'});
};
  makeplot();
