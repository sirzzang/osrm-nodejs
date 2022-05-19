process.env.UV_THREADPOOL_SIZE = Math.ceil(require('os').cpus().length * 1.5);

// import modules
const express = require("express");
const OSRM = require("../lib/index")
const path = require("path");

// middleware settings
const app = express();

// OSRM instance
const osrm = new OSRM(
    {
        path: path.join(__dirname, "../data/south-korea-latest.osrm"),
        algorithm: "MLD"
    }
);

/**
 * GET /route/duration api
 * 
 * Accepts a query like:
 * http://localhost:9999/route/duration?from=126.485927,37.491975&to=126.508846,37.490757
 */
app.get("/route/duration", (req, res) => {

    // bad request query
    if (!req.query.from || !req.query.to) {
        return res.json(
            {
                "error": "invalid query"
            }
        );
    }

    // query coordinates: [[13.43864,52.51993],[13.415852,52.513191]]
    const coordinates = []
    coordinates.push(req.query.from.split(',').map(e => Number(e)));
    coordinates.push(req.query.to.split(',').map(e => Number(e)));

    // query parameters
    const query = {
        coordinates: coordinates,
        alternateRoute: req.query.alternatives !== 'false',
        steps: req.query.steps != 'false',
        annotaions: 'false',
        overview: 'false'
    }

    // call route function
    osrm.route(query, (err, result) => {
        
        if (err) {
            return res.json(
                {
                    "error": err.message
                }
            );
        }

        console.log('success!', res);
        return res.json(result);
    })


})

console.log('Server listening on port: ' + 9999);
app.listen(9999);

process.on('SIGINT', () => {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    process.exit();
  });