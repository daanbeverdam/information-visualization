console.log('I see you came to the console...');

var barData = [5, 10, 15, 20, 25, 30, 30, 25, 20, 15, 10, 5];
var barHeightScale = 5;
var barWidth = 25;
var barSpacing = 4;
var svgContainerHeigth = barHeightScale * Math.max.apply(Math, barData);
var svgContainerWidth = barData.length * (barWidth + barSpacing) - 4;

var svgContainer = d3.select('body')
                     .append('svg')
                     .attr('width', svgContainerWidth)
                     .attr('height', svgContainerHeigth);

var bars = svgContainer.selectAll('rect')
                       .data(barData)
                       .enter()
                       .append('rect'); // get rect m8

var barAttributes = bars
                        .attr('width', barWidth)
                        .attr('height', function (d) {
                            return d * barHeightScale;
                        })
                        .attr('x', function (d, i) {
                            return i * (barWidth + barSpacing);
                        })
                        .attr('y', function (d, i) {
                            return svgContainerHeigth - d * barHeightScale;
                        })
                        .style('fill', 'black');

console.log(barAttributes);
