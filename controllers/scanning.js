const Scan = require('../models/Scans');
const Driver = require('../models/Driver');
const BetaMetric = require('../models/BetaMetric');
const DeviceInformation = require('../models/DeviceInformation');
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
    let isMobile = req.useragent.isMobile;
    let ip = req.get('x-real-ip');
    if(!Boolean(ip)){ ip = "127.0.0.1" };

    try {
      let device = await DeviceInformation.createDevice(req.useragent);
      await Scan.createScan({driverId: req.body.snder, origin: ip, device: device.deviceId})
      res.status(200).send({ip, isMobile, did: device.deviceId});
    } catch (err) {
      res.status(401).send('Not Ok');
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
      res.status(401).send('Not Ok');
    }
  }
}

module.exports.Controller = ScanningController;
module.exports.controller = (app) => {
  app.get('/scan/:driverId', ScanningController.test);
  app.get('/scan', ScanningController.test);
  app.post('/beta/metrics', ScanningController.setBetaMetrics);
  app.get('/beta/metrics', ScanningController.getBetaMetrics);
  app.get('/data/', verifyAuth, ScanningController.getScans);
  app.post('/data' , ScanningController.scoringScan);
}
