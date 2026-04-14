export const dynamic = 'force-dynamic';

import Bienvenida from "@/components/Bienvenida";
import Experiencia from "@/components/Experiencia";
import Habilidades from "@/components/Habilidades";
import Servicios from "@/components/Servicios";
import Trabajos from "@/components/Trabajos";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";


async function getData() {
  const urlBase = process.env.NEXT_PUBLIC_API_URL;

  if (!urlBase) {
    console.error(" ERROR: NEXT_PUBLIC_API_URL no está definida.");
    return {}; 
  }

  const endpoints = ['perfil', 'habilidades', 'experiencia', 'servicios', 'trabajos', 'clientes'];

  try {
    const promesas = endpoints.map(endpoint => 
      fetch(`${urlBase}${endpoint}`, { cache: "no-store" })
        .then(res => res.ok ? res.json() : [])
        .catch(() => []) 
    );

    const resultados = await Promise.all(promesas);

    interface DataResult {
      [key: string]: any;
    }

    const dataFinal = endpoints.reduce((acc: DataResult, name, index) => {
      const key = name.charAt(0).toUpperCase() + name.slice(1);
      acc[key] = resultados[index];
      return acc;
    }, {} as DataResult);

    return dataFinal;
  } catch (error) {
    console.error("Error crítico al obtener datos:", error);
    return {};
  }
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Bienvenida perfil={data.Perfil} />
      <Experiencia experiencia={data.Experiencia} />
      <Habilidades habilidades={data.Habilidades} />
      <Servicios servicios={data.Servicios} />
      <Trabajos trabajos={data.Trabajos} />
      <Clientes clientes={data.Clientes} />
      <Footer />
    </>
  );
}