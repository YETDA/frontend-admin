"use client";

interface MemberDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: {
    nickname: string;
    email: string;
    location: string;
    joinDate: string;
    lastActivity: string;
    projectCount: number;
    totalAmount: number;
    paymentStatus: string;
    approvalStatus: string;
    memberStatus: string;
  };
}

export default function MemberDetailModal({
  isOpen,
  onClose,
  member,
}: MemberDetailModalProps) {
  if (!isOpen) return null;

  const activities = [
    {
      type: "프로젝트 등록",
      desc: "스마트 워치 개발 프로젝트",
      date: "2024-01-15",
    },
    { type: "후원 참여", desc: "친환경 텀블러 프로젝트", date: "2024-01-10" },
    { type: "계정 정보 수정", desc: "프로필 이미지 변경", date: "2024-01-05" },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">회원 상세정보</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__info-section">
            <h3 className="modal__info-title">기본 정보</h3>
            <div className="modal__info-grid">
              <div className="modal__info-item">
                <div className="modal__info-label">닉네임</div>
                <div className="modal__info-value">{member.nickname}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">활동 현황</div>
                <div className="modal__info-value">
                  <span className="badge badge--success">활발</span>
                </div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">이메일</div>
                <div className="modal__info-value">{member.email}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">프로젝트 수</div>
                <div className="modal__info-value">{member.projectCount}개</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">회원 유형</div>
                <div className="modal__info-value">{member.location}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">총 펀딩액</div>
                <div className="modal__info-value">
                  ₩{member.totalAmount.toLocaleString()}
                </div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">가입일</div>
                <div className="modal__info-value">{member.joinDate}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">계정 상태</div>
                <div className="modal__info-value">
                  <span className="badge badge--warning">신고접수</span>
                </div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">최근 활동</div>
                <div className="modal__info-value">{member.lastActivity}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">허용도</div>
                <div className="modal__info-value">
                  <span className="badge badge--error">높음</span>
                </div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label"></div>
                <div className="modal__info-value">
                  <span className="badge badge--warning">검토중</span>
                </div>
              </div>
            </div>
          </div>

          <div className="modal__activity-section">
            <h3 className="modal__activity-title">최근 활동 이력</h3>
            {activities.map((activity, index) => (
              <div key={index} className="modal__activity-item">
                <div className="modal__activity-icon"></div>
                <div className="modal__activity-content">
                  <div className="modal__activity-text">{activity.type}</div>
                  <div className="modal__activity-desc">{activity.desc}</div>
                </div>
                <div className="modal__activity-date">{activity.date}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal__footer">
          <button className="button button--secondary" onClick={onClose}>
            편집
          </button>
          <button className="button button--primary">메시지 발송</button>
        </div>
      </div>
    </div>
  );
}
