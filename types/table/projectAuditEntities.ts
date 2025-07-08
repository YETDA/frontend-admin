// ========== 판매 ==========

export type Purchase = {
  id: number;
  projectId: number; // 🔗 [PROJECT.id]
  categoryId: number; // 🔗 [PurchaseCategory.id]
  gitAddress: string;
  providingMethod?: string | null;
  averageDeliveryTime?: string | null;
  file?: string | null;
  createdAt?: Date | null;
  modifiedAt?: Date | null;
  // 🔗 참조받음: [PurchaseOption.purchaseId], [Review.purchaseId]
};

export type PurchaseOption = {
  id: number;
  purchaseId: number; // 🔗 [Purchase.id]
  id2: number; // 🔗 [Purchase.categoryId]
  title: string;
  rewardStatus: string;
  content: string;
  price: number;
  createdAt: Date;
  modifiedAt: Date;
};

export type PurchaseCategory = {
  id: number;
  name: string;
  createdAt: Date;
  modifiedAt: Date;
  type?: string | null;
  // 🔗 참조받음: [Purchase.categoryId]
};

// ========== 가격정책 ==========

export type PricingPlan = {
  id: number;
  name: string;
  platformFee: number;
  paymentFee: number;
  createdAt: Date;
  modifiedAt: Date;
  // 🔗 참조받음: [Project.pricingPlanId]
};

// ========== 사용자 관리 ==========

export type User = {
  id: number;
  roleId: number; // 🔗 [ROLE.id]
  name: string;
  email: string;
  phoneNumber: string;
  image: string;
  createdAt: Date;
  modifiedAt: Date;
  // 🔗 참조받음: [Project.userId], [Review.userId]
};

// ========== 프로젝트 관리 (연결용) ==========

export type Project = {
  id: number;
  userId: number; // 🔗 [User.id]
  pricingPlanId: number; // 🔗 [PricingPlan.id]
  title: string;
  introduce: string;
  content: string;
  status: string;
  projectType: string;
  modifiedAt: Date;
  field?: string | null;
  // 🔗 참조받음: [Purchase.projectId]
};
