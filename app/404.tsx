'use client';

import { FileQuestion, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Custom404() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileQuestion className="w-8 h-8 text-orange-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">페이지를 찾을 수 없습니다</h2>
          <p className="text-gray-600 leading-relaxed">
            요청하신 페이지가 존재하지 않거나
            <br />
            이동되었을 수 있습니다.
            <br />
            URL을 다시 확인해 주세요.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
          >
            <Home className="w-4 h-4" />
            홈으로 돌아가기
          </Link>

          <button
            onClick={goBack}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            이전 페이지로
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            문제가 지속되면{' '}
            <Link href="/contact" className="text-blue-500 hover:text-blue-600 underline">
              고객센터
            </Link>
            로 문의해 주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
