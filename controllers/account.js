const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');
const Scan = require('../models/Scans');
const Vehicle = require('../models/Vehicle');

const AccountController = {
  
  getBetaProfile: async (req, res) => {
    let data = req.body;
    try {
      return await BetaSignUp.getBetaProfile(req.params.id);
    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  },

  createDriver: async (req, res) => {
    let data = req.body;
    try {
      return await Driver.createDriver(data);
    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  },

  getDrivers: async (req, res) => {
    try {
      let drivers = await Driver.getDrivers();
      res.status(200).send(drivers);
    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  },

  getDriver: async (req, res) => {
    try {
      let driver = await Driver.getDriver(req.params.id);
      res.status(200).send(driver);
    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  },

  updateDriver: async (req, res) => {
    let driver = req.body;
    try {
      let updatedDriver = await Driver.updateDriver(driver)
      res.status(200).send(updatedDriver);
    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  },

  deleteDriver: async (req, res) => {
    try {
      await Driver.deleteDriver(req.params.id);
      res.status(200).send('It sleeps with the fishes');

    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  },

  createVehicle: async(req, res) => {
    let vehicle = req.body;
    let driverId = vehicle.driverId;
    try {
      let driver = await Driver.driverExists(driverId);
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
      res.status(500).send('Unknown server error');
    }
  },

  updateVehicle: async(req, res) => {
    let vehicle = req.body;
    let driverId = vehicle.driverId;
    try {
      let driver = await Driver.driverExists(driverId);
      if(driver){
        if(vehicle) {
          let newvehicle = await Vehicle.updateVehicle(vehicle);
          res.status(200).send(newvehicle);
        } else {
          res.status(401).send('Incomplete data');
        }
      } else {
        res.status(400).send('Driver does not exist');
      }
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  },

  getVehicle: async(req, res) => {
    try {
     let result = await Vehicle.getVehicle();
     res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  }
}

module.exports.Controller = AccountController;
module.exports.controller = (app) => {

  // call for beta signup profile data.
  app.get('/code/:id', AccountController.getBetaProfile);
  // calls for user account settings
  app.post('/accountSettings/user', AccountController.createDriver);
  app.get('/accountSettings/user/:id', AccountController.getDriver);
  app.get('/accountSettings/users', AccountController.getDrivers);
  app.put('/accountSettings/user/:id', AccountController.updateDriver);
  app.delete('/accountSettings/user/:id', AccountController.deleteDriver);
  // calls for vehicle management
  app.post('/accountSettings/vehicle', AccountController.createVehicle);
  app.put('/accountSettings/vehicle', AccountController.updateVehicle);
  app.get('/accountSettings/vehicle', AccountController.getVehicle);
  app.get('/accountSettings/vehicle/:vehicleId', AccountController.getVehicle);

}
