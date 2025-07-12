"use client";

import { useState } from "react";

interface SettlementHoldModalProps {
  isOpen: boolean;
  onClose: () => void;
  settlement: {
    creator: string;
    amount: number;
  };
}

export default function SettlementHoldModal({
  isOpen,
  onClose,
  settlement,
}: SettlementHoldModalProps) {
  const [holdReason, setHoldReason] = useState("");
  const [detailReason, setDetailReason] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">정산 보류 처리</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__info-section">
            <h3 className="modal__info-title">보류 대상</h3>
            <div className="modal__info-grid">
              <div className="modal__info-item">
                <div className="modal__info-label">창작자</div>
                <div className="modal__info-value">{settlement.creator}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">정산 금액</div>
                <div className="modal__info-value">
                  ₩{settlement.amount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          <div className="form__group">
            <label className="form__label">보류 사유</label>
            <select
              className="form__select"
              value={holdReason}
              onChange={e => setHoldReason(e.target.value)}
            >
              <option value="">보류 사유를 선택하세요</option>
              <option value="document">서류 미비</option>
              <option value="verification">신원 확인 필요</option>
              <option value="dispute">분쟁 발생</option>
              <option value="other">기타</option>
            </select>
          </div>

          <div className="form__group">
            <label className="form__label">상세 사유</label>
            <textarea
              className="form__textarea"
              value={detailReason}
              onChange={e => setDetailReason(e.target.value)}
              placeholder="보류 사유를 상세히 입력하세요..."
            />
          </div>
        </div>

        <div className="modal__footer">
          <button className="button button--secondary" onClick={onClose}>
            취소
          </button>
          <button className="button button--danger">보류 처리</button>
        </div>
      </div>
    </div>
  );
}
