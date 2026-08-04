const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const dbConnect = require('../src/lib/db').default;
const Judgment = require('../src/lib/models/Judgment').default;
const { patchMongooseModels } = require('../src/lib/mongooseAdapter');

async function test() {
  console.log("Starting query test...");
  try {
    patchMongooseModels();
    await dbConnect();
    
    const q = 'Section 90-A';
    const court = 'all';
    
    let query = { status: 'published' };
    
    let regexPattern = q;
    if (/^Section\s+/i.test(q)) {
      regexPattern = q.replace(/^Section\s+/i, '(Section|Sec\\.?)\\s+');
    } else if (/^Sec\\.?\s+/i.test(q)) {
      regexPattern = q.replace(/^Sec\\.?\s+/i, '(Section|Sec\\.?)\\s+');
    }

    query.$or = [
      { title: { $regex: regexPattern, $options: 'i' } },
      { citation: { $regex: regexPattern, $options: 'i' } },
      { caseNumber: { $regex: regexPattern, $options: 'i' } },
      { parties: { $regex: regexPattern, $options: 'i' } },
      { judgeName: { $regex: regexPattern, $options: 'i' } },
      { fullText: { $regex: regexPattern, $options: 'i' } }
    ];

    console.log("Formed Query:", JSON.stringify(query, null, 2));
    const list = await Judgment.find(query)
      .sort({ isPinned: -1, judgmentDate: -1 })
      .limit(50);
      
    console.log("Query succeeded! Found items count:", list.length);
  } catch (err) {
    console.error("Query failed with error:", err);
  }
  process.exit(0);
}

test();
