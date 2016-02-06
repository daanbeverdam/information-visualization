console.log('I see you came to the console...');

var data = [5, 20, 15, 20, 25, 40, 30, 25, 20, 15, 20, 30];
var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
var spacing = 1; // bar spacing as percentage of the bar width
var dataMax = d3.max(data); // max of dataset
var height = 200;  // height of svg container
var width = 400; // width of svg container
var padding = 60; // container padding

var xScale = d3.scale.ordinal()
                     .domain(d3.range(data.length))
                     .rangeRoundBands([0, width], 0.05);

var yScale = d3.scale.linear()
                     .domain([0, dataMax])
                     .range([0, height]);

// create svg container:
var svg = d3.select('body')
            .append('svg')
            .attr('width', width + padding * 2 )
            .attr('height', width + padding * 2);

// create bars:
var bars = svg.selectAll('bar')
              .data(data)
              .enter()
              .append('rect'); // get rect m8

// give bars their attributes
var barAttributes = bars.attr('width', xScale.rangeBand())
                        .attr('height', function (d) {
                           return yScale(d);
                        })
                        .attr('x', function (d, i) {
                           return xScale(i) + padding;
                        })
                        .attr('y', function (d, i) {
                           return height - yScale(d) + padding;
                        })
                        .style('fill', 'teal');

var barLabelsBottom = svg.append('g')
                   .attr('class', 'labelsbottom')
                   .selectAll('text')
                   .data(months)
                   .enter()
                   .append('text')
                   .text(function (d) {
                       return d;
                   })
                   .attr('x', function (d, i) {
                       return xScale(i) + xScale.rangeBand() / 2 + padding;
                   })
                   .attr('y', function (d, i) {
                       return height + padding * 1.3;
                   })
                   .attr('font-family', 'sans-serif')
                   .attr('fill', 'black')
                   .attr('text-anchor', 'middle');

// create bar labels
var barLabelsTop = svg.append('g')
                   .attr('class', 'labelstop')
                   .selectAll('text')
                   .data(data)
                   .enter()
                   .append('text')
                   .text(function (d) {
                       return d;
                   })
                   .attr('x', function (d, i) {
                       return xScale(i) + xScale.rangeBand() / 2 + padding;
                   })
                   .attr('y', function (d, i) {
                       return height + padding - yScale(d) + 15;
                   })
                   .attr('font-family', 'sans-serif')
                   .attr('fill', 'white')
                   .attr('text-anchor', 'middle');

var yAxis = d3.svg.axis()
                  .scale(yScale)
                  .orient('left');

var yAxisGroup = svg.append('g')
                    .attr('class', 'axis')
                    .attr('transform', 'translate(' + padding * 0.8 + ',' + padding + ')')
                    .call(yAxis);

// var xAxis = d3.svg.axis()
//                   .scale(xScale)
//                   .orient('bottom')
//                   .outerTickSize(0);
//
// var xAxisGroup = svg.append('g')
//                     .attr('class', 'axis')
//                     .attr('transform', 'translate(' + padding + ',' + (height + padding * 1.2)+ ')')
//                     .attr('y', height - padding)
//                     .call(xAxis);

