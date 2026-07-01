import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  esSlugTrabajoValido,
  getImagenTrabajo
} from '@/components/utils/trabajos.helpers';
import { createPageMetadata, siteConfig } from '@/config/site';
import {
  getAllPortfolioData,
  getTrabajoBySlug
} from "@/services/fetchData";

const PagTrabajoDetalle = dynamic(() => import('@/components/PagTrabajo'), {
    loading: () => <p>Cargando sección...</p>,
    ssr: true,
});

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const resolveTrabajo = async (slug: string) => {
  if (!esSlugTrabajoValido(slug)) {
    notFound();
  }

  const trabajo = await getTrabajoBySlug(slug);

  if (!trabajo) {
    notFound();
  }

  return trabajo;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const trabajo = await resolveTrabajo(slug);

  return createPageMetadata({
    title: `${trabajo.nombre_trabajo} — Proyecto Web`,
    description:
      trabajo.resumen_trabajo ||
      trabajo.informacion_trabajo ||
      siteConfig.description,
    path: `${siteConfig.routes.projects}/${trabajo.slug}`,
    type: 'article',
    image: getImagenTrabajo(trabajo),
  });
}

export default async function TraDetallePagina({ params }: Props) {
  const { slug } = await params;
  const trabajoIndividual = await resolveTrabajo(slug);
  const data = await getAllPortfolioData();

  if (!data) {
    throw new Error(
      'No se pudieron cargar los datos complementarios del proyecto.'
    );
  }

  return (
    <>
      <PagTrabajoDetalle 
        tra={trabajoIndividual} 
        tra_tecnologia={data.TraTecnologia} 
      />
    </>
  );
}
