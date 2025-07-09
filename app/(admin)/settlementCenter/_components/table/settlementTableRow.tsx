'use client';

import { TableRow, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SettlementRowActions from './settlementRowActions';
import { SettlementRow } from '@/types/page/settlementCenter/table';

interface SettlementTableRowProps {
  settlement: SettlementRow;
}

export default function SettlementTableRow({ settlement }: SettlementTableRowProps) {
  return (
    <TableRow className="border-gray-100 hover:bg-gray-50">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-[#1E9EFF] text-white">{settlement.creator.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{settlement.creator}</p>
            <p className="text-xs text-gray-500">요청일: {settlement.requestDate}</p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <p className="font-medium text-gray-900 text-sm">{settlement.project}</p>
          <Badge variant="outline" className="text-xs">
            {settlement.pricingPlan}
          </Badge>
        </div>
      </TableCell>

      <TableCell>
        <p className="font-semibold text-gray-900">{settlement.amount}</p>
      </TableCell>

      <TableCell>
        <p className="font-medium text-red-600">-{settlement.fee}</p>
      </TableCell>

      <TableCell>
        <p className="font-bold text-[#1E9EFF] text-lg">{settlement.netAmount}</p>
      </TableCell>

      <TableCell>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-700">{settlement.bankAccount}</p>
          <Badge
            className={
              settlement.riskLevel === '낮음'
                ? 'bg-green-100 text-green-700'
                : settlement.riskLevel === '보통'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-700'
            }
          >
            위험도: {settlement.riskLevel}
          </Badge>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          className={
            settlement.status === '지급완료'
              ? 'bg-green-100 text-green-700'
              : settlement.status === '지급대기'
              ? 'bg-orange-100 text-orange-700'
              : settlement.status === '검토중'
              ? 'bg-blue-100 text-blue-700'
              : 'bg-red-100 text-red-700'
          }
        >
          {settlement.status}
        </Badge>
      </TableCell>

      <TableCell>
        <SettlementRowActions settlement={settlement} />
      </TableCell>
    </TableRow>
  );
}
