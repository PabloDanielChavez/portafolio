import { useEffect, useState } from "react";

type ContadorProps = {
    valorFinal: number;
    classNameBase: string;
    clasesColor: {
        verde: string;
        amarillo: string;
        rojo: string;
    };
    tiempo: number;
};

export function ContadorAnimadoAuditoria({ valorFinal, classNameBase, clasesColor, tiempo }: ContadorProps) {
    const [cuenta, setCuenta] = useState(0);

    useEffect(() => {
        if (!valorFinal) return;

        let inicio = 0;
        const duracion = tiempo;
        let tiempoInicio: number | null = null;

        const animarNumero = (tiempoActual: number) => {
            if (!tiempoInicio) tiempoInicio = tiempoActual;
            const progreso = tiempoActual - tiempoInicio;

            const porcentajeProgreso = Math.min(progreso / duracion, 1);
            const easeOutQuad = porcentajeProgreso * (2 - porcentajeProgreso);

            const valorActual = Math.floor(easeOutQuad * (valorFinal - inicio) + inicio);
            setCuenta(valorActual);

            if (progreso < duracion) {
                requestAnimationFrame(animarNumero);
            }
        };

        requestAnimationFrame(animarNumero);
    }, [valorFinal]);
    const claseColorActual = 
        cuenta >= 90 ? clasesColor.verde : 
        cuenta >= 50 ? clasesColor.amarillo : 
        clasesColor.rojo;

    return (
        <span className={`${classNameBase} ${claseColorActual}`}>
            {cuenta}
        </span>
    );
}