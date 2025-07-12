import { ProjectRow } from '@/types/page/projectReview/table';
import {
  ProjectorIcon as ProjectApprover,
  DeleteIcon as ProjectRejecter,
  TimerIcon as ReviewTimer,
  TrendingUp,
} from 'lucide-react';
export const projects: ProjectRow[] = [
  {
    id: 1,
    title: '차세대 스마트 워치 개발 프로젝트',
    creator: '김창작',
    category: '테크놀로지',
    status: '심사중',
    priority: '높음',
    createdAt: '2024-01-15',
    fundingGoal: '₩50,000,000',
    description: '혁신적인 건강 모니터링 기능을 탑재한 차세대 스마트 워치 개발',
    riskLevel: '낮음',
    completeness: 95,
  },
  {
    id: 2,
    title: '친환경 업사이클링 패션 브랜드',
    creator: '이환경',
    category: '패션',
    status: '심사중',
    priority: '보통',
    createdAt: '2024-01-14',
    fundingGoal: '₩20,000,000',
    description: '폐기물을 활용한 지속가능한 패션 아이템 제작',
    riskLevel: '보통',
    completeness: 88,
  },
  {
    id: 3,
    title: '독립 게임 스튜디오 신작 개발',
    creator: '박게임',
    category: '게임',
    status: '승인',
    priority: '높음',
    createdAt: '2024-01-13',
    fundingGoal: '₩30,000,000',
    description: '감동적인 스토리텔링의 인디 어드벤처 게임',
    riskLevel: '낮음',
    completeness: 100,
  },
];

export const reviewStats = [
  {
    title: '심사 대기',
    value: '24',
    icon: ReviewTimer,
    colorClass: 'cf-icon-container report-alert',
    description: '신규 등록된 프로젝트',
  },
  {
    title: '이번 주 승인',
    value: '18',
    icon: ProjectApprover,
    colorClass: 'cf-icon-container settlement',
    description: '승인 완료된 프로젝트',
  },
  {
    title: '반려 건수',
    value: '3',
    icon: ProjectRejecter,
    colorClass: 'cf-icon-container report-alert',
    description: '검토 후 반려된 프로젝트',
  },
  {
    title: '평균 심사 시간',
    value: '2.3일',
    icon: TrendingUp,
    colorClass: 'cf-icon-container project-review',
    description: '등록부터 승인까지 소요 시간',
  },
];
