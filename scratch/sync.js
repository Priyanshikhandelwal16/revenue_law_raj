const fs = require('fs');
const path = require('path');
const vm = require('vm');

const defaultSettingsPath = path.join(__dirname, '..', 'src', 'lib', 'defaultSettings.js');
let code = fs.readFileSync(defaultSettingsPath, 'utf8');

// Replace ES export syntax with CJS
code = code.replace(/export const /g, 'const ');
code = code.replace(/export function /g, 'function ');
code += '\nmodule.exports = { DEFAULT_SETTINGS, PUBLIC_SETTING_KEYS, EDITABLE_SETTING_KEYS };';

const script = new vm.Script(code);
const context = vm.createContext({ module: {}, exports: {}, console, Object, Array, String, Number, Boolean, Date, JSON, Map, Set, Promise });
script.runInContext(context);

const DEFAULT_SETTINGS = context.module.exports.DEFAULT_SETTINGS;

const dbPath = path.join(__dirname, '..', 'src', 'lib', 'local_db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const newSettings = Object.entries(DEFAULT_SETTINGS).map(([key, value]) => ({
  _id: `set_${key}`,
  key,
  value
}));

dbData.settings = newSettings;

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf8');
console.log(`SUCCESS: Updated local_db.json with ${newSettings.length} setting keys!`);
