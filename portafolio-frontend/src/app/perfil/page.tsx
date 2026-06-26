import dynamic from 'next/dynamic';

const Perfil = dynamic(() => import('@/components/sections/Perfil'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export default async function PagPerfil() {
  return (
    <>
      <Perfil />
    </>
  );
}