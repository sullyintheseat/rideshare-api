const Device = require('../models/DeviceInformation');
const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');

const RootController = {
  adConnect: async (req, res) => {
   
    let driverId = req.params;
    
    if(driverId !== undefined) {

      let agent = await req.useragent;
      let cookies = req.cookies;
      let exists = Boolean(cookies['rds']);
    
      try {
      
        let lookup = await Driver.getItem(driverId);
        res.cookie('rds', 'cookieValue')
        res.send(lookup);

      } catch (err) {
        res.status(500).send('big error');
      }
    } else {
      res.status(404).send('Missing Parameter');
    }
  },

  signUp: async(req, res) => {
    let signer = req.body;
    try {
      let result = await BetaSignUp.signupBeta(signer);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('big error');
    }
  }
}

module.exports.Controller = RootController;
module.exports.controller = (app) => {
  app.get('/share', RootController.adConnect);
  app.get('/share/:driverId', RootController.adConnect);
  app.post('/signup', RootController.signUp);
}
