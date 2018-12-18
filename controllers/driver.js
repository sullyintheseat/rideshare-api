const Driver = require('../models/Driver');

const DriverController = {


  createUser: async(req, res) => {
    let driver = req.body;
    try {
      if(driver) {
        let user = await Driver.createItem(driver)
        res.status(200).send(user);
      } else {
        res.status(400).send('Incomplete data');
      }
    } catch (err) {
      console.log(err)
      res.status(500).send('Unknown Server Response');
    }
  },

  getDriver: async(req, res) => {
    let driverId = req.params;
    let result;
    try{
      if(driverId !== null || driverId !== undefined){
        result = await Driver.getItem(driverId)
      } else {
        result = await Driver.getItems();
      }
      res.status(200).send(result);
    } catch (err) {
      console.log(err)
      res.status(500).send('Unknown Server Response');
    }
  },

  getDriverFull: async(req, res) => {
    let driverId = req.params.driverId;
    let result;
    try{
      if(driverId !== null || driverId !== undefined){
        result = await Driver.getDriverProfile(driverId);
      } else {
        res.status(200).send('Missing driver information');
      }
      res.status(200).send(result);
    } catch (err) {
      console.log(err)
      res.status(500).send('Unknown Server Response');
    }
  }
 
}

module.exports.Controller = DriverController;
module.exports.controller = (app) => {
  app.post('/driver', DriverController.createUser);
  app.get('/driver', DriverController.getDriver);
  app.get('/driver/:driverId', DriverController.getDriver);
  app.get('/driver/:driverId/full', DriverController.getDriverFull);
}
