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
      res.status(500).send('Unknown Server Response');
    }
  },

  getDriver: async(req, res) => {
    let id = req.params.id;
    try{
      
      let result;
      if(Boolean(id)){
        result = await Driver.getDriver({_id: id})
      } else {
        result = await Driver.getDrivers();
      }
      res.status(200).send(result);
    } catch (err) {
      console.log(err)
      res.status(500).send('Unknown Server Response');
    }
  },

  driverByTag: async(req, res) => {
    let id = req.params.id;
    try{
      
      let result;
      if(Boolean(id)){
        result = await Driver.getDriver({driverId: id})
      } else {
        result = await Driver.getDrivers();
      }
      res.status(200).send(result);
    } catch (err) {
      console.log(err)
      res.status(500).send('Unknown Server Response');
    }
  },

  getDriverFull: async(req, res) => {
    let driverId = req.params;
    let result;
    try{
      if(driverId !== null || driverId !== undefined){
        result = await Driver.getDriverProfile({_id:driverId});
      } else {
        res.status(200).send('Missing driver information');
      }
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Response');
    }
  },

  deleteDriver: async (req, res) => {
    try {
      return await Driver.deleteDriver(req.params.id);
    } catch (err) {
      res.status(500).send('Unknown Server Response');
    }
  }
 
}

module.exports.Controller = DriverController;
module.exports.controller = (app) => {
  app.post('/driver', DriverController.createUser);
  app.get('/driver', DriverController.getDriver);
  app.get('/driver/:id', DriverController.getDriver);
  app.get('/tag/:id', DriverController.driverByTag);
  
  //administration or driver personal call
  app.get('/driver/:driverId/full', DriverController.getDriverFull);
  app.delete('/driver/:id', DriverController.deleteDriver);
}
