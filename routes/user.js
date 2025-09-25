
const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');
const userController=require('../controllers/user.js');

// Signup (GET + POST)
router.route("/signup")
  .get(userController.renderSignUpForm)              // GET /signup → show signup form
  .post(wrapAsync(userController.signup));           // POST /signup → create user

// Login (GET + POST)
router.route("/login")
  .get(userController.renderLoginForm)               // GET /login → show login form
  .post(
    saveRedirectUrl,
    passport.authenticate("local", { 
      failureRedirect: "/login", 
      failureFlash: true 
    }),
    userController.login                             // POST /login → authenticate + login
  );

// Logout (only GET here)
router.get("/logout", userController.logOut);

module.exports = router;
