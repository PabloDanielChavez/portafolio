import dynamic from 'next/dynamic';

import { getPlanByTag } from '@/components/utils/planes.data';
import { createPageMetadata, siteConfig } from '@/config/site';

const PlanDetalle = dynamic(() => import('@/components/PagPlan'));
const plan = getPlanByTag('desarrollo_web');

export const metadata = createPageMetadata({
  title: plan?.seoTitle ?? 'Desarrollo Web a Medida',
  description: plan?.seoDescription ?? siteConfig.description,
  path: siteConfig.planRoutes[2],
});

export default async function Ser() {

  return (
    <>
      <PlanDetalle plan="desarrollo_web"/>
    </>
  );
}
