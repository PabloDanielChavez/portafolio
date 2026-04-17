export const dynamic = 'force-dynamic';

import Servicios from "@/components/Servicios";
import Trabajos from "@/components/Trabajos";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Perfil() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Servicios servicios={data.Servicios} />
      <Trabajos trabajos={data.Trabajos} />
      <Clientes clientes={data.Clientes} />
      <Footer />
    </>
  );
}