import {
  LayoutDashboard,
  ProjectorIcon as ProjectReviewIcon,
  PackageIcon as SettlementProcessorIcon,
  ClubIcon as CommunityManagerIcon,
  PointerIcon as ReportHandlerIcon,
  DatabaseIcon as AnalyticsEngineIcon,
} from 'lucide-react';

export const adminSidebarMenu = [
  {
    title: '운영 현황',
    items: [
      {
        id: 'dashboard',
        label: '운영 대시보드',
        icon: LayoutDashboard,
        description: '오늘의 우선순위 업무 및 긴급 알림',
      },
      {
        id: 'fundingAnalytics',
        label: '펀딩 분석 엔진',
        icon: AnalyticsEngineIcon,
        description: '데이터 기반 펀딩 트렌드 분석',
      },
    ],
  },
  {
    title: '심사 및 승인',
    items: [
      {
        id: 'projectReview',
        label: '프로젝트 심사 센터',
        icon: ProjectReviewIcon,
        badge: '24',
        description: '창작자 프로젝트 전문 검토 및 승인',
      },
      {
        id: 'settlementCenter',
        label: '정산 처리 센터',
        icon: SettlementProcessorIcon,
        badge: '8',
        description: '창작자 수익 정산 및 지급 관리',
      },
    ],
  },
  {
    title: '커뮤니티 관리',
    items: [
      {
        id: 'communityManagement',
        label: '커뮤니티 관리',
        icon: CommunityManagerIcon,
        description: '창작자 및 후원자 계정 관리',
      },
      {
        id: 'reportCenter',
        label: '신고 처리 센터',
        icon: ReportHandlerIcon,
        badge: '3',
        description: '플랫폼 안전성 확보를 위한 신고 처리',
      },
    ],
  },
];
