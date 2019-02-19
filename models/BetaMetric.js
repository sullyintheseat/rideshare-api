const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const BetaMetricSchema = Schema({
  uiEvent:{
    type: String,
    index: true
  },
  sender: {
    type: String,
    default: null
  }
},
{
  timestamps: true,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'betaMetrics'
});


 
class BetaMetric {
  
  static async createMetric (action) {
    try { 
      await this.create(action);
      return true;
    } catch (err) {
      return false;
    }
  }

}

BetaMetricSchema.loadClass(BetaMetric);
module.exports = mongoose.model('BetaMetric', BetaMetricSchema);