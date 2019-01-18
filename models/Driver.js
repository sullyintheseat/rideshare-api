const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');
const Vehicle = require('./Vehicle');
const ObjectId = mongoose.Types.ObjectId;

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
 localField: 'driverId',
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
  
  static async getDriver(driverId) {
    try {
      return await this.findOne({driverId})
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
      return err;
    }
  }

  static async createDriver(data) {
    try {
      return await this.create(data);
    } catch (err) {
      return err;
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

  static async getDriverProfile(driverId) {
    try {
      console.log(driverId); 
      let driver =  await this.findOne({driverId: driverId})
        .select('first_name last_name driverId city state zip')
        .populate({
          path: 'vehicles',
          model: 'Vehicle',
          select : 'plate vehicleId year model make',
          match: {
              driverId: driverId
          },
        }).exec()
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