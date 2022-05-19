const OSRM = require("../../lib/index");
const path = require("path");

// OSRM instance
const osrm = new OSRM({
  path: path.join(__dirname, "../../data/south-korea-latest.osrm"),
  algorithm: "MLD",
});

// get route between two points
const getRoute = (from, to) => {
  console.log("service getRoute called");
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
        console.log(err);
        throw err;
      }
      console.log("result in service", result);
      return result;
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  getRoute,
};
