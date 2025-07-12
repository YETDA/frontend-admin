import {
  ShoppingBag as SaleProjectIcon,
  HandHeart as SponsorProjectIcon,
  CheckCircle as ProjectApprover,
  XCircle as ProjectRejecter,
} from 'lucide-react';
// 오타
export const projectReviewTotalStats = [
  {
    title: '판매 심사 대기',
    value: '12', // api 연결 필요
    icon: <SaleProjectIcon size={24} color="#fff" />,
    colorClass: 'bg-[#1E9EFF]',
    description: '판매 프로젝트 심사 대기',
  },
  {
    title: '후원 심사 대기',
    value: '18', // api 연결 필요
    icon: <SponsorProjectIcon size={24} color="#fff" />,
    colorClass: 'bg-[#FF8DA6]',
    description: '후원 프로젝트 심사 대기',
  },
  {
    title: '이번 주 승인',
    value: '18', // api 연결 필요
    icon: <ProjectApprover size={24} color="#fff" />,
    colorClass: 'cf-icon-container settlement',
    description: '승인 완료된 프로젝트',
  },
  {
    title: '총 반려 건수',
    value: '3', // api 연결 필요
    icon: <ProjectRejecter size={24} color="#fff" />,
    colorClass: 'bg-[#FF4C4C]',
    description: '검토 후 반려된 프로젝트',
  },
];
