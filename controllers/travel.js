const Hotels = require('../models/Hotel')
const passport = require('passport')
const verifyAdmin = require('../passport/auth').verifyAdmin(passport)
const verifyAuth = require('..//passport/auth').verifyAuth(passport)

const TravelManagerController = {
  
  createHotel: async (req, res) => {
    let unit = req.body
    try {
      let hotel = await Hotels.createHotel(unit)
      res.status(200).send(hotel)
    } catch (err) {
      res.status(500).send('Unknown Server Response')
    }
  },

  getHotelByShort: async (req, res) => {
    let short = req.params.id
    console.log(short)
    try {
      let hotel = await Hotels.getHotelByShort(short)
      res.status(200).send(hotel)
    } catch (err) {
      res.status(500).send('Unknown Server Response')
    }
  },

  getAllHotels: async (req, res) => {
    try {
      let hotel = await Hotels.getHotels()
      res.status(200).send(hotel)
    } catch (err) {
      res.status(500).send('Unknown Server Response')
    }
  },
}

module.exports.Controller = TravelManagerController
module.exports.controller = (app) => {
  app.post('/v1/cvb/hotel', TravelManagerController.createHotel)
  app.get('/v1/cvb/hotel/:id', TravelManagerController.getHotelByShort)
}
