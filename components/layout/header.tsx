'use client';

import { Search, Bell, Settings } from 'lucide-react';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles['header']}>
      <HeaderLogo />
      <div className={styles['header__content']}>
        <div className={styles['header__search']}>
          <div className={styles['header__search-icon']}>
            <Search size={16} />
          </div>
          <input type="text" placeholder="프로젝트, 사용자 검색..." className={styles['header__search-input']} />
        </div>

        <div>
          <button className={styles['header__notification']}>
            <Bell size={20} />
            <div className={styles['header__notification-badge']}></div>
          </button>
          <button className={styles['header__notification']}>
            <Settings size={20} />
            <div className={styles['header__notification-badge']}></div>
          </button>
        </div>
        <div className={styles['header__actions']}>
          <div className={styles['header__user']}>
            <div className={styles['header__user-avatar']}>김</div>
            <div className={styles['header__user-info']}>
              <div className={styles['header__user-info-name']}>김운영</div>
              <div className={styles['header__user-info-role']}>운영 관리자</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeaderLogo() {
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
