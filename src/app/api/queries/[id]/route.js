import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Query from '@/lib/models/Query';
import { verifyToken } from '@/lib/auth';

export async function PUT(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const query = await Query.findByIdAndUpdate(id, { isResolved: body.isResolved }, { new: true });
    if (!query) {
      return NextResponse.json({ error: 'Query not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, query });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;

    const query = await Query.findByIdAndDelete(id);
    if (!query) {
      return NextResponse.json({ error: 'Query not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
