export default function handlePageChange(page: number, setCurrentPage: (page: number) => void) {
  console.log('Page Change:', page);
  setCurrentPage(page);
}

export function handleSearchChange(
  value: string,
  setSearch: (value: string) => void,
  setCurrentPage: (page: number) => void,
) {
  console.log('Search Change:', value);
  setSearch(value);
  setCurrentPage(1); // 검색 시 첫 페이지로 이동
}

export function handleStatusChange(
  value: string,
  setStatus: (value: string) => void,
  setCurrentPage: (page: number) => void,
) {
  console.log('Status Change:', value);
  setStatus(value);
  setCurrentPage(1); // 상태 변경 시 첫 페이지로 이동
}

export function handleCategoryChange(
  value: string,
  setCategory: (value: string) => void,
  setCurrentPage: (page: number) => void,
) {
  console.log('Category Change:', value);
  setCategory(value);
  setCurrentPage(1); // 카테고리 변경 시 첫 페이지로 이동
}

export function handleTabChange(
  tab: 'sales' | 'sponsor',
  setActiveTab: (tab: 'sales' | 'sponsor') => void,
  setCurrentPage: (page: number) => void,
) {
  console.log('Tab Change:', tab);
  setActiveTab(tab);
  setCurrentPage(1); // 탭 변경 시 첫 페이지로 이동
}
