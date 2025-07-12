'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableHeader, TableRow, TableHead } from '@/components/ui/table';
import ProjectReviewTableRow from './projectReviewTableRow';
import { ProjectRow } from '@/types/page/projectReview/table';

interface ProjectReviewTableProps {
  projects: ProjectRow[];
  pendingCount: number;
}

export default function ProjectReviewTable({ projects, pendingCount }: ProjectReviewTableProps) {
  return (
    <Card className="data-table">
      <ProjectReviewTableHeaderSection pendingCount={pendingCount} />
      <CardContent>
        <Table>
          <ProjectReviewTableHeader />
          <TableBody>
            {projects.map(project => (
              <ProjectReviewTableRow key={project.id} project={project} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function ProjectReviewTableHeaderSection({ pendingCount }: { pendingCount: number }) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="text-lg font-semibold">심사 대기 프로젝트</CardTitle>
          <p className="text-sm text-gray-500 mt-1">우선순위 순으로 정렬된 프로젝트 목록</p>
        </div>
        <Badge className="bg-orange-100 text-orange-700">{pendingCount}건 대기중</Badge>
      </div>
    </CardHeader>
  );
}
const PROJECT_REVIEW_TABLE_COLUMNS = [
  '프로젝트 정보',
  '창작자',
  '카테고리',
  '목표 금액',
  '우선순위',
  '완성도',
  '상태',
  '심사 작업',
];

function ProjectReviewTableHeader() {
  return (
    <TableHeader>
      <TableRow className="border-gray-200">
        {PROJECT_REVIEW_TABLE_COLUMNS.map((col, index) => (
          <TableHead key={index} className="font-semibold text-gray-700">
            {col}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
