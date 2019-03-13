const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');
const Scan = require('../models/Scans');
const Vehicle = require('../models/Vehicle');
const User = require('../models/User');

const passport = require('passport');
const verifyAuth = require('../passport/auth').verifyAuth(passport);

const AccountController = {
  
  getBetaProfile: async (req, res) => {
    
    let id = req.params.id;
    try {
      let result =  await BetaSignUp.getBetaProfile(id);
      if(Boolean(result)) {
        res.status(200).send(result);
      } else {
        res.status(400).send('User not found');
      }
    } catch (err) {
      res.status(500).send('big error');
    }
    
  },

  createDriver: async (req, res) => {
    let data = req.body;
    try {
      let driver = await Driver.createDriver(data);
      if(!driver) {
        res.status(401).send('Duplicate Data');
      } else {
        res.status(200).send(driver);
      }
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
      driver = await Driver.getDriverProfile(driverId);
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

  getDriverByEmail: async (req, res) => {
    let driverId = req.params.id;
    let driver;

    try {
      driver = await Driver.getDriverProfileByEmail(driverId);
      
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
  },

  getDriversVehicles: async(req, res) => {
    try {
      let result = await Vehicle.getVehicleWithDriver(req.params.id);
      res.status(200).send(result);
     } catch (err) {
       res.status(500).send('Unknown server error');
     }
  },

  signup: async (req, res, next) => {
    passport.authenticate('local-signup', { session: false }, async (err, user, info) => {
      if (user) {
        res.status(200).send(user);
      } else if (info && info.message) {
        res.status(401).send(info.message);
      } else if (err) {
        res.status(401).send(err);
      } else {
       res.status(500).send('Unknown server error');
      }
    })(req, res, next);
  },

  login: async (req, res, next) => {
    passport.authenticate('local-login', { session: false }, (err, user, info) => {
      if (user) {
        res.header('token', user.token);
        res.status(200).send(user);
      } else if (info && info.message) {
        res.status(401).send(info.message);
      } else {
        res.status(500).send('Unknown server error');
      }
    })(req, res, next);
  },

  getDriverByAccount: async (req, res) => {
    let driverId = req.params.id;
    let driver;
    let user;

    try {
      user = await User.getById(driverId);

      if(!Boolean(user)){
        res.status(401).send('User not found');
      }  else {
        driver = await Driver.getDriverByEmail(user.email);
        res.status(200).send(driver);
      }
      
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  updateDriverPrivate: async(req, res) =>{
    let update = req.body;
    let did = req.user.email;
    try {      
      let driver = await Driver.getDriverByEmail(did);
      let updatedDriver = await Driver.updateDriver(driver._id, update)
      res.status(200).send(updatedDriver);
    } catch (error) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getPrivateDriver: async (req, res) => {
    let did = req.user.email
    try {
      let driver = await Driver.getDriverByEmail(did);
      res.status(200).send(driver);
    } catch(err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  changeDriverPassword: async (req, res) => {
    try{
      let user = await User.verifyUser(req.user.email, req.body.oldPassword);

      if(Boolean(user)){
        let update = await User.updateUserPassword(req.user._id, {password: req.body.newPassword});
        if(Boolean(update)){
          res.status(200).send('Success');
        } else {
          res.status(401).send('Failure');
        }
      }

    } catch(err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  validornot: async (req, res) => {
    try{
      res.status(200).send({value:'ok'})
    } catch (err) {
      res.status(401).send({value:'failed'})
    }
  }

} 

module.exports.Controller = AccountController;
module.exports.controller = (app) => {
  // call for beta signup profile data.
  app.get('/amvalid', verifyAuth, AccountController.validornot);
  app.get('/code/:id', AccountController.getBetaProfile);
  // calls for user account settings
  app.post('/accountSettings/user', AccountController.createDriver);
  app.get('/accountSettings/user/:id', AccountController.getDriver);
  app.get('/accountSettings/userfor/:id', AccountController.getDriverByAccount);
  app.get('/accountSettings/user/:id/email', AccountController.getDriverByEmail);
  app.get('/accountSettings/users', AccountController.getDrivers);
  app.put('/accountSettings/user/:id', AccountController.updateDriver);
  app.delete('/accountSettings/user/:id', AccountController.deleteDriver);
  app.get('/accountSettings/user/:username', AccountController.getDriver);
  // Private calls
  app.get('/accountSettings/reguser', verifyAuth, AccountController.getPrivateDriver);
  app.put('/accountSettings/reguser', verifyAuth, AccountController.updateDriverPrivate); 
  app.put('/accountSettings/pass', verifyAuth, AccountController.changeDriverPassword); 
  




  app.get('/accountSettings/user/:id/vehicles', AccountController.getDriversVehicles);
  app.post('/accountSettings/signup', AccountController.signup);
  app.post('/accountSettings/login', AccountController.login);

  // calls for vehicle management
  app.post('/accountSettings/vehicle', AccountController.createVehicle);
  app.put('/accountSettings/vehicle/:id', AccountController.updateVehicle);
  app.get('/accountSettings/vehicle', AccountController.getVehicle);
  app.get('/accountSettings/vehicle/:vehicleId', AccountController.getVehicle);
  app.get('/accountSettings/vehicle/:vehicleId', AccountController.getVehicle);

}
