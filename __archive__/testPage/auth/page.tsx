'use client';
import { issueAccessTokenCookie, testAdminToken } from '@/lib/apis/test';
import { fetchAccessToken } from '@/utils/cookie';
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  // 버튼 클릭 핸들러
  const handleLoginAndFetch = async () => {
    try {
      console.log('✅ 관리자 토큰 발급 요청');
      await issueAccessTokenCookie();

      console.log('✅ 발급 후 유저 정보 확인');
      const data = await fetchAccessToken(); // 쿠키 포함으로 서버에 나 누구냐 물어보기
      console.log('✅ data:', data);

      setUser(data);
    } catch (err) {
      console.error('❌ 인증 실패:', err);
      setUser(null);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <button
        onClick={handleLoginAndFetch}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        관리자 토큰 발급 테스트
      </button>

      {user ? (
        <div className="mt-4 p-4 border rounded-lg">
          <h1 className="text-xl font-bold">✅ 환영합니다</h1>
          <p>역할: </p>
        </div>
      ) : (
        <div className="mt-4 p-4 border rounded-lg text-gray-500">로그인되지 않았습니다.</div>
      )}
    </div>
  );
}
