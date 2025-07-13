'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import ProjectReviewTableRow from './projectReviewTableRow';
import { ProjectRow } from '@/types/page/projectReview/table';

type TableMode = 'sales' | 'sponsor';

interface ProjectReviewTableProps {
  projects: ProjectRow[];
  pendingCount: number;
  mode: TableMode;
  // 페이지네이션 관련 props 추가
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

export default function ProjectReviewTable({ projects, pendingCount, mode }: ProjectReviewTableProps) {
  return (
    <Card className="data-table">
      <ProjectReviewTableHeaderSection pendingCount={pendingCount} mode={mode} />
      <CardContent>
        <Table>
          <ProjectReviewTableHeader mode={mode} />
          <TableBody>
            {projects.map(project => (
              <ProjectReviewTableRow key={project.id} project={project} mode={mode} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ProjectReviewTableHeaderSection({ pendingCount, mode }: { pendingCount: number; mode: TableMode }) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">
            {mode === 'sales' ? '판매 프로젝트 목록' : '후원 프로젝트 목록'}
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            {mode === 'sales' ? '판매 상품 심사 대기 목록' : '후원 프로젝트 심사 대기 목록'}
          </p>
        </div>
        <Badge className={mode === 'sales' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}>
          {pendingCount}건 대기중
        </Badge>
      </div>
    </CardHeader>
  );
}

function ProjectReviewTableHeader({ mode }: { mode: TableMode }) {
  const salesColumns = [
    '프로젝트 제목',
    '판매 상품명',
    '판매자',
    '카테고리',
    '제공방식',
    '상태',
    '승인 여부',
    '상세보기',
  ];

  const sponsorColumns = ['프로젝트 제목', '창작자', '카테고리', '목표 금액', '상태', '승인 여부', '상세보기'];

  const columns = mode === 'sales' ? salesColumns : sponsorColumns;

  return (
    <TableHeader>
      <TableRow className="border-gray-200">
        {columns.map((col, index) => (
          <TableHead key={index} className="font-semibold text-gray-700">
            {col}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
