const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ContestSchema = Schema({
  title: {
    type: String,
    default: null,
    required: true
  },
  startDate: {
    type: Date,
    required: true,
    default: null

  },
  endDate: {
    type: Date,
    required: true,
    default: null
  },
  deadLine: {
    type: Date,
    required: true,
    default: null
  },
  tickets: {
    
  },
  eventDate: {
    type: Date,
    default: null
  },
  location: {

  },
  arv: {

  },
  notifyBy: {
    type: Date,
    required: true,
    default: null
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'contests' 
});


 
class Contest {

  static async createContest(data) {
    try {
      return await this.create(data);
    } catch (error) {
      return false;
    }
  }

  static async getActiveContests() {
    try {
      return await this.create(data);
    } catch (error) {
      return false;
    }
  }
}

ContestSchema.loadClass(Contest);
module.exports = mongoose.model('Contest', ContestSchema);