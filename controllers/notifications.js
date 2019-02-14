const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const verifyAuth = require('../passport/auth').verifyAuth(passport);
const Message = require('../models/Message');
const email 	= require('emailjs');

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
  },

  sendEmail: async (req, res) => {
    try{
      var server 	= email.server.connect({
        user:	"msullivan@digitalseat.com", 
        password:"Inter$can19!", 
        host:	"smtp.gmail.com", 
        tls: {ciphers: "SSLv3"}
      });
      
      var message	= {
        text:	"i hope this works", 
        from:	"msullivan@digitalseat.com", 
        to:		"msullivan1@austin.rr.com",
        //cc:		"else <else@your-email.com>",
        subject:	"testing emailjs",
        attachment: 
        [
          {data:"<html>i <i>hope</i> this works!</html>", alternative:true},
          //{path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        ]
      };
      server.send(message, function(err, message) { console.log(err || message); });
      res.status(200).send('Success');
    }catch(err){
      res.send(err);
    }
  }
}

module.exports.Controller = NotificationController;
module.exports.controller = (app) => {
  app.get('/emailme', NotificationController.sendEmail);
  app.post('/pubmsg/', NotificationController.sendPublicMessage);
  app.post('/msg/',verifyAuth, NotificationController.sendMessage);
  app.post('/msgack/',verifyAuth, NotificationController.acknowledged);
}
