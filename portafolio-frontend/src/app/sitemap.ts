import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
        url: 'https://portafolio-pc.netlify.app',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
        },
        {
            url: 'https://portafolio-pc.netlify.app/trabajos',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://portafolio-pc.netlify.app/servicios',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://portafolio-pc.netlify.app/contacto',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ];
}