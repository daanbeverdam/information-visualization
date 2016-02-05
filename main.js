console.log('I see you came to the console...');

var barData = [5, 20, 15, 20, 25, 40, 30, 25, 20, 15, 20, 5];
var barWidth = 25;
var barSpacing = 4;
var barMax = Math.max.apply(Math, barData);
var svgContainerHeight = 200;
var svgContainerWidth = 400;
var svgContainerPadding = 60;

var xScale = d3.scale.linear()
                     .domain([barMax, 0])
                     .range([0, svgContainerHeight]);

var yScale = d3.scale.linear()
                     .domain([0, barMax])
                     .range([svgContainerHeight, 0]);

var svgContainer = d3.select('body')
                     .append('svg')
                     .attr('width', svgContainerWidth + svgContainerPadding * 2 )
                     .attr('height', svgContainerHeight + svgContainerPadding * 2);

var bars = svgContainer.selectAll('rect')
                       .data(barData)
                       .enter()
                       .append('rect'); // get rect m8

var barAttributes = bars.attr('width', barWidth)
                        .attr('height', function (d) {
                           return svgContainerHeight - yScale(d);
                        })
                        .attr('x', function (d, i) {
                           return i * (barWidth + barSpacing) + svgContainerPadding;
                        })
                        .attr('y', function (d, i) {
                           return yScale(d) + svgContainerPadding;
                        })
                        .style('fill', 'teal');

var barLabels = svgContainer.selectAll('text')
                            .data(barData)
                            .enter()
                            .append('text')
                            .text(function (d) {
                                return d;
                            })
                            .attr('x', function (d, i) {
                               return i * (barWidth + barSpacing) + svgContainerPadding + barWidth / 2;
                            })
                            .attr('y', function (d, i) {
                               return yScale(d) + svgContainerPadding + 15;
                            })
                            .attr('font-family', 'sans-serif')
                            .attr('fill', 'white')
                            .attr('text-anchor', 'middle');

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient('left');

var yAxisGroup = svgContainer.append('g')
                             .attr('class', 'axis')
                             .attr('transform', 'translate(' + svgContainerPadding * 0.8 + ',' + svgContainerPadding + ')')
                             .call(yAxis);

var xAxis = d3.svg.axis()
                  .scale(xScale)
                  .orient('bottom');

var yAxisGroup = svgContainer.append('g')
                             .attr('class', 'axis')
                             .attr('transform', 'translate(' + svgContainerPadding * 0.8 + ',' + svgContainerPadding + ')')
                             .call(yAxis);

// var xAxisScale = d3.scale.linear()
//                          .domain([0, Math.max.apply(Math, barData)])
//                          .range([0, svgContainerWidth]);

// var xAxis = d3.svg.axis()
//                   .scale(xAxisScale);

// var xAxisGroup = svgContainer.append('g')
//                              .attr('class', 'axis')
//                              .attr('transform', 'translate(0' + svgContainerPadding + ',' + (svgContainerHeight + svgContainerPadding * 1.2) + ')')
//                              .call(xAxis);

console.log(barAttributes);
