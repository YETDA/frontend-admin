'use client';

import { AlertTriangle, RefreshCw, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const [errorId] = useState(() => Date.now().toString(36));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // 오류를 콘솔에 로깅
    console.error('Global Error:', {
      message: error.message,
      digest: error.digest,
      errorId,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });
  }, [error, errorId]);

  const copyErrorInfo = async () => {
    const errorInfo = `오류 ID: ${errorId}\n메시지: ${error.message}\n시간: ${new Date().toLocaleString()}${
      error.digest ? `\nDigest: ${error.digest}` : ''
    }`;

    try {
      await navigator.clipboard.writeText(errorInfo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" aria-hidden="true" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">오류가 발생했습니다</h1>
              <p className="text-gray-600">
                예상치 못한 오류가 발생했습니다.
                <br />
                잠시 후 다시 시도해 주세요.
              </p>

              {/* 오류 ID 표시 */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">오류 ID: {errorId}</span>
                  <button
                    onClick={copyErrorInfo}
                    className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    aria-label="오류 정보 복사"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? '복사됨' : '복사'}
                  </button>
                </div>
              </div>

              {/* 개발 환경에서만 오류 메시지 표시 */}
              {process.env.NODE_ENV === 'development' && (
                <details className="mt-4 text-left">
                  <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                    개발자 정보 보기
                  </summary>
                  <div className="mt-2 p-3 bg-red-50 rounded text-xs text-red-700 overflow-auto max-h-32">
                    <p>
                      <strong>메시지:</strong> {error.message}
                    </p>
                    {error.digest && (
                      <p>
                        <strong>Digest:</strong> {error.digest}
                      </p>
                    )}
                    {error.stack && (
                      <div className="mt-2">
                        <strong>스택:</strong>
                        <pre className="whitespace-pre-wrap text-xs">{error.stack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>

            <button
              onClick={reset}
              onKeyDown={e => e.key === 'Enter' && reset()}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              aria-label="페이지 다시 시도"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              다시 시도
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                문제가 지속되면 오류 ID와 함께{' '}
                <a
                  href="mailto:support@yetda.com?subject=오류 신고&body=오류 ID: ${errorId}"
                  className="text-blue-500 hover:text-blue-600 underline"
                >
                  고객센터
                </a>
                로 문의해 주세요.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
