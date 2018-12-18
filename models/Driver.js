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
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
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

class Driver {

  static async getByCategories(id) {
    try {
      return await this.find({category: id})
      .exec()
    } catch (err) {
      return err;
    }
  }  
  
  static async getItem(id) {
    try {
      return await this.findOne({ blogShort: id })
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
}

DriverSchema.loadClass(Driver);

module.exports = mongoose.model('driver', DriverSchema);