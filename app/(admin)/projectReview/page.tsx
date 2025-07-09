'use client';
import styles from './projectReview.module.scss';
import ProjectReviewTable from './_components/projectReviewTable';
import MemberDetailModal from '@/components/modals/memberDetailModal';
import { members } from '@/dummy/projectReviewPage';
import FilterSection from '@/components/ui/filterSection';
import StatCard from '@/components/ui/statCard';
import { useState } from 'react';

export default function ProjectReview() {
  const [memberDetailOpen, setMemberDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const handleMemberDetail = (member: any) => {
    setSelectedMember(member);
    setMemberDetailOpen(true);
  };

  return (
    <div>
      <div className={styles['dashboard']}>
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

        <div className={styles['dashboard__stats']}>
          <StatCard icon="👥" value="15,247" label="전체 회원 수" subtitle="누적 가입 회원" iconColor="#2196f3" />
          <StatCard icon="👥" value="12,891" label="활성 사용자" subtitle="최근 30일 활동" iconColor="#4caf50" />
          <StatCard icon="⚠️" value="23" label="신고된 사용자" subtitle="처리 대기 중" iconColor="#ff9800" />
          <StatCard icon="🚫" value="156" label="정지된 계정" subtitle="현재 이용 제한" iconColor="#f44336" />
        </div>

        <FilterSection>
          <div className={styles['dashboard__search']}>
            <div className={styles['dashboard__search-icon']}>🔍</div>
            <input
              type="text"
              placeholder="닉네임, 이메일, 프로젝트명으로 검색..."
              className={`${styles['form__input']} ${styles['dashboard__search-input']}`}
            />
          </div>
          <select className={styles['form__select']}>
            <option>회원 유형</option>
            <option>창작자</option>
            <option>후원자</option>
            <option>관리자</option>
          </select>
          <select className={styles['form__select']}>
            <option>계정 상태</option>
            <option>정상</option>
            <option>신고접수</option>
            <option>이용정지</option>
          </select>
          <select className={styles['form__select']}>
            <option>위험도</option>
            <option>낮음</option>
            <option>보통</option>
            <option>높음</option>
          </select>
        </FilterSection>

        <ProjectReviewTable members={members} handleMemberDetail={handleMemberDetail} />
      </div>

      {selectedMember && (
        <MemberDetailModal
          isOpen={memberDetailOpen}
          onClose={() => setMemberDetailOpen(false)}
          member={selectedMember}
        />
      )}
    </div>
  );
}
