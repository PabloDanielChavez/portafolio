// services/fetchData.ts
import type { TrabajosType } from "@/types/trabajos";

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

export async function getTrabajoById(
  id: number
): Promise<TrabajosType | null> {
  if (!urlBase) {
    throw new Error("La URL del backend no está configurada.");
  }

  let response: Response;

  try {
    response = await fetch(`${urlBase}trabajos`, {
      next: { revalidate: 3600 }
    });
  } catch {
    throw new Error("No se pudo consultar el proyecto.");
  }

  if (!response.ok) {
    throw new Error(
      `No se pudo consultar el proyecto (${response.status}).`
    );
  }

  const trabajos: unknown = await response.json();

  if (!Array.isArray(trabajos)) {
    throw new Error("La respuesta de proyectos no tiene un formato válido.");
  }

  return (
    (trabajos as TrabajosType[]).find(
      (trabajo) => Number(trabajo.id) === id
    ) ?? null
  );
}

export type TipoProyectoContacto =
  | "Landing Page"
  | "Sitio Web Profesional"
  | "Tienda Online"
  | "Desarrollo a medida"
  | "Otro";

export type PresupuestoContacto =
  | "Necesito orientación"
  | "Hasta USD 200"
  | "USD 200 a 1.000"
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
