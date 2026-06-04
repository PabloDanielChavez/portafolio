import { loadSection } from "@/components/sub_components/LoadSection";
import { getAllPortfolioData } from "@/services/fetchData";


import Bienvenida from "@/components/sections/Bienvenida";
import { PerfilType } from "@/types/perfil"; 
import { TrabajosType } from "@/types/trabajos";
import { exp_desafioType } from "@/types/exp_desafio";
import { exp_tecnologiaType } from "@/types/exp_tecnologia";
import { HabilidadesType } from "@/types/habilidades";
import { ClientesType } from "@/types/clientes";
import { ServiciosType } from "@/types/servicios";
import { ExperienciaType } from "@/types/experiencia"; 


const Trabajos = loadSection<{ trabajos: TrabajosType[], showFooter?: boolean }>("Trabajos");
const Servicios = loadSection<{ servicios: ServiciosType[] }>("Servicios");
const Experiencia = loadSection<{ experiencia: ExperienciaType[], exp_desafio: exp_desafioType[], exp_tecnologia: exp_tecnologiaType[], showFooter?: boolean }>("Experiencia");
const Habilidades = loadSection<{ habilidades: HabilidadesType[] }>("Habilidades");
const Clientes = loadSection<{ clientes: ClientesType[] }>("Clientes");
const Contacto = loadSection<{ perfil: PerfilType }>("Contacto");


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
      <Contacto perfil={data.Perfil}/>
      <Clientes clientes={data.Clientes} />
    </>
  );
}