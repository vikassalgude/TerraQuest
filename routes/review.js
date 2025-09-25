const express=require('express');
const ExpressError = require('../utils/ExpressError.js');
const wrapAsync = require('../utils/wrapAsync');

const review = require('../models/review');
const router=express.Router({mergeParams:true});
const {listingSchema,reviewSchema}=require('../schema.js');
const Review=require('../models/review.js');
const Listing = require('../models/listing');
// const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
const { isLoggedIn, isReviewAuthor, validateReview } = require('../middleware.js');

const reviewController=require('../controllers/review.js')

//Reviews
//Post route
router.route('/')
  .post(isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//Delete review route
router.route("/:reviewId")
  .delete(isLoggedIn,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports=router;



