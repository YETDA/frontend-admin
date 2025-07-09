'use client';

import { SettlementRow } from '@/types/page/settlementCenter/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, AlertTriangle, CreditCard, Download } from 'lucide-react';

interface SettlementRowActionsProps {
  settlement: SettlementRow;
}

export default function SettlementRowActions({ settlement }: SettlementRowActionsProps) {
  if (settlement.status === '지급대기') {
    return (
      <div className="flex gap-2">
        {/* 승인 버튼 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#1E9EFF] hover:bg-[#1f8ce6] gap-1">
              <CheckCircle className="w-4 h-4" />
              승인
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>정산 승인 처리</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">정산 정보</h3>
                <div className="space-y-1 text-sm text-blue-800">
                  <p>창작자: {settlement.creator}</p>
                  <p>프로젝트: {settlement.project}</p>
                  <p>
                    정산 금액: <span className="font-bold">{settlement.netAmount}</span>
                  </p>
                  <p>계좌: {settlement.bankAccount}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">승인 메모</label>
                <Textarea placeholder="승인 사유를 입력하세요..." className="min-h-20" />
              </div>

              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm text-yellow-800">승인 후 즉시 지급 처리됩니다.</p>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">취소</Button>
                <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6]">승인 완료</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* 보류 버튼 */}
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="gap-1 bg-transparent">
              <AlertTriangle className="w-4 h-4" />
              보류
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>정산 보류 처리</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg">
                <h3 className="font-medium text-orange-900 mb-2">보류 대상</h3>
                <div className="space-y-1 text-sm text-orange-800">
                  <p>창작자: {settlement.creator}</p>
                  <p>정산 금액: {settlement.netAmount}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">보류 사유</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="보류 사유를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="document">서류 미비</SelectItem>
                    <SelectItem value="verification">신원 확인 필요</SelectItem>
                    <SelectItem value="investigation">추가 조사 필요</SelectItem>
                    <SelectItem value="other">기타</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">상세 사유</label>
                <Textarea placeholder="보류 사유를 상세히 입력하세요..." className="min-h-20" />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline">취소</Button>
                <Button variant="destructive">보류 처리</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (settlement.status === '검토중') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="outline" className="gap-1 bg-transparent">
            <CreditCard className="w-4 h-4" />
            상세 검토
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>정산 상세 검토</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">정산 정보</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">창작자:</span> {settlement.creator}
                  </p>
                  <p>
                    <span className="font-medium">프로젝트:</span> {settlement.project}
                  </p>
                  <p>
                    <span className="font-medium">펀딩 금액:</span> {settlement.amount}
                  </p>
                  <p>
                    <span className="font-medium">수수료:</span> {settlement.fee}
                  </p>
                  <p>
                    <span className="font-medium">정산 금액:</span>{' '}
                    <span className="font-bold text-[#1E9EFF]">{settlement.netAmount}</span>
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">계좌 정보</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">계좌번호:</span> {settlement.bankAccount}
                  </p>
                  <p>
                    <span className="font-medium">요금제:</span> {settlement.pricingPlan}
                  </p>
                  <p>
                    <span className="font-medium">위험도:</span>{' '}
                    <Badge className="bg-green-100 text-green-700 ml-2">{settlement.riskLevel}</Badge>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-3">검토 체크리스트</h3>
              <div className="space-y-2">
                {[
                  '창작자 신원 확인',
                  '계좌 정보 검증',
                  '프로젝트 완료 상태 확인',
                  '리워드 발송 완료 확인',
                  '후원자 만족도 확인',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <input type="checkbox" className="w-4 h-4" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">검토 의견</label>
              <Textarea placeholder="상세 검토 의견을 입력하세요..." className="min-h-24" />
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline">추가 조사</Button>
              <Button variant="destructive">보류</Button>
              <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6]">승인</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (settlement.status === '지급완료') {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="ghost" className="gap-1">
            <Download className="w-4 h-4" />
            영수증
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>정산 영수증</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-6 bg-gray-50 rounded-lg">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-gray-900">정산 완료 영수증</h3>
                <p className="text-sm text-gray-600">Settlement Receipt</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">창작자:</span>
                  <span className="font-medium">{settlement.creator}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">프로젝트:</span>
                  <span className="font-medium">{settlement.project}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">펀딩 금액:</span>
                  <span>{settlement.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">수수료:</span>
                  <span className="text-red-600">{settlement.fee}</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>정산 금액:</span>
                  <span className="text-[#1E9EFF]">{settlement.netAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">지급 계좌:</span>
                  <span>{settlement.bankAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">처리일:</span>
                  <span>{settlement.requestDate}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <Button variant="outline">PDF 다운로드</Button>
              <Button className="bg-[#1E9EFF] hover:bg-[#1f8ce6]">이메일 발송</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
}
