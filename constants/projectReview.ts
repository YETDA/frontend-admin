export const PROJECT_STATUS = {
  PENDING: '심사중',
  APPROVED: '승인',
  REJECTED: '반려',
  RECRUITING: '모집중',
} as const;

export const DELIVERY_METHOD = {
  DOWNLOAD: '다운로드',
  EMAIL: '이메일',
  PHYSICAL: '택배',
} as const;

export const BADGE_STYLES = {
  approved: 'bg-green-100 text-green-700',
  pending: 'bg-orange-100 text-orange-700',
  rejected: 'bg-red-100 text-red-700',
  download: 'bg-green-100 text-green-700',
  email: 'bg-blue-100 text-blue-700',
  physical: 'bg-purple-100 text-purple-700',
} as const;

export const UI_TEXT = {
  approved: '승인',
  pending: '심사중',
  rejected: '미승인',
  salesProject: '판매 프로젝트',
  sponsorProject: '후원 프로젝트',
} as const;