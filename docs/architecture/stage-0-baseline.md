# Línea base full stack — Etapa 0

Fecha de verificación: 2026-06-30.

## Alcance y restricciones

Esta línea base documenta el comportamiento existente antes de endurecer la
auditoría PageSpeed o la revalidación. No modifica rutas, respuestas, diseño,
contenido, base de datos, dependencias ni variables de entorno.

No se registran valores de entorno en este documento.

## Estado inicial

- El árbol de trabajo estaba limpio antes de comenzar.
- Runtime local: Node.js `v24.12.0` y npm `11.6.2`.
- Backend `npm run check`: correcto.
- Backend `npm test`: 18 tests aprobados, 0 fallidos.
- Frontend `npm run build`: correcto con Next.js `16.2.7`.
- Frontend `npm run lint`: no ejecuta ESLint. El script usa `next lint`, que la
  versión instalada interpreta como una ruta de proyecto llamada `lint`.

El build confirmó estas rutas:

- Estáticas: `/`, `/contacto`, `/perfil`, `/robots.txt`, `/servicios`,
  `/servicios/planes/desarrollo_web`, `/servicios/planes/landing_page`,
  `/servicios/planes/sitio_web`, `/sitemap.xml` y `/trabajos`.
- Dinámicas: `/api/revalidate` y `/trabajos/[id]`.

Las rutas que consultan contenido usan revalidación de una hora.

## Endpoints actuales del backend

Todas las rutas están declaradas en `portafolio-backend/routes/api.js`.

| Método | Ruta | Función actual | Consumidor detectado |
|---|---|---|---|
| GET | `/api/health` | Verifica servidor y conexión MySQL | No detectado en frontend |
| GET | `/api/perfil` | Devuelve todos los registros de perfil | `getAllPortfolioData()` |
| GET | `/api/habilidades` | Devuelve habilidades | `getAllPortfolioData()` |
| GET | `/api/experiencia` | Devuelve experiencia | `getAllPortfolioData()` |
| GET | `/api/exp_desafio` | Devuelve desafíos de experiencia | `getAllPortfolioData()` |
| GET | `/api/exp_tecnologia` | Devuelve tecnologías de experiencia | `getAllPortfolioData()` |
| GET | `/api/servicios` | Devuelve servicios | `getAllPortfolioData()` |
| GET | `/api/trabajos` | Devuelve proyectos | `getAllPortfolioData()` |
| GET | `/api/tra_tecnologia` | Devuelve tecnologías de proyectos | `getAllPortfolioData()` |
| GET | `/api/clientes` | Devuelve clientes | `getAllPortfolioData()` |
| POST | `/api/contacto` | Valida y persiste una consulta | Formulario de contacto |
| POST | `/api/actualizar-auditoria` | Ejecuta PageSpeed y actualiza métricas | Función exportada, sin llamadas activas |

`/api/contacto` responde `405` para métodos distintos de `POST` y `OPTIONS`.

El frontend también intenta consultar `/api/seccion`, pero esa ruta no existe
en el backend. El cliente convierte silenciosamente esa respuesta fallida en
un array vacío.

## Consumo actual desde el frontend

`getAllPortfolioData()` dispara en paralelo diez solicitudes:

1. `perfil`
2. `habilidades`
3. `experiencia`
4. `exp_desafio`
5. `exp_tecnologia`
6. `servicios`
7. `trabajos`
8. `tra_tecnologia`
9. `clientes`
10. `seccion`

La URL se forma concatenando `NEXT_PUBLIC_API_URL` y el nombre del endpoint.
Por lo tanto, el comportamiento actual depende de que la URL base tenga el
separador correcto.

El formulario utiliza `POST contacto`.

`dispararAuditoriaMultipleBackend()` utiliza `POST actualizar-auditoria`, pero
no se encontraron llamadas a esa función dentro del repositorio. No debe
asumirse que no existen scripts o consumidores externos.

No se encontraron llamadas internas a `/api/revalidate`. Puede existir un
webhook externo no representado en el código.

## Funcionamiento actual de la auditoría PageSpeed

Flujo de `POST /api/actualizar-auditoria`:

1. Pasa por el rate limit global de `/api`.
2. Pasa por el rate limit específico de auditoría.
3. Valida un body estricto con:
   - `id`: número entero positivo;
   - `url`: URL HTTP o HTTPS de hasta 2048 caracteres.
