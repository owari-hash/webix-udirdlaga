import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Authorization header required' }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return NextResponse.json({
        success: true,
        data: { valid: true, decoded },
      });
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid token',
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

