const generateToken = require('./token').generateToken;
const generateTokenAdmin = require('./token').generateTokenAdmin;
const User = require('../models/User');
const Admin = require('../models/Admin');
const LOGIN_ERRORS = 'Incorrect Information';
const SIGNUP_ERRORS = 'Error Signing Up';


class EmailStrategy {
  constructor() {
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.adminLogin = this.adminLogin.bind(this);
  }

  async login(req, email, password, done) {
    let user;
    email = email.toLowerCase();
    try {
      user = await User.getUser(email);
    } catch (err) {
      return done(err, null);
    }

    if (!user) {
      return done(null, false, { message: 'User not found' });

    } else if (user.disabled) {
      return done(null, false, { message: 'User Disabled'});
    }
    else {

      user = await User.verifyUser(email, password);
      if(user){
        try {
          let token = await generateToken(user);
          user.password = null
          let me = {
            _id: user._id,
            email: user.email,
            token
          }
          return done(null, me);
        } catch (err) {
          return done(err, null, 'Incorrect Login');
        }
      } else {
        return done('Incorrect Credentials', null, 'Incorrect Credentials');
      }
    }
  }

  async adminLogin(req, email, password, done) {
    let admin;
    email = email.toLowerCase();

    try {
      admin = await Admin.getAdmin(email);
    } catch (err) {
      return done(err, null);
    }
    
    if (!admin) {
      return done(null, false, { message: 'User not found' });

    } else if (admin.disabled) {
      return done(null, false, { message: 'User Disabled'});
    }
    else {

      admin = await Admin.verifyAdmin(email, password);

      if(admin){
        try {
          let token = await generateTokenAdmin(admin);
          admin.password = null
          let me = {
            _id: admin._id,
            email: admin.email,
            token
          }
          return done(null, me);
        } catch (err) {
          return done(err, null, 'Incorrect Login');
        }
      } else {
        return done('Incorrect Credentials', null, 'Incorrect Credentials');
      }
    }
  }

  async signup(email, password, done) {    
    let mail = email.toLowerCase();
    let bool = await User.userExists(email);
    if(!bool) {
      let user = await User.createUser({email: mail, password});
      return done(null, user);
    } else {
      return done ('user exists', null)
    }
  }


}

module.exports = new EmailStrategy();
