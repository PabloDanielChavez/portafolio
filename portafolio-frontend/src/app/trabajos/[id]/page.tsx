
import dynamic from 'next/dynamic';

import { getAllPortfolioData } from "@/services/fetchData";

const PagTrabajoDetalle = dynamic(() => import('@/components/PagTrabajo'), {
    loading: () => <p>Cargando sección...</p>,
    ssr: true,
});

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TraDetallePagina({ params }: Props) {
  // 1. Desenvolvemos la promesa de params usando await
  const { id } = await params;
  const data = await getAllPortfolioData();
  if (!data || !data.Trabajos) {
    return <div style={{ color: '#e5e5e5', padding: '40px', textAlign: 'center' }}>Error al cargar los datos</div>;
  }

  const trabajoIndividual = data.Trabajos.find(
    (item: any) => item.id.toString() === id
  );

  if (!trabajoIndividual) {
    return <div style={{ color: '#e5e5e5', padding: '40px', textAlign: 'center' }}>Trabajo no encontrado</div>;
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