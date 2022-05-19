const express = require("express");
const router = express.Router();

// controller, service
const RouteController = require("../controllers/routeController");
const routeService = require("../services/routeService");

// wire service to controller
const routeController = new RouteController(routeService);

router.get("/duration/walking", (req, res) => {
  try {
    console.log("request params", req.params);
    console.log("request query", req.query);
    console.log("request body", req.body);

    // controller calls service
    const result = routeController.getRoute(req);
    console.log("result in router", result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
