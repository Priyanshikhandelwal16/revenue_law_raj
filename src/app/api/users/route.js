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

    // 1. Create user in Firebase Authentication
    const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');
    const { app: firebaseApp } = require('@/lib/firebase');
    const firebaseAuth = getAuth(firebaseApp);

    let firebaseUser = null;
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      firebaseUser = userCredential.user;
    } catch (authErr) {
      console.error("Firebase Auth user registration failed:", authErr);
      if (authErr.code === 'auth/email-already-in-use') {
        return NextResponse.json({ error: 'Email already registered in Firebase' }, { status: 400 });
      }
      return NextResponse.json({ error: 'Firebase Auth creation failed: ' + authErr.message }, { status: 400 });
    }

    // 2. Create user profile in Firestore
    await dbConnect();
    const hashedPassword = await require('bcryptjs').hash(password, 10);
    let item = await User.create({
      _id: firebaseUser.uid, // Map doc ID to Firebase UID!
      email,
      password: hashedPassword,
      name,
      role: role || 'admin'
    });

    const responseItem = item.toObject();
    delete responseItem.password;

    return NextResponse.json({ success: true, item: responseItem });
  } catch (err) {
    console.error('User create error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
