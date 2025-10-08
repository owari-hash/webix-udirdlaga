import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization header required' }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // Verify token
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (error) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // In a real application, you would:
    // 1. Add all user's tokens to a blacklist/revocation list
    // 2. Remove all refresh tokens from the database for this user
    // 3. Log the logout-all event
    // 4. Send notifications to other devices

    return NextResponse.json({
      success: true,
      message: 'Logged out from all devices successfully',
    });
  } catch (error) {
    console.error('Logout all error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
