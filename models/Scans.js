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
  advertId:  {
    type: String,
    default: null,
    required: true
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

  

}

ScanSchema.loadClass(Scan);
module.exports = mongoose.model('Scan', ScanSchema);