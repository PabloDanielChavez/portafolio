export const dynamic = 'force-dynamic';

import Contacto from "@/components/sections/Contacto";
import Servicios from "@/components/sections/Servicios";
import Clientes from "@/components/sections/Clientes";
import Footer from "@/components/sections/Footer";
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