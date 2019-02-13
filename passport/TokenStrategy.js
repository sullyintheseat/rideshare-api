const User = require('../models/User')
const Admin = require('../models/Admin');

class TokenStrategy {
  constructor() {
    this.verifyBasic= this.verifyBasic.bind(this);
    this.verifyAuth = this.verifyAuth.bind(this);
    this.verifyAdmin = this.verifyAdmin.bind(this);
  }

  async verifyBasic(jwtPayload, done) {
    if (jwtPayload.exp < Date.now()) {
      return done(null, false, { message: 'EXPIRED TOKEN'});
    }
    let user;

    
    try {
      
      user = await User.getById(jwtPayload.sub);
      if (Boolean(user)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'NOT FOUND' });
      }
    } catch (err) {
      return done(err, false);
    }
  }

  async verifyAuth(jwtPayload, done) {
    if (jwtPayload.exp < Date.now()) {
      return done(null, false, { message: 'EXPIRED TOKEN' });
    }
    let user;

    
    try {
      
      user = await User.getById(jwtPayload.sub);
      if (Boolean(user)) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'NOT FOUND' });
      }
    } catch (err) {
      return done(err, false);
    }
  }

  async verifyAdmin(jwtPayload, done) {

    if (jwtPayload.exp < Date.now()) {
      return done(null, false, { message: LOGIN_ERRORS.TOKEN_EXPIRED });
    }

    const admin = await Admin.getById(jwtPayload.sub);
    try {
      if (admin) {
        let userId = admin._id;
        //let result = await AdminUserSession.exists(userId);
        if (userId) {
          return done(null, admin);
        } else {
          return done(null, false, { message: LOGIN_ERRORS.SESSION_EXPIRED });
        }
      } else {
        return done(null, false, { message: LOGIN_ERRORS.NOT_ADMIN });
      }
    } catch (err) {
      logger.error(err);
      return done(err, false);
    }
  }

}

module.exports = new TokenStrategy();
