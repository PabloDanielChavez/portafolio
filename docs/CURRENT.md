# Estado actual de PaginasWebChavez

Fecha de corte: 2026-07-18

Este archivo es la fuente propietaria vigente localmente del estado técnico y operativo actual. Pablo Chavez revisó y aprobó las catorce decisiones y confirmó el núcleo documental como gobierno vigente del proyecto el `2026-07-18`. La vigencia local no acredita por sí sola aprobación comercial de contenidos específicos, preservación Git, releases, deploys o estado de producción.

## Línea base Git

- **Verificado:** rama local `main`.
- **Verificado:** `HEAD` local `800fd392b6427b4dc313183736c90df640a467cb`.
- **Verificado:** referencia remota local disponible `origin/main` en `7cb970095288b9ba5281fa0a1492b1f804e7f22e`.
- **Verificado:** la referencia local de `origin/main` contiene un commit adicional respecto de `HEAD`.
- **Verificado:** no se observaron diferencias de archivos entre ambos árboles mediante los diffs read-only ejecutados.
- **No documentado:** no se hizo `fetch`; por lo tanto, la referencia remota local no prueba el estado actual del servidor remoto.

## Working tree conocido

- **Verificado:** existe una modificación preexistente en `portafolio-frontend/next-env.d.ts`, generada por Next.js.
- **Verificado:** existen backups locales sin seguimiento bajo `.local-backups/`.
- **Verificado:** existen informes, hojas de cálculo y CSV comerciales sin seguimiento en la raíz.
- **Verificado:** no había cambios en staging durante el preflight.
- **Verificado:** esos cambios preexistentes quedaron fuera del alcance de `PWC-2026-001` y fueron preservados.

El detalle de la tarea documental actual pertenece a [`tasks/ACTIVE.md`](tasks/ACTIVE.md).

## Arquitectura resumida

- **Verificado:** frontend con Next.js App Router, React, TypeScript estricto, SASS/SCSS Modules, SWR y Axios.
- **Verificado:** el frontend utiliza rutas de App Router, Metadata API, sitemap, robots, JSON-LD y una ruta de revalidación.
- **Verificado:** backend con Node.js 20 o posterior, Express 5, Sequelize 6, MySQL, Zod, Helmet, CORS y rate limiting.
- **Verificado:** el backend separa rutas, middleware, controladores, servicios, modelos, validación, errores, migraciones, scripts y tests.
- **Verificado:** existen migraciones y scripts de datos con mecanismos diferentes; no todos siguen un único sistema estandarizado `up/down`.

## Despliegue y servicios externos

- **Verificado:** el frontend contiene `portafolio-frontend/netlify.toml` y usa el plugin de Next.js para Netlify.
- **Parcialmente verificado:** el historial y la documentación contextual relacionan el backend con Render.
- **No documentado:** no existe `render.yaml` ni una guía operativa vigente que permita reconstruir toda la configuración real de Render desde el repositorio.
- **No documentado:** esta tarea no inspeccionó paneles, logs o estado de despliegues externos.
- **No documentado:** no se verificó que producción coincida con el working tree o con `HEAD`.

## Contenido comercial y precios

- **Verificado:** la fuente runtime actual de precios es `portafolio-frontend/src/components/utils/planes.data.ts`.
- **Verificado:** los valores runtime observados son Landing Page desde `$150.000`, Sitio Web desde `$450.000` y Desarrollo Web a presupuestar.
- **Verificado:** existen auditorías, informes y una arquitectura pública de contenido como artefactos comerciales sin seguimiento.
- **Parcialmente verificado:** esos artefactos aportan investigación y dirección propuesta, pero no constituyen todos copy final aprobado ni autorización técnica.
- **No documentado:** la matriz comercial propietaria original no fue localizada durante la auditoría ni en el preflight de esta tarea.
- **Divergencia temporal verificada:** el runtime prueba los servicios y precios entregados actualmente, mientras los documentos comerciales describen propuestas o decisiones futuras en distintos estados. La diferencia no constituye por sí sola una contradicción normativa. Solo existe contradicción cuando dos fuentes vigentes y aplicables reclaman autoridad incompatible sobre el mismo dato y momento.

## Pruebas y gates disponibles

- **Verificado:** el frontend tiene 9 archivos de prueba y el backend 12.
- **Verificado:** se observaron 164 declaraciones `test` o `it`: 78 frontend y 86 backend.
- **Verificado:** ambos paquetes tienen scripts de prueba basados en `node:test`.
- **Verificado:** el frontend tiene scripts `dev`, `build`, `start`, `lint` y `test`.
- **Verificado:** el backend tiene scripts `dev`, `start`, `test`, `check`, migración, backfill y sincronización.
- **Parcialmente verificado:** existe configuración ESLint, pero esta tarea no ejecutó ni validó el comportamiento del script `next lint` con la versión actual de Next.js.
- **No documentado:** no existe un script dedicado de type-check.
- **No documentado:** Playwright, axe y Next.js MCP no están configurados como gates del repositorio.
- **Verificado:** esta tarea no ejecutó tests, lint, type-check, build ni servidores porque estaban fuera de alcance.

## Gobierno documental

- **Verificado:** los nueve archivos del núcleo mínimo existen localmente mediante `PWC-2026-001`.
- **Verificado:** el modelo fue implementado documentalmente en local como un agente principal único y extensible, sin subagentes configurados.
- **Verificado:** existen una fuente propietaria del estado, una ficha de tarea y cinco protocolos con responsabilidades separadas.
- **Confirmado por Pablo Chavez:** Pablo Chavez revisó y aprobó las catorce decisiones y confirmó este núcleo como gobierno vigente localmente el `2026-07-18`.
- **Cerrada:** `PWC-2026-001` completó su alcance local y quedó cerrada mediante la confirmación de Pablo Chavez.
- **Pendiente de preservación durable en Git:** los nueve documentos continúan sin seguimiento.
- **No documentado:** no existe staging, commit, tag, push, release ni deploy de este núcleo.

## Tarea documental cerrada y bloqueantes

- Tarea cerrada: [`PWC-2026-001`](tasks/ACTIVE.md).
- **Bloqueado para implementar contenido comercial cuya autoridad dependa de una fuente no localizada o no confirmada:** falta localizar o designar de forma verificable la fuente propietaria de intención comercial y resolver las decisiones aplicables. Con alcance autorizado pueden continuar auditorías, inventarios, recuperación de fuentes, reconciliación, preparación e identificación de decisiones pendientes.
- **Bloqueado para operaciones Render:** falta documentación operativa suficiente o evidencia externa autorizada.

## Próximo paso no autorizado

Preservación durable de los nueve documentos en Git mediante una fase expresamente autorizada. Este paso no está autorizado por la confirmación y no habilita staging, commit, tag, push, release, deploy ni otra operación posterior.
