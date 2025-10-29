import { NextRequest, NextResponse } from 'next/server';

// External API configuration
const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL || 'http://localhost:3000';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  });
}

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Хэрэглэгчийн нэр болон нууц үг шаардлагатай',
          messageEn: 'Username and password are required',
        },
        {
          status: 400,
          headers: corsHeaders,
        }
      );
    }

    // Call external API for authentication
    const response = await fetch(`${EXTERNAL_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    // Return the response from external API
    return NextResponse.json(data, {
      status: response.status,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Нэвтрэх үйлчилгээнд холбогдох боломжгүй байна',
        messageEn: 'Failed to connect to authentication service',
      },
      {
        status: 500,
        headers: corsHeaders,
      }
    );
  }
}
