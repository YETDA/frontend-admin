'use client';

import styles from './dataTable.module.scss';
import type { ReactNode } from 'react';

interface DataTableProps {
  title: string;
  subtitle: string;
  actions?: ReactNode;
  children: ReactNode;
}

export default function DataTable({ title, subtitle, actions, children }: DataTableProps) {
  return (
    <div className={styles['dataTable']}>
      <div className={styles['dataTable__header']}>
        <div>
          <h2 className={styles['dataTable__title']}>{title}</h2>
          <p className={styles['dataTable__subtitle']}>{subtitle}</p>
        </div>
        {actions && <div className={styles['dataTable__actions']}>{actions}</div>}
      </div>
      <div className={styles['dataTable__container']}>{children}</div>
    </div>
  );
}
