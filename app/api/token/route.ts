import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const token = `FAKE_ADMIN_TOKEN_FOR_${email}`;

  const isProd = process.env.NODE_ENV === 'production';

  const response = NextResponse.json({ accessToken: token });

  return response;
}
/*
export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  if (!accessToken) return NextResponse.json({ error: 'No token' }, { status: 401 });

  try {
    const payload = jwt.verify(accessToken, process.env.JWT_SECRET!);
    return NextResponse.json({ payload });
  } catch {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
*/
