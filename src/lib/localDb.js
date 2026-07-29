import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { DEFAULT_SETTINGS } from './defaultSettings';
import {
  fallbackArticles,
  fallbackJudgments,
  fallbackLaws,
  fallbackNotifications,
  fallbackDownloads,
  fallbackGlossary
} from './fallbacks';

function canonicalSetting(key, value) {
  return {
    _id: `set_${key}`,
    key,
    value
  };
}

function createCanonicalSettings() {
  const settings = [];
  for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
    settings.push(canonicalSetting(key, value));
  }
  return settings;
}

// Read all items from Firestore
export async function readLocalDb(type) {
  try {
    const colRef = collection(db, type);
    const snapshot = await getDocs(colRef);
    let items = snapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));

    // If empty, auto-seed with fallbacks
    if (items.length === 0) {
      console.log(`Auto-seeding empty Firestore collection: ${type}...`);
      let seedData = [];
      if (type === 'articles') seedData = fallbackArticles;
      else if (type === 'judgments') seedData = fallbackJudgments;
      else if (type === 'laws') seedData = fallbackLaws;
      else if (type === 'notifications') seedData = fallbackNotifications;
      else if (type === 'downloads') seedData = fallbackDownloads;
      else if (type === 'glossary') seedData = fallbackGlossary;
      else if (type === 'settings') seedData = createCanonicalSettings();
      else if (type === 'users') {
        seedData = [
          {
            _id: "usr_mock_admin",
            email: "admin@rajasthanrevenue.law",
            password: "$2a$10$feMKRu3Hr4mc3bl2JNA4oeagjKHIrCSVClIJSjci6hCQ1gq6IYffa", // Admin@Rajasthan2026
            name: "Super Admin",
            role: "admin"
          }
        ];
      }

      for (const item of seedData) {
        const id = item._id || `${type.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
        const cleanedItem = { ...item };
        delete cleanedItem._id;
        await setDoc(doc(db, type, id), { _id: id, ...cleanedItem });
      }

      // Query again after seeding
      const newSnapshot = await getDocs(colRef);
      items = newSnapshot.docs.map(doc => ({ ...doc.data(), _id: doc.id }));
    }

    // Special logic for settings: append any missing default settings
    if (type === 'settings') {
      const existingKeys = new Set(items.map(item => item.key));
      for (const [key, value] of Object.entries(DEFAULT_SETTINGS)) {
        if (!existingKeys.has(key)) {
          const id = `set_${key}`;
          const newSetting = canonicalSetting(key, value);
          const cleaned = { ...newSetting };
          delete cleaned._id;
          await setDoc(doc(db, type, id), { _id: id, ...cleaned });
          items.push(newSetting);
        }
      }
    }

    return items;
  } catch (err) {
    console.error(`Error reading Firestore collection ${type}:`, err);
    return [];
  }
}

// Find item helper
export async function getLocalItem(type, lookupVal, key = '_id') {
  try {
    if (key === '_id') {
      const docRef = doc(db, type, lookupVal);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { ...docSnap.data(), _id: docSnap.id };
      }
    }
    const items = await readLocalDb(type);
    return items.find(item => item[key] === lookupVal) || null;
  } catch (err) {
    console.error(`Error getting item from Firestore:`, err);
    return null;
  }
}

// Create item
export async function createLocalItem(type, itemData) {
  try {
    const id = itemData._id || `${type.slice(0, 3)}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    const newItem = {
      _id: id,
      createdAt: new Date().toISOString(),
      status: 'published',
      ...itemData
    };
    
    const cleaned = { ...newItem };
    delete cleaned._id;

    await setDoc(doc(db, type, id), cleaned);
    return newItem;
  } catch (err) {
    console.error(`Error creating document in Firestore:`, err);
    return null;
  }
}

// Update item
export async function updateLocalItem(type, id, updates) {
  try {
    const cleaned = { ...updates };
    delete cleaned._id;
    cleaned.updatedAt = new Date().toISOString();

    const docRef = doc(db, type, id);
    await setDoc(docRef, cleaned, { merge: true });

    // Fetch the updated document
    const docSnap = await getDoc(docRef);
    return { ...docSnap.data(), _id: id };
  } catch (err) {
    console.error(`Error updating document in Firestore:`, err);
    return null;
  }
}

// Delete item
export async function deleteLocalItem(type, id) {
  try {
    await deleteDoc(doc(db, type, id));
    return true;
  } catch (err) {
    console.error(`Error deleting document in Firestore:`, err);
    return false;
  }
}
