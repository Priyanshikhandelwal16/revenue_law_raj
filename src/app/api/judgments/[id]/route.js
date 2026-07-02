import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Judgment from '@/lib/models/Judgment';
import { verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const { id } = params;

    const judgment = await Judgment.findById(id);
    if (!judgment) {
      return NextResponse.json({ error: 'Judgment not found' }, { status: 404 });
    }

    judgment.views = (judgment.views || 0) + 1;
    await judgment.save();

    return NextResponse.json(judgment);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;
    const body = await req.json();

    const judgment = await Judgment.findByIdAndUpdate(id, body, { new: true });
    if (!judgment) {
      return NextResponse.json({ error: 'Judgment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, judgment });
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

    const judgment = await Judgment.findByIdAndDelete(id);
    if (!judgment) {
      return NextResponse.json({ error: 'Judgment not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
