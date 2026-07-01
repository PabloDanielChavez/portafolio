import dynamic from 'next/dynamic';

import { createPageMetadata, siteConfig } from '@/config/site';
import { getAllPortfolioData } from "@/services/fetchData";


const Servicios = dynamic(() => import('@/components/sections/Servicios'));
const Planes = dynamic(() => import('@/components/sections/Planes'));
const Clientes = dynamic(() => import('@/components/sections/Clientes'));

export const metadata = createPageMetadata({
  title: 'Landing Pages, Sitios Web y Desarrollo a Medida',
  description:
    'Compará Landing Page Profesional, Sitio Web Profesional y Desarrollo Web a Medida. Elegí una solución clara para tu negocio o pedí ayuda para definirla.',
  path: siteConfig.routes.services,
});

export default async function Ser() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Servicios servicios={data.Servicios} headingLevel="h1" />
      <Planes />
    </>
  );
}
