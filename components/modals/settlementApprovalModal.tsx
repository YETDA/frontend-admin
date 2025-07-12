"use client";

interface SettlementApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  settlement: {
    creator: string;
    project: string;
    amount: number;
    account: string;
  };
}

export default function SettlementApprovalModal({
  isOpen,
  onClose,
  settlement,
}: SettlementApprovalModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">정산 승인 처리</h2>
          <button className="modal__close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="modal__body">
          <div className="modal__info-section">
            <h3 className="modal__info-title">정산 정보</h3>
            <div className="modal__info-grid">
              <div className="modal__info-item">
                <div className="modal__info-label">창작자</div>
                <div className="modal__info-value">{settlement.creator}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">프로젝트</div>
                <div className="modal__info-value">{settlement.project}</div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">정산 금액</div>
                <div className="modal__info-value">
                  ₩{settlement.amount.toLocaleString()}
                </div>
              </div>
              <div className="modal__info-item">
                <div className="modal__info-label">계좌</div>
                <div className="modal__info-value">{settlement.account}</div>
              </div>
            </div>
          </div>

          <div className="form__group">
            <label className="form__label">승인 메모</label>
            <textarea
              className="form__textarea"
              placeholder="승인 사유를 입력하세요..."
            />
          </div>

          <div className="modal__message modal__message--success">
            <div className="modal__message-icon">✓</div>
            <div className="modal__message-text">
              승인 후 즉시 지급 처리됩니다.
            </div>
          </div>
        </div>

        <div className="modal__footer">
          <button className="button button--secondary" onClick={onClose}>
            취소
          </button>
          <button className="button button--success">승인 완료</button>
        </div>
      </div>
    </div>
  );
}
