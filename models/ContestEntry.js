const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContestEntrySchema = Schema({
  contest: {
    type: String,
    default: null,
    required: true,
    index: true
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
  firstName: {
    type: String,
    required: true,
    default: null
  },
  lastName: {
    type: String,
    required: true,
    default: null
  },
  mobile: {
    type: String,
    required: true,
    default: null
  },
  email: {
    type: String,
    required: true,
    default: null
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
  collection: 'contestEntries' 
});


 
class ContestEntry {
  
  static async createEntry(data) {
    let entry = data;
    try {
      let exists = await this.find({mobile: entry.mobile, contest: entry.contest}).exec();
      if(exists.length < 1){
        return await this.create(entry);
      } else {
        return true;
      };
    } catch(err) {
      return false;
    }
  }

  static async entriesByContest(contest) {
    try {
      let entries = await this.find(contest)
        .exec();
      return entries;
    } catch (err) {
      return false;
    }
  }

  static async getAllEntries() {
    try {
      let entries = await this.find()
        .sort({contest: 1})
        .exec();
      return entries;
    } catch (err) {
      return false;
    }
  }

  static async getContestList() {
    try {
      return await this.aggregate([
        {
            $group : {
                _id: '$contest'
            }
        }
    ]);
    } catch (err) {
      return false;
    }
  }

}

ContestEntrySchema.loadClass(ContestEntry);
module.exports = mongoose.model('ContestEntry', ContestEntrySchema);