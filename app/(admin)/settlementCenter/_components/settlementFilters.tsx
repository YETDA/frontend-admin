'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

interface SettlementFiltersProps {
  // 상위에서 관리하는 검색어 값
  search: string;
  // 검색어 변경 시 호출되는 콜백
  onSearchChange: (value: string) => void;
  // 상위에서 관리하는 처리 상태 값
  status: string;
  // 처리 상태 변경 시 호출되는 콜백
  onStatusChange: (value: string) => void;
  // 상위에서 관리하는 요금제 값
  plan: string;
  // 요금제 변경 시 호출되는 콜백
  onPlanChange: (value: string) => void;
}

export default function SettlementFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  plan,
  onPlanChange,
}: SettlementFiltersProps) {
  return (
    <Card className="data-table">
      <CardContent className="p-6">
        <div className="flex gap-4 items-center">
          {/* 검색 입력 필드 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                value={search}
                onChange={e => onSearchChange(e.target.value)}
                placeholder="창작자명, 프로젝트명, 계좌번호로 검색..."
                className="pl-12 h-12 bg-gray-50 border-gray-200 focus:bg-white"
              />
            </div>
          </div>

          {/* 처리 상태 선택 */}
          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-40 h-12">
              <SelectValue placeholder="처리 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="pending">지급대기</SelectItem>
              <SelectItem value="reviewing">검토중</SelectItem>
              <SelectItem value="completed">지급완료</SelectItem>
              <SelectItem value="hold">지급보류</SelectItem>
            </SelectContent>
          </Select>

          {/* 요금제 선택 */}
          <Select value={plan} onValueChange={onPlanChange}>
            <SelectTrigger className="w-40 h-12">
              <SelectValue placeholder="요금제" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="basic">베이직 (12%)</SelectItem>
              <SelectItem value="standard">스탠다드 (10%)</SelectItem>
              <SelectItem value="premium">프리미엄 (8%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
