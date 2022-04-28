// Predictions Graph

var url = 'https://raw.githubusercontent.com/kaalrok/Final-Project/main/csv_files/stock-predictions.csv?token=GHSAT0AAAAAABT75FH4RYKKMMQSJD3PAFNEYTKBZEQ';

d3.csv(url).then((data) => {
    var sampleNames = data[0].Ticker;
    var y_real = [];
    var x = [];
    var y_pred = [];
    for (var i = 0; i < data.length; i++) {
      x.push(data[i].Date);
      y_real.push(data[i].Close);
      y_pred.push(data[i].Predictions)
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
      title: `Real versus Predicted Returns ${sampleNames}`,
      xaxis: {
        title: 'Year'
      },
      yaxis: {
        title: 'Stock Value in US Dollars ($)'
      }
    }


    Plotly.newPlot('predictions', data, layout);

  })
