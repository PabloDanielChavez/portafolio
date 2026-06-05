import dynamic from 'next/dynamic';
import { getAllPortfolioData } from "@/services/fetchData";

import Servicios from '@/components/sections/Servicios';
import Trabajos from '@/components/sections/Trabajos';
import Clientes from '@/components/sections/Clientes';

export default async function Servicio() {
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