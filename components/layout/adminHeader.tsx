"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Logo & Service Name */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CF</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">크라우드펀딩 운영센터</h1>
              <p className="text-xs text-gray-500">Crowdfunding Operations Center</p>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="프로젝트, 사용자 검색..."
              className="pl-10 w-80 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-[#1E9EFF] text-xs">
                3
              </Badge>
            </Button>

            <Button variant="ghost" size="sm">
              <Settings className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-3 ml-4 pl-4 border-l border-gray-200">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-[#1E9EFF] text-white text-sm">관리</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium text-gray-900">김운영</p>
                <p className="text-xs text-gray-500">슈퍼 관리자</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
