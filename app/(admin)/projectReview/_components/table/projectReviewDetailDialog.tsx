'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ClipboardList } from 'lucide-react';
import { SalesProjectRow, SponsorProjectRow } from '@/types/page/projectReview/table';

type ProjectReviewDetailDialogProps =
  | { project: SalesProjectRow; mode: 'sales' }
  | { project: SponsorProjectRow; mode: 'sponsor' };

export default function ProjectReviewDetailDialog({ project, mode }: ProjectReviewDetailDialogProps) {
  const image = project.image ?? '/placeholder.svg';
  const description = project.description ?? '-';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={mode === 'sales' ? 'bg-blue-500 hover:bg-blue-600 gap-2' : 'bg-pink-500 hover:bg-pink-600 gap-2'}
        >
          <ClipboardList className="w-4 h-4" />
          상세 심사
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === 'sales' ? '판매 프로젝트 상세 심사' : '후원 프로젝트 상세 심사'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">기본 정보</h3>
              <div className="space-y-2 text-sm">
                <InfoRow label="제목" value={mode === 'sales' ? project.salesTitle : project.sponsorTitle} />
                {mode === 'sales' ? (
                  <>
                    <InfoRow label="판매자" value={project.sellerNickname} />
                    <InfoRow label="상품명" value={project.productName} />
                    <InfoRow label="제공방식" value={project.deliveryMethod} />
                    <InfoRow label="등록일" value={project.createdAt} />
                    <InfoRow label="평균 배송시간" value={project.averageDeliveryTime} />
                  </>
                ) : (
                  <>
                    <InfoRow label="창작자" value={project.userNickname} />
                    <InfoRow label="후원 목표 금액" value={project.fundingGoal} />
                    <InfoRow label="등록일" value={project.startDate} />
                    <InfoRow label="마감일" value={project.endDate} />
                  </>
                )}
                <InfoRow label="카테고리" value={project.category} />
                <InfoRow
                  label="프로젝트 URL"
                  value={
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {project.projectUrl}
                    </a>
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">프로젝트 이미지</h3>
              <div className="relative">
                <img src={image} alt="프로젝트 대표 이미지" className="w-full h-48 object-cover rounded-lg border" />
                <span
                  className={
                    mode === 'sales'
                      ? 'absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded'
                      : 'absolute top-2 left-2 px-2 py-1 bg-pink-500 text-white text-xs rounded'
                  }
                >
                  대표 이미지
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">프로젝트 설명</h3>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{description}</p>
            </div>
          </div>

          {mode === 'sales' && project.options && project.options.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">판매 옵션</h3>
              <div className="space-y-2">
                {project.options.map(option => (
                  <div key={option.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{option.name}</p>
                      <p className="text-sm text-gray-600">옵션 ID: {option.id}</p>
                    </div>
                    <p className="font-bold text-blue-600">{option.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">심사 의견</h3>
            <Textarea placeholder="심사 결과에 대한 상세한 의견을 입력하세요..." className="min-h-24" />
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button variant="outline">나중에 처리</Button>
            <Button variant="destructive">반려</Button>
            <Button className={mode === 'sales' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-pink-500 hover:bg-pink-600'}>
              승인
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <p>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}
