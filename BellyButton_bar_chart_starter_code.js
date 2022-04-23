function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.csv("stocks_data.csv").then((data) => {
    var sampleNames = data.ticker;
    // console.log(data)

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);

}

// Demographics Panel
function buildMetadata(sample) {
  d3.csv("stocks_data.csv").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array.
    var sample_array = data.samples;
    console.log(sample_array)
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sample_array_filtered = sample_array.filter(sampleObj => sampleObj.id == sample);
    console.log(sample_array_filtered)
    //  5. Create a variable that holds the first sample in the array.
    var sample_array_filtered_one = sample_array_filtered[0];
    console.log(sample_array_filtered_one)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = sample_array_filtered_one.otu_ids.slice(0, 10);
    // console.log(otu_ids)
    var otu_labels = sample_array_filtered_one.otu_labels.slice(0, 10);
    // console.log(otu_labels)
    var sample_values = sample_array_filtered_one.sample_values.slice(0, 10);
    // console.log(sample_values)

    // sliced_otu_ids = otu_ids.slice(0, 10);
    // console.log(otu_ids);
    // console.log(sliced_otu_ids);
    // sliced_otu_ids_to_string = sliced_otu_ids.toString();
    // console.log(sliced_otu_ids_to_string);
    // yticks = {"OTU": otu_ids   }
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order
    //  so the otu_ids with the most bacteria are last.
    // yticks = sample_array_filtered_one.map(function (a, b) {
    //   return b.sample_values - a.sample_values
    // });
    // console.log(yticks);
    yticks = otu_ids.sort(function (a, b) {
      return parseFloat(b.sample_values) - parseFloat(a.sample_values);

    });

    console.log(yticks);
    OTU_name = []
    yticks.forEach(value => OTU_name.push(`OTU ${value}`));
    console.log(OTU_name);


    // yticks = yticks.reverse();
    var trace = {
      x: sample_values,
      y: OTU_name,
      text: otu_labels,
      name: "Bacteria",
      type: "bar",
      orientation: "h"
    };
      console.log(yticks);
    // 8. Create the trace for the bar chart.
    var barData = [trace];


    // 9. Create the layout for the bar chart.
    var barLayout = {
      title: `Top 10 Bacteria Strains for ${sample}`,
      yaxis: {autorange : 'reversed'},
      xaxis: {title: 'Bacteria Count'}





    };
    // 10. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var trace_bubble = {
      x: yticks,
      y: sample_values,
      text: otu_labels, otu_ids,
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)', 'rgb(44, 160, 101)', 'rgb(255, 65, 54)', 'rgb(255, 64, 0)',
          'rgb(255, 255, 0)',
          'rgb(191, 255, 0)',
          'rgb(0, 255, 255)',
          'rgb(0, 0, 255)',
          'rgb(255, 0, 255)'],
        size: sample_values
      }
    };

    var bubbleData = [trace_bubble

    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: `Bacteria Cultures Per Sample for ID: ${sample}`,
      font: {size: 17},
      xaxis: {title: 'OTU ID'},
      yaxis: { title: 'Bacteria Count' }


    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);



    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];

    var data_gauge = [
      {
        gauge: {
          bar: { color: "black" },
          axis: { range: [0, 10]},
          steps: [{range: [0, 2], color: 'red'},
                  {range: [2, 4], color: 'orange'},
                  {range: [4, 6], color: 'yellow'},
                  {range: [6, 8], color: 'lightgreen'},
                  {range: [8, 10], color: 'green'}]},


        value: result.wfreq,
        title: { text: "Scrubs per Week<br>Subtext" },
        type: "indicator",
        mode: "gauge+number"





        // title: {
        //   text:
        //     "Accounts<br><span style='font-size:0.8em;color:gray'>Subtitle</span><br><span style='font-size:0.8em;color:gray'>Subsubtitle</span>"
        // },






      }
    ];

    // 5. Create the layout for the gauge chart.


    var gaugeLayout = {
      title: `Belly Button Washing Frequency for ${sample}`







    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", data_gauge, gaugeLayout);
  });

}
