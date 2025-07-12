'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, Download } from 'lucide-react';

interface StatusSummary {
  label: string;
  count: string;
  amount: string;
  colorClass: string;
}

interface ScheduleItem {
  date: string;
  label: string;
  status: string;
  colorClass: string;
  badgeClass: string;
}

interface ScheduleDialogProps {
  statusSummary: StatusSummary[];
  scheduleItems: ScheduleItem[];
}

export default function ScheduleDialog({ statusSummary, scheduleItems }: ScheduleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6] gap-2">
          <Calendar className="w-4 h-4" />
          정산 스케줄
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>월별 정산 스케줄 관리</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* 이번 달 정산 현황 */}
          <div className="grid grid-cols-3 gap-4">
            {statusSummary.map((item, idx) => (
              <div key={idx} className={`p-4 ${item.colorClass} rounded-lg text-center`}>
                <h3 className={`font-semibold text-${item.colorClass.split('-')[1]}-900`}>{item.label}</h3>
                <p className={`text-2xl font-bold text-${item.colorClass.split('-')[1]}-600`}>{item.count}</p>
                <p className={`text-sm text-${item.colorClass.split('-')[1]}-700`}>{item.amount}</p>
              </div>
            ))}
          </div>

          {/* 월별 정산 일정 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">2024년 1월 정산 일정</h3>
            <div className="space-y-3">
              {scheduleItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 ${item.colorClass} rounded-full`}></div>
                    <span className="font-medium">{item.date}</span>
                    <span className="text-sm text-gray-600">{item.label}</span>
                  </div>
                  <Badge className={item.badgeClass}>{item.status}</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* 빠른 작업 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">빠른 작업</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 gap-2 bg-transparent">
                <CheckCircle className="w-4 h-4" />
                대기 건 일괄 승인
              </Button>
              <Button variant="outline" className="h-12 gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                정산 내역 다운로드
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
