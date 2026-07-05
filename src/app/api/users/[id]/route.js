import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';
import { verifyToken } from '@/lib/auth';

export async function GET(req, { params }) {
  try {
    const decoded = verifyToken(req);
    if (!decoded || decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    await dbConnect();
    const { id } = params;
    const item = await User.findById(id).select('-password');
    if (!item) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
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
    const { email, password, name, role } = body;

    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if email is updated and is unique
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (role) user.role = role;

    // Hash and update password only if a new non-empty password is submitted
    if (password && password.trim() !== '') {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    const responseItem = user.toObject();
    delete responseItem.password;

    return NextResponse.json({ success: true, item: responseItem });
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

    // Prevent deleting superadmin admin@rajasthanrevenue.law or the active user itself
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.email === 'admin@rajasthanrevenue.law') {
      return NextResponse.json({ error: 'Cannot delete the super administrator' }, { status: 400 });
    }
    if (user._id.toString() === decoded.id) {
      return NextResponse.json({ error: 'Cannot delete your own active session' }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
