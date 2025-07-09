'use client';

import styles from './StatCard.module.scss';

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  subtitle: string;
  iconColor: string;
}

export default function StatCard({ icon, value, label, subtitle, iconColor }: StatCardProps) {
  return (
    <div className={styles['stat-card']}>
      <div className={styles['stat-card__icon']} style={{ backgroundColor: iconColor }}>
        {icon}
      </div>
      <div className={styles['stat-card__value']}>{value}</div>
      <div className={styles['stat-card__label']}>{label}</div>
      <div className={styles['stat-card__subtitle']}>{subtitle}</div>
    </div>
  );
}
