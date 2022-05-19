const express = require("express");
const router = express.Router();

const routeRouter = require("./routeRouter");

// base routers
router.use("/route", routeRouter);

// index
router.get("/", (_, res) => {
  res.send("WAPL Pay Address Service");
});

module.exports = router;
