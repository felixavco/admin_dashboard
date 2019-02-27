const passport = require('passport');


exports.GET = (req, res) => {
  res.render('auth/login', {title: "Login"});
}

exports.POST =  (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: false
  })(req,res,next)
};