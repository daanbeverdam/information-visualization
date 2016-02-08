console.log('I see you came to the console...');

function main (d3) {
    d3.csv('data/meteo.csv', function(data) { // open csv file as data

        var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        var years = ['2011', '2012', '2013', '2014', '2015'];
        var spacing = 1; // bar spacing as percentage of the bar width
        var height = 200;  // height of svg container
        var width = 400; // width of svg container
        var padding = 60; // container padding
        var animationSpeed = 500; // bar animation speed
        var animationDelay = 500; // bar animation delay
        var currentYear = years[0];
        var dataArray = parseCSV(currentYear); // the array used for plotting
        var absoluteMax = getMaxCSV(); // gets the highest average in the csv file
        console.log(absoluteMax);

        draw(); // initial draw of bar chart

        // register keypresses:
        d3.select('body')
            .on('keydown', function () {
                var key = d3.event.code;
                var index = years.indexOf(currentYear);

                if (key == 'ArrowRight' || key == 'ArrowLeft') {

                    if (key == 'ArrowRight') {
                        index = index + 1;
                    }

                    if (key == 'ArrowLeft') {
                        index = index - 1;
                    }

                    if (index > years.length - 1) {
                        index = 0;
                    } else if (index < 0) {
                        index = years.length - 1;
                    }

                    currentYear = years[index]; // set correct year
                    dataArray = parseCSV(currentYear); // parse csv again
                    //d3.select("svg").remove(); // remove 'old' svg
                    draw(true); // draw new svg
                }
            });

        function getMaxCSV() {
            temp = [];
            for (var i = 0; i < years.length; i++) {
                temp.push(d3.max(parseCSV(years[i])));
            }
            max = d3.max(temp);
            return max;
        }

        // parse CSV:
        function parseCSV (currentYear) {
            dict = {};
            for (var i = 0; i < months.length; i++) {
                dict[months[i]] = [];
            }
            data.forEach(function(d) {
                if (d.year === currentYear) {
                    month = months[parseInt(d.month, 10) - 1];
                    dict[month].push(parseFloat(d.temperature / 10));
                }
            });
            array = [];
            for (i = 0; i < months.length; i++) {
                mean = d3.mean(dict[months[i]]);
                array.push(d3.round(mean, 1));
            }
            return array;
        }

        // draw svg object (or update):
        function draw (update) {

                var dataMax = d3.max(dataArray); // max of dataset
                console.log(currentYear);
                // create x scale:
                var xScale = d3.scale.ordinal()
                                     .domain(d3.range(dataArray.length))
                                     .rangeRoundBands([0, width], 0.05);

                // create y scale:
                var yScale = d3.scale.linear()
                                     .domain([absoluteMax, 0])
                                     .range([0, height]);

            if (update !== true) {
                // create svg container:
                var svg = d3.select('body')
                            .append('svg')
                            .attr('width', width + padding * 2 )
                            .attr('height', width + padding * 2);

                // create bars:
                var bars = svg.selectAll('bar')
                              .data(dataArray)
                              .enter()
                              .append('rect'); // get rect m8

                // give bars their attributes:
                var barAttributes = bars.attr('class', 'bars')
                                        .attr('width', xScale.rangeBand())
                                        .attr('height', function (d) {
                                           return  yScale(0) - yScale(d) ;
                                        })
                                        .attr('x', function (d, i) {
                                           return xScale(i) + padding;
                                        })
                                        .attr('y', function (d, i) {
                                           return yScale(0) + padding - (yScale(0) - yScale(d));
                                        })
                                        .attr('fill', function(d, i) {
                                            return 'rgb(' + d3.round(d * 10) + ', 10, 10)';
                                        });

                // create month labels:
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

                // create value labels:
                var barLabelsTop = svg.append('g')
                                   .attr('class', 'labelstop')
                                   .selectAll('text')
                                   .data(dataArray)
                                   .enter()
                                   .append('text')
                                   .text(function (d) {
                                       return d;
                                   })
                                   .attr('x', function (d, i) {
                                       return xScale(i) + xScale.rangeBand() / 2 + padding;
                                   })
                                   .attr('y', function (d, i) {
                                       return yScale(0) + padding - (yScale(0) - yScale(d)) - 10;
                                   })
                                   .attr('font-family', 'sans-serif')
                                   .attr('fill', 'black')
                                   .attr('text-anchor', 'middle');

                // create chart title:
                var title = svg.append('g')
                               .attr('class', 'title')
                               .append('text')
                               .text(currentYear)
                               .attr('x', width / 2 + padding)
                               .attr('y', 15)
                               .attr('font-family', 'sans-serif')
                               .attr('fill', 'black')
                               .attr('text-anchor', 'middle');

                // create y-axis:
                var yAxis = d3.svg.axis()
                                  .scale(yScale)
                                  .orient('left');

                // give y-axis it's attributes:
                var yAxisGroup = svg.append('g')
                                    .attr('class', 'axis')
                                    .attr('transform', 'translate(' + padding * 0.8 + ',' + padding + ')')
                                    .call(yAxis);

            } else if (update === true) {

                d3.select('svg').selectAll('.bars')
                                .data(dataArray)
            				    .transition()
            				    .delay(function(d, i) {
            					    return i / dataArray.length * animationDelay;
            				    })
            				    .duration(animationSpeed)
            				    .text(function(d) {
            				   	 	return d;
            				    })
                                .attr('width', xScale.rangeBand())
                                .attr('height', function (d) {
                                   return  yScale(0) - yScale(d) ;
                                })
                                .attr('x', function (d, i) {
                                   return xScale(i) + padding;
                                })
                                .attr('y', function (d, i) {
                                   return yScale(0) + padding - (yScale(0) - yScale(d));
                                })
                                .attr('fill', function(d, i) {
                                    return 'rgb(' + d3.round(d * 10) + ', 10, 10)';
                                });

                d3.select('svg').selectAll('.labelstop').selectAll('text')
                    .data(dataArray)
                    .text(function(d) {
                        return d;
                    })
                    .transition()
                    .delay(function(d, i) {
                        return i / dataArray.length * animationDelay;
                    })
                    .duration(animationSpeed)
                    .attr('x', function (d, i) {
                        return xScale(i) + xScale.rangeBand() / 2 + padding;
                    })
                    .attr('y', function (d, i) {
                        return yScale(0) + padding - (yScale(0) - yScale(d)) - 10;
                    })
                    .attr('font-family', 'sans-serif')
                    .attr('fill', 'black')
                    .attr('text-anchor', 'middle');

                d3.select('svg').selectAll('g.title').selectAll('text')
                .text(currentYear)
                //.attr('text-anchor', 'middle');
            }
        }
    });
}

main(d3); //call main function