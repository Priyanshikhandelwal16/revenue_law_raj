import fs from 'fs';
import path from 'path';
import { DEFAULT_SETTINGS } from './defaultSettings';
import {
  fallbackArticles,
  fallbackJudgments,
  fallbackLaws,
  fallbackNotifications,
  fallbackDownloads,
  fallbackGlossary
} from './fallbacks';

const DB_FILE_PATH = path.join(process.cwd(), 'src', 'lib', 'local_db.json');

function canonicalSetting(key, value) {
  return {
    _id: `set_${key}`,
    key,
    value
  };
}

function createCanonicalSettings() {
  return Object.entries(DEFAULT_SETTINGS).map(([key, value]) => canonicalSetting(key, value));
}

function readRawDb() {
  return JSON.parse(fs.readFileSync(DB_FILE_PATH, 'utf8'));
}

function writeRawDb(db) {
  fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2), 'utf8');
  return true;
}

function appendMissingCanonicalSettings(db) {
  if (!Array.isArray(db.settings)) {
    db.settings = [];
  }

  const existingKeys = new Set(db.settings.map(setting => setting?.key));
  let changed = false;

  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    if (!existingKeys.has(key)) {
      db.settings.push(canonicalSetting(key, value));
      existingKeys.add(key);
      changed = true;
    }
  }

  return changed;
}


// Ensure database file exists with initial fallbacks.
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
      settings: createCanonicalSettings(),
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
    writeRawDb(initialData);
  }
}

export function readLocalDb(type) {
  try {
    initializeDb();
    const db = readRawDb();
    if (appendMissingCanonicalSettings(db)) {
      writeRawDb(db);
    }
    return db[type] || [];
  } catch (err) {
    console.error(`Error reading local db for ${type}:`, err);
    return [];
  }
}

export function writeLocalDb(type, data) {
  try {
    initializeDb();
    const db = readRawDb();
    db[type] = data;
    appendMissingCanonicalSettings(db);
    return writeRawDb(db);
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
  return writeLocalDb(type, items) ? newItem : null;
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
  return writeLocalDb(type, items) ? items[index] : null;
}

// Delete item
export function deleteLocalItem(type, id) {
  const items = readLocalDb(type);
  const filtered = items.filter(item => item._id !== id);
  return writeLocalDb(type, filtered);
}
