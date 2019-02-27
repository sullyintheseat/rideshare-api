const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScanSchema = Schema({
  driverId: {
    type: String,
    default: null,
    required: true
  },
  origin: {
    type: String,
    default: null, 
    required: true,
    index: true
  },
  device: {
    type: String,
    default: null,
    index: true
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'scans' 
});

ScanSchema.virtual('driver', {
  ref: 'Driver',
  localField: 'driverId',
  foreignField: 'driverId' 
 });
 
class Scan {
  
  static async createScan (data) {
    try {
      let result = await this.create(data);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getScans(query) {
    try {
      let result = await this.find(query)
      .exec()
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getScanBy(query) {
    try {
      let result = await this.find(query)
      .exec()
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getScanCountForTag(driverId) {
    try {
      let result = await this.find(driverId)
      .countDocuments()
      .exec()
      return result;
    } catch (error) {
      return error;
    }
  }
}

ScanSchema.loadClass(Scan);
module.exports = mongoose.model('Scan', ScanSchema);