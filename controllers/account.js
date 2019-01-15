const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');
const Scan = require('../models/Scans');

const AccountController = {
  
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
      let invalidated = await Driver.deleteDriver(req.params.id);

    } catch (error) {
      res.status(500).send('Unkownn Server Error');
    }
  }
}

module.exports.Controller = AccountController;
module.exports.controller = (app) => {

  app.post('/accountSettings/user', AccountController.createDriver);
  app.get('/accountSettings/user/:id', AccountController.getDriver);
  app.get('/accountSettings/users', AccountController.getDrivers);
  app.put('/accountSettings/user/:id', AccountController.updateDriver);
  app.delete('/accountSettings/user/:id', AccountController.deleteDriver);

}
