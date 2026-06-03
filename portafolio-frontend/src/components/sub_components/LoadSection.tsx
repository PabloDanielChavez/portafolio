import dynamic from 'next/dynamic';

export const loadSection = <T,>(path: string) => 
    dynamic<T>(() => import(`@/components/sections/${path}`), {
        loading: () => <p>Cargando sección...</p>,
        ssr: true,
    });