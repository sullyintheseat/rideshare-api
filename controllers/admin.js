const Program = require('../models/Program');
const DeviceInformation = require('../models/DeviceInformation');
const AdMetric = require('../models/AdMetric');
const Scans = require('../models/Scans');
const ContestEntry = require('../models/ContestEntry');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const passport = require('passport');

const verifyAdmin = require('../passport/auth').verifyAdmin(passport);

const AdminController = {

  createProgram: async (req, res) => {
    try {
      let data = req.body;
      let result = await Program.createProgram(data);
      if(result) { 
        res.status(200).send(result);
      } else {
        res.status(401).send('Failed to create object');
      }
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getScanData: async (req, res) => {
    try {
      let result = await Scans.getScans();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getAdClickedData: async (req, res) => {
    try {
      let result = await AdMetric.getMetrics();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getDeviceData: async (req, res) => {
    try {
      let result = await DeviceInformation.getAllDeviceData();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getContestEntries: async (req, res) => {
    try {
      let result = await ContestEntry.getAllEntries();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getRegistered: async (req, res) => {
    try {
      let result = await Driver.getRegisteredDrivers();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getUnregistered: async (req, res) => {
    try {
      let result = await Driver.getUnregisteredDrivers();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  createAdmin: async (req, res) => {
    try {
      let result = await Admin.createAdmin(req.body);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
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

  test: async (req, res) => {
    try {
      res.status(200).send('admin');
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  }
}

module.exports.Controller = AdminController;
module.exports.controller = (app) => {
  app.post('/v1/admin', AdminController.createProgram);
  app.get('/v1/admin/scans', AdminController.getScanData);
  app.get('/v1/admin/metrics', AdminController.getAdClickedData);
  app.get('/v1/admin/devices', AdminController.getDeviceData);
  app.get('/v1/admin/contests', AdminController.getContestEntries);
  app.get('/v1/admin/registered', AdminController.getRegistered);
  app.get('/v1/admin/unregistered', AdminController.getUnregistered);

  app.post('/v1/admin/new/', AdminController.createAdmin);
  app.post('/v1/admin/login', AdminController.login);

  app.get('/v1/admin/test', verifyAdmin, AdminController.test);
}
