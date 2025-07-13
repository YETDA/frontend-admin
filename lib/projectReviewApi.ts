interface ProjectReviewFilters {
  search: string;
  status: string;
  category: string;
  activeTab: 'sales' | 'sponsor';
  page: number;
  pageSize: number;
}

interface ApiResponse {
  data: any[]; // API 응답 데이터 구조가 확정되지 않아 any 사용
  totalCount: number;
  totalPages: number;
}

export default async function fetchProjectReviews(filters: ProjectReviewFilters): Promise<ApiResponse> {
  try {
    const queryParams = new URLSearchParams({
      search: filters.search,
      status: filters.status,
      category: filters.category,
      tab: filters.activeTab,
      page: filters.page.toString(),
      pageSize: filters.pageSize.toString(),
    });

    const response = await fetch(`/api/project-reviews?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('프로젝트 데이터 조회 실패:', error);
    throw error;
  }
}

export async function approveProject(projectId: number): Promise<void> {
  const response = await fetch(`/api/project-reviews/${projectId}/approve`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`승인 실패: ${response.status}`);
  }
}

export async function rejectProject(projectId: number): Promise<void> {
  const response = await fetch(`/api/project-reviews/${projectId}/reject`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`반려 실패: ${response.status}`);
  }
}