"use client";
import React from 'react';
import styles from '@/styles/sections/loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading_box}>
        <div className={styles.spinner}></div>
        <p className={styles.loading_text}>Cargando Portafolio...</p>
      </div>
    </div>
  );
}