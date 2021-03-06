const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const verifyAuth = require('../passport/auth').verifyAuth(passport);
const Message = require('../models/Message');
const email	= require('emailjs');
const User = require('../models/User');

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

  passForgot: async (req, res) => {
    try{
      let destination = req.body.email;

      let newpassword = await User.passwordReset(destination);

      let mystr = 'Your new password is <br /><br/>';
      mystr += newpassword;
      mystr +=  '<br/><br/>it is recommended that you login and change your password.';
      let server 	= email.server.connect({
        user:	"support@digitalseat.com", 
        password:"Scansupport19!", 
        host:	"smtp.gmail.com", 
        tls: {ciphers: "SSLv3"}
      });
      
      let message	= {
        text:	mystr, 
        from: "support@digitalseat.com", 
        to:		destination,
        //cc:		"else <else@your-email.com>",
        subject:	"Forgot Password",
        attachment: 
        [
          {data:`<html><p>${mystr}</p</html>`, alternative:true},
          //{path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        ]
      };
      server.send(message, function(err, message) { console.log(err || 'message'); });
      res.status(200).send('Success');
    }catch(err){
      res.send(err);
    }
  },
  
  sendThanks: async (req, res) => {
    try{
      let destination = req.body.email;
      
      let server 	= email.server.connect({
        user:	"support@digitalseat.com", 
        password:"Scansupport19!", 
        host:	"smtp.gmail.com", 
        tls: {ciphers: "SSLv3"}
      });
      
      let message	= {
        from: "support@digitalseat.com", 
        to:		destination,
        //cc:		"else <else@your-email.com>",
        subject:	"Application Received - Thank You!",
        attachment: 
        [
          {data:`<html><p>Hi Digital Seat Driver!</p><p>Thank you for signing up to join our DFW driver network - We have received your application and will contact you within 48 hours. In the meantime, please add Driver@digitalseat.com to your contacts!</p><p>We look forward to working with you!</p><p>Best,<br/><br/>Driver Support Team<br/><a href="https://www.digitalseat.com" target="_blank">www.digitalseat.com</a></p</html>`, alternative:true},
          //{path:"path/to/file.zip", type:"application/zip", name:"renamed.zip"}
        ]
      };
      server.send(message, function(err, message) { console.log(err || 'message'); });
      res.status(200).send('Success');
    }catch(err){
      res.send(err);
    }
  },

  getAll: async (req, res)=> { 
    try {
      let result = await Message.getMessages();
      res.status(200).send(result)
    }catch(err){
      res.send(err);
    }
  }
}

module.exports.Controller = NotificationController;
module.exports.controller = (app) => {
  app.post('/forgot', NotificationController.passForgot);
  app.post('/pubmsg/', NotificationController.sendPublicMessage);
  app.post('/msg/',verifyAuth, NotificationController.sendMessage);
  app.post('/msgack/',verifyAuth, NotificationController.acknowledged);

  app.get('/v1/msg', NotificationController.getAll);
  app.post('/v1/msg/thanks', NotificationController.sendThanks);
}
