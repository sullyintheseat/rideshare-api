const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');
const Vehicle = require('./Vehicle');
const Tag = require('./Tag');
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
    unique: true,
    default: null
  },
  usernameLowered: {
    type: String,
    unique: true
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
  metroServed: {
    type: String,
    default: null
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

DriverSchema.virtual('tagprogram', {
  ref: 'Tag',
  localField:'driverId',
  foreignField: 'tagId'
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
      .select('firstName lastName city state driverId')
      .populate('tagprogram')
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
     
        driver = await this.create(data);
      
      return driver;
    } catch (err) {
      console.log(err)
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
      console.log(err)
      return err;
    }
  }

  static async userNameExists(name) {
    try {
      let user = await this.findOne({usernameLowered: name}).exec();

      return (Boolean(user));

    } catch (err) {
      return err;
    }
  }

  static async deleteDriver(email) {
    try {
      await this.findOneAndDelete({
        email: email
      }).exec();

      return 'User deleted';

    } catch (err) {
      return err;
    }
  }

  static async getUnregisteredDrivers() {
    try {
      let result = await this.find({driverId :null})
      .exec();
      return result
    } catch (err) {
      return err;
    }
  }

  static async getRegisteredDrivers() {
    try {
      let result = await this.find({driverId :{$ne: null}})
      .exec();
      return result
    } catch (err) {
      return err;
    }
  }
}

DriverSchema.loadClass(Driver);

module.exports = mongoose.model('Driver', DriverSchema);