const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const shortId = require('shortid');

const TagSchema = Schema({
  tagId: {
    type: String,
    index: true
  },
  programId: {
    type: ObjectId,
    required: true
  },
  tagShort: {
    type: String,
    default: shortId.generate,
    unique: true,
    index: true
  }
},
{
  timestamps: true,
  id: false,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'tags'
});


 
class Tag {

  static async createBetaTags(prefix, programId, total) {
    let all = parseInt(total);
    try {
      let numb = await this.countDocuments().exec();
      let me = Boolean(numb);
      if(!me){
        for(let j=0; j < all; j++)
        {
          let val = `${prefix}${j}`;
          await this.create({
            tagId: val,
            programId
          });
        }
      } else {
        for(let j=0; j < all; j++)
        {
          let val = `${prefix}${j + Number(numb)}`;
          await this.create({betaTagId: val});
        }
      }
      return 'done'
    } catch (err) {
      return err;
    }
  }

  static async getBetaTagUrls(){
    try {
      let results = await this.find({collected: false})
        .exec();

      let urls = [];

      for(let i = 0; i < results.length; i++){
        urls.push(`https://ads.digitalseat.io/${results[i].betaTagId}`);
      }

      return {data :urls};

    } catch (err) {
      return err;
    }
  }

  static async getAllBeta(){
    try {
      let result = await this.find()
        .exec();
      return result;
    } catch (err) {
      return err;
    }
  }

  static async getBetaProfile(id) {
    try {
      let result = await this.findOne({betaId: id})
        .exec();
      return result;
    } catch (err) {
      return err;
    }
  }

  static async deleteUser(id) {
  
    try {
      let result = await this.findOne({_id: id})
        .exec();
      return result;
    } catch (err) {
      return err;
    }

  }

}

TagSchema.loadClass(Tag);
module.exports = mongoose.model('Tag', TagSchema);