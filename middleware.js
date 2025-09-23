// const Listing=require("./models/listing")
// const ExpressError=require('./utils/ExpressError.js');
// const {listingSchema}=require('./schema.js')
// module.exports.isLoggedIn=(req,res,next)=>{
//  // console.log(req.path,"..",req.originalUrl);
//   if(!req.isAuthenticated()){
//     req.session.redirectUrl=req.originalUrl;
//     req.flash("error","you must be logged in to create listing");
//     return res.redirect('/login');
//   }
//   next();
// }
// module.exports.saveRedirectUrl=(req,res,next)=>{
//    if(req.session.redirectUrl){
//     res.locals.redirectUrl=req.session.redirectUrl;
// }
// next();
// };

// // module.exports.isOwner=async(req,res,next)=>{
// //   let { id } = req.params;
// //   const data = req.body.listing || req.body;
// //   let listing=await Listing.findById(id);
// //   if(!listing.owner._id.equals(res.locals.currUser._id)){
// //     req.flash("error","You don't have permission to update");
// //     return res.redirect(`/listings/${id}`);
// //     next();
// //   }
// // }
// module.exports.isOwner = async (req, res, next) => {
//   try {
//     let { id } = req.params;
//     let listing = await Listing.findById(id);

//     if (!listing) {
//       req.flash("error", "Listing not found!");
//       return res.redirect("/listings");
//     }

//     // Check if the logged-in user owns this listing
//     if (!listing.owner.equals(res.locals.currUser._id)) {
//       req.flash("error", "You are not owner of this listing.");
//       return res.redirect(`/listings/${id}`);
//     }

//     // ✅ Passes ownership check
//     next();
//   } catch (err) {
//     next(err); // let your error handler catch it
//   }
// };

// module.exports= validateListing=(req,res,next)=>{
//     let {error}=listingSchema.validate(req.body);
//     // console.log(result);
//     if(error){
//       let errMsg=error.details.map((el)=>el.message).join(",")
//       throw new ExpressError(400,errMsg);
//     }
//     next();
// }
const Listing = require("./models/listing");
const Review=require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema ,reviewSchema} = require("./schema.js");

// Middleware to check login
function isLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a listing");
    return res.redirect("/login");
  }
  next();
}

// Middleware to save redirect URL
function saveRedirectUrl(req, res, next) {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

// Middleware to check ownership
async function isOwner(req, res, next) {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);

    if (!listing) {
      req.flash("error", "Listing not found!");
      return res.redirect("/listings");
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
      req.flash("error", "You are not the owner of this listing.");
      return res.redirect(`/listings/${id}`);
    }

    next();
  } catch (err) {
    next(err);
  }
}
function validateReview(req, res, next) {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
}
// Middleware to validate listing schema
function validateListing(req, res, next) {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
}

async function isReviewAuthor(req,res,next){
     let {id,reviewId }=req.params;
     let review=await Review.findById(reviewId);
     if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You are not the author of this listing");
      return res.redirect(`/listings/${id}`);
     }
     next();
}
// ✅ Export all together
module.exports = {
  isLoggedIn,
  saveRedirectUrl,
  isOwner,
  validateListing,
  isReviewAuthor,
  validateReview
};
