// services/fetchData.ts
import { esSlugTrabajoValido } from "@/components/utils/trabajos.helpers";
import type { ContactPayload } from "@/types/contacto";
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

export async function getTrabajos(): Promise<TrabajosType[]> {
  if (!urlBase) {
    throw new Error("La URL del backend no está configurada.");
  }

  let response: Response;

  try {
    response = await fetch(`${urlBase}trabajos`, {
      next: { revalidate: 3600 }
    });
  } catch {
    throw new Error("No se pudo consultar el listado de proyectos.");
  }

  if (!response.ok) {
    throw new Error(
      `No se pudo consultar el listado de proyectos (${response.status}).`
    );
  }

  const trabajos: unknown = await response.json();

  if (!Array.isArray(trabajos)) {
    throw new Error("La respuesta de proyectos no tiene un formato válido.");
  }

  return trabajos as TrabajosType[];
}

export async function getTrabajoBySlug(
  slug: string
): Promise<TrabajosType | null> {
  if (!esSlugTrabajoValido(slug)) {
    return null;
  }

  if (!urlBase) {
    throw new Error("La URL del backend no está configurada.");
  }

  let response: Response;

  try {
    response = await fetch(`${urlBase}trabajos/${encodeURIComponent(slug)}`, {
      next: { revalidate: 3600 }
    });
  } catch {
    throw new Error("No se pudo consultar el proyecto.");
  }

  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `No se pudo consultar el proyecto (${response.status}).`
    );
  }

  const trabajo: unknown = await response.json();

  if (
    !trabajo ||
    typeof trabajo !== "object" ||
    Array.isArray(trabajo) ||
    (trabajo as { slug?: unknown }).slug !== slug
  ) {
    throw new Error("La respuesta de proyectos no tiene un formato válido.");
  }

  return trabajo as TrabajosType;
}

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
