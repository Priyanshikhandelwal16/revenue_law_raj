import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import { readLocalDb } from '@/lib/localDb';
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

export async function GET(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let dump = {};
    const isMdbConnected = global.mongoose && !global.mongoose.isOffline;

    if (!isMdbConnected) {
      // Export directly from local JSON database
      const fs = require('fs');
      const path = require('path');
      const dbPath = path.join(process.cwd(), 'src', 'lib', 'local_db.json');
      if (fs.existsSync(dbPath)) {
        dump = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
      } else {
        return NextResponse.json({ error: 'No database initialized' }, { status: 400 });
      }
    } else {
      // Export from MongoDB Atlas
      await dbConnect();
      const [articles, judgments, laws, notifications, downloads, glossary, comments, queries, settings, media] = await Promise.all([
        Article.find({}),
        Judgment.find({}),
        RevenueLaw.find({}),
        Notification.find({}),
        Download.find({}),
        Glossary.find({}),
        Comment.find({}),
        Query.find({}),
        Setting.find({}),
        Media.find({})
      ]);

      dump = {
        articles,
        judgments,
        laws,
        notifications,
        downloads,
        glossary,
        comments,
        queries,
        settings,
        media
      };
    }

    return NextResponse.json(dump, {
      headers: {
        'Content-Disposition': 'attachment; filename=rrlkp_backup.json',
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error("Backup export error:", err);
    return NextResponse.json({ error: 'Server error during export' }, { status: 500 });
  }
}
