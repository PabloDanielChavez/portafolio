import type { TrabajosType } from "@/types/trabajos";
import type {
    TraTecnologiaItem,
    tra_tecnologiaType
} from "@/types/tra_tecnologia";

export type AuditoriaDispositivo = "mobile" | "desktop";

export type MetricaAuditoria = {
    id: string;
    etiqueta: string;
    valor: number;
};

export type TecnologiaNombre = "SASS" | "Node" | "Next" | "React" | "Sequelize" | "MySQL" | "Express" | "GoogleTagManager" | "GoogleAnalytics";

type AuditoriaTab = {
    id: AuditoriaDispositivo;
    label: string;
    description: string;
};

export const auditoriaTabs: AuditoriaTab[] = [
    {
        id: "mobile",
        label: "Teléfono",
        description: "Auditoría orientada a usuarios que navegan desde celulares."
    },
    {
        id: "desktop",
        label: "Escritorio",
        description: "Auditoría orientada a usuarios que navegan desde computadoras."
    }
];

export const tecnologiasDisponibles: TecnologiaNombre[] = [
    "SASS",
    "Node",
    "Next",
    "React"
];

export const getMetricasAuditoria = (
    trabajo: TrabajosType,
    dispositivo: AuditoriaDispositivo
): MetricaAuditoria[] => {
    const isMobile = dispositivo === "mobile";

    return [
        {
            id: "performance",
            etiqueta: "Rendimiento",
            valor: Number(
                isMobile
                    ? trabajo.performance_mobile
                    : trabajo.performance_desktop
            ) || 0
        },
        {
            id: "practices",
            etiqueta: "Prácticas",
            valor: Number(
                isMobile
                    ? trabajo.practices_mobile
                    : trabajo.practices_desktop
            ) || 0
        },
        {
            id: "accessibility",
            etiqueta: "Accesibilidad",
            valor: Number(
                isMobile
                    ? trabajo.accessibility_mobile
                    : trabajo.accessibility_desktop
            ) || 0
        },
        {
            id: "seo",
            etiqueta: "SEO",
            valor: Number(
                isMobile
                    ? trabajo.seo_mobile
                    : trabajo.seo_desktop
            ) || 0
        }
    ];
};

export const getPromedioAuditoria = (
    trabajo: TrabajosType,
    dispositivo: AuditoriaDispositivo
): number => {
    const metricas = getMetricasAuditoria(trabajo, dispositivo);
    const total = metricas.reduce(
        (acc: number, metrica: MetricaAuditoria) => acc + metrica.valor,
        0
    );

    return Math.round(total / metricas.length);
};

export const getEstadoProyecto = (estado: string | null | undefined): string => {
    const estadoNormalizado = estado?.toLowerCase().trim();

    if (estadoNormalizado === "terminado") return "Terminado";
    if (estadoNormalizado === "construccion") return "En construcción";
    if (estadoNormalizado === "en construccion") return "En construcción";
    if (estadoNormalizado === "pausado") return "Pausado";

    return estado || "Sin estado";
};

export const getFechaProyecto = (fecha: string | null | undefined): string => {
    if (!fecha) return "Fecha no disponible";

    const [dia, mes, anio] = fecha.split("/");

    if (!dia || !mes || !anio) return fecha;

    return `${dia}/${mes}/${anio}`;
};

export const getImagenTrabajo = (trabajo: TrabajosType): string => {
    return `/img/Logotipo_Portafolio_PDC/${trabajo.nombre_archivo}/${trabajo.nombre_imagen}.${trabajo.formato_imagen}`;
};

export const esTrabajoDestacado = (trabajo: TrabajosType): boolean => {
    const destacado = trabajo.destacado;

    if (typeof destacado === "boolean") return destacado;
    if (typeof destacado === "number") return destacado === 1;

    if (typeof destacado === "string") {
        const destacadoNormalizado = destacado.toLowerCase().trim();

        return (
            destacadoNormalizado === "1" ||
            destacadoNormalizado === "true" ||
            destacadoNormalizado === "si" ||
            destacadoNormalizado === "sí" ||
            destacadoNormalizado === "destacado"
        );
    }

    return false;
};

export const ordenarTrabajos = (
    trabajos: TrabajosType[]
): TrabajosType[] => {
    return [...trabajos].sort((a: TrabajosType, b: TrabajosType) => {
        const aDestacado = esTrabajoDestacado(a) ? 1 : 0;
        const bDestacado = esTrabajoDestacado(b) ? 1 : 0;

        return bDestacado - aDestacado;
    });
};

export const getTecnologiasTrabajo = (
    trabajoId: number,
    tecnologias: tra_tecnologiaType
): TecnologiaNombre[] => {
    const registro = tecnologias.find(
        (tecnologia: TraTecnologiaItem) => tecnologia.tra_id === trabajoId
    );

    if (!registro) return [];

    return tecnologiasDisponibles.filter((tecnologia: TecnologiaNombre) => {
        const valor = registro[tecnologia];

        return valor === 1;
    });
};