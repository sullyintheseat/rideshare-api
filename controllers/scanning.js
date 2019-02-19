const Scan = require('../models/Scans');
const Driver = require('../models/Driver');
const BetaMetric = require('../models/BetaMetric');

ScanningController = {

  test: async(req, res) => {
    let {driverId} = req.params;
    if(driverId != null || driverId != undefined) {
      let driver = await Driver.getDriverByDriverId(driverId);
      res.status(200).send(driver);
    } else {
      res.status(200).send('no id');
    }
  },

  setBetaMetrics: async (req, res) => {
    let action = req.body;
    try {
      await BetaMetric.create(action);
      res.status(200).send('Ok');
    } catch (err) {
      res.status(401).send('Not Ok');
    }
  }
}

module.exports.Controller = ScanningController;
module.exports.controller = (app) => {
  app.get('/scan/:driverId', ScanningController.test);
  app.post('/beta/metrics', ScanningController.setBetaMetrics);
}
