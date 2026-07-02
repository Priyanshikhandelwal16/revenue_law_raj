import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'rrlkp_super_secret_jwt_key_2026';

export function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(req) {
  try {
    const authHeader = req.headers.get('authorization');
    let token = null;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    } else {
      const cookieHeader = req.headers.get('cookie') || '';
      const match = cookieHeader.match(/token=([^;]+)/);
      if (match) {
        token = match[1];
      }
    }

    if (!token) return null;

    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
