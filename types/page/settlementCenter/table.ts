export interface SettlementRow {
  id: number;
  creator: string;
  requestDate: string;
  project: string;
  pricingPlan: string;
  amount: string;
  fee: string;
  netAmount: string;
  bankAccount: string;
  riskLevel: '낮음' | '보통' | '높음';
  status: '지급대기' | '검토중' | '지급완료' | '보류';
}
