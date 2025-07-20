'use client';

import { useState } from 'react';
import { fetchAdminProjects } from '@/lib/apis/projects';
import { getProjectById, getUserInfo, testAdminToken } from '@/lib/apis/test';
import { decodeAccessToken, fetchAccessToken, getCookie, syncAccessTokenFromCookie } from '@/utils/cookie';

export default function TestPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const accessToken = getCookie('accessToken'); // 쿠키 읽는 함수

  const handleFetchProjects = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 fetchAdminProjects 테스트 시작...');
      const data = await fetchAdminProjects({
        page: '0',
        totalCount: '100',
        type: 'ALL',
      });
      console.log(
        'content데이터',
        data,
        '\n----------------------------------------------------------------\n전체 데이터 길이:',
        data,
      );
      setResult(data);
      alert(`API 호출 성공!\n데이터 길이: ${data?.length || 0}개\n콘솔에서 상세 정보를 확인하세요.`);
      if (accessToken) {
        const payload = decodeAccessToken(accessToken);
        console.log('있는거?', payload?.role);
      }
    } catch (err: any) {
      console.error('❌ fetchAdminProjects 실패:', err);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleGetUserInfo = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 getUserInfo 테스트 시작...');
      const data = await getUserInfo();
      console.log('사용자 정보:', data);
      setResult(data);
      alert(`사용자 정보 조회 성공!\n콘솔에서 상세 정보를 확인하세요.`);
    } catch (err: any) {
      console.error('❌ getUserInfo 실패:', err);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestToken = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 토큰 검증 테스트 시작...');
      const response = await fetch('/api/token', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`토큰 검증 실패: ${response.status}`);
      }

      const data = await response.json();
      console.log('토큰 검증 결과:', data);
      setResult(data);
      alert(`토큰 검증 성공!\n콘솔에서 상세 정보를 확인하세요.`);
    } catch (err: any) {
      console.error('❌ 토큰 검증 실패:', err);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
    const data = await fetchAccessToken(); // 쿠키 포함으로 서버에 나 누구냐 물어보기
    console.log('✅ data:', data);
  };

  const handleSaveCookieToLocalStorage = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      console.log('🚀 쿠키 → localStorage 저장 테스트 시작...');
      const token = await fetchAccessToken();
      console.log('✅ 저장된 토큰:', token);

      // localStorage에서 확인
      const savedToken = localStorage.getItem('accessToken');
      console.log('✅ localStorage에서 읽어온 토큰:', savedToken);

      setResult({
        message: '쿠키를 localStorage에 저장했습니다!',
        token: token,
        savedInLocalStorage: savedToken === token,
      });

      alert('쿠키 → localStorage 저장 완료!');
    } catch (err: any) {
      console.error('❌ 쿠키 저장 실패:', err);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">테스트 페이지</h1>

      <div className="space-y-4">
        <button
          onClick={testAdminToken}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          관리자 토큰 발급 테스트
        </button>

        {/* 새로 추가된 버튼 */}
        <button
          onClick={handleSaveCookieToLocalStorage}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 ${
            loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              로딩 중...
            </>
          ) : (
            '쿠키 → localStorage 저장 테스트'
          )}
        </button>

        {/* 토큰 검증 테스트 버튼 */}
        <button
          onClick={handleTestToken}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 ${
            loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              로딩 중...
            </>
          ) : (
            '토큰 검증 테스트 (/api/token)'
          )}
        </button>
        <button
          onClick={syncAccessTokenFromCookie}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg shadow hover:bg-cyan-700 transition-colors"
        >
          쿠키 → localStorage 동기화
        </button>
        <button
          onClick={getProjectById}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition-colors"
        >
          프로젝트 조회 (ID=1, 서버 확인용)
        </button>

        {/* getUserInfo 테스트 버튼 */}
        <button
          onClick={handleGetUserInfo}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 ${
            loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              로딩 중...
            </>
          ) : (
            '사용자 정보 조회'
          )}
        </button>

        {/* fetchAdminProjects 테스트 버튼 */}
        <button
          onClick={handleFetchProjects}
          disabled={loading}
          className={`px-4 py-2 rounded-lg shadow transition-colors flex items-center gap-2 ${
            loading ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              로딩 중...
            </>
          ) : (
            '관리자 프로젝트 목록 조회'
          )}
        </button>
      </div>

      {/* 결과 표시 영역 */}
      {(result || error) && (
        <div className="mt-6 p-4 border rounded-lg">
          <h2 className="text-lg font-semibold mb-2">테스트 결과</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
              <strong>❌ 오류 발생:</strong> {error}
            </div>
          )}

          {result && (
            <div className="space-y-3">
              <div className="p-3 bg-green-50 border border-green-200 rounded text-green-700">
                <strong> 성공!</strong> 데이터를 성공적으로 가져왔습니다.
              </div>

              <div className="p-3 bg-gray-50 border border-gray-200 rounded">
                <p>
                  <strong>데이터 길이:</strong> {result?.length || '단일 객체'}
                </p>
                <p>
                  <strong>데이터 타입:</strong> {Array.isArray(result) ? '배열' : typeof result}
                </p>
              </div>

              {/* 첫 번째 항목 미리보기 */}
              {result && result.length > 0 && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <strong>첫 번째 항목 미리보기:</strong>
                  <pre className="mt-2 text-sm bg-white p-2 rounded overflow-auto max-h-40">
                    {JSON.stringify(result[0], null, 2)}
                  </pre>
                </div>
              )}

              {/* 전체 데이터 보기 (접을 수 있는 형태) */}
              <details className="p-3 bg-gray-50 border border-gray-200 rounded">
                <summary className="cursor-pointer font-medium">전체 데이터 보기 (클릭하여 펼치기)</summary>
                <pre className="mt-2 text-sm bg-white p-2 rounded overflow-auto max-h-60">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </details>
            </div>
          )}
        </div>
      )}

      {/* 사용법 안내 */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <h3 className="font-semibold text-yellow-800 mb-2">📋 사용법</h3>
        <ul className="text-sm text-yellow-700 space-y-1">
          <li>• 각 버튼을 클릭하여 API 호출을 테스트할 수 있습니다.</li>
          <li>• 성공/실패 결과는 화면과 브라우저 콘솔에 표시됩니다.</li>
          <li>• 개발자 도구(F12)를 열고 Console 탭에서 상세 로그를 확인하세요.</li>
          <li>• 오류 발생 시 Alert 창에서 문제 영역을 확인할 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
