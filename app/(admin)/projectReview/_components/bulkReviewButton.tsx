'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Filter } from 'lucide-react';

interface BulkReviewButtonProps {
  pendingCount: number;
}

export default function BulkReviewButton({ pendingCount }: BulkReviewButtonProps) {
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
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium mb-2 block">심사 기준</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="일괄 처리 기준 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto-approve">자동 승인 (완성도 90% 이상)</SelectItem>
                  <SelectItem value="priority-high">우선순위 높음만</SelectItem>
                  <SelectItem value="low-risk">위험도 낮음만</SelectItem>
                  <SelectItem value="manual">수동 선택</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 심사 의견 입력 */}
            <div>
              <label className="text-sm font-medium mb-2 block">일괄 심사 의견</label>
              <Textarea placeholder="일괄 처리에 대한 공통 의견을 입력하세요..." className="min-h-24" />
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
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              일괄 반려
            </Button>
            <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              일괄 승인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
