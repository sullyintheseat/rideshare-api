const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const CitySchema = Schema({
  cityId: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
    
  },
  name: {
    type: String,
    default: null,
    required: true
  },
  state: {
    type: String,
    default: null
  },
  zip: {
    type: String,
    default: null
  }

},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'cities' 
});


 
class City {

  static async signupBeta(city) {
    try {
      let result = await this.ceeate(city);
      return result;
    } catch (err) {
      return err;
    }
  }

}

CitySchema.loadClass(City);
module.exports = mongoose.model('City', CitySchema);