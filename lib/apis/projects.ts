import { api } from '@/lib/axios/client';

function getPageSize(page: string, totalCount: string): string {
  const pageSize = 5;
  const remaining = parseInt(totalCount) - parseInt(page) * pageSize;

  return (remaining >= pageSize ? pageSize : Math.max(remaining, 0)).toString();
}

const types = ['DONATION', 'PURCHASE'];
const statuses = ['UNDER_AUDIT', 'REJECTED', 'RECRUITING', 'COMPLETED'];

export async function fetchAdminProjects(page: string, totalCount: string) {
  const size = getPageSize(page, totalCount);
  const joinedStatuses = statuses.join(',');
  //const joinedSort = sort.join(','); // 필요시 정렬도

  try {
    console.log('---------------API 호출 시작---------------');
    const res = await api.get('/api/v1/admin/project', {
      params: {
        type: types[0],
        statuses: joinedStatuses,
        // page,
        // size,
        // sort: joinedSort, // 필요하면 추가
      },
    });

    console.log('-----------✅ API 호출 성공-----------', res.data);
    return res.data;
  } catch (error: any) {
    console.error('❌ API 호출 실패:', error);
    const errorMessage = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';
    const status = error.response?.status || 'N/A';
    alert(`🚨 API 호출 실패\n\n상태코드: ${status}\n오류 메시지: ${errorMessage}`);

    throw error;
  }
}

// 에러 로깅을 위한 유틸리티 함수
export function logApiError(functionName: string, error: any) {
  console.group(`🚨 ${functionName} 에러`);
  console.error('Error Object:', error);
  console.error('Error Message:', error.message);
  console.error('Error Stack:', error.stack);

  if (error.response) {
    console.error('Response Status:', error.response.status);
    console.error('Response Data:', error.response.data);
    console.error('Response Headers:', error.response.headers);
  }

  if (error.request) {
    console.error('Request Config:', error.request);
  }

  console.groupEnd();
}

// ✅ sort 파라미터 예제
// - 형식: "필드명,(asc|desc)"
// - 오름차순: asc 날짜면: 오래된 → 최신 (기본), 내림차순: desc 날짜면: 최신 → 오래된
// - 여러 정렬 조건도 배열로 지원 가능
const sort = [
  'createdAt,desc', // 등록일 내림차순
  'id,asc', // 판매 ID 오름차순
  'projectTitle,asc', // 프로젝트 제목 오름차순
  'purchaseName,asc', // 판매 상품명 오름차순
  'sellerNickname,asc', // 판매자 닉네임 오름차순
  'categoryName,asc', // 카테고리명 오름차순
  'providingMethod,asc', // 제공방식 오름차순 (다운로드/이메일)
  'projectStatus,asc', // 프로젝트 상태 오름차순
  'approved,desc', // 승인 여부 내림차순
];
