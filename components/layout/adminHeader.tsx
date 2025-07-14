'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Search, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdownMenu';
import { useRouter } from 'next/navigation';

export function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 1. 서버 로그아웃 API 호출 (HttpOnly 쿠키 삭제용)
      // const response = await fetch('/api/auth/logout', {
      //   method: 'POST',
      //   credentials: 'include',
      // });
      //
      // if (!response.ok) {
      //   throw new Error('로그아웃 API 호출 실패');
      // }

      // 2. 클라이언트 쿠키 삭제 (non-HttpOnly 쿠키용)
      document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      localStorage.removeItem('accessToken');
      //localStorage.removeItem('userInfo');
      sessionStorage.clear();

      // 3. 클라이언트 상태관리 스토어 초기화
      // 예시: Zustand, Redux 등의 사용자 상태 초기화
      // useAuthStore.getState().clearUser();
      // 또는 localStorage/sessionStorage 클리어
      // localStorage.removeItem('userInfo');
      // sessionStorage.clear();

      // 4. 로그인 페이지로 이동
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">크라우드펀딩 운영센터</h1>
              <p className="text-xs text-gray-500">Crowdfunding Operations Center</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#1E9EFF] text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2 px-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-blue-500 text-white text-sm">김</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <div className="text-sm font-medium">김운영</div>
                    <div className="text-xs text-gray-500">슈퍼 관리자</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
