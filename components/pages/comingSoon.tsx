'use client';

import { Clock, ArrowLeft } from 'lucide-react';

interface ComingSoonProps {
  title?: string;
  description?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function ComingSoon({
  title = '서비스 준비중입니다',
  description = '더 나은 서비스를 위해 열심히 준비하고 있습니다. 곧 만나뵐 수 있도록 하겠습니다.',
  showBackButton = true,
  onBack,
}: ComingSoonProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-[#1E9EFF]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">{description}</p>
        {showBackButton && (
          <button
            onClick={handleBack}
            className="inline-flex items-center px-6 py-3 bg-[#1E9EFF] hover:bg-[#1f8ce6] text-white font-medium rounded-lg transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전으로 돌아가기
          </button>
        )}
      </div>
    </div>
  );
}
