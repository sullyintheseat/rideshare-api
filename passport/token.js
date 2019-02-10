const jwt = require("jsonwebtoken");
const moment = require("moment");

module.exports = {
  generateToken: user => {
    const expires = moment()
      .add(30, "days")
      .valueOf();
    let params = {
      sub: user._id,
      exp: expires
    };
    try {
      return jwt.sign(params,'FuCKM0nk3Y');
    } catch (err) {
      logger.error(err);
      throw err;
    }
  },

    
};
