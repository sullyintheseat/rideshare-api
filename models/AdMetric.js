const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdMetricSchema = Schema({
  advertiser: {
    type: String,
    default: null,
    required: true
  },
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
  collection: 'admetrics' 
});
 
class AdMetric {
  
  static async createMetric (data) {
    try {
      let result = await this.create(data);
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getMetrics(query) {
    try {
      let result = await this.find(query)
      .exec()
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getMetricBy(query) {
    try {
      let result = await this.find(query)
      .exec()
      return result;
    } catch (error) {
      return error;
    }
  }

  static async getScanCountForAd(advertiser) {
    try {
      let result = await this.find(advertiser)
      .countDocuments()
      .exec()
      return result;
    } catch (error) {
      return error;
    }
  }
}
AdMetricSchema.loadClass(AdMetric);
module.exports = mongoose.model('AdMetric', AdMetricSchema);