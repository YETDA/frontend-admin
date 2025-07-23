'use client';

import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Clock, CheckCircle, AlertTriangle, Search, Heart, ShoppingCart, Check, X } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ProjectReport = {
  project: {
    name: string;
    type: 'funding' | 'sales';
    description: string;
    registrationDate: string;
    isDeleted?: boolean;
  };
  reportReason: string;
  reportDate: string;
  reportCount: number;
  status: '승인됨' | '취소됨' | '미처리';
};

const reportData: ProjectReport[] = [
  {
    project: {
      name: '스마트 워치 개발',
      type: 'funding',
      description: '혁신적인 스마트워치 프로젝트',
      registrationDate: '2024-01-10',
    },
    reportReason: '허위 광고',
    reportDate: '2024-01-20 14:30',
    reportCount: 2,
    status: '미처리',
  },
  {
    project: {
      name: '독립 게임 스튜디오 신작',
      type: 'sales',
      description: '인디 게임 개발 프로젝트',
      registrationDate: '2024-01-05',
      isDeleted: true,
    },
    reportReason: '저작권 침해',
    reportDate: '2024-01-18 09:15',
    reportCount: 1,
    status: '승인됨',
  },
  {
    project: {
      name: '업사이클링 패션',
      type: 'funding',
      description: '지속 가능한 패션 프로젝트',
      registrationDate: '2024-01-12',
    },
    reportReason: '부적절한 내용',
    reportDate: '2024-01-22 16:45',
    reportCount: 1,
    status: '취소됨',
  },
  {
    project: {
      name: '디지털 아트 전시회',
      type: 'sales',
      description: '혁신적인 디지털 아트 전시회',
      registrationDate: '2023-12-15',
    },
    reportReason: '사기 의혹',
    reportDate: '2024-01-19 11:20',
    reportCount: 3,
    status: '미처리',
  },
  {
    project: {
      name: '오픈소스 라이브러리',
      type: 'funding',
      description: '개발자를 위한 오픈소스 프로젝트',
      registrationDate: '2023-11-01',
    },
    reportReason: '스팸',
    reportDate: '2024-01-21 13:10',
    reportCount: 1,
    status: '취소됨',
  },
];

const monthlyChartData = [
  { month: '8월', total: 15 },
  { month: '9월', total: 23 },
  { month: '10월', total: 18 },
  { month: '11월', total: 31 },
  { month: '12월', total: 28 },
  { month: '1월', total: 42 },
];

