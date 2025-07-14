import type { ReactNode } from 'react';
import { QueryProvider } from './providers/queryProvider';
import '@/app/globals.css';
import ClientAuthWrapper from './clientAuthWrapper';

export const metadata = {
  title: '옜다 - 크라우드펀딩 운영센터',
  description: '기술 기반 크라우드펀딩 운영센터 관리자(Admin) 대시보드',
  icons: { icon: '/favicon.ico' },
  openGraph: {
    title: '옜다 - 크라우드펀딩 운영센터',
    description: '기술 기반 크라우드펀딩 운영센터 관리자(Admin) 대시보드',
    type: 'website',
    locale: 'ko_KR',
  },
};

export const viewport = {
  themeColor: '#1E9EFF',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
          {/* <ClientAuthWrapper>{children}</ClientAuthWrapper> */}
        </QueryProvider>
      </body>
    </html>
  );
}
