// services/fetchData.ts
const urlBase = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPortfolioData() {
  if (!urlBase) {
    console.error("ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return null;
  }

  const endpoints = ['perfil', 'habilidades', 'experiencia', 'exp_desafio', 'exp_tecnologia', 'servicios', 'trabajos', 'tra_tecnologia', 'clientes', 'seccion'];

  try {
    const promesas = endpoints.map(endpoint => 
      fetch(`${urlBase}${endpoint}`, { 
          next: { revalidate: 3600 }
        })
        .then(res => res.ok ? res.json() : [])
        .catch(() => []) 
    );

    const resultados = await Promise.all(promesas);

    return {
      Perfil: resultados[0],
      Habilidades: resultados[1],
      Experiencia: resultados[2],
      ExpDesafio: resultados[3],
      ExpTecnologia: resultados[4],
      Servicios: resultados[5],
      Trabajos: resultados[6],
      TraTecnologia: resultados[7],
      Clientes: resultados[8],
      Seccion: resultados[9],
    };
  } catch (error) {
    console.error("Error crítico al obtener datos:", error);
    return null;
  }
}
type ProyectoAuditoria = {
  id: number;
  enlace_despliegue: string;
};

export const dispararAuditoriaMultipleBackend = async (proyectos: ProyectoAuditoria[]) => {
  if (!urlBase) {
    console.error("ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return { success: false, error: "URL del backend no configurada." };
  }

  const resultados = [];

  try {
    for (const proyecto of proyectos) {
      try {
        const respuesta = await fetch(`${urlBase}actualizar-auditoria`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: proyecto.id, url: proyecto.enlace_despliegue }),
        });

        let data: any = {};
        try {
          data = await respuesta.json();
        } catch (e) {
          data = { mensaje: "Error inesperado en el formato del servidor." };
        }

        if (!respuesta.ok) {
          const textoError = data.mensaje || data.error || `Error del servidor (${respuesta.status})`;
          console.warn(`Aviso en ID ${proyecto.id}:`, textoError);
          
          resultados.push({ id: proyecto.id, success: false, error: textoError });
        } else {
          resultados.push({ id: proyecto.id, success: true, data: data.datosActualizados });
        }
      } catch (errorFetch) {
        resultados.push({ id: proyecto.id, success: false, error: "No se pudo comunicar con el endpoint de auditoría." });
      }
    }

    return { success: true, resultados };

  } catch (error: any) {
    console.error('Error general en el lote de auditorías:', error.message);
    return { success: false, error: error.message };
  }
};

export type TipoProyectoContacto =
  | "Landing Page"
  | "Sitio Web Profesional"
  | "Tienda Online"
  | "Desarrollo a medida"
  | "Otro";

export type PresupuestoContacto =
  | "Necesito orientación"
  | "Hasta USD 500"
  | "USD 500 a 1.000"
  | "USD 1.000 a 2.500"
  | "Más de USD 2.500";

export type PlazoContacto =
  | "Lo antes posible"
  | "Durante el próximo mes"
  | "En 1 a 3 meses"
  | "Todavía no lo definí";

export type PreferenciaContacto = "email" | "whatsapp";

export type ContactPayload = {
    nombre: string;
    correo: string;
    mensaje: string;
    origen_url: string;
    tipoProyecto?: TipoProyectoContacto;
    presupuesto?: PresupuestoContacto;
    plazo?: PlazoContacto;
    preferenciaContacto?: PreferenciaContacto;
    telefono?: string;
    website?: string;
};

export async function enviarMensajeContacto(
  datosDelFormulario: ContactPayload
) {
  if (!urlBase) {
    console.error("ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return { ok: false, mensaje: "Error interno: URL no configurada" };
  }

  try {
    const respuesta = await fetch(`${urlBase}contacto`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datosDelFormulario)
    });

    const resultado = await respuesta.json();

    return { 
        ok: respuesta.ok, 
        mensaje: resultado.mensaje || "Error desconocido" 
    };

  } catch (error) {
    console.error("Error al enviar el mensaje al backend:", error);
    return { ok: false, mensaje: "No se pudo conectar con el servidor." };
  }
}
