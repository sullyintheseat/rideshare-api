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
  },
  isMobile: {
    type: Boolean,
    default: false
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
      .sort({driverId: 1})
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

  static async getLeaderBoard() {
    try {
      return await this.aggregate([
        {
            "$group" : {
                _id:"$driverId", 
                count:{$sum:1}
            },
        },
        {
            "$lookup" : {
                 from: 'drivers',
                 localField: '_id',
                 foreignField: 'driverId',
                 as: 'driver'
             }
        },
        {$unwind : '$driver' },
        {$sort : {count: -1}},
        {
           $project: {
               _id: 1,
               count: 1,
               origin: 1,
               deviceId: 1,
               'driver._id': 1,
               'driver.firstName': 1,
               'driver.lastName': 1,
           }
         }
     ])
    } catch (error) {
      return error;
    }
  }
}

ScanSchema.loadClass(Scan);
module.exports = mongoose.model('Scan', ScanSchema);