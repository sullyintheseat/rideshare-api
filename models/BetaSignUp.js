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
  firstName: {
    type: String,
    default: null,
    required: true
  },
  lastName: {
    type: String,
    default: null,
    required: true
  },
  email: {
    type: String,
    default: null,
    unique: true,
    required: true
  },
  inDfw: {
    type: Boolean,
    default: true,
    required: true
  },
  isUber: {
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
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'betas' 
});


 
class BetaDriver {

  static async signupBeta(driver) {
    try {
      let result = await this.create(driver);
      console.log(result);
      return result;
    } catch (err) {
      return err;
    }
  }

}

BetaDriverSchema.loadClass(BetaDriver);
module.exports = mongoose.model('Beta', BetaDriverSchema);