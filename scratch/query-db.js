const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const uri = process.env.MONGODB_URI;

// Define simple schemas
const JudgmentSchema = new mongoose.Schema({
  title: String,
  createdAt: Date
}, { collection: 'judgments' });

const ArticleSchema = new mongoose.Schema({
  title: String,
  createdAt: Date
}, { collection: 'articles' });

async function query() {
  await mongoose.connect(uri);
  console.log("Connected to MongoDB.");

  const Judgment = mongoose.models.Judgment || mongoose.model('Judgment', JudgmentSchema);
  const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

  const juds = await Judgment.find({}).sort({ createdAt: -1 }).limit(5);
  console.log("\n--- RECENT JUDGMENTS IN MONGODB ---");
  juds.forEach(j => {
    console.log(`- ${j.title} (Created: ${j.createdAt})`);
  });

  const arts = await Article.find({}).sort({ createdAt: -1 }).limit(5);
  console.log("\n--- RECENT ARTICLES IN MONGODB ---");
  arts.forEach(a => {
    console.log(`- ${a.title} (Created: ${a.createdAt})`);
  });

  process.exit(0);
}

query().catch(err => {
  console.error(err);
  process.exit(1);
});
