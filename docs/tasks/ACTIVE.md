# PWC-2026-002 — Rediseño visual progresivo

## Identificación

- Identificador: `PWC-2026-002`
- Estado actual: `en validación`
- Autoridad humana: Pablo Chavez
- Procedimiento aplicable: [`../../documentacion/rediseño-visual/investigaciones-y-auditorias/06-procedimiento-rediseño-visual.md`](../../documentacion/rediseño-visual/investigaciones-y-auditorias/06-procedimiento-rediseño-visual.md)

La taxonomía y las transiciones pertenecen a [`../protocols/workflow.md`](../protocols/workflow.md). El estado `preparada` no autoriza una fase mutante, Git ni una operación externa.

## Objetivo

Ejecutar de forma progresiva el rediseño visual validado, preservando contenido, oferta, datos, rutas y contratos funcionales. Cada fase de producto requiere una autorización separada con allowlist exacta.

## D0 — Admisión, baseline y autorización documental

### Alcance autorizado y ejecutado

Pablo Chavez autorizó modificar únicamente `docs/tasks/ACTIVE.md` para sustituir la ficha cerrada `PWC-2026-001` por esta ficha. No están autorizados cambios en `CURRENT.md`, React, SCSS, tests, configuración ni Git.

La ficha `PWC-2026-001` está cerrada y preservada localmente en Git mediante `fa5ec7f0613031216b0330470e720ec91eabacd0`. Un apéndice no preservado añadido posteriormente a su ficha fue descartado por instrucción expresa de Pablo Chavez durante esta sustitución.

### Baseline reproducida

- Rama: `main`.
- HEAD de baseline: `1b0b2fd` (`chore(git): actualiza exclusiones de documentacion local`).
- Commit visual inmediatamente anterior: `27dd934` (`style(frontend): actualiza copy y estilos del rediseno visual`).
- Estado Git posterior a esos commits: sin cambios staged; se preservan cambios ajenos en `docs/CURRENT.md`, `portafolio-frontend/package.json`, rutas de `src/app`, `src/types/plan.ts`, dos pruebas, `.local-backups/` y el logo público sin seguimiento.
- Build: aprobado con Next.js 16.2.7; persisten advertencias de deprecación Sass por `darken()` en `src/styles/sections/hero.module.scss` y la advertencia de sitemap dinámico.
- Pruebas frontend: 62 aprobadas y 14 fallidas. Los fallos corresponden a contratos de contenido, Contacto y un `aria-labelledby` ya presentes en la baseline; no se atribuyen a esta fase documental.
- Lint: no disponible con el script actual `next lint` en Next.js 16.
- Evidencia runtime y visual: [`../../documentacion/rediseño-visual/investigaciones-y-auditorias/05-validacion-runtime-y-baseline.md`](../../documentacion/rediseño-visual/investigaciones-y-auditorias/05-validacion-runtime-y-baseline.md).

### Exclusiones vigentes

- No modificar contenido comercial, datos, precios, enlaces, imágenes, API, backend, configuración, tests ni contratos funcionales.
- No modificar React, SCSS ni rutas hasta recibir autorización de una fase concreta.
- No ejecutar staging, commit, push, pull, fetch, release, deploy ni cambios externos como parte de esta tarea sin autorización independiente.
- No corregir ni incorporar los cambios preexistentes fuera de la allowlist de cada fase futura.

### Bloqueantes y próximos permisos

D0 no transmite permisos por sí misma. Las fases siguientes se ejecutaron exclusivamente mediante autorizaciones expresas de Pablo Chavez, con allowlists concretas, y se registran a continuación.

## Registro acumulativo de ejecución

Fecha de actualización: 2026-07-25.

### Fundamentos y componentes compartidos

- `F1` y `F2` — ejecutadas: se incorporaron fundamentos SCSS aditivos, breakpoints, contraste y estados globales en los archivos base autorizados. No se retiraron tokens ni reglas existentes.
- `F3` — ejecutada: `ServicioCard` y `TrabajoCard` quedaron visibles por defecto; la animación pasó a ser una mejora progresiva. La validación SSR confirmó contenido visible sin JavaScript.
- `C1` — ejecutada: `SectionHeader` incorporó una API tipada de variantes y su salida por defecto se conservó para los consumidores sin variante explícita.
- `C2` — ejecutada: se alineó el Header en los breakpoints validados y se diferenciaron visualmente los estados del CTA `Hablemos`, incluida su interacción en menú móvil.

