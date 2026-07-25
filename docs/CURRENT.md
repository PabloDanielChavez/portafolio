# Estado actual de PaginasWebChavez

Fecha de corte: 2026-07-25

Este archivo es la fuente propietaria vigente localmente del estado técnico y operativo actual. Pablo Chavez revisó y aprobó las catorce decisiones y confirmó el núcleo documental como gobierno vigente del proyecto el `2026-07-18`. La vigencia local no acredita por sí sola aprobación comercial de contenidos específicos, preservación Git, releases, deploys o estado de producción.

## Actualización vigente — PWC-2026-002

La tarea activa es [`PWC-2026-002`](tasks/ACTIVE.md), `Rediseño visual progresivo`, con estado `en validación` al cierre de su regresión R1. La baseline documental de esta tarea es `1b0b2fd` en la rama local `main`; no se realizó ninguna operación Git mutante, publicación, release ni deploy durante sus fases.

Se ejecutaron F1, F2, F3, C1, C2, S1, S2, E1, E2, E3, E4, E5, J1, J2 e I1, seguidas de R1. El resultado es una actualización visual progresiva de fundamentos, Header, Servicios, planes, Trabajos, Jardinería Montañez, Contacto, Perfil/Opiniones, Footer, 404 e Inicio, manteniendo fuera de alcance la oferta, copy comercial, datos, precios, rutas, enlaces, imágenes, API y backend.

R1 verificó las rutas afectadas en `320`, `430`, `696`, `974`, `1218` y `1866px`: no se reprodujeron overflow horizontal, errores de consola, errores de red locales, duplicación de renderizado ni pérdida de foco/navegación. La 404 personalizada, el FAQ de Contacto, el enlace activo y el render SSR de las tarjetas quedaron comprobados. Las imágenes completas que mostraban repetición o lienzos negros se atribuyeron a un artefacto de captura/scroll stitching, no a una regresión del DOM.

Los gates actuales del frontend son: build aprobado con Next.js `16.2.7` y advertencias Sass preexistentes por `darken()` en `hero.module.scss`; `62` pruebas aprobadas y `14` fallidas, sin variación respecto de la baseline; y lint no disponible porque el script `next lint` no es compatible con Next.js 16. Las 14 fallas se tratarán como corrección funcional separada y no se atribuyen al rediseño hasta completar su diagnóstico.

El working tree permanece deliberadamente con cambios y archivos sin seguimiento preexistentes, además de los cambios locales de PWC-2026-002. No se hizo staging ni commit. Las entradas previas de este documento se conservan como checkpoints históricos cuando describen estados anteriores; esta sección es la referencia operativa vigente para el rediseño.

## Línea base Git

- **Verificado:** rama local `main`.
- **Verificado:** se ejecutó `git fetch origin` exitosamente antes de la sincronización local.
- **Verificado:** `main` avanzó mediante `git merge --ff-only origin/main` desde `800fd392b6427b4dc313183736c90df640a467cb` hasta `7cb970095288b9ba5281fa0a1492b1f804e7f22e`, sin crear un commit de merge.
- **Verificado:** el núcleo documental se preservó localmente mediante el commit `fa5ec7f0613031216b0330470e720ec91eabacd0` (`Establecer gobierno documental del agente PWC`).
- **Verificado:** `HEAD` local `fa5ec7f0613031216b0330470e720ec91eabacd0`.
- **Verificado:** frente a la referencia local disponible `origin/main` en `7cb970095288b9ba5281fa0a1492b1f804e7f22e`, `main` está un commit adelantada y cero commits atrasada.
- **Verificado:** el stage quedó vacío después del commit documental.
- **No documentado:** no se hizo otro `fetch` después del commit; por lo tanto, la referencia remota local no prueba el estado actual del servidor remoto.

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
- **Preservado localmente en Git:** los nueve documentos fueron registrados en `fa5ec7f0613031216b0330470e720ec91eabacd0`.
- **Verificado:** hubo staging y commit locales del núcleo; no hubo tag, push, PR, release, publicación ni deploy.

## Tarea documental cerrada y bloqueantes

