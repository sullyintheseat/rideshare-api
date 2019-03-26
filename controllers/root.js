const Device = require('../models/DeviceInformation');
const Driver = require('../models/Driver');
const BetaSignUp = require('../models/BetaSignUp');
const Scan = require('../models/Scans');
const moment = require('moment');
const Tags = require('../models/Tag')

const RootController = {

  createBetaTags: async (req, res) => {
    try {
      let result = await Tags.createBetaTags(req.body.prefix, req.body.programId, req.body.count);
      res.status(200).send(result);
    } catch (error){
      res.status(500).send('big error');
    }
  },

  getBetaTagUrls: async(req,res) => {
    try {
      let result = await BetaTags.getBetaTagUrls();
      res.status(200).send(result);
    } catch (error){
      res.status(500).send('big error');
    }
  },

  adConnect: async (req, res) => {
   
    let {driverId} = req.params;
    
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
      let result =  await BetaSignUp.getAllBeta();
      let str = "";
      for (let i = 0; i < result.length; i++){
        str+= result[i].firstName + ',' +result[i].lastName + ',' +result[i].email + ',' + result[i].referralCode + '\n';
      }
      res.type('txt').send(str);
    } catch (err) {
      res.status(500).send('big error');
    }
  },

  returnMonth: (req, res) => {
    let {year, month} = req.body;
    let firstDay = new Date(`${year},${month},1`);
    let nextMonth = parseFloat(month) + 1;
    if(nextMonth == 13) {
      nextMonth = 1;
      year ++;
    }
    let lastDay = new Date(`${year},${nextMonth},1`);
    firstDay = moment(firstDay).format('YYYY-MM-DD');
    lastDay = moment(lastDay).format('YYYY-MM-DD');

    res.status(200).send( { firstday: `${firstDay}T00:00:00.000Z`, lastday: `${lastDay}T23:59:59.999Z` } )
  },

  getBetaId: async (req, res) => {
    let {email} = req.body;
    try {
      let result = await BetaSignUp.getBetaIdFor({email});
      if(Boolean(result)){
        res.status(200).send(result);
      } else {
        res.status(401).send('No match found');
      }
    } catch (err) {
      res.status(500).send('big error');
    }

  }

}

module.exports.Controller = RootController;
module.exports.controller = (app) => {
  app.post('/betatags', RootController.createBetaTags);
  app.get('/betatags', RootController.getBetaTagUrls);
  
  app.post('/tagId', RootController.getBetaId);

  app.post('/monthStartFinish', RootController.returnMonth)
  app.get('/share', RootController.adConnect);
  app.get('/share/:driverId', RootController.adConnect);
  app.post('/signup', RootController.signUp);
  app.get('/xyzzy/', RootController.getAllSigners);

}
