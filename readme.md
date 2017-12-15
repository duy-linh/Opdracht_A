# Opdracht A!

## Achtergrond

Dit was een individuele opdracht voor het project Information Design, waarbij we een datavisualisatie hebben moeten maken, waaruit je drie verschillende inzichten (bijv. wie, waar, wanneer, hoe, wat, wie, waarom of meerdere combinaties daarvan) kan opdoen. De grafieken zijn geprogrammeerd in d3.

## Proces

Het eerste wat ik heb moeten doen was zoeken naar een nieuwe dataset, mijn oude dataset die ik voor Data for Research heb gebruikt was niet meer bruikbaar/interessant. In het begin worstelde ik voornamelijk met het zoeken naar een interessante dataset die met mijn onderwerp te maken had. Na verdere onderzoek over mijn onderwerp en een coachmoment met Laurens, ben ik de goede richting opgeholpen. Na het vinden van de juiste datasets, ben ik gaan kijken wat ik wil vertellen met de dataset en hoe ik dat precies zou gaan visualiseren. Na een aantal schetsen heb ik gekozen voor de Multi-Series Line Chart van `Mike Bostock's Multi-Series Line Chart November 5, 2017 https://bl.ocks.org/mbostock/3884955`. De Multi-Series Line Chart past goed bij mijn dataset over: 'Aantal hokdierbedrijven', omdat de grafiek meerdere lijnen weergeeft over een bepaalde periode. De grafiek geeft een goed beeld van mijn visuele boodschap die ik wil overbrengen, namelijk dat het aantal kleine bedrijven afneemt en grote bedrijven toeneemt. Verder heb ik ook gekozen voor `Mike Bostock's Stacked Bar Chart October 27, 2017 https://bl.ocks.org/mbostock/3886208`. De Stacked Bar Chart past goed bij mijn dataset over: 'Aantal hokdieren', omdat de grafiek meerdere categorieën kan weergeven per periode. Voor de dataset over 'Aantal cultuurgrond' heb ik weer gekozen voor de Multi-Series Line Chart. Na het vinden van de juiste grafieken ben ik gaan zoeken hoe ik een tooltip kon toevoegen aan de grafieken. Voor de Multi-Line Chart heb ik gekeken naar de code van `Larsenmtl's d3 mouseover multi-line chart June 19, 2016 https://bl.ocks.org/mbostock/3886208`, en voor de Stacked Bar Chart heb ik gekeken naar de code van `Mike Foster's D3js v4 Stacked Bar Chart - with Tooltip Hover March 24, 2017 https://bl.ocks.org/mbostock/3886208`

Na het kiezen van de grafieksvormen, ben ik de data gaan inladen. Ik heb de data overgetypt van CSV naar TSV, dit heb ik gedaan in Excel. Ik heb dus geen data gecleaned in verband met tijdsgebrek. 

Vervolgens heb ik het een en ander aangepast aan de code van Mike Bostock. Als laatst heb alles nog gestyled met CSS. De aanpassingen zijn te lezen in de onderstaande blok.

## Aanpassingen

### index.html, graph.html, graph2.html, graph3.html en end.html
* Content
* Pagina's, Javascript en CSS gelinked
* Afbeelding toegevoegd aan intro.html en end.html

### graph.js en graph3.js - grafiek over hokdierbedrijven en cultuurgrond
* Mike Bostock's Multi-Series Line Chart November 5, 2017 (https://bl.ocks.org/mbostock/3884955)

* Ik heb de parseTime aangepast naar slechts enkel jaren.

Eerst:
``` javascript
var parseTime = d3.timeParse("%Y%m%d");
```

Aangepast:
``` javascript
var parseTime = d3.timeParse("%Y");
```



* De kleuren aangepast naar een visueel aantrekkelijker kleurpalet

Eerst: 
``` javascript
z = d3.scaleOrdinal(d3.schemeCategory10);
```

Aangepast: 
``` javascript
z = d3.scaleOrdinal(d3.schemeCategory20b);
```



* Benamingen aangepast over het hele JS document