- Tarea cerrada: [`PWC-2026-001`](tasks/ACTIVE.md).
- **Bloqueado para implementar contenido comercial cuya autoridad dependa de una fuente no localizada o no confirmada:** falta localizar o designar de forma verificable la fuente propietaria de intención comercial y resolver las decisiones aplicables. Con alcance autorizado pueden continuar auditorías, inventarios, recuperación de fuentes, reconciliación, preparación e identificación de decisiones pendientes.
- **Bloqueado para operaciones Render:** falta documentación operativa suficiente o evidencia externa autorizada.

## Próximo paso no autorizado

Una vez validada esta actualización, preservar este cambio de estado en un commit local separado mediante una fase expresamente autorizada. Este paso no está autorizado y no habilita push, tag, publicación, release, deploy ni otra operación posterior.

## Checkpoint C4.1 — cierre documental

Fecha del checkpoint: 2026-07-20.

C4.1 está cerrada dentro de su alcance editorial y técnico. C4 general no se declara cerrada mientras el plan contemple subfases posteriores. C5–C10 continúan sin autorización.

### Resultado consolidado

- El copy público aprobado fue implementado y reconciliado con B3.2.5.
- Se actualizaron los contratos editoriales afectados.
- Tests: 76 aprobados, 0 fallidos.
- TypeScript: aprobado, código de salida 0.
- Build: aprobado, código de salida 0; 13 páginas generadas.
- Las rutas `/`, `/servicios`, `/trabajos`, `/perfil` y `/contacto` respondieron con HTTP 200.
- Los recursos locales comprobados respondieron 35/35 con HTTP 200.
- La fuente vigente continúa siendo B3.2.5; Landing Page Express permanece fuera de la oferta pública.

### Gates y límites

- El gate de lint fue reparado: `npm run lint` ejecuta `eslint .` y analiza realmente el proyecto.
- ESLint registra 12 errores y 7 warnings como deuda técnica general preexistente respecto de C4.1F. No se corrigieron dentro de esta fase.
- La inspección visual automatizada no pudo completarse por aislamiento de red del navegador integrado. No se validaron formalmente los cuatro viewports.
- Pablo Chavez decidió diferir la revisión y modificación visual a una tarea exclusiva de rediseño/UI. Esto no constituye aprobación visual del diseño actual ni bloquea el cierre del alcance textual de C4.1.
- No se aprobaron formalmente responsive, contraste, foco visual, menú móvil, solapamientos, overflow, animaciones ni jerarquía visual; quedan diferidos.
- No se modificaron planes, Contacto, API, fallback, metadata, caché ni backend.
- El saneamiento progresivo de ESLint del frontend queda como deuda técnica separada.
- La advertencia del sitemap dinámico y los dos warnings de caché de webpack quedan fuera de C4.1 y pertenecen a C8/C10.
- `.next` fue regenerado. `next-env.d.ts` fue actualizado automáticamente por Next.js durante el build, luego coincidió con HEAD y dejó de aparecer como modificado; no fue editado ni restaurado manualmente.
- Permanece como pendiente documental independiente la diferencia de conteos declarados de B3.2 (58/43/8/1 = 110) frente a campos explícitos (57/41/8/1 = 107). No bloquea este cierre.

### Decisión humana

> Pablo Chavez aprueba el cierre técnico y editorial de C4.1 dentro de su alcance textual. La validación y modificación visual quedan diferidas a una tarea futura exclusiva de rediseño/UI. Los hallazgos generales de ESLint se registran como deuda técnica separada y no bloquean el cierre de esta fase editorial.

El cierre de C4.1 no autoriza automáticamente C5 ni ninguna operación de Git, publicación o deploy.

## Addendum vigente — T1
T1 corrigió el vínculo `aria-labelledby="proceso-title"` en `HomeSections.tsx` y actualizó los contratos de prueba de Contacto, Inicio/Servicios y Planes al estado vigente. No alteró copy, datos, precios, rutas, estilos ni configuración.
Tras T1, el frontend queda con `76` pruebas aprobadas y `0` fallidas. El build continúa aprobado con las advertencias Sass conocidas; la baseline histórica `62/14` se conserva únicamente como referencia de comparación. No se ejecutaron staging, commit, push, release ni deploy.
