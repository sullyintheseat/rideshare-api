const request = require('request');
const moment = require('moment');

const EventBriteController = {

  getEvents: async (req, res) => {
    let city = req.params.city;
    let enddate = moment().add(5, 'days').utc().format();
    request({
      method: 'GET',
      url: `${process.env.EVENTBRITE_URL}/events/search?location.address=${city}&location.within=10km&start_date.range_end=${enddate}&expand=venue`,
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
  },

  getEventsAll: async (req, res) => {
    let city = req.params.city;
    let enddate = moment().add(5, 'days').utc().format();
    request({
      method: 'GET',
      url: `${process.env.EVENTBRITE_URL}/events/search?location.address=${city}&location.within=10km&start_date.range_end=${enddate}&expand=venue`,
      headers: {
        'Authorization': `Bearer ${process.env.EVENTBRITE_TOKEN}`,
        'Content-Type': 'application/json'
      }}, function (error, response, body) {
      let parsed = JSON.parse(body);
  
  
      res.status(200).send(parsed)
    });
  },

  getEventBriteCategories: async (req, res) => {
    request({
      method: 'GET',
      url: `${process.env.EVENTBRITE_URL}/categories/`,
      headers: {
        'Authorization': `Bearer ${process.env.EVENTBRITE_TOKEN}`,
        'Content-Type': 'application/json'
      }}, function (error, response, body) {
      let parsed = JSON.parse(body);
  
  
      res.status(200).send(parsed)
    });
  }

}

module.exports.Controller = EventBriteController;
module.exports.controller = (app) => {
  app.get('/v1/eb/events/:city', EventBriteController.getEvents);
  app.get('/v1/eb/eventsall/:city', EventBriteController.getEventsAll);
  app.get('/v1/eb/categories', EventBriteController.getEventBriteCategories);
}
