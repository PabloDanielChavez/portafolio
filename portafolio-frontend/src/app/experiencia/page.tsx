import { loadSection } from "@/components/sub_components/LoadSection";
import { getAllPortfolioData } from "@/services/fetchData";

import { ExperienciaType } from "@/types/experiencia"; 


const Experiencia = loadSection<{ 
  experiencia: ExperienciaType[]; 
  showFooter?: boolean // Agrega esto aquí
}>("Experiencia");


export default async function Exp() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Experiencia experiencia={data.Experiencia} showFooter={false}/>
    </>
  );
}