
import dynamic from "next/dynamic";
import { getAllPortfolioData } from "@/services/fetchData";

import { TrabajosType } from "@/types/trabajos"; 


const Trabajos = dynamic(() => import('@/components/sections/Trabajos'), {
    loading: () => <p>Cargando sección...</p>,
    ssr: true,
});


export default async function Tra() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <Trabajos trabajos={data.Trabajos} showFooter={false}/>
        </>
    );
}