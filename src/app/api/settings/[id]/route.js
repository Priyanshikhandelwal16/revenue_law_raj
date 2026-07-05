import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Setting from '@/lib/models/Setting';
import { verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;
    const item = await Setting.findById(id);
    if (!item) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json(item);
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
    const { key, value } = body;

    const setting = await Setting.findById(id);
    if (!setting) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }

    if (key && key !== setting.key) {
      const keyExists = await Setting.findOne({ key });
      if (keyExists) {
        return NextResponse.json({ error: 'Setting key already exists' }, { status: 400 });
      }
      setting.key = key;
    }

    if (value !== undefined) {
      setting.value = value;
    }

    await setting.save();
    return NextResponse.json({ success: true, item: setting });
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

    const item = await Setting.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ error: 'Setting not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
