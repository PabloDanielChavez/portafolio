import { getAllPortfolioData } from "@/services/fetchData";
import dynamic from 'next/dynamic';

// Las demás secciones se quedan igual usando dynamic normal
const Bienvenida = dynamic(() => import('@/components/sections/Bienvenida'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Experiencia = dynamic(() => import('@/components/sections/Experiencia'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Habilidades = dynamic(() => import('@/components/sections/Habilidades'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Servicios = dynamic(() => import('@/components/sections/Servicios'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Trabajos = dynamic(() => import('@/components/sections/Trabajos'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Clientes = dynamic(() => import('@/components/sections/Clientes'), { loading: () => <p>Cargando sección...</p>, ssr: true, });
const Contacto = dynamic(() => import('@/components/sections/Contacto'), { loading: () => <p>Cargando sección...</p>, ssr: true, });

export default async function Home() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>

            <Bienvenida perfil={data.Perfil} />
            <Trabajos trabajos={data.Trabajos} showFooter={true}/>
            <Servicios servicios={data.Servicios} />
            <Experiencia experiencia={data.Experiencia} showFooter={true}/>
            <Habilidades habilidades={data.Habilidades} />
            <Contacto perfil={data.Perfil}/>
            <Clientes clientes={data.Clientes} />
        </>
    );
}