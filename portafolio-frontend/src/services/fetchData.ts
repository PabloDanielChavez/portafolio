// services/fetchData.ts
const urlBase = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPortfolioData() {
  if (!urlBase) {
    console.error("ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return null;
  }

  const endpoints = ['perfil', 'habilidades', 'experiencia', 'exp_desafio', 'exp_tecnologia', 'servicios', 'trabajos', 'clientes', 'seccion'];

  try {
    const promesas = endpoints.map(endpoint => 
      fetch(`${urlBase}${endpoint}`, { 
        next: { revalidate: 3600 } // 1 hora de caché en la CDN
       })
        .then(res => res.ok ? res.json() : [])
        .catch(() => []) 
    );

    const resultados = await Promise.all(promesas);

    // Creamos el objeto final mapeando los resultados
    const dataFinal = {
      Perfil: resultados[0],
      Habilidades: resultados[1],
      Experiencia: resultados[2],
      ExpDesafio: resultados[3],
      ExpTecnologia: resultados[4],
      Servicios: resultados[5],
      Trabajos: resultados[6],
      Clientes: resultados[7],
      Seccion: resultados[8],
    };

    return dataFinal;
  } catch (error) {
    console.error("Error crítico al obtener datos:", error);
    return null;
  }
}

// ... (tu código anterior de getAllPortfolioData queda igual)

// Nueva función para enviar el formulario
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