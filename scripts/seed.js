const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load env variables
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/rrlkp';

// Self-contained schema definitions for simple node execution
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'admin' },
  createdAt: { type: Date, default: Date.now }
});

const ArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  summary: { type: String },
  category: { type: String, required: true },
  author: { type: String, default: 'Admin' },
  featuredImage: { type: String },
  tags: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const JudgmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  citation: { type: String, required: true, unique: true },
  caseNumber: { type: String, required: true },
  courtName: { type: String, required: true },
  parties: { type: String, required: true },
  judgeName: { type: String },
  judgmentDate: { type: Date, required: true },
  summary: { type: String },
  importantPoints: [{ type: String }],
  fullText: { type: String, required: true },
  pdfUrl: { type: String },
  pdfData: { type: String },
  lawsCited: [{ type: String }],
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const RevenueLawSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  description: { type: String },
  fullText: { type: String },
  sections: [{
    sectionNumber: { type: String },
    title: { type: String },
    content: { type: String }
  }],
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

const NotificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  refNumber: { type: String },
  department: { type: String, default: 'Revenue Department, Government of Rajasthan' },
  publishDate: { type: Date, default: Date.now },
  summary: { type: String },
  pdfUrl: { type: String },
  pdfData: { type: String },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

const DownloadSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  fileType: { type: String, default: 'PDF' },
  fileSize: { type: String },
  fileUrl: { type: String },
  fileData: { type: String },
  downloadCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const GlossarySchema = new mongoose.Schema({
  term: { type: String, required: true, unique: true },
  definition: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);
const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);
const Judgment = mongoose.models.Judgment || mongoose.model('Judgment', JudgmentSchema);
const RevenueLaw = mongoose.models.RevenueLaw || mongoose.model('RevenueLaw', RevenueLawSchema);
const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);
const Download = mongoose.models.Download || mongoose.model('Download', DownloadSchema);
const Glossary = mongoose.models.Glossary || mongoose.model('Glossary', GlossarySchema);

