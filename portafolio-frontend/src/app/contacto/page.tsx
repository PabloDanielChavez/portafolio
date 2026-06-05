import dynamic from 'next/dynamic';
import { getAllPortfolioData } from "@/services/fetchData";
const Contacto = dynamic(() => import('@/components/sections/Contacto'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export default async function Contact() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Contacto perfil={data.Perfil} /> 
    </>
  );
}