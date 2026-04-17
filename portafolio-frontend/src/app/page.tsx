export const dynamic = 'force-dynamic';

import Bienvenida from "@/components/Bienvenida";
import Experiencia from "@/components/Experiencia";
import Habilidades from "@/components/Habilidades";
import Servicios from "@/components/Servicios";
import Trabajos from "@/components/Trabajos";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Home() {
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
      <Footer />
    </>
  );
}