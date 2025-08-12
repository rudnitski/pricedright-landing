import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    // Minimal validation
    if (!data?.email || !data?.photoUrl) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const record = {
      ...data,
      createdAt: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || 'unknown',
    };

    const key = `submissions/${new Date().toISOString().slice(0,10)}-${crypto.randomUUID()}.json`;
    const blob = await put(key, JSON.stringify(record, null, 2), {
      access: 'public',
      contentType: 'application/json',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // You’ll read these JSONs later to process reports
    return NextResponse.json({ ok: true, id: blob.pathname });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Submit failed' }, { status: 500 });
  }
}