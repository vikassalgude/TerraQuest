const express=require('express');
const app=express();
const users=require('./routes/user');
const posts=require('./routes/post');
const session=require('express-session');
const flash = require("connect-flash");
const path = require("path");
const { createRequire } = require('module');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
// const cookieParser=require('cookie-parser');
// app.use(cookieParser('secret'))

// app.get("/",(req,res)=>{
//   console.dir(req.cookies);
//   res.send("Hello ,I'm root");
// });
// app.get('/verify',(req,res)=>{
//   console.log(req.signedCookies);
//   res.send('verified');
// })

// app.use("/users",users);

// app.use("/posts",posts);

// app.get('/getsignedcookies',(req,res)=>{
  
//   res.cookie('Made-in',"India",{signed:true});
//   res.send("sent you signedcookies")
// });

// app.get('/getcookies',(req,res)=>{
//   res.cookie('Hello');
//   res.cookie('greet',"namaste");
//   res.cookie('name',"vikas");
//   res.send('sent you cookies');
// });

// app.get('/get',(req,res)=>{
//    let{name="anonymous"}=req.cookies;
//    res.send(`Hii,${name}`);
// })

// app.use(session(
//   {
//     secret:"mysupersecretstring",
//     resave:false,
//     saveUninitialized:true,
//   }
// ));
const sessionOptions=
    {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
    cookie: { secure: false }  
  }

app.use(session(sessionOptions));
app.use(flash());
app.use((req,res,next)=>{
   const successMessage = req.flash('success');
  res.locals.successMsg=successMessage[0] ;
  res.locals.errorMsg=req.flash('error');
  // console.log(successMessage);
  next()
})
app.get('/register',(req,res)=>{
  let {name="anonymous"}=req.query;
  // console.log(req.session);
  req.session.name=name;
  // console.log(req.session.name);
  // res.send(`${req.session.name}`);
  if(name!="anonymous")
  req.flash('success','user registered successfully');
  else
  req.flash('error','user not registered ')
  res.redirect('/hello')
});

// app.get('/hello',(req,res)=>{
//   console.log(req.flash('success'))
//   // res.send(`Hello,${req.session.name}`);
//   res.render('page.ejs',{name:req.session.name,msg: req.flash('success')[0] })
// });
app.get('/hello',(req,res)=>{
  // Retrieve the flash message and store it in a variable

  // Pass the retrieved message to the EJS template
  res.render('page.ejs', {
    name: req.session.name});
});
// app.get('/reqcount',(req,res)=>{
//   if(req.session.count)
//   req.session.count++;
//   else
//   req.session.count=1;
//   res.send(`You send reqcount ${req.session.count} times`);
// });
// app.get('/test',(req,res)=>{
//   res.send("test successfull");
// })

app.listen(8080, () => {
  console.log("Server is running at http://localhost:8080");
});