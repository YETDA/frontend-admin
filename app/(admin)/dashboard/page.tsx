// import { ComingSoon } from '@/components/pages/comingSoon';

// export default function Page() {
//   return (
//     <ComingSoon
//       title="운영 대시보드 준비중"
//       description="오늘의 우선순위 업무 및 긴급 알림을 확인할 수 있는 대시보드를 준비하고 있습니다."
//       showBackButton={false}
//     />
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DollarSign, FileCheck2, Users, AlertTriangle, UserX, Activity, Clock } from 'lucide-react';

type Settlement = {
  creator: {
    name: string;
    avatar: string;
    joinDate: string;
  };
  project: {
    name: string;
    type: 'funding' | 'sales';
    description: string;
  };
  fundingAmount: number;
  fee: number;
  settlementAmount: number;
  accountInfo: {
    bank: string;
    accountNumber: string;
    riskLevel: '낮음' | '보통' | '높음';
  };
  achievementRate?: number;
  salesCount?: number;
  status: '지급대기' | '지급완료' | '검토중' | '보류';
};

type ActivityLog = {
  id: string;
  user: string;
  action: string;
  amount?: number;
  reason?: string;
  time: string;
  type: 'project' | 'settlement' | 'report';
  date: string;
};

const settlementData: Settlement[] = [
  {
    creator: { name: '김창작', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2024-01-15' },
    project: { name: '스마트 워치 개발', type: 'funding', description: '혁신적인 스마트워치 프로젝트' },
    fundingAmount: 2450000,
    fee: -245000,
    settlementAmount: 2205000,
    accountInfo: { bank: '국민은행', accountNumber: '***-**-****89', riskLevel: '낮음' },
    achievementRate: 156,
    status: '지급대기',
  },
  {
    creator: { name: '박게임', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2024-01-13' },
    project: { name: '독립 게임 스튜디오 신작', type: 'sales', description: '인디 게임 개발 프로젝트' },
    fundingAmount: 3800000,
    fee: -380000,
    settlementAmount: 3420000,
    accountInfo: { bank: '우리은행', accountNumber: '***-**-****67', riskLevel: '보통' },
    salesCount: 89,
    status: '검토중',
  },
  {
    creator: { name: '이환경', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2024-01-14' },
    project: { name: '업사이클링 패션', type: 'funding', description: '지속 가능한 패션 프로젝트' },
    fundingAmount: 1200000,
    fee: -96000,
    settlementAmount: 1104000,
    accountInfo: { bank: '신한은행', accountNumber: '***-**-****23', riskLevel: '낮음' },
    achievementRate: 92,
    status: '지급완료',
  },
  {
    creator: { name: '최예술', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2023-12-20' },
    project: { name: '디지털 아트 전시회', type: 'sales', description: '혁신적인 디지털 아트 전시회' },
    fundingAmount: 5500000,
    fee: -660000,
    settlementAmount: 4840000,
    accountInfo: { bank: '하나은행', accountNumber: '***-**-****55', riskLevel: '높음' },
    salesCount: 45,
    status: '보류',
  },
  {
    creator: { name: '정개발', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2023-11-05' },
    project: { name: '오픈소스 라이브러리', type: 'funding', description: '개발자를 위한 오픈소스 프로젝트' },
    fundingAmount: 800000,
    fee: -64000,
    settlementAmount: 736000,
    accountInfo: { bank: '카카오뱅크', accountNumber: '***-**-****11', riskLevel: '낮음' },
    achievementRate: 110,
    status: '지급완료',
  },
  {
    creator: { name: '한디자인', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2024-01-20' },
    project: { name: '친환경 패키징', type: 'funding', description: '지속가능한 패키징 솔루션' },
    fundingAmount: 1800000,
    fee: -180000,
    settlementAmount: 1620000,
    accountInfo: { bank: '농협은행', accountNumber: '***-**-****77', riskLevel: '낮음' },
    achievementRate: 125,
    status: '지급대기',
  },
  {
    creator: { name: '조음악', avatar: '/placeholder.svg?height=40&width=40', joinDate: '2024-01-18' },
    project: { name: '인디 음반 제작', type: 'sales', description: '독립 음악가 앨범 제작' },
    fundingAmount: 950000,
    fee: -95000,
    settlementAmount: 855000,
    accountInfo: { bank: '기업은행', accountNumber: '***-**-****33', riskLevel: '낮음' },
    salesCount: 67,
    status: '검토중',
  },
];

const todayActivityLogs: ActivityLog[] = [
  {
    id: '1',
    user: '김창작',
    action: '프로젝트 승인',
    amount: 2400000,
    time: '3분 전',
    type: 'project',
    date: '2024-01-25',
  },
  {
    id: '2',
    user: '이게임',
    action: '프로젝트 반려',
    reason: '서류 미비',
    time: '15분 전',
    type: 'project',
    date: '2024-01-25',
  },
  {
    id: '3',
    user: '박창작',
    action: '정산 승인',
    amount: 1200000,
    time: '5분 전',
    type: 'settlement',
    date: '2024-01-25',
  },
  {
    id: '4',
    user: '최게임',
    action: '정산 보류',
    reason: '서류 미비',
    time: '20분 전',
    type: 'settlement',
    date: '2024-01-25',
  },
  {
    id: '5',
    user: '신고자A',
    action: '신고 해결',
    reason: '정당 조치',
    time: '10분 전',
    type: 'report',
    date: '2024-01-25',
  },
  {
    id: '6',
    user: '신고자B',
    action: '신고 접수',
    reason: '스팸 신고',
    time: '25분 전',
    type: 'report',
    date: '2024-01-25',
  },
];

const workProgress = [
  {
    title: '심사 완료',
    completed: 12,
    total: 20,
    percentage: 60,
    remaining: 8,
    color: 'bg-blue-500',
  },
  {
    title: '정산 처리',
    completed: 15,
    total: 23,
    percentage: 65,
    remaining: 8,
    color: 'bg-green-500',
  },
  {
    title: '신고 해결',
    completed: 8,
    total: 11,
    percentage: 73,
    remaining: 3,
    color: 'bg-orange-500',
  },
];

export default function OperationsDashboard() {
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return `₩${amount.toLocaleString()}`;
  };

  const formatCurrencyMillion = (amount: number) => {
    return `₩${(amount / 1000000).toFixed(1)}M`;
  };

  const handleAction = (settlement: Settlement, action: 'review') => {
    setSelectedSettlement(settlement);
    if (action === 'review') setReviewModalOpen(true);
  };

  const getStatusBadge = (status: Settlement['status']) => {
    switch (status) {
      case '지급대기':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            지급대기
          </Badge>
        );
      case '지급완료':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            지급완료
          </Badge>
        );
      case '검토중':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            검토중
          </Badge>
        );
      case '보류':
        return <Badge variant="destructive">보류</Badge>;
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  const getActivityLogsByType = (type: 'project' | 'settlement' | 'report') => {
    return todayActivityLogs.filter(log => log.type === type).slice(0, 2);
  };

  const getActivityIcon = (type: 'project' | 'settlement' | 'report') => {
    switch (type) {
      case 'project':
        return <FileCheck2 className="h-4 w-4 text-blue-600" />;
      case 'settlement':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'report':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
    }
  };

  const getActivityTitle = (type: 'project' | 'settlement' | 'report') => {
    switch (type) {
      case 'project':
        return '프로젝트 심사';
      case 'settlement':
        return '정산 처리';
      case 'report':
        return '신고 처리';
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8 bg-slate-50">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">운영 대시보드</h2>
          <p className="text-gray-600">플랫폼 전체 운영 현황을 한눈에 확인하고 관리합니다.</p>
        </div>
      </div>

      {/* 주요 운영 지표 카드 */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">전체 회원 수</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 mb-1">15,247</div>
            <p className="text-sm text-gray-500">누적 가입 회원</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">활성 사용자</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 mb-1">12,891</div>
            <p className="text-sm text-gray-500">최근 30일 활동</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">신고된 사용자</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 mb-1">23</div>
            <p className="text-sm text-gray-500">처리 대기 중</p>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700">정지된 계정</CardTitle>
            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
              <UserX className="h-5 w-5 text-red-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
            <p className="text-sm text-gray-500">정책 위반 제재</p>
          </CardContent>
        </Card>
      </div>

      {/* 오늘의 업무 진행 현황 */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">오늘의 업무 진행 현황</CardTitle>
              <CardDescription className="text-gray-600">목표 대비 처리 현황 및 남은 업무량</CardDescription>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              업무 시간: 09:00 - 18:00
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {workProgress.map((item, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{item.title}</span>
                  <span className="text-sm text-gray-500">
                    {item.completed}/{item.total}
                  </span>
                </div>
                <Progress value={item.percentage} className="h-2" />
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">{item.percentage}%</span>
                  <span className="text-sm font-medium text-red-600">남은 작업: {item.remaining}건</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 실시간 활동 로그 */}
      <div className="grid gap-6 md:grid-cols-3">
        {(['project', 'settlement', 'report'] as const).map(type => (
          <Card key={type} className="bg-white border-0 shadow-sm">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gray-50 flex items-center justify-center">
                  {getActivityIcon(type)}
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-gray-900">{getActivityTitle(type)}</CardTitle>
                  <CardDescription className="text-xs text-gray-500">실시간 활동 로그</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {getActivityLogsByType(type).map(log => (
                  <div key={log.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">{log.user}</span>
                        <span className="text-xs text-gray-500">{log.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{log.action}</p>
                      {log.amount && <p className="text-sm font-medium text-blue-600">{formatCurrency(log.amount)}</p>}
                      {log.reason && <p className="text-sm text-orange-600">{log.reason}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        {/* 최근 활동 (일일 단위) */}
        <Card className="md:col-span-3 bg-white border-0 shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg font-semibold text-gray-900">오늘의 활동</CardTitle>
                <CardDescription className="text-gray-600">
                  {currentTime.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </CardDescription>
              </div>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {todayActivityLogs.length}건
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {todayActivityLogs.slice(0, 6).map(activity => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                      <AvatarFallback className="text-sm font-medium bg-blue-100 text-blue-700">
                        {activity.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold text-gray-900">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      {activity.amount && (
                        <p className="text-xs font-medium text-blue-600">{formatCurrency(activity.amount)}</p>
                      )}
                      {activity.reason && <p className="text-xs text-orange-600">{activity.reason}</p>}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{activity.time}</div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* 정산 대기 목록 (무한 스크롤) */}
        <Card className="md:col-span-4 bg-white border-0 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-gray-900">정산 대기 목록</CardTitle>
            <CardDescription className="text-gray-600">처리가 필요한 정산 요청</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {settlementData
                  .filter(item => item.status === '지급대기' || item.status === '검토중')
                  .map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                          <AvatarImage src={item.creator.avatar || '/placeholder.svg'} alt={item.creator.name} />
                          <AvatarFallback className="text-sm font-medium bg-green-100 text-green-700">
                            {item.creator.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{item.creator.name}</p>
                          <p className="text-xs text-gray-600">{item.project.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-bold text-blue-600">{formatCurrency(item.settlementAmount)}</p>
                          <div className="mt-1">{getStatusBadge(item.status)}</div>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleAction(item, 'review')}
                          className="h-8 px-3 text-xs font-medium border-gray-300 hover:bg-gray-50"
                        >
                          <FileCheck2 className="mr-1.5 h-3 w-3" />
                          검토
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* 상세 검토 모달 */}
      {selectedSettlement && (
        <Dialog open={isReviewModalOpen} onOpenChange={setReviewModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>정산 상세 검토</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-lg border p-4">
                  <h4 className="font-semibold">정산 정보</h4>
                  <p className="text-sm">창작자: {selectedSettlement.creator.name}</p>
                  <p className="text-sm">프로젝트: {selectedSettlement.project.name}</p>
                  <p className="text-sm">펀딩 금액: {formatCurrency(selectedSettlement.fundingAmount)}</p>
                  <p className="text-sm">수수료: {formatCurrency(selectedSettlement.fee)}</p>
                  <p className="text-sm">정산 금액: {formatCurrency(selectedSettlement.settlementAmount)}</p>
                </div>
                <div className="space-y-2 rounded-lg border p-4">
                  <h4 className="font-semibold">계좌 정보</h4>
                  <p className="text-sm">
                    계좌번호: {selectedSettlement.accountInfo.bank} {selectedSettlement.accountInfo.accountNumber}
                  </p>
                  <p className="text-sm">프로젝트: {selectedSettlement.project.description}</p>
                  <p className="text-sm">현재 상태: {selectedSettlement.status}</p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline">취소</Button>
              </DialogClose>
              <Button
                variant="outline"
                onClick={() => {
                  setReviewModalOpen(false);
                }}
              >
                보류 취소
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setReviewModalOpen(false);
                }}
              >
                보류 처리
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
