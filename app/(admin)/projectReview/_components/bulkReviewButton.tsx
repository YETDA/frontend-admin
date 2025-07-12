'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckIcon as ReviewCenterIcon } from 'lucide-react';

interface BulkReviewButtonProps {
  pendingCount: number;
}

export default function BulkReviewButton({ pendingCount }: BulkReviewButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6] gap-2">
          <ReviewCenterIcon className="w-4 h-4" />
          일괄 심사
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>일괄 프로젝트 심사</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>{pendingCount}개</strong>의 심사 대기 프로젝트가 있습니다.
            </p>
          </div>

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

            <div>
              <label className="text-sm font-medium mb-2 block">일괄 심사 의견</label>
              <Textarea placeholder="일괄 처리에 대한 공통 의견을 입력하세요..." className="min-h-24" />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <DialogClose asChild>
              <Button variant="outline">취소</Button>
            </DialogClose>
            {/* api 연결 필요 */}
            <Button variant="destructive">일괄 반려</Button>
            {/* api 연결 필요 */}
            <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6]">일괄 승인</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
