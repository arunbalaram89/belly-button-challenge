// input json file 

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Promise Pending

// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
let data;
d3.json(url).then(function(result) {
    data = result
    console.log(data);
    init()

});

function demographic(sample_id) {
    let metadata = data.metadata
    let infoArray = metadata.filter(sampleObj=>sampleObj.id==sample_id)
    let info = infoArray[0]
    let panel = d3.select("#sample-metadata")
    panel.html("")
    Object.entries(info).forEach(([key, value]) => {
        panel.append("h6").text(`${key.toUpperCase()}: ${value}`)
    })
//     }
    console.log(metadata);
}


function createcharts(sample_id) {
    let samples = data.samples.find(sample=>sample.id==sample_id)

    // Creating variables for Sample Values, OTU IDs and OTU Labels

    let svalues = samples.sample_values
    let oids = samples.otu_ids
    let olabels = samples.otu_labels


    let bubbletrace = [{
        x: oids,
        y: svalues,
        mode: "markers",
        marker: {
            color: oids,
            size: svalues
        }
    }];
        let bubblelayout = {
            height: 500,
            width: 800
        }

    Plotly.newPlot("bubble", bubbletrace, bubblelayout);



     let bartrace = [{
        x: svalues.slice(0, 10).reverse(),
        y: oids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        type: "bar",
        orientation: "h",
        marker: {color: "blue"}
       }];
  
      let barlayout = {
           height: 600,
           width: 400,
          
        };

Plotly.newPlot("bar", bartrace, barlayout);
    
}


function init() {
    let names = data.names
    let clicker = d3.select("#selDataset") 
    for (let i = 0; i < names.length; i++) {
     clicker.append("option").text(names[i])
    }
    optionChanged(names[0])
 
 }
 
 
 function optionChanged(value){
 console.log(value);
 
 createcharts(value)
 console.log(value);
 
 demographic(value)
 console.log(value);
 
 }










init();


// d3.select - store metadata 



