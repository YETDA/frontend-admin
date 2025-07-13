'use client';

import { Card, CardContent } from '@/components/ui/card';
import { ReactNode } from 'react';

interface ReviewStatItem {
  title: string;
  value: string;
  icon: ReactNode;
  colorClass: string;
  description: string;
}

interface ProjectReviewStatsProps {
  stats: ReviewStatItem[];
}

export default function ProjectReviewCards({ stats }: ProjectReviewStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} {...stat} />
      ))}
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, colorClass, description }: ReviewStatItem) {
  return (
    <Card className="metric-card">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${colorClass} rounded-xl flex items-center justify-center`}>{Icon}</div>
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          <p className="text-sm font-medium text-gray-700">{title}</p>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
