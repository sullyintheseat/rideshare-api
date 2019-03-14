const Program = require('../models/Program');
const DeviceInformation = require('../models/DeviceInformation');
const AdMetric = require('../models/AdMetric');
const Scans = require('../models/Scans');
const ContestEntry = require('../models/ContestEntry');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const passport = require('passport');
const verifyAdmin = require('../passport/auth').verifyAdmin(passport);

const MetricsController = {
  test: async (req, res) => {
    try {
      res.status(200).send('admin');
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  }
}

module.exports.Controller = MetricsController;
module.exports.controller = (app) => {
  app.get('/v1/metrics/test', verifyAdmin, MetricsController.test);
}
