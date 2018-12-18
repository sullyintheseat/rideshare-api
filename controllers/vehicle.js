const Vehicle = require('../models/Vehicle');


const VehicleController = {

  test: async(req, res) => {
    res.send('test vehicle');
  },
  
  createVehicle: async(req, res) => {
    let vehicle = req.body;
    try {
      if(vehicle) {
        let newvehicle = await Vehicle.createVehicle(vehicle);
        res.status(200).send(newvehicle);
      } else {
        res.status(401).send('Incomplete data');
      }
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  }
}

module.exports.Controller = VehicleController;
module.exports.controller = (app) => {
  app.get('/vehicle', VehicleController.test);
}
