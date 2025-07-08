"use client";

import AdminLayout from "@/components/layout/adminLayout";
import MemberDetailModal from "@/components/modals/memberDetailModal";
import DataTable from "@/components/ui/dataTable";
import FilterSection from "@/components/ui/filterSection";
import StatCard from "@/components/ui/statCard";
import { useState } from "react";

export default function ProjectReview() {
  const [memberDetailOpen, setMemberDetailOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const members = [
    {
      id: 1,
      nickname: "김창작",
      email: "creator@example.com",
      joinDate: "2024-01-10",
      lastActivity: "2시간 전",
      category: "프로젝트 0개",
      fundingAmount: 95200,
      status: "신규회원",
      accountStatus: "정상",
      level: "일반",
      projectCount: 0,
      totalAmount: 120000,
      paymentStatus: "신고접수",
      approvalStatus: "높음",
      memberStatus: "검토중",
      location: "창작자",
    },
    {
      id: 2,
      nickname: "이후원",
      email: "supporter@example.com",
      joinDate: "2024-01-08",
      lastActivity: "1시간 전",
      category: "프로젝트 0개",
      fundingAmount: 650000,
      status: "신규회원",
      accountStatus: "정상",
      level: "일반",
      projectCount: 1,
      totalAmount: 120000,
      paymentStatus: "신고접수",
      approvalStatus: "높음",
      memberStatus: "검토중",
      location: "후원자",
    },
    {
      id: 3,
      nickname: "박신고",
      email: "reported@example.com",
      joinDate: "2024-01-05",
      lastActivity: "3시간 전",
      category: "프로젝트 1개",
      fundingAmount: 120000,
      status: "검토중",
      accountStatus: "신고접수",
      level: "높음",
      projectCount: 1,
      totalAmount: 120000,
      paymentStatus: "신고접수",
      approvalStatus: "높음",
      memberStatus: "검토중",
      location: "창작자",
    },
    {
      id: 4,
      nickname: "최정지",
      email: "suspended@example.com",
      joinDate: "2023-12-20",
      lastActivity: "1주일 전",
      category: "프로젝트 0개",
      fundingAmount: 0,
      status: "이용정지",
      accountStatus: "이용정지",
      level: "높음",
      projectCount: 0,
      totalAmount: 120000,
      paymentStatus: "신고접수",
      approvalStatus: "높음",
      memberStatus: "검토중",
      location: "후원자",
    },
  ];

  const handleMemberDetail = (member: any) => {
    setSelectedMember(member);
    setMemberDetailOpen(true);
  };

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">회원 관리 센터</h1>
          <p className="dashboard__subtitle">
            플랫폼 사용자의 계정 상태를 관리하고 신속한 서비스 활용을 유지합니다
          </p>
          <div className="dashboard__actions">
            <button className="button button--secondary">회원 분석</button>
            <button className="button button--primary">권한 관리</button>
          </div>
        </div>

        <div className="dashboard__stats">
          <StatCard
            icon="👥"
            value="15,247"
            label="전체 회원 수"
            subtitle="누적 가입 회원"
            iconColor="#2196f3"
          />
          <StatCard
            icon="👥"
            value="12,891"
            label="활성 사용자"
            subtitle="최근 30일 활동"
            iconColor="#4caf50"
          />
          <StatCard
            icon="⚠️"
            value="23"
            label="신고된 사용자"
            subtitle="처리 대기 중"
            iconColor="#ff9800"
          />
          <StatCard
            icon="🚫"
            value="156"
            label="정지된 계정"
            subtitle="현재 이용 제한"
            iconColor="#f44336"
          />
        </div>

        <FilterSection>
          <div className="dashboard__search">
            <div className="dashboard__search-icon">🔍</div>
            <input
              type="text"
              placeholder="닉네임, 이메일, 프로젝트명으로 검색..."
              className="form__input dashboard__search-input"
            />
          </div>
          <select className="form__select">
            <option>회원 유형</option>
            <option>창작자</option>
            <option>후원자</option>
            <option>관리자</option>
          </select>
          <select className="form__select">
            <option>계정 상태</option>
            <option>정상</option>
            <option>신고접수</option>
            <option>이용정지</option>
          </select>
          <select className="form__select">
            <option>위험도</option>
            <option>낮음</option>
            <option>보통</option>
            <option>높음</option>
          </select>
        </FilterSection>

        <DataTable
          title="회원 목록"
          subtitle="가입일 및 활동 순으로 정렬"
          actions={
            <>
              <span className="badge badge--warning">23건 검토중</span>
              <span className="badge badge--info">156건 이용완료</span>
            </>
          }
        >
          <table className="data-table">
            <thead>
              <tr>
                <th className="data-table__header">회원 정보</th>
                <th className="data-table__header">이메일</th>
                <th className="data-table__header">유형</th>
                <th className="data-table__header">활동 현황</th>
                <th className="data-table__header">인증 상태</th>
                <th className="data-table__header">위험도</th>
                <th className="data-table__header">계정 상태</th>
                <th className="data-table__header">관리 작업</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id} className="data-table__row">
                  <td className="data-table__cell data-table__cell--user">
                    <div className="data-table__user-avatar">
                      {member.nickname[0]}
                    </div>
                    <div className="data-table__user-info">
                      <div className="data-table__user-name">
                        {member.nickname}
                      </div>
                      <div className="data-table__user-date">
                        가입: {member.joinDate}
                      </div>
                      <div className="data-table__user-date">
                        최근: {member.lastActivity}
                      </div>
                    </div>
                  </td>
                  <td className="data-table__cell">{member.email}</td>
                  <td className="data-table__cell">
                    <div>{member.location}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {member.category}
                    </div>
                    {member.status === "신규회원" && (
                      <span
                        className="badge badge--success"
                        style={{ marginTop: "4px" }}
                      >
                        신규
                      </span>
                    )}
                  </td>
                  <td className="data-table__cell">
                    <div>₩{member.fundingAmount.toLocaleString()}</div>
                    <div style={{ fontSize: "12px", color: "#666" }}>
                      펀딩 참여액
                    </div>
                  </td>
                  <td className="data-table__cell">
                    <span
                      className={`badge ${
                        member.accountStatus === "정상"
                          ? "badge--success"
                          : member.accountStatus === "신고접수"
                          ? "badge--warning"
                          : "badge--error"
                      }`}
                    >
                      {member.accountStatus}
                    </span>
                  </td>
                  <td className="data-table__cell">
                    <span
                      className={`badge ${
                        member.level === "일반"
                          ? "badge--success"
                          : member.level === "보통"
                          ? "badge--warning"
                          : "badge--error"
                      }`}
                    >
                      {member.level}
                    </span>
                  </td>
                  <td className="data-table__cell">
                    <span
                      className={`badge ${
                        member.status === "정상"
                          ? "badge--success"
                          : member.status === "검토중"
                          ? "badge--warning"
                          : "badge--error"
                      }`}
                    >
                      {member.status}
                    </span>
                  </td>
                  <td className="data-table__cell data-table__cell--actions">
                    <div className="data-table__action-buttons">
                      <button
                        className="data-table__action-btn data-table__action-btn--approve"
                        onClick={() => handleMemberDetail(member)}
                      >
                        👁️
                      </button>
                      <button className="data-table__action-btn data-table__action-btn--hold">
                        ⋯
                      </button>
                      <button className="data-table__action-btn data-table__action-btn--download">
                        ❌
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>

      {selectedMember && (
        <MemberDetailModal
          isOpen={memberDetailOpen}
          onClose={() => setMemberDetailOpen(false)}
          member={selectedMember}
        />
      )}
    </AdminLayout>
  );
}
