import { loadSection } from "@/components/sub_components/LoadSection";
import { getAllPortfolioData } from "@/services/fetchData";

import { TrabajosType } from "@/types/trabajos"; 


const Trabajos = loadSection<{ 
    trabajos: TrabajosType[]; 
    showFooter?: boolean 
}>("Trabajos");


export default async function Tra() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <Trabajos trabajos={data.Trabajos} showFooter={false}/>
        </>
    );
}