import dynamic from 'next/dynamic';

import { getPlanByTag } from '@/components/utils/planes.data';
import { createPageMetadata, siteConfig } from '@/config/site';

const PlanDetalle = dynamic(() => import('@/components/PagPlan'));
const plan = getPlanByTag('landing_page');

export const metadata = createPageMetadata({
  title: plan?.seoTitle ?? 'Landing Page Profesional',
  description: plan?.seoDescription ?? siteConfig.description,
  path: siteConfig.planRoutes[0],
});

export default async function Ser() {

  return (
    <>
      <PlanDetalle plan="landing_page"/>
    </>
  );
}
