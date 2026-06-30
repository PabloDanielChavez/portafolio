import dynamic from 'next/dynamic';

import { createPageMetadata, siteConfig } from '@/config/site';
import { getAllPortfolioData } from "@/services/fetchData";


const Servicios = dynamic(() => import('@/components/sections/Servicios'));
const Planes = dynamic(() => import('@/components/sections/Planes'));
const Clientes = dynamic(() => import('@/components/sections/Clientes'));

export const metadata = createPageMetadata({
  title: 'Servicios de Diseño y Desarrollo Web',
  description:
    'Servicios web para crear, optimizar y hacer crecer una presencia digital clara, rápida, profesional y enfocada en resultados.',
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
