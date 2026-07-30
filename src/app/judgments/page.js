import dbConnect from '@/lib/db';
import Judgment from '@/lib/models/Judgment';
import JudgmentsClient from '@/components/JudgmentsClient';

export const dynamic = 'force-dynamic';

async function getFilteredJudgments(court, q) {
  try {
    await dbConnect();
    
    // Seed DB if empty
    const { checkAndSeedDatabase } = require('@/lib/seeder');
    await checkAndSeedDatabase();

    let query = { status: 'published' };

    if (court && court !== 'all') {
      if (court === 'board-of-revenue') query.courtName = /Board of Revenue/i;
      else if (court === 'revenue-appeals') query.courtName = /Revenue Appeals/i;
      else if (court === 'collector') query.courtName = /Collector/i;
      else if (court === 'sdo') query.courtName = /(SDO|Tehsildar)/i;
      else if (court === 'supreme-court') query.courtName = /Supreme Court/i;
      else if (court === 'high-court') query.courtName = /High Court/i;
    }

    if (q) {
      let regexPattern = q;
      if (/^Section\s+/i.test(q)) {
        regexPattern = q.replace(/^Section\s+/i, '(Section|Sec\\.?)\\s+');
      } else if (/^Sec\\.?\s+/i.test(q)) {
        regexPattern = q.replace(/^Sec\\.?\s+/i, '(Section|Sec\\.?)\\s+');
      }

      query.$or = [
        { title: { $regex: regexPattern, $options: 'i' } },
        { citation: { $regex: regexPattern, $options: 'i' } },
        { caseNumber: { $regex: regexPattern, $options: 'i' } },
        { parties: { $regex: regexPattern, $options: 'i' } },
        { judgeName: { $regex: regexPattern, $options: 'i' } },
        { fullText: { $regex: regexPattern, $options: 'i' } }
      ];
    }

    const list = await Judgment.find(query)
      .sort({ isPinned: -1, judgmentDate: -1 })
      .limit(50);

    return JSON.parse(JSON.stringify(list));
  } catch (err) {
    console.error("Failed to load judgments on server:", err);
    return [];
  }
}

export default async function JudgmentsPage({ searchParams }) {
  const court = (searchParams && searchParams.court) || 'all';
  const q = (searchParams && searchParams.q) || '';

  const judgments = await getFilteredJudgments(court, q);

  return (
    <JudgmentsClient 
      initialJudgments={judgments} 
      initialCourt={court} 
      initialQ={q} 
    />
  );
}
