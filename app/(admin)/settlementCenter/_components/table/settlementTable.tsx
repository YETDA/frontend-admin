'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SettlementTableRow from './settlementTableRow';
import { SettlementRow } from '@/types/page/settlementCenter/table';

interface SettlementTableProps {
  data: SettlementRow[];
  pendingCount: number;
  completedCount: number;
}

export default function SettlementTable({ data, pendingCount, completedCount }: SettlementTableProps) {
  return (
    <Card className="data-table">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">정산 요청 현황</CardTitle>
            <p className="text-sm text-gray-500 mt-1">우선순위 및 요청일 순으로 정렬</p>
          </div>
          <div className="flex gap-2">
            <Badge className="bg-orange-100 text-orange-700">{pendingCount}건 대기중</Badge>
            <Badge className="bg-green-100 text-green-700">{completedCount}건 완료</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className="font-semibold text-gray-700">창작자 정보</TableHead>
              <TableHead className="font-semibold text-gray-700">프로젝트</TableHead>
              <TableHead className="font-semibold text-gray-700">펀딩 금액</TableHead>
              <TableHead className="font-semibold text-gray-700">수수료</TableHead>
              <TableHead className="font-semibold text-gray-700">정산 금액</TableHead>
              <TableHead className="font-semibold text-gray-700">계좌 정보</TableHead>
              <TableHead className="font-semibold text-gray-700">상태</TableHead>
              <TableHead className="font-semibold text-gray-700">처리 작업</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map(settlement => (
              <SettlementTableRow key={settlement.id} settlement={settlement} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
