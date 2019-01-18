const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');
const Scan = require('../models/Scans');
const Vehicle = require('../models/Vehicle');

const AccountController = {
  
  getBetaProfile: async (req, res) => {
    let data = req.body;
    try {
      let profle = await BetaSignUp.getBetaProfile(req.params.id);
      res.status(200).send(profle);
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  createDriver: async (req, res) => {
    let data = req.body;
    try {
      let driver =  await Driver.createDriver(data);
      res.status(200).send(driver);
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getDrivers: async (req, res) => {
    try {
      let drivers = await Driver.getDrivers();
      res.status(200).send(drivers);
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getDriver: async (req, res) => {
    let driverId = req.params.id;
    let driver;

    try {
      driver = await Driver.getDriver(driverId);
      if(!Boolean(driver)){
        driver = await Driver.getDriverByName(driverId)
      };
      if(!Boolean(driver)){
        res.status(401).send('User not found');
      }  else {
        res.status(200).send(driver);
      }
      
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  updateDriver: async (req, res) => {
    let driver = req.body;
    let id = req.params.id;
    try {
      let updatedDriver = await Driver.updateDriver(id, driver)
      res.status(200).send(updatedDriver);
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  deleteDriver: async (req, res) => {
    try {
      let result = await Driver.deleteDriver(req.params.id);
      res.status(200).send(result);

    } catch (error) {
      res.status(500).send('Unknown Server Error');
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
    let id = req.params.id;
    let driverId = vehicle.driverId;
    try {
      let driver = await Driver.driverExists(driverId);
      if(driver){
        if(vehicle) {
          let newvehicle = await Vehicle.updateVehicle(id, vehicle);
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
  app.get('/accountSettings/user/:username', AccountController.getDriver);

  // calls for vehicle management
  app.post('/accountSettings/vehicle', AccountController.createVehicle);
  app.put('/accountSettings/vehicle/:id', AccountController.updateVehicle);
  app.get('/accountSettings/vehicle', AccountController.getVehicle);
  app.get('/accountSettings/vehicle/:vehicleId', AccountController.getVehicle);

}
