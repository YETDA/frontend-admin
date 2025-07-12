"use client"

import type React from "react"
import { useState } from "react"

interface PermissionManagementModalProps {
  isOpen: boolean
  onClose: () => void
}

const PermissionManagementModal: React.FC<PermissionManagementModalProps> = ({ isOpen, onClose }) => {
  const [targetUser, setTargetUser] = useState("")
  const [permissionLevel, setPermissionLevel] = useState("")
  const [changeReason, setChangeReason] = useState("")

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">사용자 권한 관리</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
            <div className="form-group">
              <label>대상 사용자</label>
              <select value={targetUser} onChange={(e) => setTargetUser(e.target.value)}>
                <option value="">사용자 선택</option>
                <option value="user1">김창작</option>
                <option value="user2">이후원</option>
                <option value="user3">박관리</option>
              </select>
            </div>

            <div className="form-group">
              <label>권한 레벨</label>
              <select value={permissionLevel} onChange={(e) => setPermissionLevel(e.target.value)}>
                <option value="">권한 선택</option>
                <option value="admin">관리자</option>
                <option value="moderator">운영자</option>
                <option value="user">일반 사용자</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>권한 변경 사유</label>
            <textarea
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              placeholder="권한 변경 사유를 입력하세요..."
            />
          </div>

          <div className="warning-message">
            <div className="warning-icon">⚠️</div>
            <div className="warning-text">권한 변경은 즉시 적용되며, 되돌릴 수 없습니다.</div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            취소
          </button>
          <button className="btn btn-primary">권한 변경</button>
        </div>
      </div>
    </div>
  )
}

export default PermissionManagementModal
