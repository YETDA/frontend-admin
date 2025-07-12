'use client';

import { projects } from '@/dummy/projectReviewPage';
import BulkReviewButton from './_components/bulkReviewButton';
import ProjectReviewCards from './_components/projectReviewCards';
import { useState, useMemo } from 'react';
import ProjectReviewFilters from './_components/projectReviewFilters';
import ProjectReviewTable from './_components/table/projectReviewTable';
import { projectReviewTotalStats } from './_status/projectReviewTotal';
import Navigation from '@/components/ui/nav/navigation';
import { Heart, ShoppingCart } from 'lucide-react';
import { ProjectRow } from '@/types/page/projectReview/table';

export default function ProjectReview() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'sales' | 'sponsor'>('sales');

  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // 한 페이지당 3개 프로젝트
  const maxPages = 5; // 최대 5개 페이지 버튼

  // 필터링 로직
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // 탭별 필터링
      if (activeTab === 'sales' && project.type !== 'sales') return false;
      if (activeTab === 'sponsor' && project.type !== 'sponsor') return false;

      // 검색 필터링
      if (search) {
        const searchLower = search.toLowerCase();
        const title = project.type === 'sales' ? project.salesTitle : project.sponsorTitle;
        const nickname = project.type === 'sales' ? project.sellerNickname : project.userNickname;

        if (!title.toLowerCase().includes(searchLower) && !nickname.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // 상태 필터링
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

      // 카테고리 필터링
      if (category !== 'all' && project.category !== category) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [projects, activeTab, search, status, category]);

  // 페이지네이션 계산
  const totalCount = filteredProjects.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 필터 변경 시 첫 페이지로 이동
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: 'sales' | 'sponsor') => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const pendingCount = projects.filter(p => p.status === '심사중').length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="section-header">프로젝트 심사 센터</h1>
          <p className="section-description">
            등록된 크라우드펀딩 프로젝트를 전문적으로 검토하고 승인 여부를 결정합니다
          </p>
        </div>
        <div className="flex gap-3">
          <BulkReviewButton pendingCount={pendingCount} />
        </div>
      </div>

      {/* Review Statistics */}
      <ProjectReviewCards stats={projectReviewTotalStats} />

      <Navigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        tabs={[
          { key: 'sales', label: '판매 프로젝트', icon: ShoppingCart },
          { key: 'sponsor', label: '후원 프로젝트', icon: Heart },
        ]}
      />

      <div className="mt-6">
        <ProjectReviewFilters
          search={search}
          onSearchChange={handleSearchChange}
          status={status}
          onStatusChange={handleStatusChange}
          category={category}
          onCategoryChange={handleCategoryChange}
        />

        <ProjectReviewTable
          projects={currentProjects}
          mode={activeTab}
          pendingCount={pendingCount}
          page={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={handlePageChange}
        />

        {/* 필터 결과 요약 */}
        {search || status !== 'all' || category !== 'all' ? (
          <div className="mt-4 text-sm text-gray-600">
            총 {totalCount}개의 프로젝트 중 {currentProjects.length}개를 표시하고 있습니다. (페이지 {currentPage} /{' '}
            {totalPages})
          </div>
        ) : null}
      </div>
    </div>
  );
}
