const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PortalMetricSchema = Schema({
  fromTag: {
    vehicleId: {
      type: Schema.Types.ObjectId,
    },
    deviceId: {
      type: Schema.Types.ObjectId,
    },
    engagement: {
      type: String,
      required: true
    }
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'metrics' 
});


 
class PortalMetric {

  static async saveMetric(data) {
    try {
      let result = await this.create(data);
      return result;
    } catch (err) {
      return err;
    }
  }

}

PortalMetricSchema.loadClass(PortalMetric);
module.exports = mongoose.model('metric', PortalMetricSchema);