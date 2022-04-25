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


d3.csv("stockprice_daily_aapl.csv").then(function(data) {
  console.log(data[0]);

  var trace = {
        x: data.date,
        y: data.close,
        // text:
        name: "Ticker Closing Price",
        type: "line"
      };
        // console.log(yticks);
      // 8. Create the trace for the bar chart.
      var lineData = [trace];
      // 9. Create the layout for the bar chart.
      var lineLayout = {
        title: `10 years of data for ${data.ticker}`,
        yaxis: {autorange : 'reversed'},
        xaxis: {title: 'Ticker Close'}
      };
      // 10. Use Plotly to plot the data with the layout.
      Plotly.newPlot("line", lineData, lineLayout);
});
