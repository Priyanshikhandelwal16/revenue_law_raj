import dbConnect from '@/lib/db';
import RevenueLaw from '@/lib/models/RevenueLaw';
import LawsClient from '@/components/LawsClient';

export const dynamic = 'force-dynamic';

async function getLaws() {
  try {
    await dbConnect();
    
    const { checkAndSeedDatabase } = require('@/lib/seeder');
    await checkAndSeedDatabase();

    const list = await RevenueLaw.find({}).sort({ title: 1 });
    if (list.length > 0) {
      return JSON.parse(JSON.stringify(list));
    }
    
    const { fallbackLaws } = require('@/lib/fallbacks');
    return fallbackLaws;
  } catch (err) {
    console.error("Failed to load laws on server:", err);
    const { fallbackLaws } = require('@/lib/fallbacks');
    return fallbackLaws;
  }
}

export default async function LawsPage({ searchParams }) {
  const act = (searchParams && searchParams.act) || '';
  const section = (searchParams && searchParams.section) || '';
  
  const laws = await getLaws();
  
  return (
    <LawsClient 
      laws={laws} 
      initialActSlug={act} 
      initialSectionNumber={section} 
    />
  );
}
