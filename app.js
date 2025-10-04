if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}


const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const session=require('express-session');
const MongoStore=require('connect-mongo');
const flash=require('connect-flash');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user.js')

const {listingSchema,reviewSchema}=require('./schema.js');
const Review=require('./models/review.js');

const listingRouter=require('./routes/listings.js')
const reviewRouter=require('./routes/review.js');
const userRouter=require('./routes/user.js');
const ejsMate = require('ejs-mate');
const review = require('./models/review.js');
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const dbUrl=process.env.ATLASDB_URL;
main()
  .then(() => {
    console.log('Connection successful');
  })
  .catch((err) => {
    console.error('Error occurred:', err);
  });


async function main() {
  await mongoose.connect(dbUrl);
}

const store=MongoStore.create({
  mongoUrl:dbUrl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600
})

store.on("error",()=>{
  console.log("ERROR in MONGO SESSION STORE",err)
})
const sessionOptions={
  store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
   cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}

app.get('/', (req, res) => {
  res.redirect("/listings");
});



app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currUser = req.user;
  // This is a new comment to force an update!
  next();
})
// app.get('/demouser',async(req,res)=>{
//    let fakeUser=new User({
//     email:"dummy@gmail.com",
//     username:"vikas"
//    });
//    let registerUser=await User.register(fakeUser,"helloworld");
//    res.send(registerUser);
// })
app.get('/demouser', async(req,res)=>{
    let fakeUser = new User({
        email: "vikas.dummy@example.com", // A dummy email for Vikas
        username: "Vikas"
    });
    let registerUser = await User.register(fakeUser, "helloworld");
    res.send(registerUser);
})



app.use('/listings',listingRouter);
app.use('/',userRouter);
app.use('/listings/:id/reviews',reviewRouter);



app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render('error.ejs', { message });
});
app.listen(8080, () => {
  console.log("Server is running at http://localhost:8080");
});