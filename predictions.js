// Predictions Graph

var url = 'https://github.com/kaalrok/Final-Project/blob/e689102fc7c298570617cb3537ed0c9f98c4da34/csv_files/stock-predictions.csv';

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
