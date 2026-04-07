
"use client";
// import styles_header from '../styles/sections/header.module.scss';

export default function Header() {
  return (
    <footer style={{
      display: "grid",
      gridTemplateColumns: "7fr 1fr",
      gap: "3rem",
      color: "white"
    }}>
      <p>@2026, All Rights Reserved</p>
      <span>400</span>
    </footer>
  );
}
