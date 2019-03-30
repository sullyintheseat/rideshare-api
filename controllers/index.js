const Driver = require('../models/Driver');
const request = require('request');

const IndexController = {

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
  },
  getEvents: async (req, res) => {
    let city = req.params.city;
    let result = await request({
      method: 'GET',
      url: `${process.env.EVENTBRITE_URL}/events/search?location.address=${city}&location.within=10km&start_date.range_end=2019-04-07T00:00:01Z&expand=venue`,
      headers: {
        'Authorization': `Bearer ${process.env.EVENTBRITE_TOKEN}`,
        'Content-Type': 'application/json'
      }}, function (error, response, body) {
      console.log('Status:', response.statusCode);
      res.status(200).send(JSON.parse(body))
    });
  }
}

module.exports.Controller = IndexController;
module.exports.controller = (app) => {
  app.get('/alldrivers', IndexController.getallDrivers);
  app.get('/v1/events/:city', IndexController.getEvents);
}
