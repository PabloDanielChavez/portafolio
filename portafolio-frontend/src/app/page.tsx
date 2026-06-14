import { getAllPortfolioData } from "@/services/fetchData";
import dynamic from 'next/dynamic';

import Bienvenida from '@/components/sections/Bienvenida';
import Trabajos from '@/components/sections/Trabajos';

const Habilidades = dynamic(() => import('@/components/sections/Habilidades'), { loading: () => <p>Cargando...</p>, ssr: true, });
const Servicios = dynamic(() => import('@/components/sections/Servicios'), { loading: () => <p>Cargando...</p>, ssr: true });
const Contacto = dynamic(() => import('@/components/sections/Contacto'), { loading: () => <p>Cargando...</p>, ssr: true });

export default async function Home() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <Bienvenida perfil={data.Perfil} />
            <Trabajos trabajos={data.Trabajos} showFooter={true}/>
            <Servicios servicios={data.Servicios} />
            <Habilidades habilidades={data.Habilidades} />
            <Contacto perfil={data.Perfil}/> 
        </>
    );
}