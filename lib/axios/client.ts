import type { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';

import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/*
요청 인터셉터 (Request Interceptor)
- 모든 요청을 보내기 전에 한 번 가로채서 처리
- 주로 하는 일: 토큰 자동 추가
  흐름:
    1. 사용자가 api.get('/users') 호출
    2. axios가 이 인터셉터를 거쳐서 config를 수정
    3. Authorization 헤더를 자동으로 붙임
    4. 최종 config로 서버에 전송
*/
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() ?? null;
  }
  return null;
}

api.interceptors.request.use(
  config => {
    if (typeof window !== 'undefined') {
      // 먼저 localStorage
      let token = localStorage.getItem('accessToken');

      // 없으면 쿠키에서
      if (!token) {
        token = getCookie('accessToken');
      }
      // Authorization 헤더
      if (token) {
        if (config.headers?.set) {
          config.headers.set('Authorization', `Bearer ${token}`);
        } else {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }
    }
    return config;
  },
  error => Promise.reject(error),
);
