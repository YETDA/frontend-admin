'use client';

import styles from './header.module.scss';

export default function HeaderLogo() {
  return (
    <div className={styles['header__logo']}>
      <div className={styles['header__logo-content']}>
        <div className={styles['header__logo-icon']}>CF</div>
        <div className={styles['header__logo-text']}>
          <div className={styles['header__logo-title']}>크라우드펀딩 운영센터</div>
          <div className={styles['header__logo-subtitle']}>Crowdfunding Operations Center</div>
        </div>
      </div>
    </div>
  );
}
