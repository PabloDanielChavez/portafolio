export type ExperienciaType = {
    id: string; // O number, según uses
    nombre_empresa: string;
    enlace_empresa: string;
    enlace_trabajoResumido: string;
    tipo_empresa: string;
    empresa_imagen: string;
    empresa_imagenFormato: string;
    tiempo_inicio: string;
    tiempo_final: string;
    puesto_empresa: string;
    detalle_puesto: string; // Resumen que ya usas en Inicio
    
    // --- NUEVOS CAMPOS PARA LA PÁGINA DETALLADA ---
    rol_descripcion_larga: string; // Explicación profunda de tu día a día
    tecnologias: string[];         // ['React', 'Next.js', 'SCSS', 'Node.js']
    logros: string[];             // ['Optimización de carga en un 40%', 'Migración exitosa...']
    desafios_soluciones: {         // Historias de problemas reales que resolviste
        desafio: string;
        solucion: string;
    }[];
    imagenes_proyecto?: string[];  // Capturas de pantalla del software desarrollado
};