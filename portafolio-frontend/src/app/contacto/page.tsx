import dynamic from 'next/dynamic';

import { createPageMetadata, siteConfig } from '@/config/site';
import { getAllPortfolioData } from "@/services/fetchData";

const Contacto = dynamic(() => import('@/components/sections/Contacto'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export const metadata = createPageMetadata({
  title: 'Contacto y Presupuesto de Desarrollo Web',
  description:
    'Solicitá un presupuesto o una primera orientación para crear una landing page, un sitio web profesional, una tienda online o un desarrollo a medida.',
  path: siteConfig.routes.contact,
});

export default async function Contact() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Contacto perfil={data.Perfil} /> 
    </>
  );
}
