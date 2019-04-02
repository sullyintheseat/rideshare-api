const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const StateSchema = Schema({
  stateId: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
    
  },
  name: {
    type: String,
    default: null,
    required: true,
    unique: true
  }
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  id: false,
  collection: 'states' 
});

StateSchema.virtual('cities', {
  ref: 'City',
  localField:'stateId',
  foreignField: 'stateId'
});
 
class State {

  static async createState (state) {
    try {
      return await this.create(state);
    } catch (error) {
      return error;
    }
  }

  static async createStates (states) {
    let state;
    try {
      for(let i=0; i < states.length; i++) {
        state = { name: states[i] };
        await this.create(state);
      }
      return true;
    } catch (error) {
      return error;
    }
  }

  static async getStatesAndCities() {
    try {
      return await this.find()
        .populate('cities')
        .exec();
    } catch (error) {
      return error;
    }
  }
}

StateSchema.loadClass(State);
module.exports = mongoose.model('State', StateSchema);