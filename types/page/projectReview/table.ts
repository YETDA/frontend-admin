// types/page/projectReview/table.ts

export type SalesProjectRow = {
  type: 'sales';
  id: number;
  salesTitle: string; // mapped from projectTitle
  productName: string;
  sellerNickname: string;
  category: string;
  deliveryMethod: string;
  status: string;
  approved: boolean;
  createdAt: string;
  averageDeliveryTime: string;
  description: string;
  projectUrl: string;
  options: {
    id: number;
    name: string;
    price: string;
  }[];
  image?: string;
};

export type SponsorProjectRow = {
  type: 'sponsor';
  id: number;
  sponsorTitle: string;
  userNickname: string;
  category: string;
  fundingGoal: string;
  status: string;
  approved: boolean;
  description: string;
  startDate: string;
  endDate: string;
  projectUrl: string;
  image?: string;
};

export type ProjectRow = SalesProjectRow | SponsorProjectRow;

// 타입 가드 함수 추가
export function isSalesProjectRow(project: ProjectRow): project is SalesProjectRow {
  return project.type === 'sales';
}

export function isSponsorProjectRow(project: ProjectRow): project is SponsorProjectRow {
  return project.type === 'sponsor';
}
