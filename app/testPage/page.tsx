'use client';

import { api } from '@/lib/axios/client';

export default function TestPage() {
  async function getProjectById() {
    try {
      const res = await api.get('/api/v1/project/1');
      console.log('프로젝트 응답:', res.data);
      alert(`프로젝트 응답: ${JSON.stringify(res.data)}`);
    } catch (error) {
      console.error('API 오류:', error);
      alert('API 오류! 콘솔 확인');
    }
  }
  async function testAdminToken() {
    try {
      const res = await api.post('/api/v1/token/admin');

      // ✅ 헤더에서 Authorization 꺼내기
      const authHeader = res.headers['authorization'];
      console.log('Authorization 헤더:', authHeader);

      alert(`Access Token 있나요: ${authHeader}`);
    } catch (error) {
      console.error('인증 실패:', error);
      alert('관리자 인증 실패! 다시 로그인 필요');
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">테스트 페이지</h1>

      <div className="space-y-4">
        <button
          onClick={testAdminToken}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          관리자 토큰 발급 테스트
        </button>

        <button
          onClick={getProjectById}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          프로젝트 조회 (ID=1)
        </button>
      </div>
    </div>
  );
}
