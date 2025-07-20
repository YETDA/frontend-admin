'use client';

import { useEffect, useState } from 'react';

export default function LoginRedirectPage() {
  const [dots, setDots] = useState('');
  useEffect(() => {
    // 쿠키가 반영되도록 강제 새로고침
    setTimeout(() => {
      window.location.replace('/dashboard'); // 대시보드로 리디렉션
    }, 100); // 100~300ms도 가능
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return '';
        return prev + '.';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* 로딩 애니메이션 - 심플한 동그라미들 */}
        <div className="flex justify-center space-x-3">
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* 로딩 텍스트 */}
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-800">로그인 중입니다{dots}</h1>
          <p className="text-gray-500 text-sm">잠시만 기다려주세요</p>
        </div>

        {/* 프로그레스 바 */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* 장식적 요소 */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* 배경 장식 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>
      </div>
    </div>
  );
}
