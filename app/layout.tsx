import type { ReactNode } from 'react';
import '@/styles/globals.scss';
import { QueryProvider } from './providers/queryProvider';

export const metadata = {
  title: '옜다 - 크라우드펀딩 운영센터',
  description: '기술 기반 크라우드펀딩 운영센터 관리자(Admin) 대시보드',
  themeColor: '#1E9EFF',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: '옜다 - 크라우드펀딩 운영센터',
    description: '기술 기반 크라우드펀딩 운영센터 관리자(Admin) 대시보드',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
