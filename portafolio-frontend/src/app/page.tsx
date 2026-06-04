import { loadSection } from "@/components/sub_components/LoadSection";
import { getAllPortfolioData } from "@/services/fetchData";


import Bienvenida from "@/components/sections/Bienvenida";
import { ExperienciaType } from "@/types/experiencia"; 
import { exp_desafioType } from "@/types/exp_desafio";
import { exp_tecnologiaType } from "@/types/exp_tecnologia";
import { HabilidadesType } from "@/types/habilidades";
import { ClientesType } from "@/types/clientes";
import { ServiciosType } from "@/types/servicios";
import { TrabajosType } from "@/types/trabajos";


const Experiencia = loadSection<{ experiencia: ExperienciaType[], exp_desafio: exp_desafioType[], exp_tecnologia: exp_tecnologiaType[], showFooter?: boolean }>("Experiencia");
const Habilidades = loadSection<{ habilidades: HabilidadesType[] }>("Habilidades");
const Clientes = loadSection<{ clientes: ClientesType[] }>("Clientes");
const Servicios = loadSection<{ servicios: ServiciosType[] }>("Servicios");
const Trabajos = loadSection<{ trabajos: TrabajosType[], showFooter?: boolean }>("Trabajos");


export default async function Home() {
  const data = await getAllPortfolioData();
  if (!data) return <div>Error al cargar</div>;

  return (
    <>
      <Bienvenida perfil={data.Perfil} />
      <Trabajos trabajos={data.Trabajos} showFooter={true}/>
      <Servicios servicios={data.Servicios} />
      <Experiencia experiencia={data.Experiencia} exp_desafio={data.ExpDesafio} exp_tecnologia={data.ExpTecnologia} showFooter={true}/>
      <Habilidades habilidades={data.Habilidades} />
      <Clientes clientes={data.Clientes} />
    </>
  );
}