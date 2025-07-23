'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Clock,
  DollarSign,
  CheckCircle,
  Search,
  Download,
  FileCheck2,
  Heart,
  ShoppingCart,
  CalendarIcon,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  achievementRate?: number; // 후원 프로젝트용
  salesCount?: number; // 판매 프로젝트용
  status: '지급대기' | '지급완료' | '검토중' | '보류';
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
];

const monthlyChartData = [
  { month: '8월', total: 230 },
  { month: '9월', total: 340 },
  { month: '10월', total: 450 },
  { month: '11월', total: 320 },
  { month: '12월', total: 580 },
  { month: '1월', total: 847 },
];

export default function SettlementDashboard() {
  const [selectedSettlement, setSelectedSettlement] = useState<Settlement | null>(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [isApproveModalOpen, setApproveModalOpen] = useState(false);
  const [isHoldModalOpen, setHoldModalOpen] = useState(false);

  const formatCurrency = (amount: number) => {
    return `₩${amount.toLocaleString()}`;
  };

  const formatCurrencyMillion = (amount: number) => {
    return `₩${amount.toLocaleString()}M`;
  };

  const handleAction = (settlement: Settlement, action: 'review' | 'approve' | 'hold' | 'unhold') => {
    setSelectedSettlement(settlement);
    if (action === 'review') setReviewModalOpen(true);
    if (action === 'approve') setApproveModalOpen(true);
    if (action === 'hold') setHoldModalOpen(true);
    if (action === 'unhold') {
      // 보류 해제 로직 (예: 상태 업데이트)
      setSelectedSettlement({ ...settlement, status: '검토중' });
    }
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

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 bg-gray-50/50">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">정산 처리 센터</h2>
          <p className="text-muted-foreground">창작자 정산 요청을 체계적으로 검토하고 관리합니다.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 정산 요청</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrencyMillion(847)}</div>
            <p className="text-xs text-muted-foreground">총 정산 요청 금액</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">처리 대기 건수</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8건</div>
            <p className="text-xs text-muted-foreground">승인 대기 중인 정산</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료된 정산</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156건</div>
            <p className="text-xs text-muted-foreground">이번 달 처리 완료된 정산 수</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="funding" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger
              value="sales"
              className="flex items-center gap-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <ShoppingCart className="h-4 w-4" />
              판매 프로젝트
            </TabsTrigger>
            <TabsTrigger
              value="funding"
              className="flex items-center gap-2 data-[state=active]:bg-pink-500 data-[state=active]:text-white"
            >
              <Heart className="h-4 w-4" />
              후원 프로젝트
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-[280px] justify-start text-left font-normal bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  정산 기간 선택
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar initialFocus mode="range" defaultMonth={new Date()} numberOfMonths={2} />
              </PopoverContent>
            </Popover>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              내역 다운로드
            </Button>
          </div>
        </div>

        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>후원 프로젝트 정산 요청 현황</CardTitle>
              <CardDescription>우선순위 및 요청일 순으로 정렬</CardDescription>
              <div className="flex items-center space-x-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="창작자명, 프로젝트명, 계좌번호로 검색..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="처리 상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">지급대기</SelectItem>
                    <SelectItem value="completed">지급완료</SelectItem>
                    <SelectItem value="review">검토중</SelectItem>
                    <SelectItem value="hold">보류</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>창작자 정보</TableHead>
                    <TableHead>프로젝트</TableHead>
                    <TableHead className="text-right">총 금액</TableHead>
                    <TableHead className="text-right">수수료</TableHead>
                    <TableHead className="text-right">정산 금액</TableHead>
                    <TableHead>계좌 정보</TableHead>
                    <TableHead className="text-center">달성률</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-center">처리 작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settlementData
                    .filter(item => item.project.type === 'funding')
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={item.creator.avatar || '/placeholder.svg'} alt={item.creator.name} />
                              <AvatarFallback>{item.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.creator.name}</div>
                              <div className="text-sm text-muted-foreground">{item.creator.joinDate}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.project.name}</div>
                          <div className="text-sm text-muted-foreground">{item.project.description}</div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(item.fundingAmount)}</TableCell>
                        <TableCell className="text-right text-red-500">{formatCurrency(item.fee)}</TableCell>
                        <TableCell className="text-right font-semibold text-blue-600">
                          {formatCurrency(item.settlementAmount)}
                        </TableCell>
                        <TableCell>
                          <div>
                            {item.accountInfo.bank} {item.accountInfo.accountNumber}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.achievementRate ? `${item.achievementRate}%` : '-'}
                        </TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" variant="ghost" onClick={() => handleAction(item, 'review')}>
                            <FileCheck2 className="mr-1 h-3 w-3" />
                            상세 검토
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>판매 프로젝트 정산 요청 현황</CardTitle>
              <CardDescription>우선순위 및 요청일 순으로 정렬</CardDescription>
              <div className="flex items-center space-x-2 pt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="창작자명, 프로젝트명, 계좌번호로 검색..." className="pl-8" />
                </div>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="처리 상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">지급대기</SelectItem>
                    <SelectItem value="completed">지급완료</SelectItem>
                    <SelectItem value="review">검토중</SelectItem>
                    <SelectItem value="hold">보류</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>창작자 정보</TableHead>
                    <TableHead>프로젝트</TableHead>
                    <TableHead className="text-right">총 금액</TableHead>
                    <TableHead className="text-right">수수료</TableHead>
                    <TableHead className="text-right">정산 금액</TableHead>
                    <TableHead>계좌 정보</TableHead>
                    <TableHead className="text-center">판매 건수</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-center">처리 작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {settlementData
                    .filter(item => item.project.type === 'sales')
                    .map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={item.creator.avatar || '/placeholder.svg'} alt={item.creator.name} />
                              <AvatarFallback>{item.creator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{item.creator.name}</div>
                              <div className="text-sm text-muted-foreground">{item.creator.joinDate}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>{item.project.name}</div>
                          <div className="text-sm text-muted-foreground">{item.project.description}</div>
                        </TableCell>
                        <TableCell className="text-right">{formatCurrency(item.fundingAmount)}</TableCell>
                        <TableCell className="text-right text-red-500">{formatCurrency(item.fee)}</TableCell>
                        <TableCell className="text-right font-semibold text-blue-600">
                          {formatCurrency(item.settlementAmount)}
                        </TableCell>
                        <TableCell>
                          <div>
                            {item.accountInfo.bank} {item.accountInfo.accountNumber}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">{item.salesCount ? `${item.salesCount}건` : '-'}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell className="text-center">
                          <Button size="sm" variant="ghost" onClick={() => handleAction(item, 'review')}>
                            <FileCheck2 className="mr-1 h-3 w-3" />
                            상세 검토
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>월별 정산 추이</CardTitle>
            <CardDescription>최근 6개월 정산 현황</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={monthlyChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={value => `₩${value}M`}
                />
                <Tooltip formatter={(value: number) => [formatCurrencyMillion(value), '정산액']} />
                <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedSettlement && (
        <>
          {/* 상세 검토 모달 */}
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
                    <p className="text-sm font-bold">
                      정산 금액: {formatCurrency(selectedSettlement.settlementAmount)}
                    </p>
                  </div>
                  <div className="space-y-2 rounded-lg border p-4">
                    <h4 className="font-semibold">계좌 정보</h4>
                    <p className="text-sm">
                      계좌번호: {selectedSettlement.accountInfo.bank} {selectedSettlement.accountInfo.accountNumber}
                    </p>
                    <p className="text-sm">요금제: {selectedSettlement.project.description}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">검토 체크리스트</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check1" />
                      <Label htmlFor="check1">창작자 신원 확인</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check2" />
                      <Label htmlFor="check2">계좌 정보 검증</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check3" />
                      <Label htmlFor="check3">프로젝트 완료 상태 확인</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check4" />
                      <Label htmlFor="check4">리워드 발송 완료 확인</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="check5" />
                      <Label htmlFor="check5">후원자 만족도 확인</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">취소</Button>
                </DialogClose>
                <Button
                  variant="outline"
                  onClick={() => {
                    setReviewModalOpen(false);
                    // 보류 취소 로직
                  }}
                >
                  보류 취소
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setReviewModalOpen(false);
                    handleAction(selectedSettlement!, 'hold');
                  }}
                >
                  보류 처리
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 승인 모달 */}
          <Dialog open={isApproveModalOpen} onOpenChange={setApproveModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>정산 승인 처리</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="rounded-md border bg-blue-50 p-4">
                  <h4 className="font-semibold mb-2">정산 정보</h4>
                  <p className="text-sm">창작자: {selectedSettlement.creator.name}</p>
                  <p className="text-sm">프로젝트: {selectedSettlement.project.name}</p>
                  <p className="text-sm font-bold">정산 금액: {formatCurrency(selectedSettlement.settlementAmount)}</p>
                  <p className="text-sm">
                    계좌: {selectedSettlement.accountInfo.bank} {selectedSettlement.accountInfo.accountNumber}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="approval-memo">승인 메모</Label>
                </div>
                <div className="rounded-md border bg-yellow-50 p-3 text-sm text-yellow-800">
                  승인 후 즉시 지급 처리됩니다.
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">취소</Button>
                </DialogClose>
                <Button onClick={() => setApproveModalOpen(false)}>승인 완료</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* 보류 모달 */}
          <Dialog open={isHoldModalOpen} onOpenChange={setHoldModalOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>정산 보류 처리</DialogTitle>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="rounded-md border bg-orange-50 p-4">
                  <h4 className="font-semibold mb-2">보류 대상</h4>
                  <p className="text-sm">창작자: {selectedSettlement.creator.name}</p>
                  <p className="text-sm font-bold">정산 금액: {formatCurrency(selectedSettlement.settlementAmount)}</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hold-reason-select">보류 사유</Label>
                  <Select>
                    <SelectTrigger id="hold-reason-select">
                      <SelectValue placeholder="보류 사유를 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="info-mismatch">계좌 정보 불일치</SelectItem>
                      <SelectItem value="project-issue">프로젝트 이슈</SelectItem>
                      <SelectItem value="legal-issue">법적 문제</SelectItem>
                      <SelectItem value="etc">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hold-reason-detail">상세 사유</Label>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">취소</Button>
                </DialogClose>
                <Button variant="destructive" onClick={() => setHoldModalOpen(false)}>
                  보류 처리
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}
