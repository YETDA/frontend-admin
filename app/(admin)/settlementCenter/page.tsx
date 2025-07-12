'use client';

import { settlements, settlementStats, scheduleStatusSummary, scheduleItems } from '@/dummy/settlementsPage';
import ScheduleDialog from './_components/scheduleDialog';
import SettlementStatsCard from './_components/settlementStatsCard';
import SettlementFilters from './_components/settlementFilters';
import { useState } from 'react';
import SettlementTable from './_components/table/settlementTable';
//import PricingPlanSettlement from './_components/PricingPlanSettlement';
//import  SettlementMonthlyTrend from './_components/SettlementMonthlyTrend';

export default function SettlementCenter() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [plan, setPlan] = useState('all');

  const pendingCount = settlements.filter(s => s.status === '지급대기').length;
  const completedCount = settlements.filter(s => s.status === '지급완료').length;
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">정산 처리 센터</h1>
          <p className="section-description">창작자 정산 요청을 체계적으로 검토하고 안전하게 처리합니다</p>
        </div>
        <div className="flex gap-3">
          <ScheduleDialog statusSummary={scheduleStatusSummary} scheduleItems={scheduleItems} />
        </div>
      </div>

      {/* Settlement Statistics */}
      <SettlementStatsCard stats={settlementStats} />

      {/* Filters & Search */}
      <SettlementFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        plan={plan}
        onPlanChange={setPlan}
      />

      {/* Settlements Table */}
      <SettlementTable data={settlements} pendingCount={pendingCount} completedCount={completedCount} />

      {/* Monthly Settlement Overview

      <div className="grid grid-cols-2 gap-8">
        <SettlementMonthlyTrend />
        <SettlementPricingPlan />
      </div>
 
    */}
    </div>
  );
}
