'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { TableRow, TableCell } from '@/components/ui/table';
import ProjectReviewDetailDialog from './projectReviewDetailDialog';
import { ProjectRow } from '@/types/page/projectReview/table';

interface ProjectReviewTableRowProps {
  project: ProjectRow;
}

export default function ProjectReviewTableRow({ project }: ProjectReviewTableRowProps) {
  return (
    <TableRow className="border-gray-100 hover:bg-gray-50">
      <TableCell>
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{project.title}</p>
          <p className="text-xs text-gray-500">등록일: {project.createdAt}</p>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">{project.creator.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-medium text-gray-700">{project.creator}</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge variant="outline" className="text-xs">
          {project.category}
        </Badge>
      </TableCell>

      <TableCell className="font-medium text-gray-900">{project.fundingGoal}</TableCell>

      <TableCell>
        <Badge
          className={
            project.priority === '높음'
              ? 'bg-red-100 text-red-700'
              : project.priority === '보통'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-100 text-gray-700'
          }
        >
          {project.priority}
        </Badge>
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#1E9EFF] transition-all" style={{ width: `${project.completeness}%` }} />
          </div>
          <span className="text-xs font-medium text-gray-600">{project.completeness}%</span>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          className={
            project.status === '승인'
              ? 'bg-green-100 text-green-700'
              : project.status === '심사중'
              ? 'bg-orange-100 text-orange-700'
              : 'bg-red-100 text-red-700'
          }
        >
          {project.status}
        </Badge>
      </TableCell>

      <TableCell>
        <ProjectReviewDetailDialog project={project} />
      </TableCell>
    </TableRow>
  );
}
