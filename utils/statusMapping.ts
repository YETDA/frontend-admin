export const STATUS_MAPPING = {
  pending: '심사중',
  approved: '승인',
  rejected: '반려',
} as const;

export const REVERSE_STATUS_MAPPING = {
  심사중: 'pending',
  승인: 'approved',
  반려: 'rejected',
} as const;

export function getStatusFromFilter(filterStatus: string): string {
  return STATUS_MAPPING[filterStatus as keyof typeof STATUS_MAPPING] || filterStatus;
}

export function getFilterFromStatus(status: string): string {
  return REVERSE_STATUS_MAPPING[status as keyof typeof REVERSE_STATUS_MAPPING] || status;
}
