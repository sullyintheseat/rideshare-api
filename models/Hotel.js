const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const HotelSchema = Schema({
  unitId: { 
    type: String,
    default: shortId.generate
  },
  unitName: {
    type: String,
    default: null,
    required: true,
    unique: true
  },
  ebName: {
    type: String,
    default: null,
    required: true
  },
  address: {
    street: {
      type: String,
      default: null,
      required: true
    },
    city: {
      type: String,
      default: null,
      required: true
    },
    state: {
      type: String,
      default: null,
      required: true
    },
    zip: {
      type: Number,
      default: null,
      required: true
    },
  },
  phone: {
    type: String,
    default: null,
    required: true
  },
  fax: {
    type: String,
    default: null
  },
  geo: {
    lat: {
      type: Number,
      default: null
    },
    long: {
      type: Number,
      default: null
    },
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'hotels' 
});


class Hotel {
  static async createHotel(hotel) {
    try{
      return await this.create(hotel)
    } catch (err){
     return err; 
    }
  }

  static async getHotelByShort(sid) {
    try {
      return await this.findOne({unitId: sid})
        .exec()
    } catch (err){
     return err; 
    }
  }

  static async getHotels() {
    try {
      return await this.find()
        .exec()
    } catch (err){
     return err; 
    }
  }
}

HotelSchema.loadClass(Hotel);

module.exports = mongoose.model('Hotel', HotelSchema);