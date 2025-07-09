'use client';

import { Eye, MoreHorizontal, X } from 'lucide-react';
import DataTable from '@/components/ui/dataTable';
import styles from './projectReviewTable.module.scss';

interface Props {
  members: any[];
  handleMemberDetail: (member: any) => void;
}

export default function ProjectReviewTable({ members, handleMemberDetail }: Props) {
  return (
    <DataTable
      title="회원 목록"
      subtitle="가입일 및 활동 순으로 정렬"
      actions={
        <>
          <span className={`${styles['badge']} ${styles['badge--warning']}`}>23건 검토중</span>
          <span className={`${styles['badge']} ${styles['badge--info']}`}>156건 이용완료</span>
        </>
      }
    >
      <table className={styles['reviewTable']}>
        <thead>
          <tr>
            <th className={styles['reviewTable__header']}>회원 정보</th>
            <th className={styles['reviewTable__header']}>이메일</th>
            <th className={styles['reviewTable__header']}>유형</th>
            <th className={styles['reviewTable__header']}>활동 현황</th>
            <th className={styles['reviewTable__header']}>인증 상태</th>
            <th className={styles['reviewTable__header']}>위험도</th>
            <th className={styles['reviewTable__header']}>계정 상태</th>
            <th className={styles['reviewTable__header']}>관리 작업</th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => (
            <tr key={member.id} className={styles['reviewTable__row']}>
              <td className={`${styles['reviewTable__cell']} ${styles['reviewTable__cell--user']}`}>
                <div className={styles['reviewTable__userAvatar']}>{member.nickname[0]}</div>
                <div className={styles['reviewTable__userInfo']}>
                  <div className={styles['reviewTable__userName']}>{member.nickname}</div>
                  <div className={styles['reviewTable__userDate']}>가입: {member.joinDate}</div>
                  <div className={styles['reviewTable__userDate']}>최근: {member.lastActivity}</div>
                </div>
              </td>
              <td className={styles['reviewTable__cell']}>{member.email}</td>
              <td className={styles['reviewTable__cell']}>
                <div>{member.location}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{member.category}</div>
                {member.status === '신규회원' && (
                  <span className={`${styles['badge']} ${styles['badge--success']}`} style={{ marginTop: '4px' }}>
                    신규
                  </span>
                )}
              </td>
              <td className={styles['reviewTable__cell']}>
                <div>₩{member.fundingAmount.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>펀딩 참여액</div>
              </td>
              <td className={styles['reviewTable__cell']}>
                <span
                  className={`${styles['badge']} ${
                    member.accountStatus === '정상'
                      ? styles['badge--success']
                      : member.accountStatus === '신고접수'
                      ? styles['badge--warning']
                      : styles['badge--error']
                  }`}
                >
                  {member.accountStatus}
                </span>
              </td>
              <td className={styles['reviewTable__cell']}>
                <span
                  className={`${styles['badge']} ${
                    member.level === '일반'
                      ? styles['badge--success']
                      : member.level === '보통'
                      ? styles['badge--warning']
                      : styles['badge--error']
                  }`}
                >
                  {member.level}
                </span>
              </td>
              <td className={styles['reviewTable__cell']}>
                <span
                  className={`${styles['badge']} ${
                    member.status === '정상'
                      ? styles['badge--success']
                      : member.status === '검토중'
                      ? styles['badge--warning']
                      : styles['badge--error']
                  }`}
                >
                  {member.status}
                </span>
              </td>
              <td className={`${styles['reviewTable__cell']} ${styles['reviewTable__cell--actions']}`}>
                <div className={styles['reviewTable__actionButtons']}>
                  <button
                    className={`${styles['reviewTable__actionBtn']} ${styles['reviewTable__actionBtn--approve']}`}
                    onClick={() => handleMemberDetail(member)}
                  >
                    <Eye size={16} />
                  </button>
                  <button className={`${styles['reviewTable__actionBtn']} ${styles['reviewTable__actionBtn--hold']}`}>
                    <MoreHorizontal size={16} />
                  </button>
                  <button
                    className={`${styles['reviewTable__actionBtn']} ${styles['reviewTable__actionBtn--download']}`}
                  >
                    <X size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DataTable>
  );
}
