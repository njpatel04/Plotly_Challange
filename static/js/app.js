function CreatePlot(id){
    d3.json("data/samples.json").then((importedData)=> {
        var data = importedData;
        console.log(data);
        
        // Matching user selected ID value with data base (index 0)
        var xSample = data.samples.filter(x => x.id.toString() === id)[0];
        console.log(xSample);

        //Reading top ten Otu Ids from specific sample
        var TopTen_xidOtu = xSample.otu_ids.slice(0,10).reverse();
        
        //adding "OTU" infront of the ID value
        var PlotID = TopTen_xidOtu.map(x => "OTU " + x);
        //console.log(PlotID);

        //Reading top ten sample values from specific sample
        var TopTen_xSample = xSample.sample_values.slice(0,10).reverse();
        //console.log(TopTen_xSample);

        //Reading top ten sample labels
        var xLables = xSample.otu_labels.slice(0,10);
        //console.log(xLables);

        console.log(TopTen_xSample);
        console.log(PlotID);

        var xSample_freq = data.metadata.filter(x => x.id.toString() === id)[0];
        var wfreq = xSample_freq.wfreq;
        console.log(`washing freq: ${wfreq}`)


        //---- Demographic data--------------------------------------------------
        var metadata = data.metadata;
        // console.log(metadata);

        var info = metadata.filter(x => x.id.toString() === id)[0];

        var demoinfo = d3.select('#sample-metadata');

        demoinfo.html("");

        Object.entries(info).forEach((x) => {
            demoinfo.append("h4").text(x[0].toUpperCase()+ ": " + x[1] + "\n");
        });

        //----------BAR CHART--------------------------------------------------
        var bar_trace = {
            x: TopTen_xSample,
            y: PlotID,
            type: "bar",
            text: xLables,
            orientation: "h"
        };

        //add layout at the end 

        var bar_plot = [bar_trace];
        Plotly.newPlot("bar", bar_plot);


        //---------BUBBLE CHART------------------------------------------------

        var bubble_trace = {
            x:xSample.otu_ids,
            y:xSample.sample_values,
            mode: "markers",
            text: xSample.otu_labels,
            marker: {
                size: xSample.sample_values,
                color: xSample.otu_ids
            }

        };

        var bubble_plot = [bubble_trace];
        Plotly.newPlot("bubble", bubble_plot);

    });
}
    
// Function intilzie the page

function init(){

    var dropdown = d3.select("#selDataset");

    d3.json("data/samples.json").then((data)=> {

        data.names.forEach(function(name){
        dropdown.append("option").text(name).property("value");
       
        });

        CreatePlot(data.names[0]);
        //datasort(data.names[0]);
    
    });
};

// fuction called out in index.HTML, perfrom same look and plot when dropdown value is changed
function optionChanged(id) {
    CreatePlot(id);
    //datasort(id);
};

init();
