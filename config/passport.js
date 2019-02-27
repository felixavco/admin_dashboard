const localStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');


module.exports = (passport) => {
  passport.use(new localStrategy({usernameField: 'email'}, async (email, password, done) => {
    try {
      const user = await User.findOne({email});
      if(!user) return done(null, false, {message: "No user found!"});
      
      //If there is a user check if the password is correct
      const isMatch = await bcrypt.compare(password, user.password)
      if(isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: "Incorrect Password"});
      }
    } catch (err) {
      console.error(err);
    }
  }));

  passport.serializeUser((user, done) => done(null, user.id));
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });

}
