const Device = require('../models/DeviceInformation');
const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');
const Scan = require('../models/Scans');

const RootController = {

  adConnect: async (req, res) => {
   
    let driverId = req.params;
    
    if(driverId !== undefined) {

      let agent = await req.useragent;
      let cookies = req.cookies;

      let exists = Boolean(cookies['rds']);
      
      try {
      
        let lookup = await Driver.getItem(driverId);

        if(exists) {
          let device = await Device.getDeviceData(cookies['rds']);
          if(device.length > 0) {
            //create scan record new
          } else {  
            // create second visit
          }
          res.send('the data needed to move forward');
        } else {
          let device = await Device.createDevice( agent );
          res.cookie('rds', `${device.deviceId}`);
          res.send('ok');
        }
        
        

      } catch (err) {
        console.log(err);
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
      res.status(200).send({success: true, data: result});
    } catch (err) {
      res.status(500).send('big error');
    }
  },

  lookUp: async(req, res) => {
    let id = req.params.id;
    try {
      let result =  await BetaSignUp.getBetaProfile(id);
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send('big error');
    }
  },

  getAllSigners: async(req, res) => {
    try {
      let result =  await BetaSignUp.getAllSigners();

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
  app.get('/code/:id', RootController.lookUp);
  app.get('/xyzzy/', RootController.getAllSigners);
}
