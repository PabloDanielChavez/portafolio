export const dynamic = 'force-dynamic';

import Experiencia from "@/components/Experiencia";
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Exp() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Experiencia experiencia={data.Experiencia} />
    </>
  );
}