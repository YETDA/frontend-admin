'use client';

import { Card, CardContent } from '@/components/ui/card';

interface SettlementStat {
  title: string;
  value: string;
  icon: React.ElementType;
  color: string;
  description: string;
}

interface SettlementStatsCardProps {
  stats: SettlementStat[];
}

export default function SettlementStatsCard({ stats }: SettlementStatsCardProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="metric-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-sm font-medium text-gray-700">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
