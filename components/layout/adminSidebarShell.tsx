'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/layout/adminSidebar';
import type { ReactNode } from 'react';

export function AdminSidebarShell({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <>
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 p-8">{children}</main>
    </>
  );
}
