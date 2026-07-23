const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const uri = process.env.MONGODB_URI;
console.log("MONGODB_URI:", uri);

if (!uri) {
  console.error("MONGODB_URI is not defined in .env!");
  process.exit(1);
}

console.log("Attempting to connect to MongoDB...");
mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000
}).then(() => {
  console.log("SUCCESS: Connected to MongoDB successfully!");
  process.exit(0);
}).catch(err => {
  console.error("FAILURE: MongoDB connection failed!");
  console.error(err);
  process.exit(1);
});
