import dynamic from 'next/dynamic';

const Perfil = dynamic(() => import('@/components/sections/Perfil'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Habilidades = dynamic(() => import('@/components/sections/Habilidades'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Servicios = dynamic(() => import('@/components/sections/Servicios'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Trabajos = dynamic(() => import('@/components/sections/Trabajos'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Clientes = dynamic(() => import('@/components/sections/Clientes'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export default async function PagPerfil() {
  return (
    <>
      <Perfil />
      {/* <Trabajos trabajos={data.Trabajos} />
      <Servicios servicios={data.Servicios} />
      <Habilidades habilidades={data.Habilidades} /> */}
    </>
  );
}