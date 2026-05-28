export const dynamic = 'force-dynamic';
import { getAllPortfolioData } from "@/services/fetchData";

export default async function Trabajos() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
    </>
  );
}