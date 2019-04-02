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
  stateId: {
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

  static async createCities (list) {
    let {state, stateId,  cities} = list;
    let city;
    try {
      for (let i = 0; i < cities.length; i++){
        city = {
          name: cities[i],
          stateId,
          state
        }
        await this.create(city);
      }
      return true;
    } catch (error) {
      return error;
    };
  }

}

CitySchema.loadClass(City);
module.exports = mongoose.model('City', CitySchema);