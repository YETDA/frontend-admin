'use client';

import { useEffect } from 'react';

export default function ClientAuthWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    if (typeof window !== 'undefined') {
      const existing = localStorage.getItem('accessToken');
      if (!existing) {
        const token = process.env.NEXT_PUBLIC_FAKE_ACCESS_TOKEN || '';
        localStorage.setItem('accessToken', token);
        document.cookie = `accessToken=${token}; path=/;`;
        console.log('✅ 개발용 토큰을 localStorage와 쿠키에 넣었습니다.');
      }
    }
  }, []);

  return <>{children}</>;
}
