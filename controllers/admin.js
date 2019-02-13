const passport = require('passport');
const ObjectId = require('mongodb').ObjectId;
const verifyAdmin = require('../passport/auth').verifyAdmin(passport);

const Admin = require('../models/Admin');

const AdminController = {
  createAdmin: async (req, res) => {
    let user = req.body;
    try{
      let admin = await Admin.createAdmin(user);
      if(Boolean(admin)){
        res.status(200).send('Success');
      } else {
        res.status(401).send('Failure');
      }
    } catch (error) {
      res.status(500).send('Unkown server error');
    }
  },

  login: async (req, res, next) => {
    passport.authenticate('admin-login', { session: false }, (err, user, info) => {
      if (user) {
        res.header('token', user.token);
        res.status(200).send(user);
      } else if (info && info.message) {
        res.status(401).send(info.message);
      } else {
        res.status(500).send('Unknown server error');
      }
    })(req, res, next);
  },

  validornot: async(req, res) => {
    try{
      res.status(200).send({value:'ok'})
    } catch (err) {
      res.status(401).send({value:'failed'})
    }
  }
}

module.exports.Controller = AdminController;
module.exports.controller = (app) => {
  app.get('/admvalid', verifyAdmin, AdminController.validornot);
  app.post('/ds', AdminController.createAdmin);
  app.post('/ds/login', AdminController.login);
}
