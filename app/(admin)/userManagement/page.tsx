'use client';

import { useState } from 'react';
import { Search, Users, UserCheck, AlertTriangle, UserX, Eye, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Member {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  lastActive: string;
  projectCount: number;
  status: '활성' | '정지' | '신고중';
  approvalStatus: '승인' | '대기' | '이용정지';
  avatar: string;
  avatarColor: string;
}

const members: Member[] = [
  {
    id: '1',
    name: '김창직',
    email: 'creator@example.com',
    joinDate: '2024-01-10',
    lastActive: '2시간 전',
    projectCount: 0,
    status: '활성',
    approvalStatus: '승인',
    avatar: '김',
    avatarColor: 'bg-blue-500',
  },
  {
    id: '2',
    name: '이후원',
    email: 'supporter@example.com',
    joinDate: '2024-01-08',
    lastActive: '1일 전',
    projectCount: 0,
    status: '활성',
    approvalStatus: '승인',
    avatar: '이',
    avatarColor: 'bg-blue-500',
  },
  {
    id: '3',
    name: '박신고',
    email: 'reported@example.com',
    joinDate: '2024-01-05',
    lastActive: '3일 전',
    projectCount: 1,
    status: '신고중',
    approvalStatus: '대기',
    avatar: '박',
    avatarColor: 'bg-blue-500',
  },
  {
    id: '4',
    name: '최정지',
    email: 'suspended@example.com',
    joinDate: '2023-12-20',
    lastActive: '1주일 전',
    projectCount: 0,
    status: '정지',
    approvalStatus: '이용정지',
    avatar: '최',
    avatarColor: 'bg-blue-500',
  },
];

export default function MemberManagementCenter() {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case '활성':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">활성</Badge>;
      case '정지':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">정지</Badge>;
      case '신고중':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">신고중</Badge>;
      case '승인':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">승인</Badge>;
      case '대기':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">대기</Badge>;
      case '이용정지':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">이용정지</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">회원 관리 센터</h1>
          <p className="text-gray-600">플랫폼 사용자의 계정 상태를 관리하고 안전한 서비스 환경을 유지합니다</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">15,247</p>
                <p className="text-sm font-medium text-gray-900">전체 회원 수</p>
                <p className="text-xs text-gray-500">누적 가입 회원</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">12,891</p>
                <p className="text-sm font-medium text-gray-900">활성 사용자</p>
                <p className="text-xs text-gray-500">최근 30일 활동</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">23</p>
                <p className="text-sm font-medium text-gray-900">신고된 사용자</p>
                <p className="text-xs text-gray-500">처리 대기 중</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 rounded-lg">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm font-medium text-gray-900">정지된 계정</p>
                <p className="text-xs text-gray-500">정책 위반 제재</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="닉네임, 이메일, 프로젝트명으로 검색..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select defaultValue="계정 상태">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="계정 상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="active">활성</SelectItem>
                <SelectItem value="suspended">정지</SelectItem>
                <SelectItem value="reported">신고중</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Member List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">회원 목록</h2>
              <p className="text-sm text-gray-500">가입일 및 활동 순으로 정렬</p>
            </div>
            <div className="flex gap-4 mt-2">
              <span className="text-sm text-orange-600 font-medium">233건 신고중</span>
              <span className="text-sm text-red-600 font-medium">156건 이용정지</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    회원 정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    이메일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    활동 현황
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    위험도
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    계정 상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    관리 작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map(member => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className={`${member.avatarColor} text-white font-medium`}>
                            {member.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">가입: {member.joinDate}</div>
                          <div className="text-sm text-gray-500">최근: {member.lastActive}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">프로젝트 {member.projectCount}개</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(member.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(member.approvalStatus)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedMember(member)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Member Detail Modal */}
        <Dialog open={!!selectedMember} onOpenChange={() => setSelectedMember(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle>회원 상세 정보</DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedMember(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            {selectedMember && (
              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">기본 정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">닉네임:</span>
                      <span className="text-gray-900">{selectedMember.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">이메일:</span>
                      <span className="text-gray-900">{selectedMember.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">회원 유형:</span>
                      <span className="text-gray-900">창작자</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">가입일:</span>
                      <span className="text-gray-900">{selectedMember.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">최근 활동:</span>
                      <span className="text-gray-900">{selectedMember.lastActive}</span>
                    </div>
                  </div>
                </div>

                {/* Activity Status */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">활동 현황</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">프로젝트 수:</span>
                      <span className="text-gray-900">{selectedMember.projectCount}개</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">총 펀딩액:</span>
                      <span className="text-gray-900">₩120,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">계정 상태:</span>
                      <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">신고중</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">위험도:</span>
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-100">높음</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">인증 상태:</span>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">검토중</Badge>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">최근 활동 이력</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">프로젝트 등록</p>
                        <p className="text-xs text-gray-500">스마트 워치 개발 프로젝트</p>
                        <p className="text-xs text-gray-400 mt-1">2024-01-15</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">후원 참여</p>
                        <p className="text-xs text-gray-500">친환경 텀블러 프로젝트</p>
                        <p className="text-xs text-gray-400 mt-1">2024-01-10</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
