import dynamic from 'next/dynamic';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getImagenTrabajo } from '@/components/utils/trabajos.helpers';
import { createPageMetadata, siteConfig } from '@/config/site';
import {
  getAllPortfolioData,
  getTrabajoById
} from "@/services/fetchData";

const PagTrabajoDetalle = dynamic(() => import('@/components/PagTrabajo'), {
    loading: () => <p>Cargando sección...</p>,
    ssr: true,
});

type Props = {
  params: Promise<{
    id: string;
  }>;
};

const parseTrabajoId = (id: string) => {
  if (!/^[1-9]\d*$/.test(id)) {
    notFound();
  }

  const numericId = Number(id);

  if (!Number.isSafeInteger(numericId)) {
    notFound();
  }

  return numericId;
};

const resolveTrabajo = async (id: string) => {
  const trabajo = await getTrabajoById(parseTrabajoId(id));

  if (!trabajo) {
    notFound();
  }

  return trabajo;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const trabajo = await resolveTrabajo(id);

  return createPageMetadata({
    title: `${trabajo.nombre_trabajo} — Proyecto Web`,
    description:
      trabajo.resumen_trabajo ||
      trabajo.informacion_trabajo ||
      siteConfig.description,
    path: `${siteConfig.routes.projects}/${trabajo.id}`,
    type: 'article',
    image: getImagenTrabajo(trabajo),
  });
}

export default async function TraDetallePagina({ params }: Props) {
  const { id } = await params;
  const trabajoIndividual = await resolveTrabajo(id);
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
