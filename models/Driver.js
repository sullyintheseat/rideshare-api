const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const DriverSchema = Schema({
  driverId: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    default: null
  },
  street_1: {
    type: String,
    required: true
  },
  street_2: {
    type: String,
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'drivers' 
});
DriverSchema.index({ "first": 1, "last": 1}, { "unique": true });
class Driver {

  static async getByCategories(driverId) {
    try {
      return await this.find(driverId)
      .exec()
    } catch (err) {
      return err;
    }
  }  
  
  static async getItem(driverId) {
    try {
      return await this.findOne(driverId)
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async getItems() {
    try {
      return await this.find()

    } catch (err) {
      return err;
    }
  }

  static async createItem(data) {
    try {
      return await this.create(data);
    } catch (err) {
      return err;
    }
  }

  static async driverExists(driverId) {
    try {
      let driver =  await this.findOne(driverId)
      .exec()
      if(driver) { 
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return err;
    }
  }
}

DriverSchema.loadClass(Driver);

module.exports = mongoose.model('driver', DriverSchema);