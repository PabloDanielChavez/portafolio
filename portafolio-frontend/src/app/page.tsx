import { getAllPortfolioData } from "@/services/fetchData";
import dynamic from 'next/dynamic';

import SkeletonExperiencia from "@/components/skeleton/Sleleton_trabajos"
import SkeletonHabilidades from "@/components/skeleton/Skeleton_habilidades"
import SkeletonServicio from "@/components/skeleton/Skeleton_servicios"
import SkeletonContacto from "@/components/skeleton/Skeleton_contacto"

import Bienvenida from '@/components/sections/Bienvenida';
import Trabajos from '@/components/sections/Trabajos';

// const Experiencia = dynamic(() => import('@/components/sections/Experiencia'), { loading: () => <SkeletonExperiencia />, ssr: true });
const Habilidades = dynamic(() => import('@/components/sections/Habilidades'), { loading: () => <SkeletonHabilidades />, ssr: true, });
const Servicios = dynamic(() => import('@/components/sections/Servicios'), { loading: () => <SkeletonServicio />, ssr: true });
const Contacto = dynamic(() => import('@/components/sections/Contacto'), { loading: () => <SkeletonContacto />, ssr: true });

export default async function Home() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <Bienvenida perfil={data.Perfil} />
            <Trabajos trabajos={data.Trabajos} showFooter={true}/>
            <Servicios servicios={data.Servicios} />
            {/* <Experiencia experiencia={data.Experiencia} showFooter={true}/> */}
            <Habilidades habilidades={data.Habilidades} />
            <Contacto perfil={data.Perfil}/> 
        </>
    );
}