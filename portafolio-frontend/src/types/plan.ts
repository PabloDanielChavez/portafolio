import { PlanTag } from "@/components/utils/planes.data";
import { PlanBeneficio } from "@/types/PlanBeneficio";
import { PlanPregunta } from "@/types/PlanPregunta";

export type Plan = {
    id: string;
    tag: PlanTag;
    destacado: boolean;
    titulo: string;
    etiqueta?: string;
    subtitulo: string;
    cardIdeal: string;
    ideal: string;
    problema: string;
    impacto: string;
    objetivo: string;
    descripcion: string;
    href: string;
    precio: string;
    plazo: string;
    seoTitle: string;
    seoDescription: string;
    whatsappMensaje: string;
    ctaLabel: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaMicrocopy: string;
    destacados: string[];
    beneficios: PlanBeneficio[];
    items: string[];
    cotizarAparte: string[];
    preguntas: PlanPregunta[];
    relatedWork: {
        label: string;
        href: string;
    };
};
