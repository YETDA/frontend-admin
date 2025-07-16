import { jwtDecode } from 'jwt-decode';

// utils/auth.ts
export async function syncAccessTokenFromCookie() {
  const res = await fetch('/api/auth/token', { credentials: 'include' });
  if (!res.ok) return;
  const data = await res.json();
  if (data.accessToken) {
    localStorage.setItem('accessToken', data.accessToken);
    console.log('✅ localStorage에 저장 완료');
  }
}

export async function fetchAccessToken() {
  try {
    const res = await fetch('/api/auth/token', {
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('인증되지 않았습니다.');
    }

    const data = await res.json();

    // ✅ localStorage에 저장
    localStorage.setItem('accessToken', data.token);

    console.log('✅ [Client] accessToken saved to localStorage:', data.token);
    return data.token;
  } catch (error) {
    console.error('❌ [Client] Failed to fetch token:', error);
    throw error;
  }
}
export function decodeAccessToken(token: string) {
  try {
    const payload = jwtDecode<any>(token);
    console.log('Decoded JWT payload:', payload);
    return payload;
  } catch (e) {
    console.error('Invalid JWT:', e);
    return null;
  }
}
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}
