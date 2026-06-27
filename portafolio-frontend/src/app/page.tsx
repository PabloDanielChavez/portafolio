import dynamic from "next/dynamic";

import Hero from "@/components/sections/Hero";
import { FinalCta, Proceso, TrustBar } from "@/components/sections/HomeSections";
import { getAllPortfolioData } from "@/services/fetchData";

const Trabajos = dynamic(() => import("@/components/sections/Trabajos"));
const Servicios = dynamic(() => import("@/components/sections/Servicios"));
const Planes = dynamic(() => import("@/components/sections/Planes"));

export default async function Home() {
    const data = await getAllPortfolioData();

    if (!data) {
        return <p>No se pudo cargar el contenido. Intentá nuevamente en unos minutos.</p>;
    }

    return (
        <>
            <Hero perfil={data.Perfil} />
            <TrustBar projectCount={data.Trabajos.length} />
            <Trabajos trabajos={data.Trabajos} showFooter />
            <Servicios servicios={data.Servicios} showBackLink={false} />
            <Proceso />
            <Planes />
            <FinalCta perfil={data.Perfil} />
        </>
    );
}
