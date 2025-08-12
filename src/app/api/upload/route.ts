import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge'; // fast & scalable

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file' }, { status: 400 });
    }
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 413 });
    }

    const key = `uploads/${crypto.randomUUID()}-${file.name.replace(/\s+/g, '-')}`;
    const blob = await put(key, file, {
      access: 'public', // keep uploads private
      contentType: file.type || 'application/octet-stream',
      token: process.env.BLOB_READ_WRITE_TOKEN, // required on Edge
    });

    return NextResponse.json({ url: blob.url, pathname: blob.pathname });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}