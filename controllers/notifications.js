const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const verifyAuth = require('../passport/auth').verifyAuth(passport);
const Message = require('../models/Message');

const NotificationController = {
  sendMessage: async (req, res) =>{
    let user = req.user;
    let data = {
      email: user.email,
      message: req.body.message,
      reason: req.body.reason
    }
    try{
      await Message.createMessage(data);
      res.status(200).send('ok');
    } catch (err){
      res.status(500).send(err);
    }
  },

  sendPublicMessage: async (req, res) =>{
    
    let data = {
      email: req.body.email,
      reason: req.body.reason
    }
    try{
      await Message.createMessage(data);
      res.status(200).send('ok');
    } catch (err){
      res.status(500).send(err);
    }
  },

  acknowledged: async (req, res) => {
    let msg = req.body;
    try {
      return await Message.acknowledged(msg._id);
    } catch (err) {
      res.status(500).send(err);
    }
  }
}

module.exports.Controller = NotificationController;
module.exports.controller = (app) => {
  app.post('/pubmsg/', NotificationController.sendPublicMessage);
  app.post('/msg/',verifyAuth, NotificationController.sendMessage);
  app.post('/msgack/',verifyAuth, NotificationController.acknowledged);
}
