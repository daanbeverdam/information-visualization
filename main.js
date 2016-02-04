console.log('I see you came to the console...');

var array = [1, 2, 3];

var p = d3.select('body')
        .selectAll('p')
        .data(array)
        .enter()
        .append('p')
        .text(function (d) {
            return d;
        });

console.log(p);

var s = d3.select("body")
        .append("svg")
        .attr("width", 50)
        .attr("height", 50)
        .append("circle")
        .attr("cx", 25)
        .attr("cy", 25)
        .attr("r", 25)
        .style("fill", "purple");
