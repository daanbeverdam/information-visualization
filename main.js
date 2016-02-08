console.log('I see you came to the console...');

function main (d3) {
    d3.csv('data/meteo.csv', function(data){ // open csv file as data

        var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];
        var spacing = 1; // bar spacing as percentage of the bar width
        var height = 200;  // height of svg container
        var width = 400; // width of svg container
        var padding = 60; // container padding
        var currentYear = '2011';
        var dataDict = createDict(months);
        dataDict = fillDict(dataDict, data, months, currentYear);
        data = getMeans(dataDict, months); // the array used for plotting
        var dataMax = d3.max(data); // max of dataset

        console.log('Temperature means for the year ' + currentYear + ':');
        console.log(data);
        console.log(months);

        // create x scale:
        var xScale = d3.scale.ordinal()
                             .domain(d3.range(data.length))
                             .rangeRoundBands([0, width], 0.05);

        // create y scale:
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

        // give bars their attributes:
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
                               return yScale(0) + padding - (yScale(0) - yScale(d)) - 10;
                           })
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

        // creates empty dict with months as keys:
        function createDict (array) {
            dict = {};
            for (var i = 0; i < array.length; i++) {
                dict[array[i]] = [];
            }
            return dict;
        }

        // fills dictionary with arrays of temperatures:
        function fillDict (emptyDict, data, months, currentYear) {
            data.forEach(function(d) {
                if (d.year === currentYear) {
                    month = months[parseInt(d.month, 10) - 1]; // TODO convert to int
                    emptyDict[month].push(parseFloat(d.temperature));
                }
            });
            return emptyDict;
        }

        // returns an array of rounded means
        function getMeans (dict, months) {
            array = [];
            for (var i = 0; i < months.length; i++) {
                mean = d3.mean(dict[months[i]]);
                array.push(d3.round(mean));
            }
            return array;
        }

    });
}

main(d3); //call main function