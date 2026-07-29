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

    // 1. Authenticate against Firebase Auth
    const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');
    const { app: firebaseApp } = require('@/lib/firebase');
    const firebaseAuth = getAuth(firebaseApp);

    let firebaseUser = null;
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      firebaseUser = userCredential.user;
    } catch (authErr) {
      console.warn("Firebase Auth sign-in failed, checking for auto-seeding:", authErr.code);
      
      // Auto-register superadmin in Firebase Auth if it doesn't exist yet
      if (email === 'admin@rajasthanrevenue.law' && password === 'Admin@Rajasthan2026') {
        try {
          console.log("Auto-registering super administrator in Firebase Auth...");
          const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
          firebaseUser = userCredential.user;
        } catch (regErr) {
          console.error("Auto-registration in Firebase Auth failed:", regErr);
        }
      }
      
      if (!firebaseUser) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
      }
    }

    // 2. Fetch or create user profile in Firestore
    await dbConnect();
    let user = await User.findOne({ email });

    if (!user) {
      // Auto-create admin profile in Firestore
      const hashedPassword = await require('bcryptjs').hash(password, 10);
      user = await User.create({
        email: email,
        password: hashedPassword,
        name: email === 'admin@rajasthanrevenue.law' ? 'Super Admin' : email.split('@')[0],
        role: 'admin',
      });
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
