const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const DeviceInformationSchema = Schema({
  
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'devices' 
});
//unique virtuals based on device types :)


class DeviceInformation {

}

DeviceInformationSchema.loadClass(DeviceInformation);

module.exports = mongoose.model('Device', DeviceInformationSchema);