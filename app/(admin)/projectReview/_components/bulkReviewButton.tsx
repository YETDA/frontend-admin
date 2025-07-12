'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter } from 'lucide-react';
import { useState } from 'react';
import { BULK_REVIEW_CRITERIA, BULK_REVIEW_LABELS, BULK_REVIEW_BUTTON_STYLES } from '@/constants/bulkReview';

interface BulkReviewButtonProps {
  pendingCount: number;
}

export default function BulkReviewButton({ pendingCount }: BulkReviewButtonProps) {
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>([]);

  const handleCriteriaChange = (criteria: string) => {
    setSelectedCriteria(prev =>
      prev.includes(criteria) ? prev.filter(item => item !== criteria) : [...prev, criteria],
    );
  };

  const handleBulkApprove = () => {
    // TODO: API 호출 로직 추가
    console.log('일괄 승인 처리:', selectedCriteria);
  };

  const handleBulkReject = () => {
    // TODO: API 호출 로직 추가
    console.log('일괄 반려 처리:', selectedCriteria);
  };

  const canApprove = selectedCriteria.includes(BULK_REVIEW_CRITERIA.APPROVE_UNAPPROVED);
  const canReject = selectedCriteria.includes(BULK_REVIEW_CRITERIA.REJECT_APPROVED);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={BULK_REVIEW_BUTTON_STYLES.trigger}>
          <Filter className="w-4 h-4" />
          일괄 심사
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">일괄 프로젝트 심사</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-4">
          {/* 심사 대기 프로젝트 정보 */}
          <PendingProjectInfo pendingCount={pendingCount} />

          {/* 심사 기준 선택 */}
          <ReviewCriteriaSelector selectedCriteria={selectedCriteria} onCriteriaChange={handleCriteriaChange} />

          {/* 액션 버튼 */}
          <ActionButtons
            canApprove={canApprove}
            canReject={canReject}
            onApprove={handleBulkApprove}
            onReject={handleBulkReject}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// 심사 대기 프로젝트 정보 컴포넌트
function PendingProjectInfo({ pendingCount }: { pendingCount: number }) {
  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <p className="text-sm text-purple-800">
        <strong>{pendingCount}개</strong>의 심사 대기 프로젝트가 있습니다.
      </p>
    </div>
  );
}

// 심사 기준 선택 컴포넌트
function ReviewCriteriaSelector({
  selectedCriteria,
  onCriteriaChange,
}: {
  selectedCriteria: string[];
  onCriteriaChange: (criteria: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">심사 기준</label>
      <div className="space-y-2">
        {Object.entries(BULK_REVIEW_CRITERIA).map(([key, value]) => (
          <CriteriaCheckbox
            key={key}
            value={value}
            label={BULK_REVIEW_LABELS[value]}
            checked={selectedCriteria.includes(value)}
            onChange={() => onCriteriaChange(value)}
          />
        ))}
      </div>
    </div>
  );
}

// 개별 체크박스 컴포넌트
function CriteriaCheckbox({
  value,
  label,
  checked,
  onChange,
}: {
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center">
      <input type="checkbox" value={value} checked={checked} onChange={onChange} className="mr-3" />
      <span className="text-sm">{label}</span>
    </label>
  );
}

// 액션 버튼 컴포넌트
function ActionButtons({
  canApprove,
  canReject,
  onApprove,
  onReject,
}: {
  canApprove: boolean;
  canReject: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex gap-3 justify-end">
      <DialogClose asChild>
        <Button variant="outline" className={BULK_REVIEW_BUTTON_STYLES.cancel}>
          취소
        </Button>
      </DialogClose>
      <Button
        variant="destructive"
        className={BULK_REVIEW_BUTTON_STYLES.reject}
        disabled={!canReject}
        onClick={onReject}
      >
        일괄 반려
      </Button>
      <Button className={BULK_REVIEW_BUTTON_STYLES.approve} disabled={!canApprove} onClick={onApprove}>
        일괄 승인
      </Button>
    </div>
  );
}
