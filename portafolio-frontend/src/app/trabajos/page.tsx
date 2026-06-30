import dynamic from 'next/dynamic';

import { createPageMetadata, siteConfig } from '@/config/site';
import { getAllPortfolioData } from "@/services/fetchData";

const Trabajos = dynamic(() => import('@/components/sections/Trabajos'));

export const metadata = createPageMetadata({
    title: 'Proyectos y Trabajos de Desarrollo Web',
    description:
        'Una selección de proyectos web reales desarrollados con foco en claridad, rendimiento, SEO y experiencia de usuario.',
    path: siteConfig.routes.projects,
});

export default async function Tra() {
    const data = await getAllPortfolioData();
    if (!data) return <div>Error al cargar</div>;

    return (
        <>
            <Trabajos
                trabajos={data.Trabajos}
                showFooter={false}
                headingLevel="h1"
            />
        </>
    );
}
