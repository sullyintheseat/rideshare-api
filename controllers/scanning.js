const Scan = require('../models/Scans');
const Driver = require('../models/Driver');

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
}

module.exports.Controller = ScanningController;
module.exports.controller = (app) => {
  app.get('/scan/:driverId', ScanningController.test);
}
