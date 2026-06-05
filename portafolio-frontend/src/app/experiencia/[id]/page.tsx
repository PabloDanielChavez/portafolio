import dynamic from 'next/dynamic';
import { getAllPortfolioData } from "@/services/fetchData";
const PagExperienciaDetalle = dynamic(() => import('@/components/PagExperiencia'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExpDetailPage({ params }: Props) {
  const { id } = await params;
  const data = await getAllPortfolioData();
  if (!data || !data.Experiencia) {
    return <div style={{ color: '#e5e5e5', padding: '40px', textAlign: 'center' }}>Error al cargar los datos</div>;
  }
  const experienciaIndividual = data.Experiencia.find(
    (item: any) => item.id.toString() === id
  );
  if (!experienciaIndividual) {
    return <div style={{ color: '#e5e5e5', padding: '40px', textAlign: 'center' }}>Experiencia no encontrada</div>;
  }
  return (
    <>
      <PagExperienciaDetalle 
        exp={experienciaIndividual} 
        exp_desafio={data.ExpDesafio} 
        exp_tecnologia={data.ExpTecnologia} 
      />
    </>
  );
}