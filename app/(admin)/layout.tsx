import { AdminHeader } from '@/components/layout/adminHeader';
import { AdminSidebarShell } from '@/components/layout/adminSidebarShell'; // 클라이언트에서 상태 관리하는 껍데기
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      <AdminHeader />
      <div className="flex">
        <AdminSidebarShell>{children}</AdminSidebarShell>
      </div>
    </div>
  );
}
