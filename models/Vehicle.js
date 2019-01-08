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
  year:  {
    type: String,
    index: true,
    unique: true
  },
  model:  {
    type: String,
    index: true,
    unique: true
  },
  make:  {
    type: String,
    index: true,
    unique: true
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
  
  static async getVehicle() {
    try {
      return await this.find()
      .populate('driver')
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

  static async deleteVehicle(data){
    try {

    } catch (err) {
      return err;
    }
  }
}

VehicleSchema.loadClass(Vehicle);
module.exports = mongoose.model('Vehicle', VehicleSchema);