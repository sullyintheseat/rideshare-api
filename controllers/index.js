const Driver = require('../models/Driver');

const IndexController = {

  test: async(req, res) => {
    res.send('test');
  },

  getallDrivers: async (req, res) => {
    try{ 
      let result = await Driver.getDrivers();
      let str = "";
      for (let i = 0; i < result.length; i++){
        str+= result[i].firstName + ',' +result[i].lastName + ',' +result[i].email + ',' + result[i].phone + + ',' + result[i].address  + ',' + result[i].address_2  + ',' + result[i].city  + ',' + result[i].state  + ',' + result[i].zip  + ',' + result[i].pickupMethod +'\n';
      }
      res.type('txt').send(str).status(200);
    } catch(err) { 
      res.status(500).send('Unknown server error');

    }
  }
}

module.exports.Controller = IndexController;
module.exports.controller = (app) => {
  app.get('/', IndexController.test);
  app.get('/alldrivers', IndexController.getallDrivers);
}
