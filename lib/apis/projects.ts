import { api } from '@/lib/axios/client';

function getPageSize(page: string, totalCount: string): string {
  const pageSize = 5;
  const remaining = parseInt(totalCount) - parseInt(page) * pageSize;

  return (remaining >= pageSize ? pageSize : Math.max(remaining, 0)).toString();
}

//const types = ['DONATION', 'PURCHASE'];
const statuses = ['UNDER_AUDIT', 'REJECTED', 'RECRUITING', 'COMPLETED'];

async function fetchSingleTypeProjects(type: string, page: string, totalCount: string) {
  const size = getPageSize(page, totalCount);
  const joinedStatuses = statuses.join(',');

  const res = await api.get('/api/v1/admin/project', {
    params: {
      type,
      statuses: joinedStatuses,
    },
  });

  return res.data;
}

export async function fetchAdminProjects({
  page,
  totalCount,
  type,
}: {
  page: string;
  totalCount: string;
  type: 'DONATION' | 'PURCHASE' | 'ALL';
}) {
  try {
    console.log('🚀 fetchAdminProjects 시작...', { page, totalCount, type });

    if (type === 'ALL') {
      // DONATION + PURCHASE 병렬로 호출
      const [donationRes, purchaseRes] = await Promise.all([
        fetchSingleTypeProjects('DONATION', page, totalCount),
        fetchSingleTypeProjects('PURCHASE', page, totalCount),
      ]);

      // 둘 다 content 배열이라면 병합
      const combinedContent = [...(donationRes?.data?.content ?? []), ...(purchaseRes?.data?.content ?? [])];

      // 페이지 정보는 합치기 복잡하니 content 중심 반환
      return {
        status: 200,
        message: '성공',
        data: {
          content: combinedContent,
          totalElements: combinedContent.length,
        },
      };
    } else {
      // 단일 타입
      return await fetchSingleTypeProjects(type, page, totalCount);
    }
  } catch (error: any) {
    console.error('❌ fetchAdminProjects 실패:', error);
    throw error;
  }
}

//-------------------------------------------------나중에 위치 변동 예정-------------------------------------------------

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
