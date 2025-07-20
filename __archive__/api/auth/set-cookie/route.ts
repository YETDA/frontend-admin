import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: '✅ 쿠키 세팅 완료!' });

  response.cookies.set({
    name: 'accessToken',
    value: 'JWT_TEST_TOKEN',
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * 60 * 60, // 1 day
  });

  return response;
}
