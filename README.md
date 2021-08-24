## Set Up

`npm i && npm start`

`npm start`

# An example using React, D3 and geojson

This example provides some basic interactivity between a d3 map visualization and a Recharts BarChart.

![app](https://user-images.githubusercontent.com/85582986/130655604-25cd3e7e-064a-4943-8a36-a6df4810c089.png)

Hover over an area in the map to see the neighborhood name and number of incidents.
![hover](https://user-images.githubusercontent.com/85582986/130655701-fb1cd695-a5a3-44cb-8240-16083c4986bd.png)
Clicking on an area will expand the area and filter the year chart by the selected neighborhood.
![map click](https://user-images.githubusercontent.com/85582986/130655891-0cbe6826-d010-46f1-b3db-caacd904ab34.png)
Clicking a bar in the year chart will filter the map incidents by year. This will redraw the map and highlight the areas by number of incidents.
![bar click all areas](https://user-images.githubusercontent.com/85582986/130656371-7284e5ae-3398-46fe-be3e-ce00e06f9a8b.png)

