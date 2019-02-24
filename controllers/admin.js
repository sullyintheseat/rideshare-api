const Program = require('../models/Program');

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
  }
}

module.exports.Controller = AdminController;
module.exports.controller = (app) => {
  app.post('/v1/admin', AdminController.createProgram);
}
