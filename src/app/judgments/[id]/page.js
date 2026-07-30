import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Judgment from '@/lib/models/Judgment';
import Comment from '@/lib/models/Comment';
import JudgmentDetailClient from '@/components/JudgmentDetailClient';

export const dynamic = 'force-dynamic';

async function getJudgmentData(id) {
  try {
    await dbConnect();
    
    let judgment = await Judgment.findById(id);
    
    if (!judgment) {
      const { fallbackJudgments } = require('@/lib/fallbacks');
      const matched = fallbackJudgments.find(j => j._id === id);
      if (!matched) return null;
      return JSON.parse(JSON.stringify(matched));
    }
    
    judgment.views = (judgment.views || 0) + 1;
    await judgment.save();
    
    return JSON.parse(JSON.stringify(judgment));
  } catch (err) {
    console.error("Error loading judgment details on server:", err);
    const { fallbackJudgments } = require('@/lib/fallbacks');
    const matched = fallbackJudgments.find(j => j._id === id);
    return matched ? JSON.parse(JSON.stringify(matched)) : null;
  }
}

async function getComments(id) {
  try {
    await dbConnect();
    const comments = await Comment.find({ entityId: id, isApproved: true }).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(comments));
  } catch (err) {
    console.error("Error loading comments on server:", err);
    return [];
  }
}

export default async function JudgmentDetailPage({ params }) {
  const { id } = params;
  
  const [judgment, comments] = await Promise.all([
    getJudgmentData(id),
    getComments(id)
  ]);
  
  if (!judgment) {
    notFound();
  }
  
  return (
    <JudgmentDetailClient 
      judgment={judgment} 
      initialComments={comments} 
      id={id} 
    />
  );
}
