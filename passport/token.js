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
      return jwt.sign(params,process.env.USER_HASH);
    } catch (err) {
      throw err;
    }
  },

  generateTokenAdmin: user => {
    const expires = moment()
      .add(process.env.ADMIN_TTL, "hours")
      .valueOf();
    let params = {
      sub: user._id,
      exp: expires
    };
    try {
      return jwt.sign(params,process.env.ADMIN_HASH);
    } catch (err) {
      throw err;
    }
  },

    
};
