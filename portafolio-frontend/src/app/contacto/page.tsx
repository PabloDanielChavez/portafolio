export const dynamic = 'force-dynamic';
import Habilidades from "@/components/Habilidades";
import Servicios from "@/components/Servicios";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Perfil() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Habilidades habilidades={data.Habilidades} />
      <Servicios servicios={data.Servicios} />
      <Clientes clientes={data.Clientes} />
      <Footer />
    </>
  );
}