const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const AnonymousStrategy = require("passport-anonymous").Strategy;


module.exports = passport => {
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: false
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
        passReqToCallback: true
      },
      EmailStrategy.signup
    )
  );


  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader("token"),
    secretOrKey:process.env.JWT_SECRET
  };

  passport.use("jwt", new JwtStrategy(jwtOptions, TokenStrategy.verifyAuth));
  passport.use("jwt", new JwtStrategy(jwtOptions, TokenStrategy.verifyBasic));

  passport.use(new AnonymousStrategy());

};

module.exports.verifyBasic = passport =>
  passport.authenticate(["jwt", "anonymous"], { session: false });
module.exports.verifyAuth = passport =>
  passport.authenticate("jwt", { session: false });
