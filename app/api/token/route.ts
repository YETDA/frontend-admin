import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const token = `FAKE_ADMIN_TOKEN_FOR_${email}`;

  const isProd = process.env.NODE_ENV === 'production';

  const response = NextResponse.json({ accessToken: token });

  return response;
}
