'use client';
import { useEffect } from 'react';

import { ReactNode } from 'react';

export default function ClientAuthWrapper({ children }: { children: ReactNode }) {
  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('api/auth/token');
      if (!res.ok) return;
      const data = await res.json();
      if (data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        console.log('✅ localStorage에 저장 완료');
      }
    };

    fetchToken();
  }, []);

  return <>{children}</>;
}
