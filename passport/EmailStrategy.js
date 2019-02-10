const generateToken = require('./token').generateToken;
const User = require('../models/User');
const LOGIN_ERRORS = 'Incorrect Information';
const SIGNUP_ERRORS = 'Error Signing Up';


class EmailStrategy {
  constructor() {
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
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
