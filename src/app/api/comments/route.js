import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Comment from '@/lib/models/Comment';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const entityId = searchParams.get('entityId');
    const adminMode = searchParams.get('adminMode');

    let query = {};
    if (entityId) query.entityId = entityId;
    
    if (adminMode !== 'true') {
      query.isApproved = true;
    } else {
      const decoded = verifyToken(req);
      if (!decoded || decoded.role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
      }
    }

    const comments = await Comment.find(query).sort({ createdAt: -1 });
    return NextResponse.json(comments);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    
    if (!body.entityId || !body.entityType || !body.authorName || !body.authorEmail || !body.content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const comment = await Comment.create({
      entityId: body.entityId,
      entityType: body.entityType,
      authorName: body.authorName,
      authorEmail: body.authorEmail,
      content: body.content,
      isApproved: false
    });

    return NextResponse.json({ success: true, comment });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
