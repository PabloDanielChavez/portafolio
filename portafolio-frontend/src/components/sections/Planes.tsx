// "use client";

// import styles from "@/styles/sections/planes.module.scss";
// import { TbChartBarPopular } from "@/components/utils/Iconos";

// import SectionHeader from "../sub_components/SectionHeader";
// import PlanCard from "../sub_components/PlanCard";

// const planes = [
//     {
//         id: 1,
//         titulo: "Landing Page",
//         destacado: true,
//         descripcion:
//             "Ideal para promocionar un servicio, campaña o producto específico y convertir visitantes en clientes.",
//         items: [
//             "Diseño profesional enfocado en conversiones",
//             "Página única (One Page)",
//             "Formulario de contacto",
//             "Integración con WhatsApp",
//             "Integración con redes sociales",
//             "Diseño adaptable a celulares y tablets",
//             "Optimización SEO inicial",
//             "Configuración de Google Analytics",
//             "Alta velocidad de carga"
//         ]
//     },
//     {
//         id: 2,
//         titulo: "Sitio Web Profesional",
//         descripcion:
//             "Ideal para empresas y marcas que necesitan una presencia digital sólida y transmitir confianza.",
//         items: [
//             "Hasta 5 secciones personalizadas",
//             "Diseño personalizado",
//             "Formularios avanzados",
//             "Integración con WhatsApp",
//             "Optimización SEO",
//             "Google Analytics y Search Console",
//             "Animaciones modernas",
//             "Diseño responsive",
//             "Alto rendimiento"
//         ]
//     },
//     {
//         id: 3,
//         titulo: "Tienda Online",
//         descripcion:
//             "Vendé productos o servicios las 24 horas desde una plataforma moderna y segura.",
//         items: [
//             "Catálogo de productos",
//             "Carrito de compras",
//             "Checkout optimizado",
//             "Integración con Mercado Pago",
//             "Gestión de pedidos",
//             "Panel administrativo",
//             "Diseño personalizado",
//             "Optimización SEO",
//             "Diseño responsive"
//         ]
//     }
//     // {
//     //     id: 4,
//     //     titulo: "Aplicaciones Web",
//     //     descripcion:
//     //         "Soluciones personalizadas para automatizar procesos y mejorar la productividad.",
//     //     items: [
//     //         "Paneles de administración",
//     //         "Gestión de clientes",
//     //         "Gestión de turnos",
//     //         "Integración con APIs",
//     //         "Bases de datos",
//     //         "Automatizaciones",
//     //         "Seguridad avanzada",
//     //         "Escalabilidad"
//     //     ]
//     // }
// ];

// export default function Planes() {
//     return (
//         <section
//             className={styles.planes}
//             id="planes"
//         >
//             <div className={styles.planes_layout}>
//                 <SectionHeader
//                     icon={<TbChartBarPopular />}
//                     title="Planes"
//                     description="Cada proyecto está diseñado para cumplir objetivos concretos: generar consultas, aumentar ventas y fortalecer tu presencia online."
//                 />
//                 <div className={styles.planes_header}>
//                     <div className={styles.planes_contenido_box}>
//                         <div className={styles.planes_contenido_box_layout}>
//                             {planes.map((plan) => (
//                                 <PlanCard
//                                     key={plan.id}
//                                     plan={plan}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }