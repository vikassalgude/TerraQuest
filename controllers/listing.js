// const Listing=require('../models/listing');

// module.exports.index=async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render('listings/index.ejs', { allListings });
// };

// module.exports.renderNewForm=(req, res) => {
//   res.render('listings/new.ejs');
// };

// module.exports.showListing=async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id)
//   .populate({path:"reviews",populate:{path:"author"}})
//   .populate("owner");
//   if (!listing) {
//     req.flash("error", "Listing You requested doesn't exist!");
//     return res.redirect('/listings')
//   }
//   res.render('listings/show.ejs', { listing });
// };

// module.exports.createListing=async (req, res) => {
//   const url=req.file.path;
//   const filename=req.file.filename;
//   console.log(url,'/n',filename);
//   const data = req.body.listing || req.body;
//   const newListing = new Listing(data);
//   newListing.owner = req.user._id;
//   newListing.image={url,filename};
//   await newListing.save();
//   req.flash("success", "New Listing Created!");
//   res.redirect('/listings');
// };

// module.exports.renderEditForm=async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     req.flash("error", "Listing You requested doesn't exist!");
//     return res.redirect('/listings')
//   }
//   let orginalImageUrl=listing.image.url;
//   orginalImageUrl=orginalImageUrl.replace('/upload','/upload/h_100,w_150')
//   res.render('listings/edit.ejs', { listing,orginalImageUrl});
// };


// module.exports.updateListing=async (req, res) => {
//   let { id } = req.params;
//   const data = req.body.listing || req.body;
//   let listing= await Listing.findByIdAndUpdate(id, { ...data });
//   if(req.file){
//   const url=req.file.path;
  
//   const filename=req.file.filename;
//   listing.image={url,filename};
//   await listing.save();
//   }
//   // console.log("updated")
//   req.flash("success", "Listing Updated!");
//   res.redirect(`/listings/${id}`);
// };

// module.exports.destroyListing=async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndDelete(id);
//   req.flash("success", "Listing Deleted!");
//   res.redirect('/listings');
// }

const Listing = require('../models/listing');
const axios = require('axios');

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render('listings/index.ejs', { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render('listings/new.ejs');
};

module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested doesn't exist!");
    return res.redirect('/listings');
  }
  res.render('listings/show.ejs', { listing });
};

module.exports.createListing = async (req, res) => {
  try {
    const url = req.file.path;
    const filename = req.file.filename;
    const data = req.body.listing || req.body;

    // Default coordinates (Delhi)
    let coordinates = [77.2090, 28.6139];

    // Fetch coordinates from Nominatim if location exists
    if (data.location) {
      const geoData = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: data.location,
          format: "json",
          limit: 1
        }
      });

      if (geoData.data.length > 0) {
        coordinates = [
          parseFloat(geoData.data[0].lon),
          parseFloat(geoData.data[0].lat)
        ];
      }
    }

    const newListing = new Listing(data);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = { type: "Point", coordinates };

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect('/listings');
  } catch (e) {
    console.log(e);
    req.flash("error", "Something went wrong while creating listing.");
    res.redirect('/listings/new');
  }
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested doesn't exist!");
    return res.redirect('/listings');
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace('/upload', '/upload/h_100,w_150');
  res.render('listings/edit.ejs', { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body.listing || req.body;

    let listing = await Listing.findByIdAndUpdate(id, { ...data });

    // Update image if uploaded
    if (req.file) {
      const url = req.file.path;
      const filename = req.file.filename;
      listing.image = { url, filename };
    }

    // Update coordinates if location changed
    if (data.location) {
      const geoData = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          q: data.location,
          format: "json",
          limit: 1
        },
         headers: {
          // *** CRITICAL: Change this to a unique identifier for your app ***
          // Example: 'YourAppName/1.0 (YourContactEmail@example.com)'
          'User-Agent': 'TerraQuestApp/1.0 (contact@myportfolio.com)'
        }
      });

      if (geoData.data.length > 0) {
        listing.geometry = {
          type: "Point",
          coordinates: [
            parseFloat(geoData.data[0].lon),
            parseFloat(geoData.data[0].lat)
          ]
        };
      }
    }

    await listing.save();
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  } catch (e) {
    console.log(e);
    req.flash("error", "Something went wrong while updating listing.");
    res.redirect(`/listings/${req.params.id}/edit`);
  }
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect('/listings');
};
