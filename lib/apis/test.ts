import { api } from '../axios/client';

export async function getProjectById() {
  try {
    const res = await api.get('/api/v1/project/1');
    console.log('서버 확인용:', res.data);
    alert(`서버 확인용: ${JSON.stringify(res.data)}`);
  } catch (error) {
    console.error('API 오류:', error);
    alert('API 오류! 콘솔 확인');
  }
}
export async function testAdminToken() {
  try {
    const res = await api.post('/api/v1/token/admin', {}, { withCredentials: true });

    console.log('백엔드 서버응답:', res.data);
  } catch (error) {
    console.error('인증 실패:', error);
    alert('관리자 인증 실패! 다시 로그인 필요');
  }
}
export function getUserInfo() {
  return api.get('/api/v1/user/me');
}

export async function readTestCookie() {
  try {
    const res = await fetch('https://localhost:3000/api/auth/token', {
      credentials: 'include',
    });
    const data = await res.json();
    console.log('✅ 읽은 쿠키:', data);
    alert(`✅ 읽은 쿠키: ${JSON.stringify(data)}`);
  } catch (error) {
    console.error('❌ 쿠키 읽기 실패:', error);
    alert('❌ 쿠키 읽기 실패! 콘솔을 확인하세요.');
  }
}

export async function issueAccessTokenCookie() {
  try {
    console.log('✅ 서버에 쿠키 발급 요청 보내는 중 (POST)');

    const res = await fetch('https://localhost:3000/api/auth/set-cookie', {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('✅ 쿠키 발급 응답:', data);
    return data;
  } catch (error) {
    console.error('❌ 쿠키 발급 실패:', error);
    throw error;
  }
}
