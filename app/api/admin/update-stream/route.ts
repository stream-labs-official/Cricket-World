import { NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { streamSource } = await request.json();
    const filePath = path.join(process.cwd(), '.env');
    
    // Read current .env content
    const currentEnvContent = await fs.readFile(filePath, 'utf-8');
    
    // Replace the stream source
    const updatedEnvContent = currentEnvContent.replace(
      /NEXT_PUBLIC_DEFAULT_STREAM_SOURCE=.*/, 
      `NEXT_PUBLIC_DEFAULT_STREAM_SOURCE=${streamSource}`
    );
    
    // Write updated content back to .env
    await fs.writeFile(filePath, updatedEnvContent);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update stream source' },
      { status: 500 }
    );
  }
}
