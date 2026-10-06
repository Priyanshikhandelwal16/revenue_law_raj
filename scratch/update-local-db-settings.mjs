import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pkg from '../src/lib/defaultSettings.js';

const { DEFAULT_SETTINGS } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
