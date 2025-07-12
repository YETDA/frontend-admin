'use client';
import { projects } from '@/dummy/projectReviewPage';
import BulkReviewButton from './_components/bulkReviewButton';
import ProjectReviewCards from './_components/projectReviewCards';
import { useState } from 'react';
import ProjectReviewFilters from './_components/projectReviewFilters';
import ProjectReviewTable from './_components/table/projectReviewTable';
import { projectReviewTotalStats } from './_status/projectReviewTotal';

export default function ProjectReview() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [category, setCategory] = useState('all');
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
          <BulkReviewButton pendingCount={24} />
        </div>
      </div>
      {/* Review Statistics */}
      <ProjectReviewCards stats={projectReviewTotalStats} />

      {/* Filters & Search */}
      <ProjectReviewFilters
        search={search}
        onSearchChange={setSearch}
        status={status}
        onStatusChange={setStatus}
        category={category}
        onCategoryChange={setCategory}
      />

      {/* Projects Table */}
      <ProjectReviewTable projects={projects} pendingCount={pendingCount} />
    </div>
  );
}
