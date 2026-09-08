import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { verifyToken } from '@/lib/auth';
import {
  DEFAULT_SETTINGS,
  PUBLIC_SETTING_KEYS,
  EDITABLE_SETTING_KEYS,
  deepMergeSettings,
} from '@/lib/defaultSettings';
import { getSettingValue, getSettingsValues } from '@/lib/settings';
import { getLocalItem, createLocalItem, updateLocalItem } from '@/lib/localDb';

export const dynamic = 'force-dynamic';

function validatePayload(value, depth = 0) {
  if (depth > 8) throw new Error('Payload exceeds maximum depth of 8');
  if (value === undefined || typeof value === 'function') throw new Error('Payload contains an unsupported value');
  if (typeof value === 'string') {
    if (value.length > 200000) throw new Error('String exceeds maximum length of 200000');
    return;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) return;
  if (Array.isArray(value)) {
    if (value.length > 250) throw new Error('Array exceeds maximum length of 250');
    value.forEach(item => validatePayload(item, depth + 1));
    return;
  }
  if (typeof value === 'object') {
    Object.values(value).forEach(item => validatePayload(item, depth + 1));
    return;
  }
  throw new Error('Payload contains an unsupported value');
}

function isAdmin(req) {
  const decoded = verifyToken(req);
  return decoded && decoded.role === 'admin';
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      if (!PUBLIC_SETTING_KEYS.includes(key)) {
        if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        return NextResponse.json({ key, value: null });
      }
      return NextResponse.json({ key, value: await getSettingValue(key) });
    }

    if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    const values = await getSettingsValues(PUBLIC_SETTING_KEYS);
    return NextResponse.json(PUBLIC_SETTING_KEYS.map(settingKey => ({
      key: settingKey,
      value: values[settingKey],
    })));
  } catch (err) {
    console.error('Settings GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const body = await req.json();

    // Support resetting all settings to latest defaults
    if (body.resetAll) {
      for (const k of EDITABLE_SETTING_KEYS) {
        const defaultValue = DEFAULT_SETTINGS[k];
        try {
          await dbConnect();
          await Setting.findOneAndUpdate(
            { key: k },
            { value: defaultValue },
            { new: true, upsert: true, setDefaultsOnInsert: true }
          );
        } catch (dbErr) {
          const existing = await getLocalItem('settings', k, 'key');
          if (existing) {
            await updateLocalItem('settings', existing._id, { key: k, value: defaultValue });
          } else {
            await createLocalItem('settings', { _id: `set_${k}`, key: k, value: defaultValue });
          }
        }
      }
      try { revalidatePath('/', 'layout'); } catch (e) {}
      return NextResponse.json({ success: true, message: 'All settings reset to latest defaults successfully' });
    }

    const { key, value, reset, forceOverwrite } = body;
    if (!key || (value === undefined && !reset)) {
      return NextResponse.json({ error: 'Key and Value are required' }, { status: 400 });
    }
    if (!EDITABLE_SETTING_KEYS.includes(key)) {
      return NextResponse.json({ error: 'Setting key is not editable' }, { status: 400 });
    }

    let finalValue;
    if (reset) {
      finalValue = DEFAULT_SETTINGS[key];
    } else if (forceOverwrite) {
      finalValue = value;
    } else {
      try {
        validatePayload(value);
      } catch (validationError) {
        return NextResponse.json({ error: validationError.message }, { status: 400 });
      }
      const currentValue = await getSettingValue(key);
      finalValue = deepMergeSettings(currentValue ?? DEFAULT_SETTINGS[key], value);
    }

    let item;
    try {
      await dbConnect();
      item = await Setting.findOneAndUpdate(
        { key },
        { value: finalValue },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    } catch (dbErr) {
      console.warn('DB offline, saving setting in local file DB:', dbErr.message);
      const existing = await getLocalItem('settings', key, 'key');
      if (existing) {
        item = await updateLocalItem('settings', existing._id, { key, value: finalValue });
      } else {
        item = await createLocalItem('settings', { _id: `set_${key}`, key, value: finalValue });
      }
      if (!item) throw new Error('Failed to persist local setting');
    }

    try {
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.warn('Revalidate error:', revalErr.message);
    }

    return NextResponse.json({ success: true, item });
  } catch (err) {
    console.error('Settings POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
