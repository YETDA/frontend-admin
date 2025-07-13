'use client';

import { Heart, ShoppingCart } from 'lucide-react';
import BulkReviewButton from './_components/bulkReviewButton';
import ProjectReviewCards from './_components/projectReviewCards';
import ProjectReviewFilters from './_components/projectReviewFilters';
import ProjectReviewTable from './_components/table/projectReviewTable';
import PaginationComponent from './_components/projectReviewPagination';
import Navigation from '@/components/ui/nav/navigation';
import { projectReviewTotalStats } from './_status/projectReviewTotal';
import useProjectReview from '@/hooks/useProjectReview';
import {
  handleSearchChange,
  handleStatusChange,
  handleCategoryChange,
  handleTabChange,
} from './_components/paginationControls';
import handlePageChange from './_components/paginationControls';
import { ProjectRow } from '@/types/page/projectReview/table';
import { useAdminProjectsQuery } from '@/lib/queries/useAdminProjectsQuery';

interface ProjectReviewPageProps {
  pageSize?: number;
}

export default function ProjectReview({ pageSize = 3 }: ProjectReviewPageProps) {
  const {
    search,
    status,
    category,
    activeTab,
    currentPage,
    projects, // 현재 페이지의 데이터만 (최대 3개)
    totalCount,
    totalPages,
    loading,
    error,
    filteredProjects, // 필터링된 전체 데이터
    setSearch,
    setStatus,
    setCategory,
    setActiveTab,
    setCurrentPage,
  } = useProjectReview({ pageSize });
  const { data: projectsData } = useAdminProjectsQuery();
  console.log('데이터:', projectsData, projectsData?.length);
  // 전체 필터링된 데이터에서 심사중인 프로젝트 수 계산
  const pendingCount = filteredProjects.filter(p => p.status === '심사중').length;
  const hasFilters = Boolean(search || status !== 'all' || category !== 'all'); // Boolean으로 명시적 변환

  console.log('Main Page Debug:', {
    currentPage,
    totalPages,
    projectsLength: projects.length,
    totalCount,
    pageSize,
  });

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="space-y-8">
      <PageHeader pendingCount={pendingCount} />

      <ProjectReviewCards stats={projectReviewTotalStats} />

      <Navigation
        activeTab={activeTab}
        setActiveTab={tab => handleTabChange(tab, setActiveTab, setCurrentPage)}
        tabs={[
          { key: 'sales', label: '판매 프로젝트', icon: ShoppingCart },
          { key: 'sponsor', label: '후원 프로젝트', icon: Heart },
        ]}
      />

      <ContentSection
        search={search}
        status={status}
        category={category}
        projects={projects} // 현재 페이지의 데이터만 (최대 3개)
        activeTab={activeTab}
        pendingCount={pendingCount}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        loading={loading}
        hasFilters={hasFilters}
        onSearchChange={value => handleSearchChange(value, setSearch, setCurrentPage)}
        onStatusChange={value => handleStatusChange(value, setStatus, setCurrentPage)}
        onCategoryChange={value => handleCategoryChange(value, setCategory, setCurrentPage)}
        onPageChange={page => handlePageChange(page, setCurrentPage)}
      />
    </div>
  );
}

interface PageHeaderProps {
  pendingCount: number;
}

function PageHeader({ pendingCount }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="section-header">프로젝트 심사 센터</h1>
        <p className="section-description">등록된 크라우드펀딩 프로젝트를 전문적으로 검토하고 승인 여부를 결정합니다</p>
      </div>
      <div className="flex gap-3">
        <BulkReviewButton pendingCount={pendingCount} />
      </div>
    </div>
  );
}

interface ContentSectionProps {
  search: string;
  status: string;
  category: string;
  projects: ProjectRow[];
  activeTab: 'sales' | 'sponsor';
  pendingCount: number;
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  loading: boolean;
  hasFilters: boolean;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onPageChange: (page: number) => void;
}

function ContentSection({
  search,
  status,
  category,
  projects,
  activeTab,
  pendingCount,
  currentPage,
  pageSize,
  totalCount,
  totalPages,
  loading,
  hasFilters,
  onSearchChange,
  onStatusChange,
  onCategoryChange,
  onPageChange,
}: ContentSectionProps) {
  return (
    <div className="mt-6">
      <ProjectReviewFilters
        search={search}
        onSearchChange={onSearchChange}
        status={status}
        onStatusChange={onStatusChange}
        category={category}
        onCategoryChange={onCategoryChange}
      />

      {/* 로딩 상태 표시 */}
      {loading ? (
        <div className="mt-8 text-center py-12">
          <div className="text-gray-400 text-lg mb-2">⏳</div>
          <p className="text-gray-600 font-medium">데이터를 불러오는 중...</p>
        </div>
      ) : (
        <ProjectReviewTable
          projects={projects} // 현재 페이지의 데이터만 (최대 3개)
          mode={activeTab}
          pendingCount={pendingCount}
          page={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          // loading prop 제거
        />
      )}

      {hasFilters && !loading && (
        <FilterSummary
          totalCount={totalCount}
          currentCount={projects.length} // 현재 페이지의 실제 데이터 수
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
        />
      )}

      {totalPages > 1 && !loading && (
        <div className="mt-8">
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      )}

      {totalCount === 0 && !loading && <EmptyState />}
    </div>
  );
}

interface FilterSummaryProps {
  totalCount: number;
  currentCount: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

function FilterSummary({ totalCount, currentCount, currentPage, totalPages, pageSize }: FilterSummaryProps) {
  const startIndex = (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(startIndex + currentCount - 1, totalCount);

  return (
    <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
      <p className="text-sm text-gray-600">
        <span className="font-medium">검색 결과:</span> 총 {totalCount}개 중{' '}
        <span className="font-medium text-blue-600">
          {startIndex}-{endIndex}번째
        </span>{' '}
        항목 표시
      </p>
      <p className="text-xs text-gray-500 mt-1">
        페이지 {currentPage} / {totalPages} (페이지당 최대 {pageSize}개)
      </p>
    </div>
  );
}

interface ErrorStateProps {
  error: string;
}

function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="mt-8 text-center py-12">
      <div className="text-red-400 text-lg mb-2">⚠️</div>
      <p className="text-red-600 font-medium">데이터 로드 중 오류가 발생했습니다.</p>
      <p className="text-sm text-gray-500 mt-1">{error}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="mt-8 text-center py-12">
      <div className="text-gray-400 text-lg mb-2">📋</div>
      <p className="text-gray-600 font-medium">조건에 맞는 프로젝트가 없습니다.</p>
      <p className="text-sm text-gray-500 mt-1">다른 검색 조건을 시도해보세요.</p>
    </div>
  );
}
