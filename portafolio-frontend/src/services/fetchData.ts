// services/fetchData.ts
const urlBase = process.env.NEXT_PUBLIC_API_URL;

export async function getAllPortfolioData() {
  if (!urlBase) {
    console.error("ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return null;
  }

  const endpoints = ['perfil', 'habilidades', 'experiencia', 'servicios', 'trabajos', 'clientes', 'seccion'];

  try {
    const promesas = endpoints.map(endpoint => 
      fetch(`${urlBase}${endpoint}`, { cache: "no-store" })
        .then(res => res.ok ? res.json() : [])
        .catch(() => []) 
    );

    const resultados = await Promise.all(promesas);

    // Creamos el objeto final mapeando los resultados
    const dataFinal = {
      Perfil: resultados[0],
      Habilidades: resultados[1],
      Experiencia: resultados[2],
      Servicios: resultados[3],
      Trabajos: resultados[4],
      Clientes: resultados[5],
      Seccion: resultados[6],
    };

    return dataFinal;
  } catch (error) {
    console.error("Error crítico al obtener datos:", error);
    return null;
  }
}