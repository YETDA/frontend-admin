'use client';

import styles from './projectReview.module.scss';

export default function ProjectReviewHeader() {
  return (
    <div className={styles['dashboard__header']}>
      <h1 className={styles['dashboard__title']}>회원 관리 센터</h1>
      <p className={styles['dashboard__subtitle']}>
        플랫폼 사용자의 계정 상태를 관리하고 신속한 서비스 활용을 유지합니다
      </p>
      <div className={styles['dashboard__actions']}>
        <button className={styles['button button--secondary']}>회원 분석</button>
        <button className={styles['button button--primary']}>권한 관리</button>
      </div>
    </div>
  );
}
