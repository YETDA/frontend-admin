/**
 * 상태코드 → 한글 상태명 매핑 객체
 */
const statusMap: Record<string, string> = {
  UNDER_AUDIT: '심사중',
  REJECTED: '반려',
  RECRUITING: '모집중',
  COMPLETED: '완료',
};

/**
 * 상태코드 문자열을 한글 상태명으로 변환
 * @param status 서버에서 받은 상태코드 (예: 'UNDER_AUDIT')
 * @returns 변환된 한글 상태명 (예: '심사중')
 */
export function convertStatus(status: string): string {
  return statusMap[status] ?? '알수없음';
}
