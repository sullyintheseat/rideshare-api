const mongoose = require('mongoose');
const CryptoJS = require('crypto-js');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const MessageSchema = Schema({
  email: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  message: {
    type: String
  },  
  acknowledged: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'messages' 
});


class Message {
  
  static async createMessage(message) {
    try{
      return await this.create(message);
    } catch(err) {
      return err;
    }
  }

}

MessageSchema.loadClass(Message);

module.exports = mongoose.model('Message', MessageSchema);