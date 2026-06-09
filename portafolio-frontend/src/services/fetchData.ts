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
          next: { revalidate: 3600 } // 1 hora de caché en la CDN
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

export const dispararAuditoriaBackend = async (id: number, url: string) => {
  if (!urlBase) {
    console.error("ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return { success: false, error: "URL del backend no configurada." };
  }

  try {
    const respuesta = await fetch(`${urlBase}actualizar-auditoria`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, url }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(data.mensaje || 'Error al actualizar la auditoría');
    }

    return { success: true, data: data.datosActualizados };
  } catch (error: any) {
    console.error('Error en el frontend al llamar al backend:', error.message);
    return { success: false, error: error.message };
  }
};

export async function enviarMensajeContacto(datosDelFormulario: { 
    nombre: string, 
    correo: string, 
    mensaje: string,
    origen_url: string
}) {
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