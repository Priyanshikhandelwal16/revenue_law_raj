import fs from 'fs';
import path from 'path';
import { 
  fallbackArticles, 
  fallbackJudgments, 
  fallbackLaws, 
  fallbackNotifications, 
  fallbackDownloads, 
  fallbackGlossary 
} from './fallbacks';

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'local_db.json');

// Ensure database file exists with initial fallbacks
function initializeDb() {
  if (!fs.existsSync(DB_FILE_PATH)) {
    const initialData = {
      articles: fallbackArticles,
      judgments: fallbackJudgments,
      laws: fallbackLaws,
      notifications: fallbackNotifications,
      downloads: fallbackDownloads,
      glossary: fallbackGlossary,
      comments: [
        {
          _id: "com_mock_1",
          entityId: "jud_mock_1",
          name: "Advocate Rajesh Sharma",
          email: "rajesh.sharma@example.com",
          content: "Excellent judgment clarifying the application of partition maps under Section 53.",
          isApproved: true,
          createdAt: new Date("2026-06-01T12:00:00Z").toISOString()
        }
      ],
      queries: [],
      settings: [
        { key: "site_name", value: "Rajasthan Revenue Law Knowledge Platform" },
        { 
          key: "homepage_config", 
          value: {
            heroTitle: "Rajasthan Revenue Law",
            heroSubtitle: "Knowledge Platform",
            heroDesc: "An enterprise-grade legal publishing and research portal built for advocates, judges, and revenue officers of Rajasthan.",
            heroButtonText: "Search Judgments",
            heroButtonUrl: "/judgments",
            heroSecButtonText: "Acts & Statutes",
            heroSecButtonUrl: "/laws",
            heroImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
            faqs: [
              { question: "What is Section 90-A of the Rajasthan Land Revenue Act?", answer: "Section 90-A governs the conversion of agricultural land for non-agricultural purposes such as residential, commercial, or industrial uses." },
              { question: "How do I file an appeal before the Board of Revenue?", answer: "An appeal is filed in writing accompanied by a certified copy of the order being appealed, submitted to the registry in Ajmer." }
            ]
          } 
        },
        {
          key: "about_config",
          value: {
            missionTitle: "Making Revenue Law Accessible to Everyone",
            missionText: "Revenue law in Rajasthan — spanning the Land Revenue Act of 1956, Tenancy Act of 1955, local circulars, and thousands of Board of Revenue judgments — is vast and difficult to navigate. RRLKP was founded to digitize, annotate, and organize these records so that legal professionals, landowners, and students can find the answers they need in seconds, not days."
          }
        },
        {
          key: "contact_config",
          value: {
            phone: "+91 9982057461",
            email: "revenuelawraj@gmail.com",
            address: "Revenue Secretariat, Ajmer, Rajasthan - 305001",
            socials: {
              facebook: "https://facebook.com",
              twitter: "https://twitter.com",
              linkedin: "https://linkedin.com",
              youtube: "https://youtube.com",
              instagram: "https://instagram.com"
            }
          }
        },
        {
          key: "legal_config",
          value: {
            terms: "<h2>1. Terms of Use</h2><p>By accessing this platform, you agree to comply with our conditions of service...</p>",
            privacy: "<h2>Privacy Policy</h2><p>This policy details how we handle user data and ensure privacy safety...</p>",
            disclaimer: "<h2>Disclaimer</h2><p>This platform compiles public notification and legal documents for research. Users are advised to crosscheck original publications before pleading cases.</p>"
          }
        }
      ],
      media: [],
      users: [
        {
          _id: "usr_mock_admin",
          email: "admin@rajasthanrevenue.law",
          password: "$2a$10$feMKRu3Hr4mc3bl2JNA4oeagjKHIrCSVClIJSjci6hCQ1gq6IYffa", // Admin@Rajasthan2026
          name: "Super Admin",
          role: "admin"
        }
      ]
    };
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(initialData, null, 2), 'utf8');
  }
}

export function readLocalDb(type) {
  try {
    initializeDb();
    const content = fs.readFileSync(DB_FILE_PATH, 'utf8');
    const db = JSON.parse(content);
    return db[type] || [];
  } catch (err) {
    console.error(`Error reading local db for ${type}:`, err);
    return [];
  }
}

export function writeLocalDb(type, data) {
  try {
    initializeDb();
    const content = fs.readFileSync(DB_FILE_PATH, 'utf8');
    const db = JSON.parse(content);
    db[type] = data;
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error(`Error writing local db for ${type}:`, err);
    return false;
  }
}

// Find item helper
export function getLocalItem(type, lookupVal, key = '_id') {
  const items = readLocalDb(type);
  return items.find(item => item[key] === lookupVal) || null;
}

// Create item
export function createLocalItem(type, itemData) {
  const items = readLocalDb(type);
  const newItem = {
    _id: `${type.slice(0, 3)}_${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'published',
    ...itemData
  };
  items.unshift(newItem);
  writeLocalDb(type, items);
  return newItem;
}

// Update item
export function updateLocalItem(type, id, updates) {
  const items = readLocalDb(type);
  const index = items.findIndex(item => item._id === id);
  if (index === -1) return null;

  items[index] = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  writeLocalDb(type, items);
  return items[index];
}

// Delete item
export function deleteLocalItem(type, id) {
  const items = readLocalDb(type);
  const filtered = items.filter(item => item._id !== id);
  writeLocalDb(type, filtered);
  return true;
}
