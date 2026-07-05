import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    let user = null;
    try {
      await dbConnect();
      user = await User.findOne({ email });

      // Seed default admin if none exists in MongoDB
      if (!user && email === 'admin@rajasthanrevenue.law') {
        const hashedPassword = await bcrypt.hash('Admin@Rajasthan2026', 10);
        user = await User.create({
          email: 'admin@rajasthanrevenue.law',
          password: hashedPassword,
          name: 'Super Admin',
          role: 'admin',
        });
      }
    } catch (dbErr) {
      console.warn("DB offline, checking local file DB for login:", dbErr.message);
      const { readLocalDb, createLocalItem } = require('@/lib/localDb');
      const localUsers = readLocalDb('users');
      user = localUsers.find(u => u.email === email);

      if (!user && email === 'admin@rajasthanrevenue.law') {
        const hashedPassword = await bcrypt.hash('Admin@Rajasthan2026', 10);
        user = createLocalItem('users', {
          email: 'admin@rajasthanrevenue.law',
          password: hashedPassword,
          name: 'Super Admin',
          role: 'admin'
        });
      }
    }

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const token = signToken(user);
    const response = NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
