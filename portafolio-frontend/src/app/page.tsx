import Bienvenida from "@/components/Bienvenida";
import Experiencia from "@/components/Experiencia";
import Header from "@/components/Header";
import { ReactNode } from "react";

export default async function Home() {

  return (
        <>
          <Bienvenida></Bienvenida>
          <Experiencia></Experiencia>
        </>
  );
}