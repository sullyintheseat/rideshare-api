const Program = require('../models/Program');
const DeviceInformation = require('../models/DeviceInformation');
const AdMetric = require('../models/AdMetric');
const Scans = require('../models/Scans');
const ContestEntry = require('../models/ContestEntry');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const City = require('../models/City');
const State = require('../models/State');
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

  createCity: async (req, res) => {
    let data = req.body;
    try {
      await City.createCities(data);
      res.status(200).send('test');
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  createState: async (req, res) => {
    let data = req.body;
    try {
      if(data.length > 0) {
        let result = await State.createStates(data);
        res.status(200).send(result);
      } else {
        res.status(200).send('object');
      }
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getContestList: async (req, res) => {
    try {
      let result = await ContestEntry.getContestList();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  getLeaderBoardAdmin: async (req, res) => {
    try {
      let result = await Scans.getLeaderBoardAdmin();
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
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
  app.post('/v1/admin', verifyAdmin, AdminController.createProgram);
  app.get('/v1/admin/scans', verifyAdmin, AdminController.getScanData);
  app.get('/v1/admin/metrics', verifyAdmin, AdminController.getAdClickedData);
  app.get('/v1/admin/devices', verifyAdmin, AdminController.getDeviceData);
  app.get('/v1/admin/contests', verifyAdmin, AdminController.getContestEntries);
  app.get('/v1/admin/registered', verifyAdmin, AdminController.getRegistered);
  app.get('/v1/admin/unregistered', verifyAdmin, AdminController.getUnregistered);

  app.post('/v1/admin/new/', verifyAdmin, AdminController.createAdmin);
  app.post('/v1/admin/login', AdminController.login);

  app.get('/v1/admin/test', verifyAdmin, verifyAdmin, AdminController.test);

  app.post('/v1/admin/geo/city', verifyAdmin, AdminController.createCity);
  app.post('/v1/admin/geo/state', verifyAdmin, AdminController.createState);

  app.get('/v1/admin/contestlist', verifyAdmin, AdminController.getContestList);
  app.get('/v1/admin/leaderboard', AdminController.getLeaderBoardAdmin);
}
