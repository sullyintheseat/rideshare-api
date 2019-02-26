const Scan = require('../models/Scans');
const Driver = require('../models/Driver');
const BetaMetric = require('../models/BetaMetric');

ScanningController = {

  test: async(req, res) => {
    let {driverId} = req.params;
    try {
      if(driverId != null || driverId != undefined) {
        let driver = await Driver.getDriverByDriverId(driverId);
        if(Boolean(driver)) {
          res.header('sndr', driver._id);
          res.status(200).send(driver);
        } else {
          res.status(404).send('Not Found')
        }
      } else {
        res.status(400).send('no id');
      }
    } catch (error) {
      res.status(500).send('Unkwon Error');
    }
  },

  setBetaMetrics: async (req, res) => {
    let action = req.body;
    try {
      action.ip = req.ip;
      let data = await BetaMetric.create(action);
      res.status(200).send(data);
    } catch (err) {
      res.status(401).send('Not Ok');
    }
  },

  getBetaMetrics: async (req, res) => {
    try {
      let data = await BetaMetric.getAll();
      res.status(200).send(data);
    } catch (err) {
      res.status(401).send('Not Ok');
    }
  },

  getTagTarget: async (req, res) => {

  },

  scoringScan: async (req, res) => {
    console.log(req.ip);
    res.status(200).send(req.connection.remoteAddress);
  }
}

module.exports.Controller = ScanningController;
module.exports.controller = (app) => {
  app.get('/scan/:driverId', ScanningController.test);
  app.get('/scan', ScanningController.test);
  app.post('/beta/metrics', ScanningController.setBetaMetrics);
  app.get('/beta/metrics', ScanningController.getBetaMetrics);
  app.get('/data/', ScanningController.scoringScan);
}
