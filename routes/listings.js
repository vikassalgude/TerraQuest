// const express=require('express');
// const router=express.Router();
// const wrapAsync = require('../utils/wrapAsync.js');
// // const ExpressError = require('../utils/ExpressError.js');
// //const {listingSchema,reviewSchema}=require('../schema.js');
// const Listing = require('../models/listing.js');
// const {isLoggedIn, isOwner,validateListing}=require('../middleware.js');

// //index route
// router.get('/',wrapAsync( async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render('listings/index.ejs', { allListings });
// }));

// //new route
// router.get('/new',isLoggedIn, (req, res) =>{
//   res.render('listings/new.ejs');
// });
// //show route
// router.get('/:id',wrapAsync( async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id).populate("reviews").populate("owner");
//   if(!listing){
//     req.flash("error","Listing You requested doesn't exist!");
//     return res.redirect('/listings')
//   }
//   console.log(listing);
//   res.render('listings/show.ejs', { listing });
// }));



// //Create Route
// router.post('/',validateListing,isLoggedIn, wrapAsync(async (req, res) => {
//   // console.log("BODY:", req.body);
//   // res.send(req.body);
//   const data = req.body.listing || req.body;
//   const newListing = new Listing(data);
//   newListing.owner = req.user._id;
//   await newListing.save();

//   req.flash("success","New Listing Created!")
//   res.redirect('/listings');
// }));


// //Edit route
// router.get('/:id/edit',isLoggedIn,isOwner, async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//     if(!listing){
//     req.flash("error","Listing You requested doesn't exist!");
//     return res.redirect('/listings')
//   }
//   res.render('listings/edit.ejs', { listing });
// });

// //Update
// router.put('/:id',isLoggedIn,isOwner,validateListing, async (req, res) => {
//   let { id } = req.params;
//   const data = req.body.listing || req.body;
//   await Listing.findByIdAndUpdate(id, { ...data });
//   req.flash("success", "Listing Updated!")
//   res.redirect(`/listings/${id}`);
// });

// //delete route
// router.delete('/:id',isLoggedIn,isOwner, wrapAsync( async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log("Deleted");
//   req.flash("success", "Listing Deleted!")
//   res.redirect('/listings');
// }));

// module.exports=router;
// routes/listings.js




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















// //sOwner, wrapAsync(listingController.renderEditForm))//edit route

// // index route
// router.get('/', wrapAsync(listingController.index));

// // new route
// router.get('/new', isLoggedIn, listingController.renderNewForm);

// // show route
// router.get('/:id', wrapAsync(listingController.showListing));

// // create route
// router.post('/', isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// // edit route
// router.get('/:id/edit', isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// // update
// router.put('/:id', isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// // delete route
// router.delete('/:id', isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// module.exports = router; // ✅ keep only this export