4. Comprueba que exista `PAGESPEED_API_KEY`.
5. Llama en paralelo a PageSpeed para `mobile` y `desktop`.
6. Solicita rendimiento, accesibilidad, buenas prácticas y SEO.
7. Actualiza las ocho métricas del proyecto cuyo `id` recibió.
8. Devuelve el formato de éxito existente con `success`, `mensaje` y
   `datosActualizados`.

Riesgos confirmados:

- no exige autenticación ni autorización;
- permite elegir cualquier ID positivo;
- permite enviar cualquier URL HTTP(S);
- realiza dos operaciones externas costosas por solicitud;
- no valida que la URL pertenezca al proyecto;
- no comprueba cuántas filas actualizó Sequelize;
- puede responder éxito aunque el ID no exista;
- CORS no protege frente a clientes HTTP o servidores externos;
- el rate limiter en memoria no es una frontera de autorización.

## Funcionamiento actual de la revalidación

Flujo de `GET /api/revalidate`:

1. Lee `secret` desde el query string.
2. Lo compara directamente con `MI_TOKEN_SECRETO`.
3. Lee `path` desde el query string y usa `/` como valor predeterminado.
4. Llama a `revalidatePath(path)`.
5. Devuelve `{ revalidated: true, now }`.

Riesgos confirmados:

- usa un método GET para una operación mutante;
- el secreto viaja en la URL y puede quedar en logs o historiales;
- la comparación no está aislada en una función segura;
- acepta cualquier path proporcionado;
- no define una allowlist de rutas;
- no hay pruebas específicas;
- no se identificó el posible webhook externo que lo invoca.

## Variables de entorno actuales

### Frontend

- `NEXT_PUBLIC_API_URL`: URL pública base del backend.
- `MI_TOKEN_SECRETO`: secreto actual de revalidación.
- `ANALYZE`: activa opcionalmente el analizador de bundle.

### Backend

Obligatorias para la base de datos:

