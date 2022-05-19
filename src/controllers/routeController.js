class RouteController {
  constructor(routeService) {
    this.routeService = routeService;
  }

  getRoute = (req) => {
    console.log("controller getRoute called");
    const { from, to } = req.query;
    return this.routeService.getRoute(from, to);
  };
}

module.exports = RouteController;
