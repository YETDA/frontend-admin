'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { adminSidebarMenu } from '@/dummy/sidebarMenu';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange?: (section: string) => void;
}

export function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const router = useRouter();

  // 클릭 시 /admin/{id} 경로로 이동
  const handleNavigation = (id: string, disabled?: boolean) => {
    if (disabled) return;
    onSectionChange?.(id);
    router.push(`/${id}`);
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-[calc(100vh-73px)] overflow-y-auto">
      <div className="p-6">
        {adminSidebarMenu.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">{section.title}</h3>
            <div className="space-y-2">
              {section.items.map(item => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? 'default' : 'ghost'}
                  className={`w-full justify-start h-auto p-4 relative ${
                    activeSection === item.id
                      ? 'bg-[#1E9EFF] hover:bg-[#1f8ce6] text-white shadow-lg'
                      : item.disabled
                      ? 'text-gray-400 cursor-not-allowed hover:bg-transparent group'
                      : 'hover:bg-gray-50 text-gray-700 hover:text-[#1E9EFF]'
                  }`}
                  onClick={() => !item.disabled && handleNavigation(item.id, item.disabled)}
                  disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : 0}
                  style={
                    item.disabled
                      ? {
                          pointerEvents: 'auto',
                          cursor: 'not-allowed',
                        }
                      : {}
                  }
                >
                  <div className="flex items-center gap-3 w-full">
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{item.label}</span>
                        {'badge' in item && item.badge && !item.disabled && (
                          <Badge
                            className={`ml-2 ${
                              activeSection === item.id ? 'bg-white/20 text-white' : 'bg-[#1E9EFF] text-white'
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                        {item.disabled && (
                          <span className="ml-2 px-2 py-1 text-xs bg-gray-200 text-gray-500 rounded-full">준비중</span>
                        )}
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          activeSection === item.id
                            ? 'text-white/80'
                            : item.disabled
                            ? 'text-gray-400'
                            : 'text-gray-500'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
