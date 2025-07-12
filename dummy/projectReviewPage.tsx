import { ProjectRow } from '@/types/page/projectReview/table';

export const projects: ProjectRow[] = [
  // 판매 프로젝트 데이터
  {
    type: 'sales',
    id: 1,
    salesTitle: 'AI 기반 코딩 도구 개발',
    productName: 'github.com/ai-coding-tool',
    sellerNickname: '개발자김',
    category: '개발도구',
    deliveryMethod: '다운로드',
    status: '심사중',
    approved: false,
    createdAt: '2024-01-15',
    averageDeliveryTime: '즉시',
    description:
      '개발자의 생산성을 높이는 AI 기반 자동 코드 생성 도구입니다. 자연어로 요구사항을 입력하면 최적화된 코드를 자동으로 생성해주며, 다양한 프로그래밍 언어를 지원합니다.',
    projectUrl: 'https://github.com/ai-coding-tool',
    options: [
      { id: 1, name: '기본 라이센스', price: '₩50,000' },
      { id: 2, name: '프리미엄 라이센스', price: '₩100,000' },
    ],
    image: '/placeholder.svg?height=300&width=400&text=AI+Coding+Tool',
  },
  {
    type: 'sales',
    id: 2,
    salesTitle: '웹 디자인 템플릿 패키지',
    productName: 'Premium Web Templates v2.0',
    sellerNickname: '디자이너박',
    category: '디자인',
    deliveryMethod: '이메일',
    status: '승인',
    approved: true,
    createdAt: '2024-01-14',
    averageDeliveryTime: '24시간',
    description:
      '모던하고 반응형인 웹 디자인 템플릿 20종이 포함된 프리미엄 패키지입니다. 각 템플릿은 HTML, CSS, JavaScript로 구성되어 있으며, 다양한 업종에 맞게 커스터마이징이 가능합니다.',
    projectUrl: 'https://templates.design-studio.com',
    options: [
      { id: 1, name: '기본 패키지', price: '₩80,000' },
      { id: 2, name: '확장 패키지', price: '₩150,000' },
    ],
    image: '/placeholder.svg?height=300&width=400&text=Web+Templates',
  },

  // 후원 프로젝트 데이터
  {
    type: 'sponsor',
    id: 3,
    sponsorTitle: '친환경 스마트 화분 개발',
    userNickname: '그린테크',
    category: '테크놀로지/IoT',
    fundingGoal: '₩50,000,000',
    status: '모집중',
    approved: false,
    description:
      'IoT 기술을 활용한 스마트 화분으로, 식물의 상태를 실시간으로 모니터링하고 자동으로 물을 공급합니다. 친환경 소재로 제작되어 지속가능한 라이프스타일을 추구하는 분들에게 적합합니다.',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    projectUrl: 'https://smartpot.greentech.co.kr',
    image: '/placeholder.svg?height=300&width=400&text=Smart+Plant+Pot',
  },
  {
    type: 'sponsor',
    id: 4,
    sponsorTitle: '독립 게임 "별빛 여행자" 개발',
    userNickname: '인디게임스튜디오',
    category: '게임/어드벤처',
    fundingGoal: '₩30,000,000',
    status: '심사중',
    approved: true,
    description:
      '감동적인 스토리와 아름다운 픽셀 아트가 특징인 2D 어드벤처 게임입니다. 주인공이 우주를 여행하며 다양한 행성의 문명을 만나고 우정을 쌓아가는 이야기를 담고 있습니다.',
    startDate: '2024-01-10',
    endDate: '2024-02-28',
    projectUrl: 'https://starlight-traveler.indie-games.com',
    image: '/placeholder.svg?height=300&width=400&text=Starlight+Traveler+Game',
  },
];
