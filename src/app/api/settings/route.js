import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get('key');

    if (key) {
      const publicKeys = ['site_name', 'homepage_config', 'about_config', 'contact_config', 'legal_config', 'case_stages_config'];
      if (!publicKeys.includes(key)) {
        const decoded = verifyToken(req);
        if (!decoded || decoded.role !== 'admin') {
          return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }
      }

      let item = null;
      try {
        await dbConnect();
        item = await Setting.findOne({ key });
      } catch (dbErr) {
        console.warn("DB offline, checking local file DB for setting:", dbErr.message);
        const { getLocalItem } = require('@/lib/localDb');
        item = getLocalItem('settings', key, 'key');
      }
      return NextResponse.json(item || { key, value: null });
    }

    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let items = [];
    try {
      await dbConnect();
      items = await Setting.find({}).sort({ key: 1 });
    } catch (dbErr) {
      console.warn("DB offline, checking local file DB for all settings:", dbErr.message);
      const { readLocalDb } = require('@/lib/localDb');
      items = readLocalDb('settings');
    }
    return NextResponse.json(items);
  } catch (err) {
    console.error('Settings GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { key, value } = body;

    if (!key || value === undefined) {
      return NextResponse.json({ error: 'Key and Value are required' }, { status: 400 });
    }

    let item = null;
    try {
      await dbConnect();
      item = await Setting.findOneAndUpdate(
        { key },
        { value },
        { new: true, upsert: true }
      );
    } catch (dbErr) {
      console.warn("DB offline, saving setting in local file DB:", dbErr.message);
      const { readLocalDb, writeLocalDb } = require('@/lib/localDb');
      const settings = readLocalDb('settings');
      const idx = settings.findIndex(s => s.key === key);
      if (idx !== -1) {
        settings[idx].value = value;
        item = settings[idx];
      } else {
        item = { _id: `set_${Date.now()}`, key, value };
        settings.push(item);
      }
      writeLocalDb('settings', settings);
    }
    return NextResponse.json({ success: true, item });
  } catch (err) {
    console.error('Settings POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
