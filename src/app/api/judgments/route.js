import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Judgment from '@/lib/models/Judgment';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    await dbConnect();
    const { checkAndSeedDatabase } = require('@/lib/seeder');
    await checkAndSeedDatabase();

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');
    const court = searchParams.get('court');
    const adminMode = searchParams.get('adminMode') === 'true';

    let query = {};
    if (!adminMode) {
      query.status = 'published';
    }

    if (court) {
      if (court === 'board-of-revenue') query.courtName = /Board of Revenue/i;
      else if (court === 'revenue-appeals') query.courtName = /Revenue Appeals/i;
      else if (court === 'collector') query.courtName = /Collector/i;
      else if (court === 'sdo') query.courtName = /(SDO|Tehsildar)/i;
      else if (court === 'supreme-court') query.courtName = /Supreme Court/i;
      else if (court === 'high-court') query.courtName = /High Court/i;
    }

    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { citation: { $regex: q, $options: 'i' } },
        { caseNumber: { $regex: q, $options: 'i' } },
        { parties: { $regex: q, $options: 'i' } },
        { judgeName: { $regex: q, $options: 'i' } },
        { fullText: { $regex: q, $options: 'i' } }
      ];
    }

    const judgments = await Judgment.find(query)
      .sort({ isPinned: -1, judgmentDate: -1 })
      .limit(adminMode ? 500 : 50);

    return NextResponse.json(judgments);
  } catch (err) {
    console.error('Judgments API error, serving fallbacks:', err);
    const { fallbackJudgments } = require('@/lib/fallbacks');
    return NextResponse.json(fallbackJudgments);
  }
}

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    let body = await req.json();

    const { resolveUploadSession } = require('@/lib/uploadResolver');
    body = await resolveUploadSession(body);

    const judgment = await Judgment.create(body);
    return NextResponse.json({ success: true, judgment });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return NextResponse.json({ error: 'Duplicate citation — a judgment with this citation already exists. Use a different citation number.' }, { status: 400 });
    }
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join(', ');
      return NextResponse.json({ error: 'Validation failed: ' + messages }, { status: 400 });
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
