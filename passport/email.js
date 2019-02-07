const generateToken = require('./token').generateToken;
const generateAdminToken =require('./token').generateAdminToken;

const Email = require('$common/models/Email');
const User = require('$common/models/User.schema');


class EmailStrategy {
  constructor() {
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
  }

  async login(email, password, done) {
    let user;

    try {
      email = email.toLowerCase();
      user = await User.getByUserLogin({email});
    } catch (err) {
      logger.error(err);
      return done(err, null);
    }

    if (!user) {
      return done(null, false, { message: 'LOGIN_ERRORS.NOT_FOUND' });

    } else if (!user.checkPassword(password)) {
      return done(null, false, { message: 'LOGIN_ERRORS.PASSWORD_MISMATCH' });
    }
    else {

      try {
        user.token = await generateToken(user);
        delete user._doc.password;
        return done(null, user);
      } catch (err) {
        logger.error(err);
        return done(err, null);
      }
    }
  }

  async signup(req, email, password, done) {
    const data = req.body;
    let { userName } = data;

    if (!userName) {
      return done(null, false, { message: 'SIGNUP_ERRORS.MISSING_DATA' });
    }

    email = email.toLowerCase();
    if (!utils.checkEmail(email)) {
      return done(null, false, { message: 'SIGNUP_ERRORS.EMAIL_INVALID' });
    }
   if (!utils.checkPasswordStrength(password)) {
      return done(null, false, { message: SIGNUP_ERRORS.WEAK_PASSWORD });
    }
    if (!utils.checkUsernameLength(userName)) {
      return done(null, false, { message: SIGNUP_ERRORS.USER_NAME_INVALID });
    } 

    try {
      let emailObj = await User.getByQuery({ email });
      if (emailObj) {
        return done(null, false, { message: SIGNUP_ERRORS.EMAIL_EXISTS })
      }
      let usernameObj = userName && await User.getByQuery({ userName });
      if (usernameObj) {
        return done(null, false, { message: SIGNUP_ERRORS.USER_NAME_EXISTS })
      }
    } catch (err) {
      logger.error(err);
      return done(err, null);
    }

    const dataLength = data && Object.getOwnPropertyNames(data).length;
    if (data && dataLength > 0) {
      const filters = ['email', 'userName', 'password', 'firstName', 'lastName', 'regionId', 'countryId', 'stateCode', 'city', 'postalCode', 'organization', 'isBeta', 'inviteCode', 'ip'];
      let acceptedFields = {};
      Object.keys(data).forEach(param => {
        let item = utils.checkFilter(param, filters);
        if (item) {
          acceptedFields[item] = data[item];
        }
      });

      if (acceptedFields && Object.getOwnPropertyNames(acceptedFields).length) {
        //set a random avatarId used in the default avatar url
        acceptedFields.defaultAvatar = Math.floor((Math.random() * cfg.avatarDefaultLimit) + 1);
        try {
          let user = await User.post(acceptedFields);
          if (user) {
            //send signup email
            const emailModel = new Email();
            await emailModel.sendSignupMail(user, 'en');
          }
          return done(null, user);
        } catch (err) {
          logger.error(err);
          return done(err, null);
        }
      } else {
        return done(err, null);
      }
    } else {
      return done(err, null);
    }
  }
}

module.exports = new EmailStrategy();