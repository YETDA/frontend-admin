"use client"

import type React from "react"
import { useState } from "react"

interface AccountSuspensionModalProps {
  isOpen: boolean
  onClose: () => void
  user: {
    nickname: string
    email: string
    status: string
  }
}

const AccountSuspensionModal: React.FC<AccountSuspensionModalProps> = ({ isOpen, onClose, user }) => {
  const [suspensionPeriod, setSuspensionPeriod] = useState("")
  const [suspensionReason, setSuspensionReason] = useState("")

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">계정 정지 처리</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <h3 style={{ marginBottom: "16px", fontSize: "16px", fontWeight: "600" }}>정지 대상</h3>
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
                  <span className="badge badge-warning">{user.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>정지 기간</label>
            <select value={suspensionPeriod} onChange={(e) => setSuspensionPeriod(e.target.value)}>
              <option value="">정지 기간을 선택하세요</option>
              <option value="3days">3일</option>
              <option value="7days">7일</option>
              <option value="30days">30일</option>
              <option value="permanent">영구정지</option>
            </select>
          </div>

          <div className="form-group">
            <label>정지 사유</label>
            <textarea
              value={suspensionReason}
              onChange={(e) => setSuspensionReason(e.target.value)}
              placeholder="정지 사유를 상세히 입력하세요..."
            />
          </div>

          <div className="warning-message">
            <div className="warning-icon">⚠️</div>
            <div className="warning-text">정지 처리 시 해당 사용자는 즉시 서비스 이용이 제한됩니다.</div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-danger">정지 처리</button>
        </div>
      </div>
    </div>
  )
}

export default AccountSuspensionModal
