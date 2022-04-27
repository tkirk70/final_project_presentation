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
      title: `Decade of stock values for ${sampleNames}`,
      xaxis: {
        title: 'Year'
      },
      yaxis : {
        title: 'Stock Value in US Dollars ($)'
        }
      }

    Plotly.newPlot('line', data, layout);
  })
  }
update();
