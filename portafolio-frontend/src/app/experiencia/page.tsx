export const dynamic = 'force-dynamic';

import Experiencia from "@/components/Experiencia";
import Trabajos from "@/components/Trabajos";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Perfil() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Experiencia experiencia={data.Experiencia} />
      <Trabajos trabajos={data.Trabajos} />
      <Clientes clientes={data.Clientes} />
      <Footer />
    </>
  );
}