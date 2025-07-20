// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;
//   const ignoredPaths = ['/login', '/login/loading']; // 여기에 반드시 포함
//   const accessToken = request.cookies.get('accessToken')?.value;

//   if (ignoredPaths.includes(pathname)) {
//     return NextResponse.next();
//   }

//   if (!accessToken) {
//     console.log('❌ 인증 토큰 없음 - 로그인 페이지로 이동');
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   if (pathname === '/login' && accessToken) {
//     return NextResponse.redirect(new URL('/', request.url));
//   }

//   return NextResponse.next();
// }
// export const config = {
//   matcher: [
//     '/((?!api|_next|favicon.ico|login/oauth2).*)', // ✅ /login/oauth2 하위 전체 제외
//   ],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ✅ 임시: 인증 로직 모두 건너뜀
  console.log('🔧 미들웨어 진입:', pathname);

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico|login/oauth2).*)'],
};
