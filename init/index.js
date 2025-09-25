
const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
  console.log('✅ Connection successful');

  await initDB(); // Seed DB after connection
}

async function initDB() {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: '68ce59b5b0b4bdf07ef9e8b0',
    geometry: obj.geometry || { type: "Point", coordinates: [77.2090, 28.6139] } // Delhi default
  }));
  await Listing.insertMany(initData.data);
  console.log("✅ Data was initialized");
}

main().catch((err) => {
  console.error('❌ Error occurred:', err);
});
