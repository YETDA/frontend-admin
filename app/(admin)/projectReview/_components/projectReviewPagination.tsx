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
  maxVisiblePages?: number;
}

export default function PaginationComponent({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationComponentProps) {
  // 현재 페이지 그룹 계산
  const currentSetStart = Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const currentSetEnd = Math.min(currentSetStart + maxVisiblePages - 1, totalPages);

  const handlePageClick = (page: number) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Pagination Click:', page);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = currentSetStart; i <= currentSetEnd; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={handlePageClick(i)}
            className={`rounded-full px-3 py-1 cursor-pointer transition-colors ${
              currentPage === i
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pages;
  };

  // 총 페이지가 1 이하면 페이지네이션 숨김
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <Pagination className="flex justify-center items-center space-x-2">
        <PaginationContent>
          {/* 이전 그룹 버튼 */}
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePageClick(currentSetStart - 1)}
              className={`rounded-full p-2 cursor-pointer transition-colors ${
                currentSetStart === 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </PaginationPrevious>
          </PaginationItem>

          {/* 페이지 번호들 */}
          {renderPageNumbers()}

          {/* 다음 그룹 버튼 */}
          <PaginationItem>
            <PaginationNext
              onClick={handlePageClick(currentSetEnd + 1)}
              className={`rounded-full p-2 cursor-pointer transition-colors ${
                currentSetEnd === totalPages ? 'pointer-events-none opacity-50' : 'hover:bg-gray-200'
              }`}
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </PaginationNext>
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* 페이지 정보 표시 */}
      <div className="text-xs text-gray-500">
        페이지 {currentPage} / {totalPages}
      </div>
    </div>
  );
}