async function seed() {
  console.log('Connecting to database...');
  await mongoose.connect(MONGODB_URI);
  console.log('Connected. Clearing collections...');
  await Promise.all([
    User.deleteMany({}),
    Article.deleteMany({}),
    Judgment.deleteMany({}),
    RevenueLaw.deleteMany({}),
    Notification.deleteMany({}),
    Download.deleteMany({}),
    Glossary.deleteMany({})
  ]);

  console.log('Seeding default administrator...');
  const hashedPassword = await bcrypt.hash('Admin@Rajasthan2026', 10);
  await User.create({
    email: 'admin@rajasthanrevenue.law',
    password: hashedPassword,
    name: 'Super Admin',
    role: 'admin'
  });

  console.log('Seeding statutory revenue laws...');
  await RevenueLaw.create([
    {
      title: "Rajasthan Land Revenue Act, 1956",
      slug: "rajasthan-land-revenue-act-1956",
      category: "Acts",
      description: "An Act to consolidate and amend the law relating to land revenue, the powers of revenue officers, administration, land records and boundary disputes in Rajasthan.",
      fullText: "<h2>Rajasthan Land Revenue Act, 1956</h2><p>This baseline Act establishes the hierarchy of revenue officers starting from the Tehsildar up to District Collectors, Divisional Commissioners, and finally the Board of Revenue Ajmer as the final court of revision and appeal.</p>",
      sections: [
        { sectionNumber: "90-A", title: "Use of agricultural land for non-agricultural purpose", content: "No person holding agricultural land shall use the same or any part thereof for non-agricultural purposes except with the written permission of the State Government or the Sub-Divisional Officer. Violation of this section leads to regularisation charges or eviction." },
        { sectionNumber: "91", title: "Unauthorised occupation of land", content: "Any person occupying land without authority shall be liable to eviction by the Tehsildar, and subject to penalty up to thirty times the annual revenue assessment." },
        { sectionNumber: "75", title: "Appeals", content: "Lays down the provisions for appeal. An appeal shall lie from an original order of a Tehsildar to the Collector, from an original order of the Collector to the Revenue Appeals Commissioner, and from RAC to the Board of Revenue." }
      ]
    },
    {
      title: "Rajasthan Tenancy Act, 1955",
      slug: "rajasthan-tenancy-act-1955",
      category: "Acts",
      description: "An Act to consolidate and amend the law relating to tenancies, agricultural holdings, lease rights, rent, and ejectment of tenants in Rajasthan.",
      fullText: "<h2>Rajasthan Tenancy Act, 1955</h2><p>This Act governs agricultural holdings, tenancy rights (Khatedari), rights of transfer, partition suits, and injunctions against trespassers.</p>",
      sections: [
        { sectionNumber: "53", title: "Partition of holding", content: "A khatedar tenant may sue for partition of his holding. The division of holding is decided by the Assistant Collector / SDO on the basis of share assessment and revenue maps." },
        { sectionNumber: "188", title: "Injunction against trespass", content: "A tenant may sue for a permanent injunction to restrain any person from trespassing on, or committing any act of damage to, his agricultural holding." },
        { sectionNumber: "251", title: "Rights of way and easements", content: "Gives powers to the Tehsildar to settle disputes regarding rights of way, passage, or easement over agricultural lands on application by any affected tenant." }
      ]
    }
  ]);

  console.log('Seeding baseline judgments...');
  await Judgment.create([
    {
      title: "Kalyan Singh vs. State of Rajasthan",
      citation: "2026 RRD 182",
      caseNumber: "Rev.Appeal/45/2025",
      courtName: "Board of Revenue, Ajmer",
      parties: "Kalyan Singh vs. State of Rajasthan",
      judgeName: "Hon'ble Shri S. K. Sharma, Member",
      judgmentDate: new Date(),
      summary: "Decided that conversion under 90-A is final once commercial activity starts and cannot be unilaterally reversed by the Tehsildar without a hearing.",
      importantPoints: [
        "Once non-agricultural land conversion under Section 90-A is approved, the Tehsildar cannot revoke the order without giving a show-cause notice.",
        "Revenue officers must follow natural justice guidelines in partition and mutation revisions."
      ],
      fullText: "<h2>Judicial Analysis</h2><p>This revision petition was directed against the order of the Collector. The petitioner submitted that land conversion charges were fully paid under Section 90-A. The Board ruled that a conversion, once completed and integrated with local masterplans, cannot be unilaterally reviewed without judicial reference.</p>",
      lawsCited: ["Section 90-A Land Revenue Act", "Natural Justice Guidelines"]
    },
    {
      title: "Smt. Kamala Devi vs. Ram Lal & Ors.",
      citation: "2026 RRD 94",
      caseNumber: "TA/122/2024",
      courtName: "Board of Revenue, Ajmer",
      parties: "Smt. Kamala Devi vs. Ram Lal & Ors.",
      judgeName: "Hon'ble Member Shri A. K. Gupta",
      judgmentDate: new Date(Date.now() - 86400000 * 3),
      summary: "Held that a female Hindu co-sharer has absolute rights to claim partition under Section 53 of the Tenancy Act, despite local custom objections.",
      importantPoints: [
        "Hindu Succession Act amendments override local custom exclusions on agricultural lands.",
        "Partition suits cannot be delayed by objections from brothers on succession mutations."
      ],
      fullText: "<h2>Court Ruling</h2><p>The respondent argued that partition mutations in ancestral khatedari holdings do not include female heirs. The Board rejected this, reiterating absolute equal partition rights under Section 53 read with federal succession amendments.</p>",
      lawsCited: ["Section 53 Tenancy Act", "Section 6 Hindu Succession Act"]
    }
  ]);

  console.log('Seeding news articles...');
  await Article.create([
    {
      title: "Rajasthan Government Simplifies Section 90-A Conversion for Rural Lands",
      slug: "rajasthan-simplifies-section-90-a-conversion",
      category: "Land Conversion",
      summary: "The Revenue Department has released new guidelines easing the agricultural land conversion procedure under Section 90-A of the Land Revenue Act.",
      content: "<h2>Streamlining Section 90-A Conversions</h2><p>In a major administrative reform, the Government of Rajasthan has delegated conversion sanctioning authority under Section 90-A directly to Sub-Divisional Officers (SDOs) in rural areas, bypassing district collectors. This change is designed to resolve application backlogs and reduce conversion processing timelines to 45 business days.</p>",
      featuredImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
      tags: ["90-A", "Land Conversion", "SDO Powers"]
    },
    {
      title: "Board of Revenue Clarifies Mutation Rights of Legal Heirs in Undivided Holdings",
      slug: "board-of-revenue-clarifies-mutation-rights",
      category: "Judgments Analysis",
      summary: "In a landmark decision, the Ajmer Board of Revenue ruled that mutations based on succession cannot be delayed by co-sharer objections.",
      content: "<h2>Mutation & Legal Succession</h2><p>The Ajmer Board of Revenue has clarified that mutations relating to legal heirs must be processed by Patwaris immediately upon succession declarations, regardless of co-sharer disputes. Unresolved partition questions do not act as an injunction against succession listings.</p>",
      featuredImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
      tags: ["Mutation", "Board of Revenue", "Succession"]
    }
  ]);

  console.log('Seeding official circulars...');
  await Notification.create([
    {
      title: "Amendments to the Rajasthan Land Revenue (Allotment of Land for Agricultural Purposes) Rules",
      refNumber: "F.4(2)Rev-6/2026/18",
      department: "Revenue (Group 6) Department, Jaipur",
      publishDate: new Date(),
      summary: "Amendments reducing interest charges for regularisation of agricultural plots allocated under scheduled caste welfare rules."
    },
    {
      title: "Notification regarding delegation of power under Section 90-A to Sub-Divisional Officers (SDOs)",
      refNumber: "F.9(11)Rev-3/2025/44",
      department: "Revenue (Group 3) Department, Jaipur",
      publishDate: new Date(Date.now() - 86400000 * 5),
      summary: "Official circular delegating final sanctioning power for agricultural conversion under 90-A from District Collectors to SDOs to expedite applications."
    }
  ]);

  console.log('Seeding downloads...');
  await Download.create([
    {
      title: "Form-A: Application for Land Conversion under Section 90-A",
      description: "Official form submitted to the SDO/Local Authority for converting agricultural holdings to residential/commercial layouts.",
      fileType: "PDF",
      fileSize: "850 KB",
      fileUrl: "#"
    },
    {
      title: "Model Mutation Application Form (Fauti/Succession)",
      description: "Template for recording mutation in land records following death of a Khatedar tenant (submitted to Patwari/Tehsildar).",
      fileType: "DOCX",
      fileSize: "120 KB",
      fileUrl: "#"
    }
  ]);

  console.log('Seeding glossary...');
  await Glossary.create([
    {
      term: "Khatedar",
      definition: "A class of tenant in Rajasthan holding occupancy rights in agricultural land, which are hereditary and transferable under the Rajasthan Tenancy Act, 1955."
    },
    {
      term: "Jamabandi",
      definition: "The Record of Rights (RoR) of land showing ownership, area, shares of co-sharers, and revenue liabilities, updated every five years."
    },
    {
      term: "Fauti Mutation",
      definition: "A mutation recorded in revenue records (Khewat/Jamabandi) to transfer land ownership to legal heirs after the demise of the original Khatedar tenant."
    },
    {
      term: "Gair-Khatedar",
      definition: "A tenant who holds temporary or probationary rights in agricultural land, but does not possess transfer rights until regularised under State rules."
    }
  ]);

  console.log('Database seeding completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});
