'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Github } from 'lucide-react';

export default function LoginPage() {
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
              onClick={() => {
                /* 카카오 로그인 로직 */
              }}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
              </svg>
              카카오 계정으로 로그인
            </Button>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50 font-medium bg-transparent"
              onClick={() => {
                /* Github 로그인 로직 */
              }}
            >
              <Github className="w-5 h-5 mr-2" />
              Github 계정으로 로그인
            </Button>

            <div className="pt-4 border-t border-gray-200">
              <Link href="/">
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
