import { LucideIcon } from 'lucide-react';

interface NavigationTab {
  key: 'sales' | 'sponsor';
  label: string;
  icon: LucideIcon;
}

interface NavigationProps {
  activeTab: 'sales' | 'sponsor';
  setActiveTab: (tab: 'sales' | 'sponsor') => void;
  tabs: NavigationTab[];
}
export default function Navigation({ activeTab, setActiveTab, tabs }: NavigationProps) {
  return (
    <div className="bg-white rounded-xl p-1 shadow-sm border border-gray-100 inline-flex">
      {tabs.map(tab => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              isActive
                ? tab.key === 'sales'
                  ? 'bg-blue-500 text-white'
                  : 'bg-pink-500 text-white'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4" />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
