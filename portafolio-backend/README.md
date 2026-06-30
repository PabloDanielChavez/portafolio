# Backend del portafolio

API Express conectada a MySQL mediante Sequelize.

## Configuración

1. Copiar `.env.example` como `.env.development`.
2. Completar las credenciales locales.
3. Usar `CORS_ORIGINS` como una lista separada por comas, sin rutas ni `/` final.
4. En un hosting con un único proxy confiable, configurar `TRUST_PROXY=1`.
5. Activar `DB_SSL=true` únicamente cuando el proveedor de MySQL lo requiera.

Los nombres anteriores `BD_HOST`, `BD_NAME`, `BD_USER`, `BD_PASS` y `BD_PORT`
siguen admitidos temporalmente para no romper los entornos existentes. Los
nombres `DB_*` son los recomendados.

## Comandos

```bash
npm install
npm run migrate:contact
npm run dev
npm test
npm run check
npm start
```

## Endpoints operativos

- `GET /api/health`: comprueba el servidor y la conexión con MySQL.
- `POST /api/contacto`: recibe consultas públicas.

El contrato completo del formulario es:

```json
{
  "nombre": "Nombre Apellido",
  "correo": "persona@example.com",
  "tipoProyecto": "Sitio Web Profesional",
  "presupuesto": "USD 1.000 a 2.500",
  "plazo": "Durante el próximo mes",
  "preferenciaContacto": "whatsapp",
  "telefono": "+54 11 1234 5678",
  "mensaje": "Mensaje de al menos diez caracteres.",
  "origen_url": "https://tu-frontend.example.com/contacto",
  "website": ""
}
```

Campos obligatorios:

- `nombre`: texto de 2 a 80 caracteres.
- `correo`: email de hasta 120 caracteres.
- `mensaje`: texto de 10 a 2500 caracteres. El límite conserva compatibilidad
  con los mensajes compuestos por versiones anteriores del frontend.

Campos de opciones. El backend los acepta ausentes para mantener compatibilidad
con el payload anterior; el frontend actual exige `tipoProyecto`:

- `tipoProyecto`: `Landing Page`, `Sitio Web Profesional`, `Tienda Online`,
  `Desarrollo a medida` u `Otro`.
- `presupuesto`: `Necesito orientación`, `Hasta USD 200`, `USD 200 a 1.000`,
  `USD 1.000 a 2.500` o `Más de USD 2.500`.
- `plazo`: `Lo antes posible`, `Durante el próximo mes`, `En 1 a 3 meses` o
  `Todavía no lo definí`.
- `preferenciaContacto`: `email` o `whatsapp`.
- `telefono`: hasta 30 caracteres; es obligatorio si la preferencia es
  `whatsapp`.
- `origen_url`: URL HTTP(S) de hasta 2048 caracteres.
- `website`: honeypot; debe estar vacío y nunca se guarda.

Por compatibilidad también se admite `email` como alias de `correo` y
`asunto` como texto opcional. Los campos no documentados se rechazan.

Antes de desplegar esta versión sobre una base existente, ejecutar una vez:

```bash
npm run migrate:contact
```

La migración comprueba el esquema y agrega únicamente las columnas faltantes
como `NULL`. No modifica ni elimina mensajes anteriores y puede volver a
ejecutarse de forma segura. En producción conviene hacer un respaldo y
ejecutarla antes de desplegar el código nuevo, preferentemente con poco tráfico.

No se ejecuta `sequelize.sync()` al iniciar. Los cambios futuros del esquema de
base de datos deben hacerse mediante migraciones controladas.
