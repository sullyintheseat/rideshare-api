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
     

      let parsed = JSON.parse(body);
      let min = [];
      for(let i = 0; i < parsed.events.length; i++) {
        let evt = parsed.events[i];
        let t = {};
        if(evt.logo != null) {
          t.id = evt.id;
          t.url = evt.url;
          t.name = evt.name;
          t.description = evt.description;
          t.url = evt.url;
          t.start = evt.start;
          t.end = evt.end;
          t.venue = evt.venue;
          t.logo = evt.logo;
          min.push(t);
        }
      }
      res.status(200).send(min)
    });
  }
}

module.exports.Controller = IndexController;
module.exports.controller = (app) => {
  app.get('/alldrivers', IndexController.getallDrivers);
  app.get('/v1/events/:city', IndexController.getEvents);
}
