'use client';
import styles from './sidebar.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, DollarSign } from 'lucide-react';
import type { ReactNode } from 'react';

interface SidebarNavItemProps {
  href: string;
  icon: ReactNode;
  label: string;
  description: string;
  badgeCount?: number;
}
interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  return (
    <div className={`${styles['sidebar']} ${className || ''}`}>
      <div className={styles['sidebar__section']}>
        <div className={styles['sidebar__section-title']}>심사 및 승인</div>
        <SidebarNavItem
          href="/projectReview"
          icon={<ClipboardList size={16} />}
          label="프로젝트 심사 센터"
          description="창작자 프로젝트 전문 검토 및 승인"
          badgeCount={24}
        />
        <SidebarNavItem
          href="/settlementCenter"
          icon={<DollarSign size={16} />}
          label="정산 처리 센터"
          description="창작자 수익 정산 및 지급 관리"
          badgeCount={8}
        />
      </div>
    </div>
  );
}

function SidebarNavItem({ href, label, badgeCount, description }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles['sidebar__nav-link']} ${isActive ? styles['sidebar__nav-link--active'] : ''}`}
    >
      <div className={styles['sidebar__nav-text-group']}>
        <div className={styles['sidebar__nav-top-row']}>
          <div className={styles['sidebar__nav-label']}>{label}</div>
          {badgeCount && <div className={styles['sidebar__nav-badge']}>{badgeCount}</div>}
        </div>
        <div className={styles['sidebar__nav-description']}>{description}</div>
      </div>
    </Link>
  );
}
