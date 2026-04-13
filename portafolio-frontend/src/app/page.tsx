import Bienvenida from "@/components/Bienvenida";
import Experiencia from "@/components/Experiencia";
import Habilidades from "@/components/Habilidades";
import Servicios from "@/components/Servicios";
import Trabajos from "@/components/Trabajos";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

async function getData() {
  const urlBase = "http://localhost:4000/api/";
  // Definimos los recursos que queremos traer
  const endpoints = ['perfil', 'habilidades', 'experiencia', 'servicios', 'trabajos', 'clientes'];

  try {
    const promesas = endpoints.map(endpoint => 
      fetch(`${urlBase}${endpoint}`, { cache: "no-store" })
        .then(res => res.ok ? res.json() : []) // Si falla, devolvemos array vacío
        .catch(() => []) 
    );

    // Ejecutamos todas las peticiones al mismo tiempo
    const resultados = await Promise.all(promesas);
    // Definimos qué forma tiene el objeto que retorna la API
    interface DataResult {
      [key: string]: any; // Esto permite indexar con strings: data["Perfil"]
    }

    // Casting inicial: indicamos que el objeto inicial es de tipo DataResult
    const dataFinal = endpoints.reduce((acc: DataResult, name, index) => {
      const key = name.charAt(0).toUpperCase() + name.slice(1);
      acc[key] = resultados[index];
      return acc;
    }, {} as DataResult); // <--- Aquí está el truco: "as DataResult"

    return dataFinal;
  } catch (error) {
    console.error("Error crítico en automatizador:", error);
    return {};
  }
}export default async function Home() {
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