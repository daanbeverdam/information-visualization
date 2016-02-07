console.log('I see you came to the console...');

function main (d3) {
    d3.csv('data/meteo.csv', function(data){

        //var data = [5, 20, 15, 20, 25, 45, 30, 25, 20, 15, 20, 30];
        var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        var spacing = 1; // bar spacing as percentage of the bar width
        var dataMax = d3.max(data); // max of dataset
        var height = 200;  // height of svg container
        var width = 400; // width of svg container
        var padding = 60; // container padding
        var currentYear = 2011;
        var dataDict = fillDict(createDict(months));

        // creates empty dict with months as keys
        function createDict (array) {
            dict = {};
            for (var i = 0; i < array.length; i++) {
                dict[array[i]] = [];
            }
            return dict;
        }

        function fillDict (emptyDict) {
            data.forEach(function(d) {
                if (data.year === currentYear) {
                    array = emptyDict[data.month].push(data.temperature);
                }
            });
            return emptyDict;
        }


    });
}


// fill dict with arrays of meteo data

console.log(dataDict);

// var f = d3.csv('data/meteo.csv', function (data) {
//     array = [];
//     for (var i = 0; i < data.length; i++) {
//         if (data[i].year === currentYear) {
//             array.push(data[i].temperature);
//         }
//     return array;
//     }
// });

var xScale = d3.scale.ordinal()
                     .domain(d3.range(data.length))
                     .rangeRoundBands([0, width], 0.05);

var yScale = d3.scale.linear()
                     .domain([dataMax, 0])
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
                           return  yScale(0) - yScale(d) ;
                        })
                        .attr('x', function (d, i) {
                           return xScale(i) + padding;
                        })
                        .attr('y', function (d, i) {
                           return yScale(0) + padding - (yScale(0) - yScale(d));
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
                       return yScale(0) + padding - (yScale(0) - yScale(d)) + 15;
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
