const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const UserSchema = Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'users' 
});


class User {
  
  static async createUser(user) {
    let {email, password} = user;
    
    email = email.toLowerCase();

    try{

      let encrypt = CryptoJS.AES.encrypt(password, 'FuCKM0nk3Y').toString();

      //let bytes  = CryptoJS.AES.decrypt(encrypt, 'FuCKM0nk3Y');
      //let plaintext = bytes.toString(CryptoJS.enc.Utf8);

      let user = await this.findOne({email: email})
      .exec();
      if (!Boolean(user)){
        let newuser = await this.create({email : email, password: encrypt });
        return  newuser;
      } else {
        return false;
      }
    } catch (err){
     return err; 
    }
  }

  static async verifyUser(email, password) {
  
    try {
      let user = await this.findOne({email: email})
      .exec();

      let bytes  = CryptoJS.AES.decrypt(user.password, 'FuCKM0nk3Y');
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

  static async getById(id) {
    try{
      return await this.findOne({_id: id})
    } catch (err){
      return err; 
    }
  }

  static async getUser(email) {
    try{
      return await this.findOne({email: email})
    } catch (err){
     return err; 
    }
  }

  static async userExists(email) {
    try{
      let user = await this.findOne({email: email})
      .exec();
      return (Boolean(user));

    } catch (err){
     return err; 
    }
  }

  static async updateUser(id, data) {
    try {
      let update = await this.findOneAndUpdate(
        {
          _id : id
        },
        data,
        {new: true})
        .exec()
      return update;
    } catch (err) {
      return err;
    }
  }

  static async invalidateUser(email) {
    try{

    } catch (err){
     return err; 
    }
  }
}

UserSchema.loadClass(User);

module.exports = mongoose.model('User', UserSchema);