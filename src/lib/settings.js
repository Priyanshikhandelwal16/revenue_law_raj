import dbConnect from './db';
import Setting from './models/Setting';
import { DEFAULT_SETTINGS, deepMergeSettings, normalizeSettingValue } from './defaultSettings';
import { getLocalItem } from './localDb';

function resolveSetting(key, storedValue) {
  const defaultValue = DEFAULT_SETTINGS[key];
  return deepMergeSettings(defaultValue, normalizeSettingValue(key, storedValue));
}

export async function getSettingValue(key) {
  if (!Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)) return undefined;

  try {
    await dbConnect();
    const item = await Setting.findOne({ key }).lean();
    return resolveSetting(key, item?.value);
  } catch (error) {
    console.warn(`Mongo setting read failed for ${key}; using local fallback:`, error.message);
    try {
      const localItem = await getLocalItem('settings', key, 'key');
      return resolveSetting(key, localItem?.value);
    } catch (localError) {
      console.warn(`Local setting read failed for ${key}; using defaults:`, localError.message);
      return resolveSetting(key, undefined);
    }
  }
}

export async function getSettingsValues(keys) {
  const requestedKeys = [...new Set(keys)].filter(key =>
    Object.prototype.hasOwnProperty.call(DEFAULT_SETTINGS, key)
  );

  try {
    await dbConnect();
    const items = await Setting.find({ key: { $in: requestedKeys } }).lean();
    const values = new Map(items.map(item => [item.key, item.value]));
    return Object.fromEntries(requestedKeys.map(key => [key, resolveSetting(key, values.get(key))]));
  } catch (error) {
    console.warn('Mongo settings read failed; using local fallback:', error.message);
    const entries = await Promise.all(
      requestedKeys.map(async key => {
        try {
          const localItem = await getLocalItem('settings', key, 'key');
          return [key, resolveSetting(key, localItem?.value)];
        } catch {
          return [key, resolveSetting(key, undefined)];
        }
      })
    );
    return Object.fromEntries(entries);
  }
}
