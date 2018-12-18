const Vehicle = require('../models/Vehicle');
const Driver = require('../models/Driver');

const VehicleController = {
  
  createVehicle: async(req, res) => {
    let vehicle = req.body;
    try {
      let driver = await Driver.driverExists(vehicle.driverId);
      if(driver){
        if(vehicle) {
          let newvehicle = await Vehicle.createVehicle(vehicle);
          res.status(200).send(newvehicle);
        } else {
          res.status(401).send('Incomplete data');
        }
      } else {
        res.status(400).send('Driver does not exist');
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Unknown server error');
    }
  },

  getVehicle: async(req, res) => {

  }
}

module.exports.Controller = VehicleController;
module.exports.controller = (app) => {
  app.post('/vehicle', VehicleController.createVehicle);
  app.get('/vehicle', VehicleController.getVehicle);
  app.get('/vehicle/:vehicleId', VehicleController.getVehicle);
}
