import { useState, useEffect, useCallback } from 'react';
import fetchProjectReviews from '@/lib/projectReviewApi';
import { projects } from '@/dummy/projectReviewPage';
import { ProjectRow } from '@/types/page/projectReview/table'; // 타입 import 추가

interface UseProjectReviewProps {
  pageSize?: number;
}

export default function useProjectReview({ pageSize = 3 }: UseProjectReviewProps = {}) {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'sales' | 'sponsor'>('sales');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 타입을 명시적으로 지정하여 never[] 오류 해결
  const [projectData, setProjectData] = useState<{
    projects: ProjectRow[];
    totalCount: number;
    totalPages: number;
    filteredProjects: ProjectRow[];
  }>({
    projects: [],
    totalCount: 0,
    totalPages: 0,
    filteredProjects: [],
  });

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // 실제 API 호출 (현재는 주석 처리)
      /*
      const response = await fetchProjectReviews({
        search,
        status,
        category,
        activeTab,
        page: currentPage,
        pageSize,
      });
      
      setProjectData({
        projects: response.data,
        totalCount: response.totalCount,
        totalPages: response.totalPages,
        filteredProjects: response.data,
      });
      */

      // 임시 필터링 로직 (더미 데이터용)
      const filtered = projects.filter(project => {
        if (activeTab === 'sales' && project.type !== 'sales') return false;
        if (activeTab === 'sponsor' && project.type !== 'sponsor') return false;

        if (search) {
          const searchLower = search.toLowerCase();
          const title = project.type === 'sales' ? project.salesTitle : project.sponsorTitle;
          const nickname = project.type === 'sales' ? project.sellerNickname : project.userNickname;

          if (!title?.toLowerCase().includes(searchLower) && !nickname?.toLowerCase().includes(searchLower)) {
            return false;
          }
        }

        if (status !== 'all') {
          const statusMap = {
            pending: '심사중',
            approved: '승인',
            rejected: '반려',
          };
          if (project.status !== statusMap[status as keyof typeof statusMap]) {
            return false;
          }
        }

        if (category !== 'all' && project.category !== category) {
          return false;
        }

        return true;
      });

      // 페이지별 데이터 슬라이싱 - 여기가 핵심!
      const totalCount = filtered.length;
      const totalPages = Math.ceil(totalCount / pageSize);

      // 현재 페이지에 해당하는 데이터만 추출
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProjects = filtered.slice(startIndex, endIndex);

      console.log('Pagination Debug:', {
        currentPage,
        pageSize,
        totalCount,
        totalPages,
        startIndex,
        endIndex,
        paginatedProjectsLength: paginatedProjects.length,
        filteredLength: filtered.length,
      });

      setProjectData({
        projects: paginatedProjects, // 현재 페이지의 데이터만 (최대 3개)
        totalCount,
        totalPages,
        filteredProjects: filtered, // 필터링된 전체 데이터
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '데이터 로드 실패');
    } finally {
      setLoading(false);
    }
  }, [search, status, category, activeTab, currentPage, pageSize]);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return {
    search,
    status,
    category,
    activeTab,
    currentPage,
    loading,
    error,
    projects: projectData.projects, // 현재 페이지의 데이터 (최대 3개)
    totalCount: projectData.totalCount,
    totalPages: projectData.totalPages,
    filteredProjects: projectData.filteredProjects, // 필터링된 전체 데이터
    setSearch,
    setStatus,
    setCategory,
    setActiveTab,
    setCurrentPage,
    refetch: loadProjects,
  };
}
