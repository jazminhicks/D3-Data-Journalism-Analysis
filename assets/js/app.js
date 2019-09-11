// set svg area and margins

var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};


var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//import data
d3.csv("../d3-data-journalism/assets/data/data.csv").then(function(healthData) {
    console.log(healthData);

    //parse data as integers
    healthData.forEach(function(data) {
        data.obesity = +data.obesity;
        data.smokesHigh = +data.smokesHigh;
        data.obesity = +data.obesity;
        data.smokesHigh = +data.smokesHigh;
        data.abbr = data.abbr;
   
    });
    
    //scale function
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.obesity - 2), d3.max(healthData, d => d.obesity + 2)])
        .range([0, width]);

    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.smokesHigh) - 2, d3.max(healthData, d => d.smokesHigh + 2)])
        .range([height, 0]);

    //build axis and add to scatter group
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    //build circles as data points
    let circlesGroup = chartGroup.selectAll(".dataCircle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.obesity))
    .attr("cy", d => yLinearScale(d.smokesHigh))
    .attr("r", "10")
    .attr("fill", "blue")
    .attr("opacity", ".5");

    //add text to center of circles
    
    let textGroup = chartGroup.selectAll(".abbrText")
    .data(healthData)
    .enter()
    .append("text")
    .attr("x", d => xLinearScale(d.obesity))
    .attr("y", d => yLinearScale(d.smokesHigh) + 3)
    .attr("dy", 3)
    .text(d => d.abbr)
    .style("font-family", "arial")
    .style("font-size", "10px")
    .style("text-anchor", "middle")
    .style("fill", "white");

    //console.log(textGroup);
 
    //create axis labels
    let yAxis = chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height/1.5))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .style("font-weight", "bold")
    .text("% smokes");

    let xAxis = chartGroup.append("text")
    .attr("transform", `translate(${width/2}, ${height + margin.top + 20})`)
    .style("text-anchor", "middle")
    .attr("class", "axisText")
    .style("font-weight", "bold")
    .text("% obese");

    console.log(yAxis);
    console.log(xAxis);


    
});