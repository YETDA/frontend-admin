'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // OAuth 로그인 성공 후 콜백 처리
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const token = searchParams.get('token');

      if (code || state || token) {
        setIsProcessing(true);
        console.log('🔄 OAuth 콜백 처리 중...');

        // 5분 후에 토큰 체크
        const checkToken = async () => {
          const cookieToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            ?.split('=')[1];

          if (cookieToken) {
            console.log('✅ 토큰이 쿠키에 설정됨');
            router.replace('/'); // 🔄 쿼리 파라미터 제거하고 새로고침
          } else {
            console.log('❌ 5분 후에도 토큰이 설정되지 않음');
            setIsProcessing(false);
            // 토큰 설정 실패 시 로그인 페이지로
            router.push('/login');
          }
        };

        // 5분 후 실행 (300,000ms)
        setTimeout(checkToken, 300000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, router]);

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">로그인 처리 중... (5분 대기)</p>
          <p className="mt-1 text-sm text-gray-400">OAuth 토큰 설정을 기다리고 있습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <h1 className="home__title">크라우드펀딩 운영센터</h1>
      <p className="home__subtitle">운영자 페이지에 오신 것을 환영합니다.</p>
      <Link href="/login" className="home__link">
        로그인 페이지로 이동
      </Link>
    </div>
  );
}
