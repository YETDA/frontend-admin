'use client';
import { projects } from '@/dummy/projectReviewPage';
import BulkReviewButton from './_components/bulkReviewButton';
import ProjectReviewCards from './_components/projectReviewCards';
import { useState } from 'react';
import ProjectReviewFilters from './_components/projectReviewFilters';
import ProjectReviewTable from './_components/table/projectReviewTable';
import { projectReviewTotalStats } from './_status/projectReviewTotal';
import Navigation from '@/components/ui/nav/navigation';
import { Heart, ShoppingCart } from 'lucide-react';

export default function ProjectReview() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
  const pendingCount = projects.filter(p => p.status === '심사중').length;
  const [activeTab, setActiveTab] = useState<'sales' | 'sponsor'>('sales');

  // 페이지네이션 임시 변수 선언
  const page = 1; // 현재 페이지
  const pageSize = 10; // 한 페이지에 표시할 프로젝트 수
  const totalCount = projects.length; // 전체 프로젝트 수
  const onPageChange = (newPage: number) => {
    console.log(`페이지 변경: ${newPage}`);
  };

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
          <BulkReviewButton pendingCount={24} />
        </div>
      </div>
      {/* Review Statistics */}
      <ProjectReviewCards stats={projectReviewTotalStats} />
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={[
          { key: 'sales', label: '판매 프로젝트', icon: ShoppingCart },
          { key: 'sponsor', label: '후원 프로젝트', icon: Heart },
        ]}
      />

      <div className="mt-6">
        {activeTab === 'sales' && (
          <>
            <ProjectReviewFilters
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
              category={category}
              onCategoryChange={setCategory}
            />
            <ProjectReviewTable
              projects={projects}
              mode={activeTab}
              pendingCount={pendingCount}
              page={page} // 페이지네이션 props 전달
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={onPageChange}
            />
          </>
        )}
        {activeTab === 'sponsor' && (
          <>
            <ProjectReviewFilters
              search={search}
              onSearchChange={setSearch}
              status={status}
              onStatusChange={setStatus}
              category={category}
              onCategoryChange={setCategory}
            />
            <ProjectReviewTable
              mode={activeTab}
              projects={projects}
              pendingCount={pendingCount}
              page={page} // 페이지네이션 props 전달
              pageSize={pageSize}
              totalCount={totalCount}
              onPageChange={onPageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
