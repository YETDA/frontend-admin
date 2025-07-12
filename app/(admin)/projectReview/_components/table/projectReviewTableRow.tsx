'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableRow, TableCell } from '@/components/ui/table';
import ProjectReviewDetailDialog from './projectReviewDetailDialog';
import { ProjectRow, isSalesProjectRow, isSponsorProjectRow } from '@/types/page/projectReview/table';
import {
  getStatusBadgeStyle,
  getDeliveryMethodBadgeStyle,
  getApprovalBadgeStyle,
  getApprovalText,
} from '@/utils/projectReview';

interface ProjectReviewTableRowProps {
  project: ProjectRow;
  mode: 'sales' | 'sponsor';
}

export default function ProjectReviewTableRow({ project, mode }: ProjectReviewTableRowProps) {
  return (
    <TableRow key={project.id} className="border-gray-100 hover:bg-gray-50">
      {isSalesProjectRow(project) && mode === 'sales' ? (
        <SalesProjectCells project={project} mode={mode} />
      ) : isSponsorProjectRow(project) && mode === 'sponsor' ? (
        <SponsorProjectCells project={project} mode={mode} />
      ) : null}
    </TableRow>
  );
}

// 판매 프로젝트 셀 컴포넌트 분리
function SalesProjectCells({ project, mode }: { project: Extract<ProjectRow, { type: 'sales' }>; mode: 'sales' }) {
  return (
    <>
      <TableCell>
        <ProjectTitleCell title={project.salesTitle} date={project.createdAt} />
      </TableCell>
      <TableCell>
        <p className="text-sm font-medium text-gray-900">{project.productName}</p>
      </TableCell>
      <TableCell>
        <UserInfoCell nickname={project.sellerNickname} />
      </TableCell>
      <TableCell>
        <CategoryBadge category={project.category} />
      </TableCell>
      <TableCell>
        <Badge className={getDeliveryMethodBadgeStyle(project.deliveryMethod)}>{project.deliveryMethod}</Badge>
      </TableCell>
      <TableCell>
        <Badge className={getStatusBadgeStyle(project.status)}>{project.status}</Badge>
      </TableCell>
      <TableCell>
        <ApprovalBadge approved={project.approved} />
      </TableCell>
      <TableCell>
        <ProjectReviewDetailDialog project={project} mode={mode} />
      </TableCell>
    </>
  );
}

// 후원 프로젝트 셀 컴포넌트 분리
function SponsorProjectCells({
  project,
  mode,
}: {
  project: Extract<ProjectRow, { type: 'sponsor' }>;
  mode: 'sponsor';
}) {
  return (
    <>
      <TableCell>
        <ProjectTitleCell title={project.sponsorTitle} date={project.startDate} />
      </TableCell>
      <TableCell>
        <UserInfoCell nickname={project.userNickname} />
      </TableCell>
      <TableCell>
        <CategoryBadge category={project.category} />
      </TableCell>
      <TableCell className="font-medium text-gray-900">{project.fundingGoal}</TableCell>
      <TableCell>
        <Badge className={getStatusBadgeStyle(project.status)}>{project.status}</Badge>
      </TableCell>
      <TableCell>
        <ApprovalBadge approved={project.approved} />
      </TableCell>
      <TableCell>
        <ProjectReviewDetailDialog project={project} mode={mode} />
      </TableCell>
    </>
  );
}

// 재사용 가능한 셀 컴포넌트들
function ProjectTitleCell({ title, date }: { title: string; date: string }) {
  return (
    <div className="space-y-1">
      <p className="font-medium text-gray-900">{title}</p>
      <p className="text-xs text-gray-500">등록일: {date}</p>
    </div>
  );
}

function UserInfoCell({ nickname }: { nickname: string }) {
  return (
    <div className="flex items-center gap-2">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="text-xs">{nickname?.charAt(0)}</AvatarFallback>
      </Avatar>
      <span className="font-medium text-gray-700">{nickname}</span>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  return (
    <Badge variant="outline" className="text-xs">
      {category}
    </Badge>
  );
}

function ApprovalBadge({ approved }: { approved: boolean }) {
  return <Badge className={getApprovalBadgeStyle(approved)}>{getApprovalText(approved)}</Badge>;
}
