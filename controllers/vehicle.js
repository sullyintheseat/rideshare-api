const VehicleController = {

  test: async(req, res) => {
    res.send('test vehicle');
  }
 
}

module.exports.Controller = VehicleController;
module.exports.controller = (app) => {
  app.get('/vehicle', VehicleController.test);
}
