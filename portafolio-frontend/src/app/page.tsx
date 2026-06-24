import { getAllPortfolioData } from "@/services/fetchData";
import dynamic from 'next/dynamic';



import Hero from '@/components/sections/Hero';
const Planes = dynamic(() => import('@/components/sections/Planes'), { loading: () => <p>Cargando...</p>, ssr: true, });
const Trabajos = dynamic(() => import('@/components/sections/Trabajos'), { loading: () => <p>Cargando...</p>, ssr: true, });
const Habilidades = dynamic(() => import('@/components/sections/Habilidades'), { loading: () => <p>Cargando...</p>, ssr: true, });
const Servicios = dynamic(() => import('@/components/sections/Servicios'), { loading: () => <p>Cargando...</p>, ssr: true });
const Contacto = dynamic(() => import('@/components/sections/Contacto'), { loading: () => <p>Cargando...</p>, ssr: true });

export default async function Home() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <div id="hero"><Hero perfil={data.Perfil}/></div>
            {/* <Perfil perfil={data.Perfil} /> */}
            <div id="planes"><Planes /></div>
            <div id="trabajos"><Trabajos trabajos={data.Trabajos} showFooter={true}/></div>
            <div id="servicios"><Servicios servicios={data.Servicios} /></div>
            <div id="Habilidades"><Habilidades habilidades={data.Habilidades} /></div>
            <div id="Contacto"><Contacto perfil={data.Perfil}/> </div>
            {/* <div><BtnWSP /></div> */}
        </>
    );
}