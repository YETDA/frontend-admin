'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Filter } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2">
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
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>{pendingCount}개</strong>의 심사 대기 프로젝트가 있습니다.
            </p>
          </div>

          {/* 심사 기준 선택 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">심사 기준</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="approve-unapproved"
                  checked={selectedCriteria.includes('approve-unapproved')}
                  onChange={() => handleCriteriaChange('approve-unapproved')}
                  className="mr-3"
                />
                <span className="text-sm">승인되지 않은 프로젝트 일괄 승인</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="reject-approved"
                  checked={selectedCriteria.includes('reject-approved')}
                  onChange={() => handleCriteriaChange('reject-approved')}
                  className="mr-3"
                />
                <span className="text-sm">승인된 프로젝트 일괄 반려</span>
              </label>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3 justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                취소
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCriteria.includes('reject-approved')}
            >
              일괄 반려
            </Button>
            <Button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCriteria.includes('approve-unapproved')}
            >
              일괄 승인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
