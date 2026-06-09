export type TrabajosType = {
    id: number;
    nombre_trabajo: string;
    categoria_trabajo: string;
    numero_pagina: string; // Si en MySQL es INT, podés cambiarlo a number si preferís
    style_trabajo: string;
    complejidad_trabajo: string;
    enlace_trabajo: string;
    enlace_trabajoResumido: string;
    tiempo_trabajo: string;
    resumen_trabajo: string;
    informacion_trabajo: string;
    opinion_trabajo: string;
    valoracion_trabajo: string;
    nombre_archivo: string;
    nombre_imagen: string;
    formato_imagen: string;

    // --- NUEVAS MÉTRICAS MOBILE EN EL FRONTEND ---
    performance_mobile: number;
    accessibility_mobile: number;
    practices_mobile: number;
    seo_mobile: number;
    enlace_auditoria_mobile: string;

    // --- NUEVAS MÉTRICAS DESKTOP EN EL FRONTEND ---
    performance_desktop: number;
    accessibility_desktop: number;
    practices_desktop: number;
    seo_desktop: number;
    enlace_auditoria_desktop: string;

    destacado: number; // Si en MySQL es TEXT, dejalo como string. Si es INT, number.
    estado_proyecto: string;
    fecha_finalizacion: string;
    enlace_despliegue: string;
    enlace_repositorio: string;
};