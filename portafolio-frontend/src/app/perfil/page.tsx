export const dynamic = 'force-dynamic';

import Bienvenida from "@/components/sections/Bienvenida";
import Experiencia from "@/components/sections/Experiencia";
import Habilidades from "@/components/sections/Habilidades";
import Servicios from "@/components/sections/Servicios";
import Trabajos from "@/components/sections/Trabajos";
import Clientes from "@/components/sections/Clientes";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Perfil() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Bienvenida perfil={data.Perfil} />
      <Trabajos trabajos={data.Trabajos} />
      <Experiencia experiencia={data.Experiencia} />
      <Servicios servicios={data.Servicios} />
      <Habilidades habilidades={data.Habilidades} />
    </>
  );
}