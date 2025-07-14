import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;

  if (accessToken) {
    try {
      const payload = jwt.verify(accessToken, process.env.JWT_SECRET!);
      console.log('Decoded payload:', payload);
    } catch (err) {
      console.log('Invalid token');
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: '/:path*',
};
