"use client"

import type React from "react"
import { useState } from "react"

interface AccountUnsuspensionModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    nickname: string
    email: string
    status: string
  }
}

const AccountUnsuspensionModal: React.FC<AccountUnsuspensionModalProps> = ({ isOpen, onClose, user }) => {
  const [unsuspensionReason, setUnsuspensionReason] = useState("")

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">계정 정지 해제</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>해제 대상</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-label">닉네임</div>
                <div className="info-value">{user.nickname}</div>
              </div>
              <div className="info-item">
                <div className="info-label">이메일</div>
                <div className="info-value">{user.email}</div>
              </div>
              <div className="info-item">
                <div className="info-label">현재 상태</div>
                <div className="info-value">
                  <span className="badge badge-error">{user.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>해제 사유</label>
            <textarea
              value={unsuspensionReason}
              onChange={(e) => setUnsuspensionReason(e.target.value)}
              placeholder="정지 해제 사유를 입력하세요..."
            />
          </div>

          <div className="success-message">
            <div className="success-icon">✓</div>
            <div className="success-text">해제 처리 시 해당 사용자는 즉시 서비스 이용이 가능합니다.</div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-primary">해제 처리</button>
        </div>
      </div>
    </div>
  )
}

export default AccountUnsuspensionModal
