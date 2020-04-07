const passport = require('passport');

const SigninStrategy = require("./SigninStrategy");
const SignupStrategy = require("./SignupStrategy");

passport.use('local-signin', SigninStrategy);
passport.use('local-signup', SignupStrategy);

module.exports = passport;