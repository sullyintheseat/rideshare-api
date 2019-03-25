const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');
const CryptoJS = require('crypto-js');

const ClientSchema = Schema({
  clientId: {
    type: String,
    default: null,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'clients' 
});

class Client {
  static async createClient(user) {
    let {username, password} = user;
    
    username = username.toLowerCase();

    try{
      let encrypt = CryptoJS.AES.encrypt(password, process.env.ADMIN_HASH).toString();
      let user = await this.findOne({username: username})
      .exec();
      if (!Boolean(user)){
        let newuser = await this.create({username : username, password: encrypt });
        return  newuser;
      } else {
        return false;
      }
    } catch (err){
     return err; 
    }
  }
  
  static async clientExists(email) {
    try{
      let user = await this.findOne({username: email})
      .exec();
      return (Boolean(user));

    } catch (err){
     return err; 
    }
  }

  static async getClient(username) {
    try{
      return await this.findOne({username: username})
    } catch (err){
     return err; 
    }
  }

  static async verifyClient(username, password) {
  
    try {
      let user = await this.findOne({username: username})
      .exec();
      let bytes  = CryptoJS.AES.decrypt(user.password, process.env.ADMIN_HASH);
      let decrypt = bytes.toString(CryptoJS.enc.Utf8);
      let valid = (password === decrypt);
      
      if(valid){
        return user;
      } else {
        return null;
      }
    }catch (err){
     return err; 
    }
  }
}

ClientSchema.loadClass(Client);

module.exports = mongoose.model('Client', ClientSchema);