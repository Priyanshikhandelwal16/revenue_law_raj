import dbConnect from './db';
import Article from './models/Article';
import Judgment from './models/Judgment';
import RevenueLaw from './models/RevenueLaw';
import Notification from './models/Notification';
import Download from './models/Download';
import Glossary from './models/Glossary';
import Setting from './models/Setting';
import { DEFAULT_SETTINGS } from './defaultSettings';
import {
  fallbackArticles,
  fallbackJudgments,
  fallbackLaws,
  fallbackNotifications,
  fallbackDownloads,
  fallbackGlossary
} from './fallbacks';

export async function checkAndSeedDatabase() {
  try {
    await dbConnect();

    // 1. Articles
    const artCount = await Article.countDocuments({});
    if (artCount === 0) {
      console.log('Auto-seeding empty database: Articles...');
      const cleanArticles = fallbackArticles.map(a => {
        const doc = { ...a };
        if (doc._id.startsWith('art_mock_')) delete doc._id;
        return doc;
      });
      await Article.insertMany(cleanArticles);
    }

    // 2. Judgments
    const judCount = await Judgment.countDocuments({});
    if (judCount === 0) {
      console.log('Auto-seeding empty database: Judgments...');
      const cleanJudgments = fallbackJudgments.map(j => {
        const doc = { ...j };
        if (doc._id.startsWith('jud_mock_')) delete doc._id;
        return doc;
      });
      await Judgment.insertMany(cleanJudgments);
    }


    // 3. Laws
    const lawCount = await RevenueLaw.countDocuments({});
    if (lawCount === 0) {
      console.log('Auto-seeding empty database: Laws...');
      const cleanLaws = fallbackLaws.map(l => {
        const doc = { ...l };
        if (doc._id.startsWith('law_mock_')) delete doc._id;
        return doc;
      });
      await RevenueLaw.insertMany(cleanLaws);
    }

    // 4. Notifications
    const notCount = await Notification.countDocuments({});
    if (notCount === 0) {
      console.log('Auto-seeding empty database: Notifications...');
      const cleanNotifications = fallbackNotifications.map(n => {
        const doc = { ...n };
        if (doc._id.startsWith('not_mock_')) delete doc._id;
        return doc;
      });
      await Notification.insertMany(cleanNotifications);
    }

    // 5. Downloads
    const dwnCount = await Download.countDocuments({});
    if (dwnCount === 0) {
      console.log('Auto-seeding empty database: Downloads...');
      const cleanDownloads = fallbackDownloads.map(d => {
        const doc = { ...d };
        if (doc._id.startsWith('dwn_mock_')) delete doc._id;
        return doc;
      });
      await Download.insertMany(cleanDownloads);
    }

    // 6. Glossary
    const gloCount = await Glossary.countDocuments({});
    if (gloCount === 0) {
      console.log('Auto-seeding empty database: Glossary...');
      const cleanGlossary = fallbackGlossary.map(g => {
        const doc = { ...g };
        if (doc._id.startsWith('glo_mock_')) delete doc._id;
        return doc;
      });
      await Glossary.insertMany(cleanGlossary);
    }

    // 7. Settings
    await Promise.all(
      Object.entries(DEFAULT_SETTINGS).map(([key, value]) =>
        Setting.updateOne({ key }, { $setOnInsert: { value } }, { upsert: true })
      )
    );
  } catch (err) {
    console.error('Error during auto-seeding database:', err);
  }
}
