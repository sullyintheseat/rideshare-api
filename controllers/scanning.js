const Scan = require('../models/Scans');
const Driver = require('../models/Driver');
const BetaMetric = require('../models/BetaMetric');
const DeviceInformation = require('../models/DeviceInformation');
const AdMetric = require('../models/AdMetric');
const ContestEnry = require('../models/ContestEntry');

const passport = require('passport');
const verifyAuth = require('../passport/auth').verifyAuth(passport);

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
      res.status(500).send('Unknown server error');
    }
  },

  setBetaMetrics: async (req, res) => {
    let action = req.body;
    try {
      action.ip = req.ip;
      let data = await BetaMetric.create(action);
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  },

  getBetaMetrics: async (req, res) => {
    try {
      let data = await BetaMetric.getAll();
      res.status(200).send(data);
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  },

  getTagTarget: async (req, res) => {

  },

  scoringScan: async (req, res) => {
    let isMobile = req.useragent.isMobile;
    let ip = req.get('x-real-ip');
    if(!Boolean(ip)){ ip = "127.0.0.1" };

    try {
      let device = await DeviceInformation.createDevice(req.useragent);
      await Scan.createScan({driverId: req.body.snder, origin: ip, device: device.deviceId, isMobile})
      res.status(200).send({ip, isMobile, did: device.deviceId});
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  },
  
  getScans: async (req, res) => {
    let myid;
    let did = req.user && req.user.email;
    try {
      let myid = await Driver.getDriverByEmail(did);
      let result = await Scan.getScanCountForTag({driverId: myid.driverId});
      res.status(200).send({count: result});
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  },

  setAdMetric: async (req, res) => {
    let isMobile = req.useragent.isMobile;
    let ip = req.get('x-real-ip');
    if(!Boolean(ip)){ ip = "127.0.0.1" };

    let metric = req.body;
    metric.origin = ip;
    metric.isMobile = isMobile;
    try {
      await AdMetric.createMetric(metric);
      res.status(200).send('ok');
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  },

  enterContest: async (req, res) => {
    let entry = req.body;
    let isMobile = req.useragent.isMobile;
    let ip = req.get('x-real-ip');
    if(!Boolean(ip)){ ip = "127.0.0.1" };

    entry.origin = ip;
    entry.isMobile = isMobile;

    try {
      return await ContestEnry.createEntry(entry);
    } catch (err) {
      res.status(500).send('Unknown server error');
    }
  }
}

module.exports.Controller = ScanningController;
module.exports.controller = (app) => {
  app.get('/scan/:driverId', ScanningController.test);
  app.get('/scan', ScanningController.test);
  app.post('/beta/metrics', ScanningController.setBetaMetrics);
  app.get('/beta/metrics', ScanningController.getBetaMetrics);
  app.get('/data', verifyAuth, ScanningController.getScans);
  app.post('/data' , ScanningController.scoringScan);

  app.post('/adm', ScanningController.setAdMetric);

  app.post('/entry', ScanningController.enterContest)
}
