export const dynamic = 'force-dynamic';

import Servicios from "@/components/sections/Servicios";
import Trabajos from "@/components/sections/Trabajos";
import Clientes from "@/components/sections/Clientes";
import Footer from "@/components/sections/Footer";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Serv() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Servicios servicios={data.Servicios} />
      <Trabajos trabajos={data.Trabajos} />
      <Clientes clientes={data.Clientes} />
    </>
  );
}