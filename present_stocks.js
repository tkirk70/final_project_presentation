function update() {
  var select = document.getElementById('myList');
  var option = select.options[select.selectedIndex];
  var value = select.options[select.selectedIndex].value;
  var text = select.options[select.selectedIndex].text;
  document.getElementById('value').value = option.value;
  console.log(value); // en
	document.getElementById('text').value = option.text;
  console.log(text); // en

  d3.csv(`https://raw.githubusercontent.com/tkirk70/final_project_presentation/main/stockprice_daily_${value}.csv`).then((data) => {
    var sampleNames = data[0].ticker;
    var y = [];
    var x = [];
    for (var i = 0; i < data.length; i++) { x.push(data[i].date);
    y.push(data[i].close) };

    var trace1 = {
      x: x,
      y: y,
      type: 'line'
    };

    var data = [trace1];

    var layout = {
      title: `Decade of stock values for ${value}`,
      xaxis: {
        title: 'Year'
      },
      yaxis : {
        title: 'Stock Value in US Dollars ($)'
        }
      }

    Plotly.newPlot('line', data, layout);
  })




var url = 'https://raw.githubusercontent.com/tkirk70/final_project_presentation/main/stock_predictions.csv';
    console.log(value);
    console.log(text);
    d3.csv(url).then((data) => {
      console.log(data.length)
      var sampleNames = data[0].Ticker;
      var y_real = [];
      var x = [];
      var y_pred = [];
      for (var i = 0; i < data.length; i++) {
        // console.log(value);
        // console.log(text);
        console.log(data[i].Ticker);
        if (data[i].Ticker = value){
          x.push(data[i].Date);
          y_real.push(data[i].Close);
          y_pred.push(data[i].Predictions)};
      };


      var trace1 = {
        x: x,
        y: y_real,
        type: 'line'
      };
      var trace2 = {
        x: x,
        y: y_pred,
        type: 'line'
      };
      var data = [trace1, trace2];

      var layout = {
        title: `Real versus Predicted Returns ${value}`,
        xaxis: {
          title: 'Year'
        },
        yaxis: {
          title: 'Stock Value in US Dollars ($)'
        }
      }

Plotly.newPlot('predictions', data, layout);

})
}
update();
