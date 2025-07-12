export const BULK_REVIEW_CRITERIA = {
  APPROVE_UNAPPROVED: 'approve-unapproved',
  REJECT_APPROVED: 'reject-approved',
} as const;

export const BULK_REVIEW_LABELS = {
  [BULK_REVIEW_CRITERIA.APPROVE_UNAPPROVED]: '승인되지 않은 프로젝트 일괄 승인',
  [BULK_REVIEW_CRITERIA.REJECT_APPROVED]: '승인된 프로젝트 일괄 반려',
} as const;

export const BULK_REVIEW_BUTTON_STYLES = {
  trigger:
    'px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2',
  cancel: 'px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors',
  approve:
    'px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
  reject:
    'px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed',
} as const;
