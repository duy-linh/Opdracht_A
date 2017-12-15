/* Gebaseerd op Mike Bostock's Stacked Bar Chart October 27, 2017 https://bl.ocks.org/mbostock/3886208. Aantal aanpassingen zijn gedaan door mij, deze zullen aangegeven worden met een comment, daarnaast zal het ook aangegeven worden in de readme.md */

/* Link naar de dataset http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80783ned&D1=120-133&D2=5&D3=0&D4=a&HDR=G2&STB=T%2cG1%2cG3&VW=T */

// Hier wordt een een variable svg gemaakt, vervolgens worden er margins toegevoegd aan het canvas van de svg.
var svg = d3.select("svg"),
margin = {top: 50, right:175, bottom: 50, left: 75},
    width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Hier wordt de bar gecalculeerd, zodat het in een passende manier wordt geplaatst. https://medium.com/@mbostock/introducing-d3-scale-61980c51545f
var x = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.1)
.align(0.5);

var y = d3.scaleLinear()
.rangeRound([height, 0]);

z = d3.scaleOrdinal(d3.schemeCategory20b);

// Hier wordt de data ingeladen
d3.csv("data2.csv", function(d, i, columns) {
for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
d.total = t;
return d;
}, function(error, data) {
if (error) throw error;

// Hier worden de benamingen van diersoorten in opgeslagen
var keys = data.columns.slice(1);

// Hier wordt alle data gepakt, waarna er een passende schaal wordt gemaakt 'domain/range'
x.domain(data.map(function(d) { return d.State; }));
y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
z.domain(keys);


g.append("g")
    .selectAll("g")
    .data(d3.stack().keys(keys)(data))
    .enter().append("g")
    .attr("fill", function(d) { return z(d.key); })
    .selectAll("rect")
    .data(function(d) { return d; })
    .enter().append("rect")
    .attr("x", function(d) { return x(d.data.State); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })
    .attr("width", x.bandwidth())
    
    
    
/* Tooltip Stacked Bar Chart van Mike Foster's March 24, 2017: https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0 */
    
// In deze functie zal de tooltip zichtbaar worden wanneer er gehoverd wordt met de muis
    .on("mouseover", function () {
    tooltip.style("display", null);
    })
    
// In deze functie zal de tooltip ozichtbaar worden wanneer er niet gehoverd wordt met de muis
    .on("mouseout", function () {
    tooltip.style("display", "none");
    })
    
// Hier wordt de beweging van de muis over de canvas opgenomen
    .on("mousemove", function (d) {
    console.log(d);
    var xPosition = d3.mouse(this)[0] - 5;
    var yPosition = d3.mouse(this)[1] - 5;
    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
    tooltip.select("text").text(d[1] - d[0])});

    
    
    
// Hier worden verschillende attributes aan de x-as gegeven
g.append("g")
.attr("class", "axis")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x))
.append("text")
.attr("x", 470)
.attr("y", 30)
.attr("dy", "0.71em")
.attr("fill", "#000")
.text("Jaren");

// Hier worden verschillende attributes aan de x-as gegeven
g.append("g")
.attr("class", "axis")
.call(d3.axisLeft(y))
.append("text")
.attr("x", -5)
.attr("y", -25)
.attr("dy", "0.71em")
.attr("fill", "#000")
.text("Aantal dieren");

// Hier wordt een variabele gemaakt met een groep voor de legenda
var legend = g.append("g")
.attr("font-family", "sans-serif")
.attr("font-size", 10)
.attr("text-anchor", "end")
.selectAll("g")
.data(keys.slice().reverse())
.enter().append("g")
.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

// Hier wordt een vierkant gemaakt met de bijhorende kleur voor de legenda
legend.append("rect")
.attr("x", width - -105)
.attr("width", 19)
.attr("height", 19)
.attr("fill", z);

// Hier wordt tekst toegevoegd bij de bijhorende vierkant voor de legenda
legend.append("text")
.attr("x", width - -100)
.attr("y", 9.5)
.attr("dy", "0.32em")
.text(function(d) { return d; });
});



/* Tooltip Stacked Bar Chart van Mike Foster's March 24, 2017: https://bl.ocks.org/mjfoster83/7c9bdfd714ab2f2e39dd5c09057a55a0 */

// Hier wordt de breedte, hoogte, fill en font-size bepaald voor de tooltip als je over de grafiek hovert
var tooltip = svg.append("g")
    .attr("class", "tooltip")
    .style("display", "none");

// Hier wordt de blok gemaakt achter de tekst
tooltip.append("rect")
    .attr("width", 70)
    .attr("height", 20)
    .attr("fill", "white")

// Hier wordt de tekst gemaakt
tooltip.append("text")
    .attr("x", 35)
    .attr("dy", "1.2em")
    .style("text-anchor", "middle")
    .attr("font-size", "12px")
.attr("font-weight", "bold");

