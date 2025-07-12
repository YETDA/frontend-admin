'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SearchBar from '@/app/(admin)/projectReview/_components/searchBar';
import { PROJECT_CATEGORIES } from '../_status/projectReviewFilter';

interface ProjectReviewFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
}

export default function ProjectReviewFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
}: ProjectReviewFiltersProps) {
  return (
    <Card className="data-table">
      <CardContent className="p-6">
        <div className="flex gap-4 items-center">
          <SearchBar
            value={search}
            onChange={onSearchChange}
            placeholder="프로젝트 제목, 창작자명으로 검색..."
            className="flex-1"
          />

          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-40 h-12">
              <SelectValue placeholder="심사 상태" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">전체</SelectItem>
              <SelectItem value="pending">심사중</SelectItem>
              <SelectItem value="approved">승인</SelectItem>
              <SelectItem value="rejected">반려</SelectItem>
            </SelectContent>
          </Select>

          <Select value={category} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-40 h-12">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_CATEGORIES.map(item => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
