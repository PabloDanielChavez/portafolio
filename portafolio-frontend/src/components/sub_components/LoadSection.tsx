import dynamic from 'next/dynamic';
import { ComponentType } from 'react';

// T representa el tipo de las props que el componente espera recibir
export const loadSection = <T,>(path: string) => 
    dynamic<T>(() => import(`@/components/sections/${path}`), {
        loading: () => <p>Cargando sección...</p>,
        ssr: true,
    });