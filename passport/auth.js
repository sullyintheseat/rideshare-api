const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const AnonymousStrategy = require("passport-anonymous").Strategy;

const ExtractJwt = require("passport-jwt").ExtractJwt;

const EmailStrategy = require("./EmailStrategy");
const TokenStrategy = require("./TokenStrategy");

const jwt = require("jsonwebtoken");

module.exports = passport => {
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      EmailStrategy.login
    )
  );


  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false
      },
      EmailStrategy.signup
    )
  );

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("token"),
    //secretOrKey:process.env.JWT_SECRET
    secretOrKeyProvider: (req, token, done) => {
      let error = null;
      let secret = null;

      jwt.verify(token, 'FuCKM0nk3Y', function (err) {
        if (err) {
          jwt.verify(token, 'FuCKM0nk3Y', function (err) {
            if (err) {
              error = err;
            } else {
              secret = 'FuCKM0nk3Y';
            }
          });
        } else {
          secret = 'FuCKM0nk3Y';
        }
      });

      done(error, secret);
    }
  };

  
  passport.use("jwt", new JwtStrategy(jwtOptions, TokenStrategy.verifyAuth));
  passport.use("jwt", new JwtStrategy(jwtOptions, TokenStrategy.verifyBasic));

  passport.use(new AnonymousStrategy());
 

};

module.exports.verifyBasic = passport =>
  passport.authenticate(["jwt", "anonymous"], { session: false });
module.exports.verifyAuth = passport =>
  passport.authenticate("jwt", { session: false });
