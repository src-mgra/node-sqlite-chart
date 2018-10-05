/**** 
cmd: node showChart.js
URLs: 
http://localhost:3005
****/

const fs = require('fs');
var express = require('express');
var app = express();
var path = require('path');
var Chart = require('chart.js');
var result =[3,6,9];

app.get('/', function(req, res){
    let _resLine = '<h1>Ereignisse: ' + result+'</h1>';
    console.log('show chart:');
    console.log(_resLine);

    _html = "<script src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js'></script>"+
    "<canvas id='bar-chart' width='800' height='450'></canvas>"+
    "<script>"+
    "var logChart = new Chart(document.getElementById('bar-chart'), {"+
    "type: 'horizontalBar',"+
    "data: {"+
      "labels: ['Ereignis1', 'Ereignis2', 'Ereignis3'],"+
      "datasets: ["+
        "{"+
          "label: 'Aufrufe',"+
          "backgroundColor: ['#3e95cd', '#8e5ea2','#3cba9f'],"+
          "data: ["+result[0]+","+result[1]+","+result[2]+"]"+
        "}"+
      "]"+
      "},"+
    "options: {"+
      "legend: { display: false },"+
      "title: {"+
        "display: true,"+
        "text: 'Ereignisse '"+
      "}"+
    "}"+
    "});"+
    "</script>";

    res.send(_html);
});

app.listen(3005);
