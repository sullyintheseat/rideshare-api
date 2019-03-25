const Program = require('../models/Program');
const DeviceInformation = require('../models/DeviceInformation');
const AdMetric = require('../models/AdMetric');
const Scans = require('../models/Scans');
const ContestEntry = require('../models/ContestEntry');
const Driver = require('../models/Driver');
const Admin = require('../models/Admin');
const passport = require('passport');
const verifyAdmin = require('../passport/auth').verifyAdmin(passport);

const verifyClient = require('../passport/auth').verifyClient(passport);

const MetricsController = {
  
  test: async (req, res) => {
    try {
      res.status(200).send('admin');
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  dataFor: async (req, res) => {
    try {
      let result = await AdMetric.getMetricBy(req.body);
      let str = "ad,driver,device,isMobile,scanned\n";
      for(let i=0; i < result.length; i++){
        let t = result[i];
        str += t.spot + ',' + t.driverId + ',' + t.device + ',' + t.isMobile + ',' +t.createdAt  + '\n';
      }
      res.status(200).send(str);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  },

  dataForClient: async (req, res) => {
    try {
      let result = await AdMetric.getMetricBy(req.body);
      
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('Unknown Server Error');
    }
  }

}

module.exports.Controller = MetricsController;
module.exports.controller = (app) => {
  app.get('/v1/metrics/test', verifyAdmin, MetricsController.test);
  app.post('/v1/metrics/dataFor', MetricsController.dataFor);
  app.post('/v1/metrics/forclient', MetricsController.dataForClient);
}
