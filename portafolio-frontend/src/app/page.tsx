import dynamic from "next/dynamic";

import Hero from "@/components/sections/Hero";
import { FinalCta, Proceso, TrustBar } from "@/components/sections/HomeSections";
import { createPageMetadata, siteConfig } from "@/config/site";
import { getAllPortfolioData } from "@/services/fetchData";

const Trabajos = dynamic(() => import("@/components/sections/Trabajos"));
const Servicios = dynamic(() => import("@/components/sections/Servicios"));
const Planes = dynamic(() => import("@/components/sections/Planes"));

export const metadata = createPageMetadata({
    title: "Páginas Web Profesionales para Negocios",
    description:
        "Diseño páginas web profesionales para negocios, emprendedores y pymes de Argentina. Landing pages, sitios rápidos y desarrollos a medida con presupuesto claro.",
    path: siteConfig.routes.home,
});

export default async function Home() {
    const data = await getAllPortfolioData();

    if (!data) {
        return <p>No se pudo cargar el contenido. Intentá nuevamente en unos minutos.</p>;
    }

    return (
        <>
            <Hero perfil={data.Perfil} />
            <TrustBar projectCount={data.Trabajos.length} />
            <Servicios servicios={data.Servicios} showBackLink={false} />
            <Planes />
            <Trabajos trabajos={data.Trabajos} showFooter />
            <Proceso />
            <FinalCta perfil={data.Perfil} />
        </>
    );
}
