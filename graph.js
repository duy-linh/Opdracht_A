/* Gebaseerd op Mike Bostock's Multi-Series Line Chart November 5, 2017 https://bl.ocks.org/mbostock/3884955. Aantal aanpassingen zijn gedaan door mij, deze zullen aangegeven worden met een comment, daarnaast zal het ook aangegeven worden in de readme.md */

/* Link naar de dataset http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80785ned&D1=0,2&D2=a&D3=30&D4=a&HDR=T,G3&STB=G2,G1&CHARTTYPE=1&VW=T */

// Hier wordt een een variable svg gemaakt, vervolgens worden er margins toegevoegd aan het canvas van de svg.
var svg = d3.select("svg"),
    margin = {top: 50, right:175, bottom: 50, left: 75},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y");

// Hier wordt de bar gecalculeerd, zodat het in een passende manier wordt geplaatst. https://medium.com/@mbostock/introducing-d3-scale-61980c51545f
var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory20b);

// Hier wordt een functie gemaakt dat de data kan plaatsen in x en y punten
var line = d3.line()
    .curve(d3.curveBasis)
    .x(function(d) { return x(d.datum); })
    .y(function(d) { return y(d.bedrijven); });

// Hier wordt de data ingeladen
d3.tsv("data.tsv", type, function(error, data) {
    if (error) throw error;

// Hier wordt een map gemaakt waarin alle data wordt gestopt... https://github.com/d3/d3-collection/blob/master/README.md#map
var cities = data.columns.slice(1).map(function(id) {
    return {
      id: id,
      values: data.map(function(d) {
        return {datum: d.datum, bedrijven: d[id]};
      })
    };
});

// Hier wordt alle data gepakt, waarna er een passende schaal wordt gemaakt 'domain/range'
x.domain(d3.extent(data, function(d) { return d.datum; }));

y.domain([
    d3.min(cities, function(c) {
        return d3.min(c.values, function(d) { return d.bedrijven; }); 
    }),
    d3.max(cities, function(c) { 
        return d3.max(c.values, function(d) { return d.bedrijven; }); 
    })
    ]);

z.domain(cities.map(function(c) { return c.id; }));

// Hier worden verschillende attributes aan de x-as gegeven     
g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("x", 445)
    .attr("y", 30)
    .attr("dy", "0.71em")
    .attr("fill", "#000")
    .text("Jaren");

// Hier worden verschillende attributes aan de x-as gegeven 
g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("x", 20)
    .attr("y", -30)
    .attr("dy", "2em")
    .attr("dx", "-2em")
    .attr("text-anchor", "end")
    .attr("fill", "#000")
    .text("Aantal bedrijven");

// Hier worden alle barren geselecteerd en vervolgens attributen aan meegegeven
var klasse = g.selectAll(".klasse")
    .data(cities)
    .enter().append("g")
    .attr("class", "klasse");

// Voegt alle waardes aan de lijn path
klasse.append("path")
    .attr("class", "line")
    .attr("d", function(d) { return line(d.values); })
    .style("stroke", function(d) { return z(d.id); })

// Voegt alle benamingen van de klassen
klasse.append("text")
    .datum(function(d) { return {id: d.id, value: d.values[d.values.length - 1]}; })
    .attr("transform", function(d) { return "translate(" + x(d.value.datum) + "," + y(d.value.bedrijven) + ")"; })
    .attr("x", 3)
    .attr("dy", "0.35em")
    .style("font", "10px sans-serif")
    .text(function(d) { return d.id; });

    
    
    
/* Tooltip Multi-Line Chart van larsenmtl June 19, 2016: https://bl.ocks.org/larsenmtl/e3b8b7c2ca4787f77d78f58d41c3da91 */    
    
// Hier wordt een groep gemaakt in de svg met een class 
var mouseG = svg.append("g")
    .attr("class", "mouse-over-effects")
    .attr("transform", "translate(0, 50)");    

// Hier wordt er een zwarte lijn gemaakt die de muis volgt
mouseG.append("path") 
    .attr("class", "mouse-line")
    .style("stroke", "black")
    .style("stroke-width", "1px")
    .style("opacity", "0");

// Hier worden alle 'paths' met een class 'line' opgeslagen in de variabele lines
var lines = document.getElementsByClassName('line');

// Hier wordt een groep gemaakt voor iedere waarde van verticaal gehoverde tijdsperiode
var mousePerLine = mouseG.selectAll('.mouse-per-line')
    .data(cities)
    .enter()
    .append("g")
    .attr("class", "mouse-per-line");

// Hier wordt een cirkel gemaakt op iederen lijn van de verticaal gehoverde tijdsperiode
mousePerLine.append("circle")
    .attr("r", 4)
    .style("stroke", function(d) {
    return z(d.name);
    })
    .style("fill", "none")
    .style("stroke-width", "1px")
    .style("opacity", "0");

// Hier wordt tekst toegevoegd naast de cirkel
// Jorik van Essen heeft mij geholpen bij het goed zetten van de <rect> canvas
mousePerLine.append("text")
    .attr("transform", "translate(10,3)");

// Hier wordt een 'rect' aangemaakt in de svg, de rect wordt gebruikt als een canvas over de svg, zodat het de waardes kan lezen
mouseG.append('svg:rect')
    .attr('x', 75)
    .attr('y', 0)
    .attr('width', width)
    .attr('height', height)
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    
// In deze functie zal de zwarte lijn, cirkels en tekst onzichtbaar worden wanneer er niet op de 'rect' gehoverd wordt
    .on('mouseout', function() { 
    d3.select(".mouse-line")
    .style("opacity", "0");
    d3.selectAll(".mouse-per-line circle")
    .style("opacity", "0");
    d3.selectAll(".mouse-per-line text")
    .style("opacity", "0");
    })
    
// In deze functie zal de zwarte lijn, cirkels en tekst zichtbaar worden wanneer er op de 'rect' gehoverd wordt
    .on('mouseover', function() {
    d3.select(".mouse-line")
    .style("opacity", "1");
    d3.selectAll(".mouse-per-line circle")
    .style("opacity", "1");
    d3.selectAll(".mouse-per-line text")
    .style("opacity", "1");
    })
    
// Hier wordt de beweging van de muis over de canvas opgenomen
.on('mousemove', function() { 
    var mouse = d3.mouse(this);
    
    // Zwarte lijn
    d3.select(".mouse-line")
    .attr("d", function() {
        var d = "M" + mouse[0] + "," + height;
        d += " " + mouse[0] + "," + 0;
        return d;
    });

// Hier wordt gekeken naar de locatie van de gehoverde muis over het canvas, waarna er gekeken welke waardes de lijnen bevatten
    d3.selectAll(".mouse-per-line")
        .attr("transform", function (d, i) {            
                var positionCursorX = mouse[0] - 75;
                var xDate = x.invert(positionCursorX),
                bisect = d3.bisector(function (d) {
                    return d.bedrijven;
                }).right;
                idx = bisect(d.values, xDate);
                var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

                while (true){
                    target = Math.floor((beginning + end) / 2);
                    pos = lines[i].getPointAtLength(target);
                    if ((target === end || target === beginning) && pos.x !== positionCursorX) {
                        break;
                    }
                    if (pos.x > positionCursorX) { 
                        end = target
                    } else if (pos.x < positionCursorX) { 
                        beginning = target;
                    } else {
                        break;
                    }
                }

                d3.select(this).select('text')
                    .text(y.invert(pos.y).toFixed(2));

                return "translate(" + mouse[0] + "," + pos.y +")";

            });
    });
});

function type(d, _, columns) {
    d.datum = parseTime(d.datum);
    for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
    return d;
}

