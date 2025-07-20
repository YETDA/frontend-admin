'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Github } from 'lucide-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useUserStore, UserInfo } from '@/stores/useUserStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const redirectUri = encodeURIComponent('http://localhost:3000');

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/kakao?state=${redirectUri}`;
  };

  const handleGithubLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/github`;
  };
  const router = useRouter();
  const [userData, setUserData] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/mypage`, {
          withCredentials: true,
        });

        const user = res.data.data;

        useUserStore.getState().setUser({
          name: user.name,
          email: user.email,
          image: user.image,
          portfolioAddress: user.portfolioAddress,
          introduce: user.introduce,
          userId: String(user.user_id),
          isAuthenticated: true,
        });
        useUserStore.getState().setPersistMode('post-login');
        setUserData(user);
      } catch (err: any) {
        if (err.response?.status === 401) {
          console.warn('유저 상태 초기화');
          useUserStore.getState().clearUser();
        } else {
          console.error('예상 외의 에러', err);
          router.push('/login');
          console.warn('인증되지 않은 사용자이거나 토큰 없음:', err);
        }
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-[400px] shadow-lg">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                CF
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">예따 운영 관리자</h1>
                <p className="text-sm text-gray-500">운영 관리자 페이지에 오신걸 환영합니다</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              className="w-full h-12 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium"
              onClick={handleKakaoLogin}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
              </svg>
              카카오 계정으로 로그인
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium bg-transparent"
              onClick={handleGithubLogin}
            >
              <Github className="w-5 h-5 mr-2" />
              Github 계정으로 로그인
            </Button>

            <div className="pt-4 border-t border-gray-200">
              <Link href="https://www.yetfront.booktri.site/">
                <Button variant="ghost" className="w-full h-12 text-gray-600 hover:text-gray-900 font-medium">
                  서비스 홈으로 가기
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
