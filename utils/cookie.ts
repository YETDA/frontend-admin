import { jwtDecode } from 'jwt-decode';
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
