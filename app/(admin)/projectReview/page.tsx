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
import PaginationComponent from './_components/projectReviewPagination';
import {
  handlePageChange,
  handleSearchChange,
  handleStatusChange,
  handleCategoryChange,
  handleTabChange,
} from './_components/paginationControls';

export default function ProjectReview() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'sales' | 'sponsor'>('sales');

  // 페이지네이션 설정
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // 한 페이지당 10개 프로젝트로 증가

  // 필터링 로직
  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      // 탭별 필터링
      if (activeTab === 'sales' && project.type !== 'sales') return false;
      if (activeTab === 'sponsor' && project.type !== 'sponsor') return false;

      if (search) {
        const searchLower = search.toLowerCase();
        const title = project.type === 'sales' ? project.salesTitle : project.sponsorTitle;
        const nickname = project.type === 'sales' ? project.sellerNickname : project.userNickname;

        if (!title.toLowerCase().includes(searchLower) && !nickname.toLowerCase().includes(searchLower)) {
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

    return filtered;
  }, [projects, activeTab, search, status, category]);

  // 페이지네이션 계산
  const totalCount = filteredProjects.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const pendingCount = projects.filter(p => p.status === '심사중').length;

  return (
    <div className="space-y-8">
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

      <ProjectReviewCards stats={projectReviewTotalStats} />

      <Navigation
        activeTab={activeTab}
        setActiveTab={tab => handleTabChange(tab, setActiveTab, setCurrentPage)}
        tabs={[
          { key: 'sales', label: '판매 프로젝트', icon: ShoppingCart },
          { key: 'sponsor', label: '후원 프로젝트', icon: Heart },
        ]}
      />

      <div className="mt-6">
        <ProjectReviewFilters
          search={search}
          onSearchChange={value => handleSearchChange(value, setSearch, setCurrentPage)}
          status={status}
          onStatusChange={value => handleStatusChange(value, setStatus, setCurrentPage)}
          category={category}
          onCategoryChange={value => handleCategoryChange(value, setCategory, setCurrentPage)}
        />

        <ProjectReviewTable
          projects={currentProjects}
          mode={activeTab}
          pendingCount={pendingCount}
          page={currentPage}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={page => handlePageChange(page, setCurrentPage)}
        />

        {/* 필터 결과 요약 - 조건부 렌더링 개선 */}
        {(search || status !== 'all' || category !== 'all') && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-sm text-gray-600">
              <span className="font-medium">검색 결과:</span> 총 {totalCount}개의 프로젝트 중{' '}
              <span className="font-medium text-blue-600">{currentProjects.length}개</span>를 표시하고 있습니다.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              현재 페이지: {currentPage} / {totalPages}
            </p>
          </div>
        )}
        {totalPages > 1 && (
          <div className="mt-8">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={page => handlePageChange(page, setCurrentPage)}
            />
          </div>
        )}

        {totalCount === 0 && (
          <div className="mt-8 text-center py-12">
            <div className="text-gray-400 text-lg mb-2">📋</div>
            <p className="text-gray-600 font-medium">조건에 맞는 프로젝트가 없습니다.</p>
            <p className="text-sm text-gray-500 mt-1">다른 검색 조건을 시도해보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}
