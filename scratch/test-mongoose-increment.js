const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const dbConnect = require('../src/lib/db').default;
const Download = require('../src/lib/models/Download').default;

async function test() {
  console.log("Connecting database via dbConnect...");
  await dbConnect();
  
  console.log("Finding document 'dwn_mock_1' via Mongoose...");
  try {
    const download = await Download.findById('dwn_mock_1');
    if (!download) {
      console.log("Mongoose could not find download dwn_mock_1");
      return;
    }
    console.log("Found download via Mongoose:", download.toObject ? download.toObject() : download);
    
    download.downloadCount = (download.downloadCount || 0) + 1;
    console.log("Calling save() on Mongoose document...");
    const saved = await download.save();
    console.log("Save operation completed.");
    
    // Read again to verify
    const fresh = await Download.findById('dwn_mock_1');
    console.log("Freshly queried document downloadCount:", fresh.downloadCount);
  } catch (err) {
    console.error("Error during Mongoose operation:", err);
  }
}

test().then(() => process.exit(0));
