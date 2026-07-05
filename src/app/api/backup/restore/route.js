import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Article from '@/lib/models/Article';
import Judgment from '@/lib/models/Judgment';
import RevenueLaw from '@/lib/models/RevenueLaw';
import Notification from '@/lib/models/Notification';
import Download from '@/lib/models/Download';
import Glossary from '@/lib/models/Glossary';
import Comment from '@/lib/models/Comment';
import Query from '@/lib/models/Query';
import Setting from '@/lib/models/Setting';
import Media from '@/lib/models/Media';

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const payload = await req.json();

    const isMdbConnected = global.mongoose && !global.mongoose.isOffline;

    if (!isMdbConnected) {
      // Overwrite local JSON file
      const fs = require('fs');
      const path = require('path');
      const dbPath = path.join(process.cwd(), 'src', 'lib', 'local_db.json');
      
      // Basic structure validation
      if (!payload.articles || !payload.judgments || !payload.laws) {
        return NextResponse.json({ error: 'Invalid backup schema payload' }, { status: 400 });
      }

      fs.writeFileSync(dbPath, JSON.stringify(payload, null, 2), 'utf8');
    } else {
      // Restore to MongoDB Atlas
      await dbConnect();
      
      // We will empty collections and insert the payload data
      if (payload.articles) {
        await Article.deleteMany({});
        await Article.insertMany(payload.articles);
      }
      if (payload.judgments) {
        await Judgment.deleteMany({});
        await Judgment.insertMany(payload.judgments);
      }
      if (payload.laws) {
        await RevenueLaw.deleteMany({});
        await RevenueLaw.insertMany(payload.laws);
      }
      if (payload.notifications) {
        await Notification.deleteMany({});
        await Notification.insertMany(payload.notifications);
      }
      if (payload.downloads) {
        await Download.deleteMany({});
        await Download.insertMany(payload.downloads);
      }
      if (payload.glossary) {
        await Glossary.deleteMany({});
        await Glossary.insertMany(payload.glossary);
      }
      if (payload.comments) {
        await Comment.deleteMany({});
        await Comment.insertMany(payload.comments);
      }
      if (payload.queries) {
        await Query.deleteMany({});
        await Query.insertMany(payload.queries);
      }
      if (payload.settings) {
        await Setting.deleteMany({});
        await Setting.insertMany(payload.settings);
      }
      if (payload.media) {
        await Media.deleteMany({});
        await Media.insertMany(payload.media);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Backup restore error:", err);
    return NextResponse.json({ error: 'Server error during restore: ' + err.message }, { status: 500 });
  }
}
