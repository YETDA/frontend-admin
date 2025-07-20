'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/useUserStore';
import axios from 'axios';

export default function TokenSync() {
  const router = useRouter();
  const pathname = usePathname();
  const { setUser, clearUser }: { setUser: (user: any) => void; clearUser: () => void } = useUserStore();

  useEffect(() => {
    // 로그인 직후 '/'에서만 잠깐 TokenSync를 비활성화하거나 지연
    if (pathname === '/' && window.location.search.includes('from=login')) {
      console.log('🔄 로그인 리디렉션 직후 - TokenSync 대기 중');
      setTimeout(() => {
        router.replace('/'); // 쿼리 제거 후 재진입
      }, 300); // 300ms 후 쿼리 제거하고 재로드
      return;
    }

    const checkAndSyncToken = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`, {
          withCredentials: true,
        });

        if (res.status === 200) {
          const userData = res.data;
          setUser({
            ...userData,
            isAuthenticated: true,
          });
        } else {
          throw new Error('Authentication failed');
        }
      } catch (error) {
        console.log('❌ 토큰 검증 실패:', error);
        clearUser();
        router.push('/login');
      }
    };

    checkAndSyncToken();
  }, [setUser, clearUser, router, pathname]);

  return null;
}
