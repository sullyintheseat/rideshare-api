const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const BetaDriverSchema = Schema({
  betaId:{
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
  },
  name: {
    type: String,
    default: null
  },
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null,
    unique: true,
    required: true
  },
  referralCode: {
    type: String,
    default: null
  },
  inDfw: {
    type: Boolean,
    default: true,
    required: true
  },
  rideShare: {
    type: Boolean,
    default: true,
    required: true
  },
  isLyft: {
    type: Boolean,
    default: true,
    required: true
  },
  ridesPerWeek: {
    type: String,
    required: true
  },
  cityMostDriven: {
    type: String,
    default: true
  },
  active: {
    type: Boolean,
    default: false
  },
  redeemed: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'betas'
});


 
class BetaDriver {

  static async signupBeta(driver) {
    try {
      let result = await this.create(driver);
      return result;
    } catch (err) {
      return err;
    }
  }

  static async getAllBeta(){
    try {
      let result = await this.find()
        .exec();
      return result;
    } catch (err) {
      return err;
    }
  }

  static async getBetaProfile(id) {
    try {
      let result = await this.findOne({betaId: id})
        .exec();
      return result;
    } catch (err) {
      return err;
    }
  }

  static async deleteUser(id) {
  
    try {
      let result = await this.findOne({_id: id})
        .exec();  
      return result;
    } catch (err) {
      return err;
    }

  }

}

BetaDriverSchema.loadClass(BetaDriver);
module.exports = mongoose.model('Beta', BetaDriverSchema);