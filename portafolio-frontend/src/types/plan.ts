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
    ideal: string;
    objetivo: string;
    descripcion: string;
    href: string;
    precio: string;
    plazo: string;
    whatsappMensaje: string;
    destacados: string[];
    beneficios: PlanBeneficio[];
    items: string[];
    preguntas: PlanPregunta[];
};
