import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    
    const expectedUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME;
    const expectedPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
    
    if (
      username === expectedUsername &&
      password === expectedPassword
    ) {
      return NextResponse.json({ success: true });
    }
    
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
