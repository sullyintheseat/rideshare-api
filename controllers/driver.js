const DriverController = {

  test: async(req, res) => {
    res.send('test driver');
  }
 
}

module.exports.Controller = DriverController;
module.exports.controller = (app) => {
  app.get('/driver', DriverController.test);
}
