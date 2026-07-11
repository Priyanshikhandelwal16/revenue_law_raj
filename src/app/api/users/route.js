import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let items = [];
    try {
      await dbConnect();
      items = await User.find({}).select('-password').sort({ createdAt: -1 });
    } catch (dbErr) {
      console.warn("DB offline, checking local file DB for users list:", dbErr.message);
      const { readLocalDb } = require('@/lib/localDb');
      items = readLocalDb('users').map(({ password, ...rest }) => rest);
    }
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await req.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    let item = null;
    try {
      await dbConnect();
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      item = await User.create({
        email,
        password: hashedPassword,
        name,
        role: role || 'admin'
      });
      item = item.toObject();
      delete item.password;
    } catch (dbErr) {
      console.warn("DB offline, creating user in local file DB:", dbErr.message);
      const { readLocalDb, createLocalItem } = require('@/lib/localDb');
      const localUsers = readLocalDb('users');
      if (localUsers.some(u => u.email === email)) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const created = createLocalItem('users', {
        email,
        password: hashedPassword,
        name,
        role: role || 'admin'
      });
      const { password: pw, ...rest } = created;
      item = rest;
    }

    return NextResponse.json({ success: true, item });
  } catch (err) {
    console.error('User create error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
