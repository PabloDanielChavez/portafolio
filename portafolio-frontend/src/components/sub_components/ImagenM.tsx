"use client";
import Image from "next/image";

interface ImagenComponentProps {
    style: string;
    url: string;
    alt: string;
    widthE: number;
    heightE: number;
    priority: string;
}

export function ImagenComponent({ style, url, alt, widthE, heightE, priority }: ImagenComponentProps) {
    return (
        <Image 
            className={style}
            src={url} 
            alt={alt}
            title={alt}
            width={widthE} 
            height={heightE}
            {...(priority === "prioridad" && { priority: true })}
        />
    );
}