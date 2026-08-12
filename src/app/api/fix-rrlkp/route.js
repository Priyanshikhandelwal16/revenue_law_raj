import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { verifyToken } from '@/lib/auth';

/**
 * One-time migration endpoint to replace "RRLKP" with "Revenue Law Raj" in all settings.
 * Call: POST /api/fix-rrlkp (requires admin auth)
 * After successful run, this file can be deleted.
 */
export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const settings = await Setting.find({});
    let updatedCount = 0;

    for (const setting of settings) {
      const original = JSON.stringify(setting.value);
      const fixed = original.replace(/RRLKP/g, 'Revenue Law Raj');

      if (fixed !== original) {
        setting.value = JSON.parse(fixed);
        await setting.save();
        updatedCount++;
      }
    }

    return NextResponse.json({
      success: true,
      message: `Fixed ${updatedCount} settings documents. "RRLKP" replaced with "Revenue Law Raj".`
    });
  } catch (err) {
    console.error('Fix RRLKP error:', err);
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 });
  }
}
