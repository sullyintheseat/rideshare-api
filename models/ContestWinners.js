const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const types = mongoose.SchemaTypes;

const ContestWinnerSchema = Schema({
   verifiedById : {
     type: types.ObjectId,
     required: true,
     ref: 'admins'
   },
   verifiedByEmail: {
    type: String,
    required: true,
    ref: 'admins'
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
  contestId: {
    type: types.ObjectId,
    required: true,
    ref: 'contests'
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'contestWinners' 
});
 
class ContestWinner {

}

ContestWinnerSchema.loadClass(ContestWinner);
module.exports = mongoose.model('ContestWinners', ContestWinnerSchema);