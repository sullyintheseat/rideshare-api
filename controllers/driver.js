const Driver = require('../models/Driver');

const DriverController = {

  test: async(req, res) => {
    res.send('test driver');
  },
  
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
  }
 
}

module.exports.Controller = DriverController;
module.exports.controller = (app) => {
  app.get('/driver', DriverController.test);
  app.post('/driver', DriverController.createUser);
}
