export const dynamic = 'force-dynamic';

import Contacto from "@/components/Contacto";
import Servicios from "@/components/Servicios";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { getAllPortfolioData } from "@/services/fetchData";



export default async function Contact() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Contacto perfil={data.Perfil} /> 
    </>
  );
}