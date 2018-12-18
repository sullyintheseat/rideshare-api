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
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'vehicles' 
});

class Vehicle {

  static async getVehiclesByOwner(ownerId) {
    try {
      return await this.find(ownerId)
      .exec();
    } catch (err) {
      return err;
    }
  }
  
  static async getVehicle(vehicleId) {
    try {
      return await this.findOne(vehicleId)
      .exec()
    } catch (err) {
      return err;
    }
  }

  static async addVehicle(data) {
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
module.exports = mongoose.model('vehicle', VehicleSchema);