const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const ClientSchema = Schema({
  clientId: {
    type: String,
    default: null,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'clients' 
});

class Client {

}

ClientSchema.loadClass(Client);

module.exports = mongoose.model('Client', ClientSchema);