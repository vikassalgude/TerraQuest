




const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const Listing = require('../models/listing.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const listingController = require('../controllers/listing.js');
const multer=require('multer');
const {storage}=require('../cloudConfig.js');
const upload=multer({storage })

// index + create
router.route('/')
  .get(wrapAsync(listingController.index))   // index route
  .post(isLoggedIn, upload.single('listing[image]'),validateListing, wrapAsync(listingController.createListing)); // create route
  // .post((req,res)=>{
  //   console.log("Data added");
  //   res.send(req.file);
  // })
// new form (must be before :id, otherwise /new gets treated as an id)
router.get('/new', isLoggedIn, listingController.renderNewForm);

// show + update + delete
router.route('/:id')
  .get(wrapAsync(listingController.showListing))   // show route
  .put(isLoggedIn, isOwner, upload.single('listing[image]'),  validateListing, wrapAsync(listingController.updateListing)) // update
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // delete

// edit form
router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;















