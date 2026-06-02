import { loadSection } from "@/components/sub_components/LoadSection";
import { getAllPortfolioData } from "@/services/fetchData";


import Bienvenida from "@/components/sections/Bienvenida";
import { ExperienciaType } from "@/types/experiencia"; 
import { HabilidadesType } from "@/types/habilidades";
import { ClientesType } from "@/types/clientes";
import { ServiciosType } from "@/types/servicios";
import { TrabajosType } from "@/types/trabajos";


const Experiencia = loadSection<{ experiencia: ExperienciaType[] }>("Experiencia");
const Habilidades = loadSection<{ habilidades: HabilidadesType[] }>("Habilidades");
const Clientes = loadSection<{ clientes: ClientesType[] }>("Clientes");
const Servicios = loadSection<{ servicios: ServiciosType[] }>("Servicios");
const Trabajos = loadSection<{ trabajos: TrabajosType[] }>("Trabajos");


export default async function Home() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Bienvenida perfil={data.Perfil} />
      <Experiencia experiencia={data.Experiencia} />
      <Habilidades habilidades={data.Habilidades} />
      <Servicios servicios={data.Servicios} />
      <Trabajos trabajos={data.Trabajos} />
      <Clientes clientes={data.Clientes} />
    </>
  );
}