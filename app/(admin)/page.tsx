'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('accessToken', token);
      router.push('/');
    }
  }, [token, router]);

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
