import { SettlementRow } from '@/types/page/settlementCenter/table';
import { Banknote, Clock, CheckCircle, TrendingUp } from 'lucide-react';

export const settlements: SettlementRow[] = [
  {
    id: 1,
    creator: '김창작',
    project: '스마트 워치 개발 프로젝트',
    amount: '₩2,450,000',
    fee: '₩245,000',
    netAmount: '₩2,205,000',
    status: '지급대기',
    requestDate: '2024-01-15',
    pricingPlan: '스탠다드 플랜 (10%)',
    bankAccount: '국민은행 ***-**-****89',
    riskLevel: '낮음',
  },
  {
    id: 2,
    creator: '이환경',
    project: '친환경 업사이클링 패션',
    amount: '₩1,200,000',
    fee: '₩96,000',
    netAmount: '₩1,104,000',
    status: '지급완료',
    requestDate: '2024-01-14',
    pricingPlan: '프리미엄 플랜 (8%)',
    bankAccount: '신한은행 ***-**-****23',
    riskLevel: '낮음',
  },
  {
    id: 3,
    creator: '박게임',
    project: '독립 게임 스튜디오 신작',
    amount: '₩3,800,000',
    fee: '₩380,000',
    netAmount: '₩3,420,000',
    status: '검토중',
    requestDate: '2024-01-13',
    pricingPlan: '스탠다드 플랜 (10%)',
    bankAccount: '우리은행 ***-**-****67',
    riskLevel: '보통',
  },
];

export const settlementStats = [
  {
    title: '이번 달 정산 요청',
    value: '₩847M',
    icon: Banknote,
    color: 'bg-blue-500',
    description: '총 정산 요청 금액',
  },
  {
    title: '처리 대기 건수',
    value: '8',
    icon: Clock,
    color: 'bg-orange-500',
    description: '승인 대기 중인 정산',
  },
  {
    title: '완료된 정산',
    value: '156',
    icon: CheckCircle,
    color: 'bg-green-500',
    description: '이번 달 처리 완료',
  },
  {
    title: '평균 처리 시간',
    value: '1.2일',
    icon: TrendingUp,
    color: 'bg-purple-500',
    description: '요청부터 지급까지',
  },
];

// 이번 달 정산 현황 - 더미 데이터 + 클래스 포함
export const scheduleStatusSummary = [
  {
    label: '지급 대기',
    count: '8건',
    amount: '₩12.5M',
    colorClass: 'bg-blue-50',
  },
  {
    label: '지급 완료',
    count: '156건',
    amount: '₩847M',
    colorClass: 'bg-green-50',
  },
  {
    label: '지급 보류',
    count: '3건',
    amount: '₩2.1M',
    colorClass: 'bg-orange-50',
  },
];

// 월별 정산 일정 - 더미 데이터 + 클래스 포함
export const scheduleItems = [
  {
    date: '1월 15일',
    label: '정산 요청 마감',
    status: '진행중',
    colorClass: 'bg-blue-500',
    badgeClass: 'bg-blue-100 text-blue-700',
  },
  {
    date: '1월 20일',
    label: '심사 및 승인',
    status: '대기',
    colorClass: 'bg-orange-500',
    badgeClass: 'bg-orange-100 text-orange-700',
  },
  {
    date: '1월 25일',
    label: '지급 완료',
    status: '예정',
    colorClass: 'bg-green-500',
    badgeClass: 'bg-gray-100 text-gray-700',
  },
];

export const statusColorMap: Record<string, { dot: string; badge: string }> = {
  진행중: {
    dot: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-700',
  },
  대기: {
    dot: 'bg-orange-500',
    badge: 'bg-orange-100 text-orange-700',
  },
  예정: {
    dot: 'bg-green-500',
    badge: 'bg-gray-100 text-gray-700',
  },
};
