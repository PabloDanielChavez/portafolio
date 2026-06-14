'use client';
import { useEffect } from 'react';

export default function GTMTracker() {
    useEffect(() => {
        const timer = setTimeout(() => {
        // Inyectamos el script de GTM dinámicamente
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=G-Z7439LP7QW`;
        script.async = true;
        document.head.appendChild(script);

        // Inyectamos la configuración
        const dataLayerScript = document.createElement('script');
        dataLayerScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Z7439LP7QW');
        `;
        document.head.appendChild(dataLayerScript);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return null; // Este componente no renderiza nada visual
}