export default function ProjectReportsDashboard() {
  const [selectedReport, setSelectedReport] = useState<ProjectReport | null>(null);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);

  const handleAction = (report: ProjectReport, action: 'approve' | 'reject') => {
    setSelectedReport(report);
    setReviewModalOpen(true);
  };

  const getStatusBadge = (status: ProjectReport['status']) => {
    switch (status) {
      case '미처리':
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            미처리
          </Badge>
        );
      case '승인됨':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            승인됨
          </Badge>
        );
      case '취소됨':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            취소됨
          </Badge>
        );
      default:
        return <Badge variant="secondary">알 수 없음</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 bg-gray-50/50">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">프로젝트 신고 관리</h2>
          <p className="text-muted-foreground">신고된 프로젝트를 검토하고 처리합니다.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">이번 달 신고 접수</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42건</div>
            <p className="text-xs text-muted-foreground">총 신고 접수 건수</p>
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
            <div className="text-2xl font-bold">12건</div>
            <p className="text-xs text-muted-foreground">처리 대기 중인 신고</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">처리 완료</CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30건</div>
            <p className="text-xs text-muted-foreground">이번 달 처리 완료</p>
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
        </div>

        <TabsContent value="funding">
          <Card>
            <CardHeader>
              <CardTitle>후원 프로젝트 신고 현황</CardTitle>
              <CardDescription>신고 접수일 순으로 정렬</CardDescription>
              <div className="flex items-center justify-between gap-4 pt-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="프로젝트명, 신고 사유로 검색..." className="pl-8 h-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-[140px] h-10">
                    <SelectValue placeholder="신고 상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="PENDING">심사중</SelectItem>
                    <SelectItem value="APPROVED">승인</SelectItem>
                    <SelectItem value="REJECTED">반려</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">프로젝트명</TableHead>
                      <TableHead className="text-center">등록일</TableHead>
                      <TableHead className="text-center">신고 사유</TableHead>
                      <TableHead className="text-center">신고 일시</TableHead>
                      <TableHead className="text-center">신고 건수</TableHead>
                      <TableHead className="text-center">처리 상태</TableHead>
                      <TableHead className="text-center min-w-[200px]">처리 작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData
                      .filter(item => item.project.type === 'funding')
                      .map((item, index) => (
                        <TableRow key={index} className={item.project.isDeleted ? 'opacity-50 bg-gray-50' : ''}>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <div className={`cursor-help ${item.project.isDeleted ? 'line-through' : ''}`}>
                                  {item.project.name}
                                  {item.project.isDeleted && (
                                    <span className="ml-2 text-xs text-red-500">(삭제됨)</span>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.project.description}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell className="text-center">{item.project.registrationDate}</TableCell>
                          <TableCell className="text-center">{item.reportReason}</TableCell>
                          <TableCell className="text-center">{item.reportDate}</TableCell>
                          <TableCell className="text-center flex justify-center">
                            <Badge variant={item.reportCount >= 3 ? 'destructive' : 'secondary'}>
                              {item.reportCount}건
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">{getStatusBadge(item.status)}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            {item.status === '미처리' ? (
                              <div className="flex gap-2 justify-center items-center">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleAction(item, 'approve')}
                                  className="min-w-[90px] h-8 px-3 text-xs"
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  신고 승인
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAction(item, 'reject')}
                                  className="min-w-[90px] h-8 px-3 text-xs"
                                >
                                  <X className="mr-1 h-3 w-3" />
                                  신고 취소
                                </Button>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center h-8">
                                <span className="text-sm text-muted-foreground">처리 완료</span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TooltipProvider>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>판매 프로젝트 신고 현황</CardTitle>
              <CardDescription>신고 접수일 순으로 정렬</CardDescription>
              <div className="flex items-center justify-between gap-4 pt-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="프로젝트명, 신고 사유로 검색..." className="pl-8 h-10" />
                </div>
                <Select>
                  <SelectTrigger className="w-[140px] h-10">
                    <SelectValue placeholder="신고 상태" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체</SelectItem>
                    <SelectItem value="pending">미처리</SelectItem>
                    <SelectItem value="approved">승인됨</SelectItem>
                    <SelectItem value="rejected">취소됨</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <TooltipProvider>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-left">프로젝트명</TableHead>
                      <TableHead className="text-center">등록일</TableHead>
                      <TableHead className="text-center">신고 사유</TableHead>
                      <TableHead className="text-center">신고 일시</TableHead>
                      <TableHead className="text-center">신고 건수</TableHead>
                      <TableHead className="text-center">처리 상태</TableHead>
                      <TableHead className="text-center min-w-[200px]">처리 작업</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData
                      .filter(item => item.project.type === 'sales')
                      .map((item, index) => (
                        <TableRow key={index} className={item.project.isDeleted ? 'opacity-50 bg-gray-50' : ''}>
                          <TableCell>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <div className={`cursor-help ${item.project.isDeleted ? 'line-through' : ''}`}>
                                  {item.project.name}
                                  {item.project.isDeleted && (
                                    <span className="ml-2 text-xs text-red-500">(삭제됨)</span>
                                  )}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{item.project.description}</p>
                              </TooltipContent>
                            </UITooltip>
                          </TableCell>
                          <TableCell className="text-center">{item.project.registrationDate}</TableCell>
                          <TableCell className="text-center">{item.reportReason}</TableCell>
                          <TableCell className="text-center">{item.reportDate}</TableCell>
                          <TableCell className="text-center flex justify-center">
                            <Badge variant={item.reportCount >= 3 ? 'destructive' : 'secondary'}>
                              {item.reportCount}건
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex justify-center">{getStatusBadge(item.status)}</div>
                          </TableCell>
                          <TableCell className="text-center">
                            {item.status === '미처리' ? (
                              <div className="flex gap-2 justify-center items-center">
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleAction(item, 'approve')}
                                  className="min-w-[90px] h-8 px-3 text-xs"
                                >
                                  <Check className="mr-1 h-3 w-3" />
                                  신고 승인
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleAction(item, 'reject')}
                                  className="min-w-[90px] h-8 px-3 text-xs"
                                >
                                  <X className="mr-1 h-3 w-3" />
                                  신고 취소
                                </Button>
                              </div>
                            ) : (
                              <div className="flex justify-center items-center h-8">
                                <span className="text-sm text-muted-foreground">처리 완료</span>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TooltipProvider>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>월별 신고 추이</CardTitle>
            <CardDescription>최근 6개월 신고 접수 현황</CardDescription>
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
                  tickFormatter={value => `${value}건`}
                />
                <Tooltip formatter={(value: number) => [`${value}건`, '신고 건수']} />
                <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      {selectedReport && (
        <Dialog open={isReviewModalOpen} onOpenChange={setReviewModalOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>신고 처리</DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 rounded-lg border p-4">
                  <h4 className="font-semibold">프로젝트 정보</h4>
                  <p className="text-sm">프로젝트명: {selectedReport.project.name}</p>
                  <p className="text-sm">등록일: {selectedReport.project.registrationDate}</p>
                  <p className="text-sm">설명: {selectedReport.project.description}</p>
                  <p className="text-sm">타입: {selectedReport.project.type === 'funding' ? '후원' : '판매'}</p>
                </div>
                <div className="space-y-2 rounded-lg border p-4">
                  <h4 className="font-semibold">신고 정보</h4>
                  <p className="text-sm">신고 사유: {selectedReport.reportReason}</p>
                  <p className="text-sm">신고 일시: {selectedReport.reportDate}</p>
                  <p className="text-sm">누적 신고: {selectedReport.reportCount}건</p>
                  <p className="text-sm">현재 상태: {selectedReport.status}</p>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">처리 안내</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• 신고 승인 시 해당 프로젝트가 즉시 삭제됩니다.</p>
                  <p>• 신고 3회 누적 시 프로젝트 소유자가 자동 정지됩니다.</p>
                  <p>• 신고 취소 시 해당 신고가 무효 처리됩니다.</p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-end gap-3">
              <DialogClose asChild>
                <Button variant="outline" className="min-w-[80px] h-10 bg-transparent">
                  취소
                </Button>
              </DialogClose>
              <Button
                variant="outline"
                onClick={() => {
                  setReviewModalOpen(false);
                  // 신고 취소 로직
                }}
                className="min-w-[90px] h-10"
              >
                신고 취소
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  setReviewModalOpen(false);
                  // 신고 승인 로직
                }}
                className="min-w-[90px] h-10"
              >
                신고 승인
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
