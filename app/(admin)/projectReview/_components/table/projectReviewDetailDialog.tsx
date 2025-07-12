'use client';

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ClipboardList } from 'lucide-react';
import { SalesProjectRow, SponsorProjectRow, isSalesProjectRow } from '@/types/page/projectReview/table';
import {
  DETAIL_DIALOG_STYLES,
  DETAIL_DIALOG_TEXT,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_DESCRIPTION,
} from '@/constants/projectReviewDetail';
import { ReactNode } from 'react';

interface ProjectReviewDetailDialogProps {
  project: SalesProjectRow | SponsorProjectRow;
  mode: 'sales' | 'sponsor';
}

export default function ProjectReviewDetailDialog({ project, mode }: ProjectReviewDetailDialogProps) {
  const image = project.image ?? PLACEHOLDER_IMAGE;
  const description = project.description ?? PLACEHOLDER_DESCRIPTION;

  const handleApprove = async () => {
    try {
      console.log('승인 처리:', project.id);
    } catch (error) {
      console.error('승인 처리 중 오류:', error);
    }
  };

  const handleReject = async () => {
    try {
      console.log('반려 처리:', project.id);
    } catch (error) {
      console.error('반려 처리 중 오류:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className={mode === 'sales' ? DETAIL_DIALOG_STYLES.salesButton : DETAIL_DIALOG_STYLES.sponsorButton}
        >
          <ClipboardList className="w-4 h-4" />
          {DETAIL_DIALOG_TEXT.detailReview}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'sales' ? DETAIL_DIALOG_TEXT.salesTitle : DETAIL_DIALOG_TEXT.sponsorTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <ProjectBasicInfo project={project} mode={mode} />
            <ProjectImageSection image={image} mode={mode} />
          </div>

          <ProjectDescriptionSection description={description} />

          {mode === 'sales' && isSalesProjectRow(project) && project.options && project.options.length > 0 && (
            <SalesOptionsSection options={project.options} />
          )}

          <ActionButtonsSection mode={mode} onApprove={handleApprove} onReject={handleReject} />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface ProjectBasicInfoProps {
  project: SalesProjectRow | SponsorProjectRow;
  mode: 'sales' | 'sponsor';
}

function ProjectBasicInfo({ project, mode }: ProjectBasicInfoProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">{DETAIL_DIALOG_TEXT.basicInfo}</h3>
      <div className="space-y-2 text-sm">
        <InfoRow label="제목" value={isSalesProjectRow(project) ? project.salesTitle : project.sponsorTitle} />
        {isSalesProjectRow(project) ? <SalesBasicInfo project={project} /> : <SponsorBasicInfo project={project} />}
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
  );
}

interface SalesBasicInfoProps {
  project: SalesProjectRow;
}

function SalesBasicInfo({ project }: SalesBasicInfoProps) {
  return (
    <>
      <InfoRow label="판매자" value={project.sellerNickname} />
      <InfoRow label="상품명" value={project.productName} />
      <InfoRow label="제공방식" value={project.deliveryMethod} />
      <InfoRow label="등록일" value={project.createdAt} />
      <InfoRow label="평균 배송시간" value={project.averageDeliveryTime} />
    </>
  );
}

interface SponsorBasicInfoProps {
  project: SponsorProjectRow;
}

function SponsorBasicInfo({ project }: SponsorBasicInfoProps) {
  return (
    <>
      <InfoRow label="창작자" value={project.userNickname} />
      <InfoRow label="후원 목표 금액" value={project.fundingGoal} />
      <InfoRow label="등록일" value={project.startDate} />
      <InfoRow label="마감일" value={project.endDate} />
    </>
  );
}

interface ProjectImageSectionProps {
  image: string;
  mode: 'sales' | 'sponsor';
}

function ProjectImageSection({ image, mode }: ProjectImageSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">{DETAIL_DIALOG_TEXT.projectImage}</h3>
      <div className="relative">
        <img src={image} alt="프로젝트 대표 이미지" className="w-full h-48 object-cover rounded-lg border" />
        <span className={mode === 'sales' ? DETAIL_DIALOG_STYLES.salesBadge : DETAIL_DIALOG_STYLES.sponsorBadge}>
          {DETAIL_DIALOG_TEXT.representativeImage}
        </span>
      </div>
    </div>
  );
}

interface ProjectDescriptionSectionProps {
  description: string;
}

function ProjectDescriptionSection({ description }: ProjectDescriptionSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-2">{DETAIL_DIALOG_TEXT.projectDescription}</h3>
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-700 whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
}

interface SalesOptionsSectionProps {
  options: SalesProjectRow['options'];
}

function SalesOptionsSection({ options }: SalesOptionsSectionProps) {
  return (
    <div>
      <h3 className="font-semibold text-gray-900 mb-3">{DETAIL_DIALOG_TEXT.salesOptions}</h3>
      <div className="space-y-2">
        {options.map(option => (
          <div key={option.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">{option.name}</p>
              <p className="text-sm text-gray-600">
                {DETAIL_DIALOG_TEXT.optionId}: {option.id}
              </p>
            </div>
            <p className="font-bold text-blue-600">{option.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ActionButtonsSectionProps {
  mode: 'sales' | 'sponsor';
  onApprove: () => void;
  onReject: () => void;
}

function ActionButtonsSection({ mode, onApprove, onReject }: ActionButtonsSectionProps) {
  return (
    <div className="flex gap-3 justify-end pt-4 border-t">
      <DialogClose asChild>
        <Button variant="outline">{DETAIL_DIALOG_TEXT.processLater}</Button>
      </DialogClose>
      <Button variant="destructive" onClick={onReject}>
        {DETAIL_DIALOG_TEXT.reject}
      </Button>
      <Button
        className={
          mode === 'sales' ? DETAIL_DIALOG_STYLES.salesApproveButton : DETAIL_DIALOG_STYLES.sponsorApproveButton
        }
        onClick={onApprove}
      >
        {DETAIL_DIALOG_TEXT.approve}
      </Button>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <p>
      <span className="font-medium">{label}:</span> {value}
    </p>
  );
}
