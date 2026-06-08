"use client";
import styles_header from '@/styles/sections/header.module.scss';
import { BiMenu } from 'react-icons/bi';
import { IoMdLink } from 'react-icons/io';

interface HeaderProps {
  expMenu: (lado: 'izq' | 'der') => void;
}

export default function Header({ expMenu }: HeaderProps) {
  return (
    <header className={styles_header.header}>
      <div className={styles_header.header_box}>
        <div className={styles_header.header_layout}>
          <div 
            className={`${styles_header.header_menu}`}
            onClick={() => expMenu('izq')} 
            role="button"
            tabIndex={0}
          >
            <BiMenu size={32} aria-label={`Menu`}/>
          </div>
          <div 
            className={`${styles_header.header_menu}`}
            onClick={() => expMenu('der')} 
            role="button"
            tabIndex={0}
          >
            <IoMdLink size={28} aria-label={`Redes`}/>
          </div>
        </div>
      </div>
    </header>
  );
}