import { useQuery } from '@tanstack/react-query';
import { fetchAdminProjects } from '@/lib/apis/projects';

import { ProjectRow } from '@/types/page/projectReview/table';
import {
  mapDonationProjectToSponsorRow,
  mapPurchaseProjectToSalesRow,
} from '@/app/(admin)/projectReview/_status/projectMapper';

export function useAdminProjectsQuery() {
  return useQuery<ProjectRow[]>({
    queryKey: ['adminProjects', 'ALL'],
    queryFn: async () => {
      const res = await fetchAdminProjects({
        page: '0',
        totalCount: '100',
        type: 'ALL',
      });

      const rawContent = res?.data?.content ?? [];

      const mapped = rawContent.map((project: any) => {
        if (project.type === 'DONATION') {
          return mapDonationProjectToSponsorRow(project);
        } else if (project.type === 'PURCHASE') {
          return mapPurchaseProjectToSalesRow(project);
        } else {
          throw new Error(`알 수 없는 타입: ${project.type}`);
        }
      });

      return mapped;
    },
  });
}
