'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettlementMonthlyTrend() {
  const data = [
    { month: '8월', amount: 420 },
    { month: '9월', amount: 380 },
    { month: '10월', amount: 520 },
    { month: '11월', amount: 680 },
    { month: '12월', amount: 750 },
    { month: '1월', amount: 847 },
  ];

  return (
    <Card className="data-table">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">월별 정산 추이</CardTitle>
        <p className="text-sm text-gray-500">최근 6개월 정산 현황</p>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-end justify-between gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-[#1E9EFF] rounded-t-lg hover:bg-[#1f8ce6] transition-colors cursor-pointer"
                style={{ height: `${(item.amount / 847) * 200}px` }}
                title={`₩${item.amount}M`}
              />
              <span className="text-xs text-gray-600 font-medium">{item.month}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">이번 달 총 정산액</span>
            <span className="font-bold text-[#1E9EFF]">₩847M</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
