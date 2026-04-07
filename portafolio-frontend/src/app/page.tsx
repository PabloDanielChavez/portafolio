import Bienvenida from "@/components/Bienvenida";
import Experiencia from "@/components/Experiencia";
import Stacks from "@/components/Stacks";
import Servicios from "@/components/Servicios";
import Trabajos from "@/components/Trabajos";
import Clientes from "@/components/Clientes";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

export default async function Home() {

  return (
        <>
          <Bienvenida></Bienvenida>
          <Experiencia></Experiencia>
          <Stacks></Stacks>
          <Servicios></Servicios>
          <Trabajos></Trabajos>
          <Clientes></Clientes>
          <Footer></Footer>
        </>
  );
}