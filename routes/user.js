// const express=require('express');
// const router=express.Router();
// const User=require('../models/user.js');
// const user = require('../models/user.js');
// const wrapAsync = require('../utils/wrapAsync.js');
// const passport = require('passport');
// const { saveRedirectUrl } = require('../middleware.js');
// router.get('/signup',(req,res)=>{
//   res.render("users/signup.ejs")
// })

// router.post('/signup',wrapAsync( async(req,res)=>{
//   try{
//   let {username,email,password}=req.body;
//   const newUser=new User({username,email});
//   const registerUser=await User.register(newUser,password);
//   console.log(registerUser);
//   req.login(registerUser,(err)=>{
//     if(err){
//       return next(err)
//     }
//       req.flash=("success","Welcome to Wanderlust");
//       res.redirect('/listings');
    
//   })

//   }
//   catch(e){
//     req.flash("error",e.message);
//     res.redirect('/signup')
//   }
// }))

// router.get('/login',(req,res)=>{
//   res.render('users/login.ejs');
// });
// router.post('/login',saveRedirectUrl,passport.authenticate('local',{failureRedirect:'/login',failureFlash:true}),async(req,res)=>{
//  req.flash("success",'Welcome to wanderlust.You are logged in');
//  let redirectUrl=res.locals.redirectUrl||'/listings';
//  if(res.locals.redirectUrl)
//  res.redirect(res.locals.redirectUrl);
//  res.redirect('/listings');
//  res.redirect(redirectUrl)

// });

// router.get('/logout',(req,res)=>{
//   req.logOut((err)=>{
//     if(err){
//       return next(err);
//     }else{
//       req.flash("success","You are logout now");
//       res.redirect('/listings');
//     }
//   })
// })
// module.exports=router;
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
