import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import PagTrabajoDetalle from '@/components/PagTrabajo';
import {
  esSlugTrabajoValido,
  getImagenTrabajo
} from '@/components/utils/trabajos.helpers';
import { createPageMetadata, siteConfig } from '@/config/site';
import { getTrabajoCommercialContent } from '@/content/trabajos-commercial.content';
import {
  getAllPortfolioData,
  getTrabajoBySlug
} from "@/services/fetchData";

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
  const commercialContent = getTrabajoCommercialContent(trabajo);

  return createPageMetadata({
    title: commercialContent.seoTitle,
    description: commercialContent.seoDescription,
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
    <PagTrabajoDetalle
      tra={trabajoIndividual}
      tra_tecnologia={data.TraTecnologia}
    />
  );
}
