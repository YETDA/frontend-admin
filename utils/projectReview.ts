import { PROJECT_STATUS, DELIVERY_METHOD, BADGE_STYLES } from '@/constants/projectReview';

export function getStatusBadgeStyle(status: string): string {
  switch (status) {
    case PROJECT_STATUS.APPROVED:
      return BADGE_STYLES.approved;
    case PROJECT_STATUS.PENDING:
      return BADGE_STYLES.pending;
    case PROJECT_STATUS.REJECTED:
      return BADGE_STYLES.rejected;
    default:
      return BADGE_STYLES.pending;
  }
}

export function getDeliveryMethodBadgeStyle(method: string): string {
  switch (method) {
    case DELIVERY_METHOD.DOWNLOAD:
      return BADGE_STYLES.download;
    case DELIVERY_METHOD.EMAIL:
      return BADGE_STYLES.email;
    case DELIVERY_METHOD.PHYSICAL:
      return BADGE_STYLES.physical;
    default:
      return BADGE_STYLES.email;
  }
}

export function getApprovalBadgeStyle(approved: boolean): string {
  return approved ? BADGE_STYLES.approved : BADGE_STYLES.rejected;
}

export function getApprovalText(approved: boolean): string {
  return approved ? '승인' : '미승인';
}
