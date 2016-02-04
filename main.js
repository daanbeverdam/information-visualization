console.log('I see you came to the console...');

var circleRadii = [40, 20, 10];

var svgContainer = d3.select('body')
                      .append('svg')
                      .attr('width', 200)
                      .attr('height', 200);

var circles = svgContainer.selectAll('circle')
                          .data(circleRadii)
                          .enter()
                          .append('circle');

var circleAttributes = circles
                       .attr('cx', 50)
                       .attr('cy', 50)
                       .attr('r', function (d) {
                           return d;
                       })
                       .style('fill', function (d) {
                           var color;
                           if (d === 40){
                               color = 'green';
                           } else if (d === 20){
                               color = 'yellow';
                           } else {
                               color = 'blue';
                           }
                           return color;
                       });

console.log(circleAttributes);

// var s = d3.select("body")
//         .append("svg")
//         .attr("width", 50)
//         .attr("height", 50)
//         .append("circle")
//         .attr("cx", 25)
//         .attr("cy", 25)
//         .attr("r", 25)
//         .style("fill", "purple");
