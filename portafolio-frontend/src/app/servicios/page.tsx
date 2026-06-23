import dynamic from 'next/dynamic';
import { getAllPortfolioData } from "@/services/fetchData";

const Servicios = dynamic(() => import('@/components/sections/Servicios'));
// const Planes = dynamic(() => import('@/components/sections/Planes'));
const Clientes = dynamic(() => import('@/components/sections/Clientes'));

export default async function Ser() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Servicios servicios={data.Servicios} />
      {/* <Planes /> */}
    </>
  );
}