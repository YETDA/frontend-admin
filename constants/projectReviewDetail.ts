export const DETAIL_DIALOG_STYLES = {
  salesButton: 'bg-blue-500 hover:bg-blue-600 gap-2',
  sponsorButton: 'bg-pink-500 hover:bg-pink-600 gap-2',
  salesBadge: 'absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs rounded',
  sponsorBadge: 'absolute top-2 left-2 px-2 py-1 bg-pink-500 text-white text-xs rounded',
  salesApproveButton: 'bg-blue-500 hover:bg-blue-600',
  sponsorApproveButton: 'bg-pink-500 hover:bg-pink-600',
} as const;

export const DETAIL_DIALOG_TEXT = {
  salesTitle: '판매 프로젝트 상세 심사',
  sponsorTitle: '후원 프로젝트 상세 심사',
  detailReview: '상세 심사',
  processLater: '나중에 처리',
  reject: '반려',
  approve: '승인',
  representativeImage: '대표 이미지',
  basicInfo: '기본 정보',
  projectImage: '프로젝트 이미지',
  projectDescription: '프로젝트 설명',
  salesOptions: '판매 옵션',
  optionId: '옵션 ID',
} as const;

export const PLACEHOLDER_IMAGE = '/placeholder.svg?height=192&width=384&text=Project+Image';
export const PLACEHOLDER_DESCRIPTION = '-';
