process.env.UV_THREADPOOL_SIZE = Math.ceil(require('os').cpus().length * 1.5);

var express = require('express');
var OSRM = require('../lib/index');
var path = require('path');

var app = express();
// var osrm = new OSRM(path.join(__dirname,"../test/data/ch/monaco.osrm"));
// var osrm = new OSRM(path.join(__dirname, "../data/south-korea-latest.osrm"));
// var osrm = new OSRM("/home/eraser/projects/osrm-backend/data/south-korea-latest.osrm");
var osrm = new OSRM(
    {
        // path: '/home/eraser/projects/node-osrm/data/south-korea-latest.osrm',
        path: path.join(__dirname, "../data/south-korea-latest.osrm"),
        algorithm: 'MLD'
    }
);

// Accepts a query like:
// http://localhost:8888?start=13.414307,52.521835&end=13.402290,52.523728
// 126.485927,37.491975;126.508846,37.490757
app.get('/', function(req, res) {
    if (!req.query.start || !req.query.end) {
        return res.json({"error":"invalid start and end query"});
    }
    var coordinates = [];
    var start = req.query.start.split(',');
    coordinates.push([+start[0],+start[1]]);
    var end = req.query.end.split(',');
    coordinates.push([+end[0],+end[1]]);
    var query = {
        coordinates: coordinates,
        alternateRoute: req.query.alternatives !== 'false'
    };
    osrm.route(query, function(err, result) {
        if (err) return res.json({"error":err.message});
        console.log("success!!!!", res.result);
        return res.json(result);
    });
});

console.log('Listening on port: ' + 9999);
app.listen(9999);



process.on('SIGINT', () => {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit(0);
  });