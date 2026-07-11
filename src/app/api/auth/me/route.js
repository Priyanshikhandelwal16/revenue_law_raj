import { NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';

export async function GET(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user = null;
    try {
      await dbConnect();
      user = await User.findById(decoded.id).select('-password');
    } catch (dbErr) {
      console.warn("DB offline, checking local file DB for session verification:", dbErr.message);
      const { readLocalDb } = require('@/lib/localDb');
      const localUsers = readLocalDb('users');
      const matchedUser = localUsers.find(u => u._id === decoded.id || u.email === decoded.email);
      if (matchedUser) {
        const { password, ...userWithoutPassword } = matchedUser;
        user = userWithoutPassword;
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error('Session verify error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
