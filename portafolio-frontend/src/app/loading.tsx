"use client";

import SkeletonBienvenida from '@/components/skeleton/Skeleton_bienvenida';
import SkeletonContacto from '@/components/skeleton/Skeleton_contacto';
import SkeletonServicios from '@/components/skeleton/Skeleton_servicios';
import SkeletonpagTrabajo from '@/components/skeleton/Skeleton_pagTrabajo';
import SkeletonTrabajos from '@/components/skeleton/Sleleton_trabajos';
import SkeletonFooter from '@/components/skeleton/skeleton_footer';

export default function Loading() {
  return (
    <>
      <p>cargando</p>
      {/* <SkeletonBienvenida />
      <SkeletonTrabajos />
      <SkeletonServicios />
      <SkeletonContacto /> */}
    </>
  );
}