import dynamic from "next/dynamic";

import Hero from "@/components/sections/Hero";
import { FinalCta, Proceso, TrustBar } from "@/components/sections/HomeSections";
import { createPageMetadata, siteConfig } from "@/config/site";
import { getHomePortfolioData } from "@/services/fetchData";

const Servicios = dynamic(() => import("@/components/sections/Servicios"));
const Planes = dynamic(() => import("@/components/sections/Planes"));
const Trabajos = dynamic(() => import("@/components/sections/Trabajos"));
const Clientes = dynamic(() => import("@/components/sections/Clientes"));

export const metadata = createPageMetadata({
    title: "Páginas Web Profesionales para Negocios",
    description:
        "Diseño páginas web profesionales para negocios, emprendedores y pymes de Argentina. Landing pages, sitios rápidos y desarrollos a medida con presupuesto claro.",
    path: siteConfig.routes.home,
});

export default async function Home() {
    const data = await getHomePortfolioData();

    if (!data) {
        return <p>No se pudo cargar el contenido. Intentá nuevamente en unos minutos.</p>;
    }

    return (
        <>
            <Hero perfil={data.Perfil} />
            <TrustBar projectCount={data.Trabajos.length} />
            <Servicios
                servicios={data.Servicios}
                showBackLink={false}
                modoInicio
            />
            <Trabajos trabajos={data.Trabajos} showFooter modoInicio />
            <Planes variante="comparacion" />
            <Clientes clientes={data.Clientes} />
            <Proceso />
            <FinalCta perfil={data.Perfil} />
        </>
    );
}
