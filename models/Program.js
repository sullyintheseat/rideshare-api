const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortId = require('shortid');

const ProgramSchema = Schema ({
  name: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  programShort: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true,
  },
  programTarget: {
    type: String,
    default: null
  }
},
{
  timestamps: true,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'programs'
});

class Program {
  
  static async createProgram(data) {
    let program = data;
    
    try{ 
      if(Boolean(program.name)){
        let result = await this.create(program);
        return result;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }

  static async getPrograms() {
    try {

    } catch (err) {
      return err;
    }
  }

  static async getProgram(id) {
    try {

    } catch (err) {
      return err;
    }
  }
}

ProgramSchema.loadClass(Program);
module.exports = mongoose.model('Program', ProgramSchema);