Eerst: 
``` javascript
var line = d3.line()
.curve(d3.curveBasis)
.x(function(d) { return x(d.date); })
.y(function(d) { return y(d.temperature); });
```
Aangepast:
``` javascript
var line = d3.line()
.curve(d3.curveBasis)
.x(function(d) { return x(d.datum); })
.y(function(d) { return y(d.bedrijven); });
```



* Aan de x-as tekst toegevoegd

Eerst: 
``` javascript
g.append("g")
.attr("class", "axis axis--x")
.attr("transform", "translate(0," + height + ")")
.call(d3.axisBottom(x));
```

Aangepast: 
``` javascript
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
```



* De tekst aan de y-as aangepast

Eerst: 
``` javascript
g.append("g")
.attr("class", "axis axis--y")
.call(d3.axisLeft(y))
.append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", "0.71em")
.attr("fill", "#000")
.text("Temperature, ºF");
```

Aangepast:
``` javascript
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
```



* De grootte van de cirkels aangepast

Eerst: 
``` javascript
mousePerLine.append("circle")
.attr("r", 7)
```

Aangepast:
``` javascript
mousePerLine.append("circle")
.attr("r", 4)
```



* Canvas van rect verplaats

Eerst: 
``` javascript
mouseG.append('svg:rect')
.attr('width', width)
.attr('height', height)
.attr('fill', 'none')
.attr('pointer-events', 'all')
```

Aangepast:
``` javascript
mouseG.append('svg:rect')
.attr('x', 75)
.attr('y', 0)
.attr('width', width)
.attr('height', height)
.attr('fill', 'none')
.attr('pointer-events', 'all')
```

Eerst: 
``` javascript
var mouseG = svg.append("g")
.attr("class", "mouse-over-effects"); 
```

Aangepast:
``` javascript
var mouseG = svg.append("g")
.attr("class", "mouse-over-effects")
.attr("transform", "translate(0, 50)"); 
```

### graph2.js - grafiek over hokdieren
* Mike Bostock's Stacked Bar Chart October 27, 2017 (https://bl.ocks.org/mbostock/3886208)

* Padding tussen de barren aangepast

Eerst: 
``` javascript
var x = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.5)
.align(0.5);
```

Aangepast:
``` javascript
var x = d3.scaleBand()
.rangeRound([0, width])
.paddingInner(0.1)
.align(0.5);
```



* Kleuren van barren aangepast

Eerst: 
``` javascript
var z = d3.scaleOrdinal()
.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
```

Aangepast:
``` javascript
z = d3.scaleOrdinal(d3.schemeCategory20b);
```



* Code verwijderd dat de barren sorteerd

Code dat is verwijderd: 
``` javascript
data.sort(function(a, b) { return b.total - a.total; });
```

### index.css
* CSS reset toegevoegd
* Verandering van button bij :hover
* Transitie in :hover
* Alle pagina's gestyled

## Data

De datasets die ik heb gebruikt zijn: 

Dataset 1: (http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80785ned&D1=0&D2=a&D3=30&D4=a&HDR=T,G3&STB=G2,G1&CHARTTYPE=1&VW=T).

Er worden drie data types gebruikt in dataset 1:

* `Datum` - weergeeft de datum op de x-as.
* `Aantal bedrijven` - weergeeft het aantal hokdierbedrijven, op de y-as.
* `SO klasse` - weergeeft economische omvangsklasse per lijn.


Dataset 2: (http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80783ned&D1=120-133&D2=5&D3=0&D4=a&HDR=G2&STB=T%2cG1%2cG3&VW=T).

Er worden twee data types gebruikt in dataset 2:

* `Datum` - weergeeft de datum op de x-as.
* `Aantal dieren` - weergeeft het aantal hokdieren, op de y-as.

Dataset 3: (http://statline.cbs.nl/Statweb/publication/?DM=SLNL&PA=80785ned&D1=2&D2=a&D3=30&D4=a&HDR=T&STB=G2%2cG1%2cG3&CHARTTYPE=1&VW=T).

Er worden drie data types gebruikt in dataset 3:

* `Datum` - weergeeft de datum op de x-as.
* `Aantal cultuurgrond` - weergeeft het aantal cultuurgrond, op de y-as.
* `SO klasse` - weergeeft economische omvangsklasse per lijn.

## Licentie

GPL-3.0 © Duy-Linh Pham