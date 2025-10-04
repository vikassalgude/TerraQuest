

const User = require('../models/user.js');

module.exports.renderSignUpForm=(req,res) => {
  res.render("users/signup.ejs");
};


module.exports.signup= async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registerUser = await User.register(newUser, password);

    req.login(registerUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Terraquest");
      res.redirect('/listings');
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect('/signup');
  }
};

module.exports.renderLoginForm=(req,res) => {
  res.render('users/login.ejs');
};

module.exports.login=async(req,res) => {
    req.flash("success", "Welcome to Terraquest. You are logged in");
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
  }

module.exports.logOut=(req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash("success", "You are logged out now");
    res.redirect('/listings');
  });
}