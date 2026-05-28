export const dynamic = 'force-dynamic';

import PagExperienciaDetalle from "@/components/PagExperiencia";
import { getAllPortfolioData } from "@/services/fetchData";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExpDetailPage({ params }: Props) {
  // 1. Desenvolvemos la promesa de params usando await
  const { id } = await params;

  const data = await getAllPortfolioData();
  
  if (!data || !data.Experiencia) {
    return <div style={{ color: '#e5e5e5', padding: '40px', textAlign: 'center' }}>Error al cargar los datos</div>;
  }

  // 2. Ahora usamos la constante 'id' que ya fue obtenida de forma asíncrona
  const experienciaIndividual = data.Experiencia.find(
    (item: any) => item.id.toString() === id
  );

  if (!experienciaIndividual) {
    return <div style={{ color: '#e5e5e5', padding: '40px', textAlign: 'center' }}>Experiencia no encontrada</div>;
  }

  return (
    <>
      <PagExperienciaDetalle exp={experienciaIndividual} />
    </>
  );
}