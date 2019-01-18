const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const VehicleSchema = Schema({
  vehicleId: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
  },
  driverId: {
    type: String,
    index: true
  },
  plate:  {
    type: String,
    index: true,
    unique: true
  },
  color: {
    type: String
  },
  year:  {
    type: String
  },
  model:  {
    type: String
  },
  make:  {
    type: String
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'vehicles' 
});

VehicleSchema.virtual('driver', {
  ref: 'Driver',
  localField: 'driverId',
  foreignField: 'driverId' 
 });

 
class Vehicle {

  static async getVehiclesByOwner(driverId) {
    try {
      return await this.find({driverId: driverId})
      .populate('driver')
      .exec();
    } catch (err) {
      return err;
    }
  }
  
  static async getVehicles() {
    try {
      return await this.find()
      .populate('driver')
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async getVehicleWithDriver(id) {
    try {
      return await this.findOne({_id: id})
      .populate('driver') 
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async getVehicle(id) {
    try {
      return await this.findOne({_id: id})
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async createVehicle(data) {
    try {
      return await this.create(data);
    } catch (err) {
      return err;
    }
  }
  static async updateVehicle(id, data) {
    try {
      return await this.findOneAndUpdate(
        {
          _id : id
        },
        data,
        {new: true})
        .exec()
    } catch (err) {
      return err;
    }
  }

  static async deleteVehicle(data){
    try {

    } catch (err) {
      return err;
    }
  }

  static async deleteVehicles(driverId){
    try {
      await this.find({driverId}).remove().exec();
    } catch (err) {
      return err;
    }
  }
}

VehicleSchema.loadClass(Vehicle);
module.exports = mongoose.model('Vehicle', VehicleSchema);