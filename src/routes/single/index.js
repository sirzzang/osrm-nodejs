const express = require("express");
const router = express.Router();

const OSRM = require("../../../lib/index");
const path = require("path");

// OSRM instance
const osrm = new OSRM({
  path: path.join(__dirname, "../../../data/south-korea-latest.osrm"),
  algorithm: "MLD",
});

// single route API
router.get("/duration/walking", (req, res) => {
  const { from, to } = req.query;

  const coordinates = [];
  coordinates.push(from.split(",").map((e) => Number(e)));
  coordinates.push(to.split(",").map((e) => Number(e)));

  const query = {
    coordinates: coordinates,
    alternateRoute: false,
    steps: false,
    generate_hints: false,
  };

  try {
    osrm.route(query, (err, result) => {
      if (err) {
        console.log("here", Object.getOwnProperty가Names(err));
        return res.status(422).json({ error: err });
      }
      return res.json(result);
    });
  } catch (e) {
    // 왜 err에서 안 잡히는가
    return res.status(500).json({ error: e.message });
  }
});

module.exports = router;
