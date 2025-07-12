export function handlePageChange(page: number, setCurrentPage: (page: number) => void) {
  setCurrentPage(page);
}

export function handleSearchChange(
  value: string,
  setSearch: (value: string) => void,
  setCurrentPage: (page: number) => void,
) {
  setSearch(value);
  setCurrentPage(1);
}

export function handleStatusChange(
  value: string,
  setStatus: (value: string) => void,
  setCurrentPage: (page: number) => void,
) {
  setStatus(value);
  setCurrentPage(1);
}

export function handleCategoryChange(
  value: string,
  setCategory: (value: string) => void,
  setCurrentPage: (page: number) => void,
) {
  setCategory(value);
  setCurrentPage(1);
}

export function handleTabChange(
  tab: 'sales' | 'sponsor',
  setActiveTab: (tab: 'sales' | 'sponsor') => void,
  setCurrentPage: (page: number) => void,
) {
  setActiveTab(tab);
  setCurrentPage(1);
}
