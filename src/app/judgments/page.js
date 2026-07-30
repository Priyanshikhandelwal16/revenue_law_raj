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
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { citation: { $regex: q, $options: 'i' } },
        { caseNumber: { $regex: q, $options: 'i' } },
        { parties: { $regex: q, $options: 'i' } },
        { judgeName: { $regex: q, $options: 'i' } },
        { fullText: { $regex: q, $options: 'i' } }
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
