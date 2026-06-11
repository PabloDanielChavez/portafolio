"use client";

import SkeletonBienvenida from '@/components/skeleton/Skeleton_bienvenida';
import SkeletonServicios from '@/components/skeleton/Skeleton_servicios';
import SkeletonTrabajos from '@/components/skeleton/Sleleton_trabajos';

export default function Loading() {
  return (
    <>
      <SkeletonBienvenida />
      <SkeletonTrabajos />
      <SkeletonServicios />
    </>
  );
}