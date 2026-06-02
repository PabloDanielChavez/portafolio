export const dynamic = 'force-dynamic';

import Bienvenida from "@/components/sections/Bienvenida";
import Experiencia from "@/components/sections/Experiencia";
import Habilidades from "@/components/sections/Habilidades";
import Servicios from "@/components/sections/Servicios";
import Trabajos from "@/components/sections/Trabajos";
import Clientes from "@/components/sections/Clientes";
import Footer from "@/components/sections/Footer";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Perfil() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Bienvenida perfil={data.Perfil} />
      <Experiencia experiencia={data.Experiencia} />
      <Habilidades habilidades={data.Habilidades} />
      <Servicios servicios={data.Servicios} />
      <Trabajos trabajos={data.Trabajos} />
      <Clientes clientes={data.Clientes} />
    </>
  );
}