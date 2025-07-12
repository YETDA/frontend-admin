'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettlementPricingPlan() {
  const plans = [
    { plan: '프리미엄 플랜', fee: '8%', count: 45, amount: '₩320M', color: 'bg-green-500' },
    { plan: '스탠다드 플랜', fee: '10%', count: 89, amount: '₩425M', color: 'bg-blue-500' },
    { plan: '베이직 플랜', fee: '12%', count: 22, amount: '₩102M', color: 'bg-gray-500' },
  ];

  return (
    <Card className="data-table">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">요금제별 정산 현황</CardTitle>
        <p className="text-sm text-gray-500">플랜별 수수료 및 정산 분포</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {plans.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-4 h-4 ${item.color} rounded-full`} />
                <div>
                  <p className="font-medium text-gray-900">{item.plan}</p>
                  <p className="text-xs text-gray-500">수수료 {item.fee}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{item.amount}</p>
                <p className="text-xs text-gray-500">{item.count}건</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
