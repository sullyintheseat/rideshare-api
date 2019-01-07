const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScanSchema = Schema({
  driverId: {
    type: String,
    default: null,
    required: true
  },
  vehicleId:  {
    type: String,
    default: null,
    required: true
  },
  advertiserId:  {
    type: String,
    default: null,
    required: true
  },
  revisit: {
    type: Boolean,
    defautl: false
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'scans' 
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
}

ScanSchema.loadClass(Scan);
module.exports = mongoose.model('Scan', ScanSchema);