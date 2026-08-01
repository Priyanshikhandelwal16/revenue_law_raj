import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';

export async function POST(req) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { currentPassword, newPassword } = await req.json();
    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Current password and new password are required' }, { status: 400 });
    }

    await dbConnect();
    const user = await User.findById(decoded.id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // 1. If online/Firebase configuration is active, update Firebase Auth password
    const isOffline = global.mongoose && global.mongoose.isOffline;
    if (!isOffline) {
      try {
        const { getAuth, signInWithEmailAndPassword, updatePassword } = require('firebase/auth');
        const { app: firebaseApp } = require('@/lib/firebase');
        const firebaseAuth = getAuth(firebaseApp);

        // Authenticate using the current password
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, user.email, currentPassword);
        const firebaseUser = userCredential.user;

        // Update the password in Firebase Auth
        await updatePassword(firebaseUser, newPassword);
      } catch (authErr) {
        console.error("Firebase Auth password update failed:", authErr);
        // If current password is wrong, return error
        if (authErr.code === 'auth/invalid-credential' || authErr.code === 'auth/wrong-password') {
          return NextResponse.json({ error: 'Invalid current password' }, { status: 400 });
        }
        // For other network/server errors when online, return error
        return NextResponse.json({ error: 'Failed to update authentication credentials: ' + (authErr.message || authErr.code) }, { status: 500 });
      }
    } else {
      // In offline mode, verify the current password using bcrypt
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ error: 'Invalid current password' }, { status: 400 });
      }
    }

    // 2. Update password in the database (hashed)
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    return NextResponse.json({ error: 'Server error: ' + err.message }, { status: 500 });
  }
}
