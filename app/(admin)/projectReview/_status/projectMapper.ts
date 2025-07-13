import { ProjectRow } from '@/types/page/projectReview/table';
import { convertStatus } from './statusMapper';

export function mapDonationProjectToSponsorRow(project: any): ProjectRow {
  return {
    type: 'sponsor',
    id: project.id,
    sponsorTitle: project.title,
    userNickname: project.hostName,
    category: project.category,
    fundingGoal: `₩${project.priceGoal.toLocaleString()}`,
    status: convertStatus(project.status),
    approved: project.status === 'RECRUITING' || project.status === 'COMPLETED',
    description: project.introduce,
    startDate: project.startDate?.split('T')[0],
    endDate: project.endDate?.split('T')[0],
    projectUrl: project.deployAddress,
    image: project.hostProfileImageUrl || '/placeholder.svg',
  };
}

export function mapPurchaseProjectToSalesRow(project: any): ProjectRow {
  return {
    type: 'sales',
    id: project.id,
    salesTitle: project.title, // ✅ 수정
    productName: project.category, // ✅ 수정
    sellerNickname: project.hostName, // ✅ 수정
    category: project.category,
    deliveryMethod: project.purchaseOptions?.[0]?.providingMethod ?? 'DOWNLOAD',
    status: convertStatus(project.status),
    approved: project.approved,
    createdAt: project.createdDate?.split('T')[0],
    averageDeliveryTime: project.averageDeliveryTime ?? '즉시',
    description: project.introduce,
    projectUrl: project.deployAddress,
    options: (project.purchaseOptions ?? []).map((opt: any) => ({
      id: opt.purchaseOptionId,
      name: opt.title,
      price: `₩${opt.price.toLocaleString()}`,
    })),
    image: project.images?.[0] ?? '/placeholder.svg',
  };
}
