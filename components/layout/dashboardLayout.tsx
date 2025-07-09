import { ReactNode } from 'react';
import styles from './adminLayout.module.scss';
import Sidebar from './sidebar';
import Header from './header';
interface DashboardLayoutProps {
  children: ReactNode;
}

const {
  'admin-layout': adminLayout,
  'admin-layout__main': adminLayoutMain,
  'admin-layout__sidebar': adminLayoutSidebar,

  'admin-layout__content': adminLayoutContent,
} = styles;

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={adminLayout}>
      <Header />
      <div>
        <Sidebar className={adminLayoutSidebar} />
        <div className={adminLayoutMain}>
          <div className={adminLayoutContent}>{children}</div>
        </div>
      </div>
    </div>
  );
}
