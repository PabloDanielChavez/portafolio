
import dynamic from "next/dynamic";
import { getAllPortfolioData } from "@/services/fetchData";

import Trabajos from '@/components/sections/Trabajos';

export default async function Tra() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <Trabajos trabajos={data.Trabajos} showFooter={false}/>
        </>
    );
}