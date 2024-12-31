import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const streamSource = process.env.NEXT_PUBLIC_DEFAULT_STREAM_SOURCE;
    
    return NextResponse.json({ streamSource });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stream source' },
      { status: 500 }
    );
  }
}