### Pilotos y expansiones

- `S1` y `S2` — ejecutadas en `/servicios`: se aplicaron orientación de capacidades y comparación de planes mediante scopes explícitos, preservando precios, datos, CTAs y la instancia de Planes en Inicio hasta I1.
- `E2` — ejecutada: se extendió la lectura de proceso y comparación a los tres detalles de planes sin cambiar precios, alcance, copy, FAQ ni destinos.
- `J1` y `J2` — ejecutadas en Jardinería Montañez: se reorganizaron narrativamente la captura, metadatos y el instrumento técnico sin alterar datos, métricas, enlaces ni recursos del caso.
- `E1` — ejecutada en `/trabajos`: se separó el scope del listado completo respecto de Inicio para evitar que el diseño editorial de la portada deformara el listado.
- `E3` — ejecutada en `/contacto`: se ajustó la relación entre formulario, confianza, canales y FAQ. Se registró una contradicción acotada: existía un piloto parcial en el working tree antes de su autorización documental; se lo trató como estado a contrastar y sólo se refinó dentro del alcance aprobado.
- `E4` — ejecutada en Perfil y Opiniones: se aplicó la variante humana y se corrigió la superposición de capas tipográficas observada durante la validación visual.
- `E5` — ejecutada: se preservaron el patrón principal del Footer y el texto completo de la 404; se ajustó únicamente su jerarquía secundaria y agrupación responsive.
- `I1` — ejecutada en Inicio: se integraron únicamente variantes ya aprobadas para Servicios, Trabajos, Planes y Proceso. Hero, Opiniones y CTA final conservaron sus composiciones vigentes.

### R1 — Regresión global y cierre local

R1 se ejecutó en modo read-only, sin modificar código, configuración, Git ni servicios externos.

- Rutas verificadas: `/`, `/servicios`, los tres detalles de planes, `/trabajos`, `/trabajos/jardineria-montanez`, `/perfil`, `/contacto` y una 404.
- Viewports verificados: `320`, `430`, `696`, `974`, `1218` y `1866px`.
- Resultado runtime: un único `h1` por ruta; sin overflow horizontal; navegación, foco de formulario, FAQ expandible, enlace activo y 404 personalizada correctos; consola sin errores ni advertencias.
- Build: aprobado con Next.js `16.2.7`; persisten advertencias Sass preexistentes por `darken()` en `hero.module.scss`.
- Pruebas frontend: `62` aprobadas y `14` fallidas, sin regresión respecto de la baseline. Las fallas conocidas no se corrigieron dentro del rediseño.
- Lint: no disponible como gate porque el script actual usa `next lint`, incompatible con Next.js 16.
- `git diff --check`: aprobado. No se ejecutaron staging, commit, push, tag, release ni deploy.

La evidencia visual de capturas con repetición o lienzos negros se clasificó como artefacto de captura/scroll stitching: no se reprodujo en el DOM, en la matriz de rutas ni en la medición de overflow.

## Estado y próximo paso no autorizado

El rediseño visual queda `en validación`: no hay bloqueadores runtime conocidos dentro de su alcance, pero falta la aprobación humana explícita de cierre local. La investigación y corrección de las 14 pruebas baseline constituye trabajo funcional separado; antes de editar código o tests requiere una nueva fase con allowlist, alcance y validaciones explícitas. Ningún estado de esta ficha autoriza Git, publicación, release ni deploy.

## Addendum T1 — Corrección de pruebas baseline
T1 se ejecutó con autorización expresa y allowlist limitada a `src/components/sections/HomeSections.tsx`, `test/contactContract.test.mjs`, `test/homeServicesCommercialContent.test.mjs` y `test/plansCommercialContent.test.mjs`.
- Se corrigió el vínculo `aria-labelledby="proceso-title"` mediante `headingId="proceso-title"` en el `SectionHeader` de Proceso.
- Se actualizaron únicamente los contratos de prueba que describían copy, orden, etiquetas, precios contractuales, FAQ y estructura vigentes.
- No se modificaron copy, datos, precios, rutas, estilos ni configuración.
- `npm.cmd test`: `76` aprobadas, `0` fallidas.
- `npm.cmd run build`: aprobado; permanecen las advertencias Sass preexistentes por `darken()` en `hero.module.scss`.
- `git diff --check`: aprobado. No se ejecutaron operaciones Git mutantes.
El rediseño continúa `en validación` hasta la aprobación humana explícita de su cierre local.
