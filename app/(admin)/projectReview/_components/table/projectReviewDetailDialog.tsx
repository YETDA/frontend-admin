'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList } from 'lucide-react';
import { ProjectRow } from '@/types/page/projectReview/table';

interface ProjectReviewDetailDialogProps {
  project: ProjectRow;
}

export default function ProjectReviewDetailDialog({ project }: ProjectReviewDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-[#1E9EFF] hover:bg-[#1f8ce6] gap-2">
          <ClipboardList className="w-4 h-4" />
          상세 심사
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>프로젝트 상세 심사</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">기본 정보</h3>
              <div className="space-y-2 text-sm">
                <InfoRow label="제목" value={project.title} />
                <InfoRow label="창작자" value={project.creator} />
                <InfoRow label="카테고리" value={project.category} />
                <InfoRow label="목표 금액" value={project.fundingGoal} />
                <InfoRow label="등록일" value={project.createdAt} />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">심사 정보</h3>
              <div className="space-y-2 text-sm">
                <InfoRow
                  label="우선순위"
                  value={<Badge className={priorityBadgeClass(project.priority)}>{project.priority}</Badge>}
                />
                <InfoRow label="완성도" value={`${project.completeness}%`} />
                <InfoRow
                  label="위험도"
                  value={<Badge className="bg-green-100 text-green-700 ml-2">{project.riskLevel}</Badge>}
                />
              </div>
            </div>
          </div>

          {/* 설명 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">프로젝트 설명</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">{project.description}</p>
            </div>
          </div>

          {/* 체크리스트 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">심사 체크리스트</h3>
            <div className="space-y-2">
              {[
                '프로젝트 실현 가능성 검토',
                '창작자 신원 확인',
                '리워드 구성의 적절성',
                '펀딩 목표 금액의 합리성',
                '콘텐츠 적절성 검토',
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                  <input type="checkbox" className="w-4 h-4" />
                  <span className="text-sm text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 의견 */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">심사 의견</h3>
            <Textarea placeholder="심사 결과에 대한 상세한 의견을 입력하세요..." className="min-h-24" />
          </div>

          {/* 액션 버튼 */}
          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline">나중에 처리</Button>
            <Button variant="destructive">반려</Button>
            <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6]">승인</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** 작은 컴포넌트 & 유틸 */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}

function priorityBadgeClass(priority: string) {
  return priority === '높음' ? 'bg-red-100 text-red-700 ml-2' : 'bg-yellow-100 text-yellow-700 ml-2';
}
