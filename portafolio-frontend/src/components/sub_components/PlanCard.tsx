// "use client";

// import styles from "@/styles/sections/planes.module.scss";

// type Props = {
//     plan: {
//         id: number;
//         titulo: string;
//         items: string;
//         descripcion: string[];
//         destacado?: boolean;
//     };
// };

// export default function PlanCard({ plan }: Props) {
//     return (
//         <article className={` ${styles.planes_card} ${plan.destacado ? styles.planes_card_destacado : ""}`}>
//             {plan.destacado && (
//                 <span className={styles.planes_card_badge}>Más Elegido</span>
//             )}
//             <h3 className={styles.planes_card_titulo}>{plan.titulo}</h3>
//             <p className={styles.planes_card_descripcion}>{plan.descripcion}</p>
//             <ul className={styles.planes_card_lista}>
//                 {plan.items.map((item) => (
//                     <li key={item} className={styles.planes_card_item} >
//                         <span className={styles.planes_card_texto}>{item}</span>
//                     </li>
//                 ))}
//             </ul>
//             <button className={styles.planes_boton}>Solicitar presupuesto</button>
//         </article>
//     );
// }