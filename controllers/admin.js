const Program = require('../models/Program');
const DeviceInformation = require('../models/DeviceInformation');
const AdMetric = require('../models/AdMetric');
const Scans = require('../models/Scans');

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
  }

}

module.exports.Controller = AdminController;
module.exports.controller = (app) => {
  app.post('/v1/admin', AdminController.createProgram);
  app.get('/v1/admin/scans', AdminController.getScanData);
  app.get('/v1/admin/metrics', AdminController.getAdClickedData);
  app.get('/v1/admin/devices', AdminController.getDeviceData);
}
