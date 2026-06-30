import dynamic from 'next/dynamic';

import { getPlanByTag } from '@/components/utils/planes.data';
import { createPageMetadata, siteConfig } from '@/config/site';

const PlanDetalle = dynamic(() => import('@/components/PagPlan'));
const plan = getPlanByTag('sitio_web');

export const metadata = createPageMetadata({
  title: plan?.titulo ?? 'Sitio Web Profesional',
  description: plan?.subtitulo ?? siteConfig.description,
  path: siteConfig.planRoutes[1],
});

export default async function Ser() {

  return (
    <>
      <PlanDetalle plan="sitio_web"/>
    </>
  );
}