- `DB_HOST`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`

Con valor predeterminado o configuración opcional:

- `NODE_ENV`
- `PORT`
- `DB_PORT`
- `DB_SSL`
- `DB_SSL_REJECT_UNAUTHORIZED`
- `DB_LOGGING`
- `CORS_ORIGINS`
- `CORS_ORIGIN`
- `FRONTEND_URL`
- `TRUST_PROXY`
- `API_RATE_LIMIT_MAX`
- `CONTACT_RATE_LIMIT_MAX`
- `CONTACT_RATE_LIMIT_WINDOW_MINUTES`
- `AUDIT_RATE_LIMIT_MAX`
- `PAGESPEED_API_KEY`

Los aliases heredados `BD_HOST`, `BD_NAME`, `BD_USER`, `BD_PASS` y `BD_PORT`
siguen admitidos.

En producción debe existir al menos un origen CORS válido. La auditoría
requiere `PAGESPEED_API_KEY` para funcionar.

## Diseño propuesto para la Etapa 1

Este diseño todavía no está implementado.

### 1. Autenticación de auditoría

Tratar la auditoría como una operación administrativa, no como una función
pública del navegador.

1. Incorporar `AUDIT_API_TOKEN` al esquema de entorno del backend.
2. Exigir `Authorization: Bearer <token>` mediante un middleware específico.
3. Comparar el token con longitud comprobada y `crypto.timingSafeEqual`.
4. Ejecutar autenticación antes de validación, PageSpeed y escritura.
5. Mantener sin cambios la ruta, el body y la respuesta de éxito.
6. Mantener el rate limiter como defensa adicional, no como autenticación.

La función frontend que dispara auditorías no tiene consumidores activos. Antes
de habilitar el token se debe confirmar si existe un script externo. El token
nunca debe usar prefijo `NEXT_PUBLIC_` ni enviarse al navegador.

Si se necesita disparar auditorías desde la aplicación, debe hacerse mediante
una ruta server-only autenticada o una herramienta administrativa, no
incluyendo el secreto en el bundle cliente.

### 2. Validación de proyecto y URL auditable

Orden propuesto:

1. Validar body.
2. Buscar el proyecto por `id` antes de llamar a PageSpeed.
3. Responder `404` con el envelope de error existente si no existe.
4. Normalizar la URL.
5. Exigir HTTPS en producción.
6. Rechazar credenciales embebidas, puertos no permitidos, localhost,
   direcciones privadas y hosts no autorizados.
7. Exigir que la URL coincida con la URL de despliegue registrada para ese
   proyecto.
8. Como segunda barrera, admitir solo hosts configurados en
   `AUDIT_ALLOWED_HOSTS`.
9. Ejecutar PageSpeed.
10. Comprobar el resultado de `trabajos.update()`.
11. Si `affectedRows === 0`, devolver `404` o conflicto operacional mediante
    el mismo formato de error actual.

Antes de definir `AUDIT_ALLOWED_HOSTS` hay que inventariar únicamente los
hostnames de despliegue existentes, sin copiar secretos ni query strings.

### 3. Revalidación endurecida

Mantener la ruta pública `/api/revalidate`, pero cambiar el contrato operativo
de forma controlada:

1. Identificar primero el webhook o consumidor externo, si existe.
2. Añadir `REVALIDATION_TOKEN`; admitir temporalmente
   `MI_TOKEN_SECRETO` como fallback de despliegue.
3. Cambiar la operación a `POST`.
4. Recibir el token en `Authorization: Bearer`, nunca en query string.
5. Recibir `{ "path": "..." }` como JSON.
6. Aplicar una allowlist explícita:
   - `/`
   - `/perfil`
   - `/contacto`
   - `/trabajos`
   - `/trabajos/<id positivo>`
   - `/servicios`
   - las tres rutas actuales de planes.
7. Rechazar rutas absolutas, query strings, fragmentos, traversal y dobles
   barras.
8. Añadir `Cache-Control: no-store`.
9. Mantener la respuesta de éxito `{ revalidated: true, now }`.
10. Después de actualizar el webhook, retirar GET y el secreto en query.

Si se requiere una transición sin corte, GET puede mantenerse durante un solo
despliegue con advertencia interna, pero conservar el secreto en la URL
prolonga el riesgo. La opción preferida es coordinar el consumidor y migrar
directamente a POST.

## Tests mínimos de Etapa 1

### Backend: auditoría

- rechaza ausencia de token;
- rechaza token incorrecto;
- acepta token correcto;
- no llama a PageSpeed cuando falla autenticación;
- rechaza ID inexistente antes de llamar a PageSpeed;
- rechaza hosts fuera de allowlist;
- rechaza HTTP en producción;
- rechaza localhost, IP privada, credenciales y puertos no permitidos;
- rechaza URL que no coincide con el proyecto;
- maneja `affectedRows === 0`;
- conserva exactamente la respuesta exitosa actual;
- conserva el rate limit específico.

Las llamadas a PageSpeed y el modelo Sequelize deben simularse para que los
tests no consuman red ni modifiquen MySQL.

### Frontend/Next: revalidación

- rechaza método no permitido;
- rechaza token ausente o incorrecto;
- no acepta el secreto por query string;
- rechaza path fuera de allowlist;
- rechaza traversal, URL absoluta, query y fragmento;
- llama una sola vez a `revalidatePath` para un path válido;
- conserva `{ revalidated: true, now }`;
- marca la respuesta como `no-store`.

## Archivos previstos para Etapa 1

Auditoría:

- `portafolio-backend/config/env.js`
- `portafolio-backend/routes/api.js`
- `portafolio-backend/controllers/apiController.js`
- `portafolio-backend/middleware/security.js`
- `portafolio-backend/validation/schemas.js`
- nuevo servicio o módulo de auditoría;
- nuevos tests de auditoría;
- `.env.example`, sin valores reales.

Revalidación:

- `portafolio-frontend/src/app/api/revalidate/route.ts`
- helpers server-only de autenticación y allowlist, si se extraen;
- nuevos tests para la ruta;
- `.env.example`, sin valores reales.

No se debe modificar todavía `fetchData.ts` hasta decidir cómo se ejecutarán
administrativamente las auditorías.

## Condiciones previas a implementar Etapa 1

- confirmar si existe un consumidor externo de auditoría;
- confirmar si existe un webhook externo de revalidación;
- inventariar los hosts legítimos de proyectos;
- acordar nombres y rotación de los dos tokens;
- configurar primero los secretos en cada entorno;
- desplegar backend y consumidor en un orden que evite cortes;
- conservar rutas y formatos de respuesta actuales;
- ejecutar nuevamente la línea base completa.
