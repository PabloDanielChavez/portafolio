import dynamic from 'next/dynamic';
import { getAllPortfolioData } from "@/services/fetchData";

const Experiencia = dynamic(() => import('@/components/sections/Experiencia'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export default async function Exp() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Experiencia experiencia={data.Experiencia} showFooter={false}/>
    </>
  );
}