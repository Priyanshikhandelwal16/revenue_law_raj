const fs = require('fs');
const path = require('path');

// Dynamically require or parse defaultSettings
// Since defaultSettings.js is ES module, let's convert to CJS or import dynamically
(async () => {
  try {
    const defaultSettingsModule = await import('../src/lib/defaultSettings.js');
    const { DEFAULT_SETTINGS } = defaultSettingsModule;

    const dbPath = path.join(__dirname, '..', 'src', 'lib', 'local_db.json');
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

    const newSettings = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
      _id: `set_${key}`,
      key,
      value
    }));

    dbData.settings = newSettings;

    fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
    console.log(`Successfully updated local_db.json with ${newSettings.length} setting keys!`);
  } catch (err) {
    console.error('Error updating local_db.json:', err);
  }
})();
