import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({ currentPage, totalPages, onPageChange }: PaginationComponentProps) {
  const maxVisiblePages = 5;

  // 시작 페이지 계산
  const currentSetStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const currentSetEnd = Math.min(currentSetStart + maxVisiblePages - 1, totalPages);

  const renderPagination = () => {
    const pages = [];

    for (let i = currentSetStart; i <= currentSetEnd; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={e => {
              e.preventDefault(); // 기본 스크롤 동작 방지
              e.stopPropagation(); // 이벤트 버블링 방지
              onPageChange(i); // 페이지 변경 함수 호출
            }}
            className={`rounded-full px-3 py-1 ${
              currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return pages;
  };

  return (
    <Pagination className="flex justify-center items-center space-x-2">
      <PaginationContent>
        {/* 이전 버튼 */}
        <PaginationItem>
          <PaginationPrevious
            onClick={e => {
              e.preventDefault();
              if (currentSetStart > 1) {
                onPageChange(currentSetStart - 1);
              }
            }}
            className={`rounded-full p-2 ${
              currentSetStart === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-200'
            }`}
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </PaginationPrevious>
        </PaginationItem>

        {/* 페이지 번호 */}
        {renderPagination()}

        {/* 다음 버튼 */}
        <PaginationItem>
          <PaginationNext
            onClick={e => {
              e.preventDefault();
              if (currentSetEnd < totalPages) {
                onPageChange(currentSetEnd + 1);
              }
            }}
            className={`rounded-full p-2 ${
              currentSetEnd === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-200'
            }`}
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
