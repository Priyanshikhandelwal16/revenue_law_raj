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

// Simple in-memory cache for Firestore reads
const localDbCache = {};
const CACHE_TTL_MS = 15000; // 15 seconds to bundle concurrent server queries

function invalidateCache(type) {
  if (localDbCache[type]) {
    delete localDbCache[type];
  }
}

// Read all items from Firestore
export async function readLocalDb(type) {
  const now = Date.now();
  if (localDbCache[type] && (now - localDbCache[type].timestamp < CACHE_TTL_MS)) {
    return JSON.parse(JSON.stringify(localDbCache[type].data));
  }

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

      // AUTO MIGRATION: Update existing site_config and homepage_config in Firestore if they have old text or lack the new link
      for (const item of items) {
        if (item.key === 'site_config' && item.value) {
          let modified = false;
          if (Array.isArray(item.value.navigation)) {
            item.value.navigation = item.value.navigation.map(nav => {
              if (nav.label === 'Working of Revenue Law') {
                nav.label = 'Procedure of Revenue Law';
                modified = true;
              }
              if (Array.isArray(nav.items)) {
                nav.items = nav.items.map(sub => {
                  if (sub.label === 'Working of Revenue Law') {
                    sub.label = 'Procedure of Revenue Law';
                    modified = true;
                  }
                  return sub;
                });
              }
              return nav;
            });
          }
          if (modified) {
            const docRef = doc(db, type, item._id);
            const cleaned = { ...item };
            delete cleaned._id;
            await setDoc(docRef, cleaned, { merge: true });
            console.log(`Migrated site_config in Firestore: Working of Revenue Law -> Procedure of Revenue Law`);
          }
        }

        if (item.key === 'homepage_config' && item.value) {
          let modified = false;
          if (Array.isArray(item.value.quickLinks)) {
            const hasJurisdictionLink = item.value.quickLinks.some(link => link.href === '/court-jurisdictions');
            if (!hasJurisdictionLink) {
              const hierarchyIdx = item.value.quickLinks.findIndex(link => link.href === '/hierarchy-of-courts');
              const newLink = { label: "Jurisdiction of Revenue Court", href: "/court-jurisdictions", icon: "Gavel" };
              if (hierarchyIdx !== -1) {
                item.value.quickLinks.splice(hierarchyIdx + 1, 0, newLink);
              } else {
                item.value.quickLinks.push(newLink);
              }
              modified = true;
            }
          }
          if (modified) {
            const docRef = doc(db, type, item._id);
            const cleaned = { ...item };
            delete cleaned._id;
            await setDoc(docRef, cleaned, { merge: true });
            console.log(`Migrated homepage_config in Firestore: Added Jurisdiction of Revenue Court quick link`);
          }
        }
      }
    }

    // Special logic for laws: append missing sections to seeded acts in Firestore
    if (type === 'laws') {
      for (const item of items) {
        if (item.title === 'Rajasthan Tenancy Act, 1955' && Array.isArray(item.sections)) {
          const existingSecs = new Set(item.sections.map(s => String(s.sectionNumber)));
          const toAdd = [
            { sectionNumber: "53", title: "Partition of agricultural holding", content: "Any co-sharer (khatedar tenant) has the right to sue for partition of their joint holding to separate their individual share on maps and records." },
            { sectionNumber: "88", title: "Suit for declaration of Khatedari rights", content: "Any person claiming to be a tenant or a co-tenant may sue for a declaration of his right, which is the baseline suit for establishing agricultural land ownership title in Rajasthan." },
            { sectionNumber: "188", title: "Suit for injunction against trespass", content: "A tenant in possession may sue for permanent injunction to prevent any third party or trespasser from interfering with their agricultural operations or possession." },
            { sectionNumber: "251", title: "Rights of way and other easements", content: "A tenant can file an application before the Tehsildar to demand a new path or resolve blockades on agricultural cart-tracks through adjoining fields." }
          ];
          let updated = false;
          for (const sec of toAdd) {
            if (!existingSecs.has(sec.sectionNumber)) {
              item.sections.push(sec);
              updated = true;
            }
          }
          if (updated) {
            const docRef = doc(db, type, item._id);
            const cleaned = { ...item };
            delete cleaned._id;
            await setDoc(docRef, cleaned, { merge: true });
            console.log(`Migrated laws in Firestore: Added missing sections to Rajasthan Tenancy Act, 1955`);
          }
        }

        if (item.title === 'Rajasthan Land Revenue Act, 1956' && Array.isArray(item.sections)) {
          const existingSecs = new Set(item.sections.map(s => String(s.sectionNumber)));
          const toAdd = [
            { sectionNumber: "135", title: "Mutation on succession or transfer", content: "Every person acquiring land by succession or transfer must report the transaction to the Patwari to update record of rights (Jamabandi) through mutation." }
          ];
          let updated = false;
          for (const sec of toAdd) {
            if (!existingSecs.has(sec.sectionNumber)) {
              item.sections.push(sec);
              updated = true;
            }
          }
          if (updated) {
            const docRef = doc(db, type, item._id);
            const cleaned = { ...item };
            delete cleaned._id;
            await setDoc(docRef, cleaned, { merge: true });
            console.log(`Migrated laws in Firestore: Added missing sections to Rajasthan Land Revenue Act, 1956`);
          }
        }
      }
    }

    // Update Cache
    localDbCache[type] = {
      timestamp: now,
      data: JSON.parse(JSON.stringify(items))
    };

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
    invalidateCache(type);
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
    invalidateCache(type);
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
    invalidateCache(type);
    return true;
  } catch (err) {
    console.error(`Error deleting document in Firestore:`, err);
    return false;
  }
}
