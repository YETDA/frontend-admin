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
    const res = await api.post(
      '/api/v1/token/admin',
      {},
      {
        withCredentials: true,
      },
    );

    console.log('Authorization:', res.headers['authorization']);
    alert(`Access Token: ${res.headers['authorization']}`);
  } catch (error) {
    console.error('인증 실패:', error);
    alert('관리자 인증 실패! 다시 로그인 필요');
  }
}
export function getUserInfo() {
  return api.get('/api/v1/user/me');
}
