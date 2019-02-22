const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');
const Vehicle = require('./Vehicle');
const ObjectId = mongoose.Types.ObjectId;

const DriverSchema = Schema({
  driverId: {
    type: String,
    default: null,
    index: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  key: {
    type: String,
  },
  username: {
    type: String,
    default: null
  },
  address : {
    type: String,
    required: true
  },
  address_2: {
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
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  agreement: {
    type: Boolean,
    required: true,
    default: false
  },
  signedUp: {
    type: Boolean,
    required: true,
    default: false
  },
  hasLogin: {
    type: Boolean,
    required: true,
    default: false
  },
  bestContact: {
    type: String,
    default: 'EMAIL',
  },
  pickupMethod: {
    type: String,
    default: 'PICK_UP',
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'drivers' 
});

DriverSchema.virtual('vehicles', {
 ref: 'Vehicle',
 localField: '_id',
 foreignField: 'driverId' 
});


class Driver {

  static async getDrivers() {
    try {
      return await this.find()
      .exec()
    } catch (err) {
      return err;
    }
  }  
  
  static async getDriver(_id) {
    try {
      return await this.findOne({_id : ObjectId(_id)})
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async driverByTag(driverId) {
    try {
      return await this.findOne(driverId)
      .select('firstName lastName city state')
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async getDriverByDriverId(driverId) {
    try {
      return await this.findOne({driverId:driverId})
      .select('_id city')
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async getDriverByName(name) {
    try {
      return await this.findOne({username: name})
      .exec()
    } catch (err) {
      throw err;
    }
  }

  static async getDriverByEmail(email) {
    try {
      let me = await this.findOne({email: email}).exec()
      return me;
    } catch (err) {
      throw err;
    }
  }
  static async createDriver(data) {
    try {
      let driver;
      let exists = await this.findOne({email: data.email}).exec();
      if(Boolean(exists)) {
        driver =  await this.findOneAndUpdate(exists._id, data);
      } else {
        driver = await this.create(data);
      }
      return driver;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async driverExists(driverId) {
    try {
      let driver = await this.findOne({_id: driverId})
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

  static async getDriverProfile(id) {
    try {
      let driver =  await this.findOne({_id: ObjectId(id)})
        .select('firstName lastName driverId phone address address_2 email city state zip _id')
        .populate({
          path: 'vehicles',
          model: 'Vehicle',
          select : 'plate vehicleId year model make',
          match: {
              driverId: id
          },
        }).exec()
        return driver;
    } catch (err) {
      return err;
    }
  }

  static async getDriverProfileByEmail(id) {
    try {
      let driver =  await this.findOne({email: id})
        .select('firstName lastName driverId phone address address_2 email city state zip _id')
        .populate({
          path: 'vehicles',
          model: 'Vehicle',
          select : 'plate vehicleId year model make',
          match: {
              driverId: id
          },
        }).exec()
        return driver;
    } catch (err) {
      return err;
    }
  }
  
  static async loginWithEmail(email) {
    try {
      let driver =  await this.findOne({email: email})
        .exec()
        return driver;
    } catch (err) {
      return err;
    }
  }

  static async updateDriver(id, data) {
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

  static async deleteDriver(id) {
    try {
      let me = await this.findOne({_id:  ObjectId(id)});

      if(!Boolean(me)) {
        return 'User not found';
      }
      let short = me.driverId;
      try {
        await Vehicle.deleteVehicles(short);
      } catch (err) {
        return err;
      };

      await this.findByIdAndRemove({_id: id});

      return 'User deleted';

    } catch (err) {
      return err;
    }
  }
}

DriverSchema.loadClass(Driver);

module.exports = mongoose.model('Driver', DriverSchema);