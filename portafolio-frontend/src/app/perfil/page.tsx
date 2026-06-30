import dynamic from 'next/dynamic';

import { createPageMetadata, siteConfig } from '@/config/site';

const Perfil = dynamic(() => import('@/components/sections/Perfil'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export const metadata = createPageMetadata({
  title: 'Pablo Daniel Chavez — Desarrollador Web Full Stack',
  description:
    'Conocé el perfil profesional, experiencia, tecnologías y forma de trabajo de Pablo Daniel Chavez, desarrollador web Full Stack de Buenos Aires.',
  path: siteConfig.routes.profile,
});

export default async function PagPerfil() {
  return (
    <>
      <Perfil />
    </>
  );
}
