'use client';

import { useEffect } from 'react';

export default function LoginRedirectPage() {
  useEffect(() => {
    // 쿠키가 반영되도록 강제 새로고침
    setTimeout(() => {
      window.location.replace('/dashboard'); // 대시보드로 리디렉션
    }, 100); // 100~300ms도 가능
  }, []);

  return <p>로그인 중입니다...</p>;
}
