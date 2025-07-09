export interface ProjectRow {
  id: number;
  title: string;
  creator: string;
  category: string;
  fundingGoal: string;
  priority: '높음' | '보통' | '낮음';
  completeness: number;
  status: '심사중' | '승인' | '반려';
  createdAt: string;
  description: string;
  riskLevel: '낮음' | '보통' | '높음';
}
