import dynamic from 'next/dynamic';
import { getAllPortfolioData } from "@/services/fetchData";

const Bienvenida = dynamic(() => import('@/components/sections/Bienvenida'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Habilidades = dynamic(() => import('@/components/sections/Habilidades'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Servicios = dynamic(() => import('@/components/sections/Servicios'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Trabajos = dynamic(() => import('@/components/sections/Trabajos'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Clientes = dynamic(() => import('@/components/sections/Clientes'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export default async function Perfil() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Bienvenida perfil={data.Perfil} />
      <Trabajos trabajos={data.Trabajos} />
      <Servicios servicios={data.Servicios} />
      <Habilidades habilidades={data.Habilidades} />
    </>
  );
}