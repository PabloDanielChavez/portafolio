# PWC-2026-001 - Núcleo mínimo de gobierno documental del agente

## Identificación

- Identificador: `PWC-2026-001`
- Estado actual: `cerrada`
- Autoridad humana: Pablo Chavez

La taxonomía y las transiciones pertenecen a [`../protocols/workflow.md`](../protocols/workflow.md). Este estado no autoriza cierre, Git ni una fase posterior.

## Objetivo y dependencia

Construir, corregir y someter a validación la primera versión mínima, coherente y mantenible del gobierno documental del agente de PaginasWebChavez.

Dependencias consultables: auditoría read-only anterior disponible en la conversación; evidencia actual del repositorio; informe metodológico comparativo localizado durante el preflight; documentación oficial previamente verificada.

## Alcance autorizado

La creación inicial comprendió exclusivamente:

- `AGENTS.md`
- `docs/README.md`
- `docs/CURRENT.md`
- `docs/tasks/ACTIVE.md`
- `docs/protocols/workflow.md`
- `docs/protocols/content.md`
- `docs/protocols/validation.md`
- `docs/protocols/data-changes.md`
- `docs/protocols/git-release-deploy.md`

Durante la creación inicial se autorizaron los directorios `docs/tasks/` y `docs/protocols/` necesarios para alojarlos. Las correcciones documentales posteriores autorizadas dentro de `PWC-2026-001`, incluida esta corrección final de operatividad, pueden modificar exclusivamente los mismos nueve archivos; no autorizan crear archivos ni directorios.

## Exclusiones

Fuera de los nueve archivos autorizados, no se permitieron cambios funcionales, configuración avanzada de Codex, subagentes, skills, hooks, MCP, automatizaciones, CI, código, configuración, documentación, contenido comercial, migraciones, tests, dependencias, Git mutante ni operaciones externas.

## Fuentes y archivos read-only

Se pudo consultar el repositorio completo, historial Git, documentación técnica existente, artefactos comerciales, frontend, backend, configuraciones, migraciones, tests, auditoría anterior, informe metodológico comparativo y fuentes oficiales necesarias.

Todos los archivos distintos de la allowlist fueron read-only.

## Decisiones aplicadas y confirmadas

Durante la construcción y las correcciones previas, Pablo Chavez autorizó expresamente:

- Durante las etapas previas, continuar dentro de `PWC-2026-001` y mantener el estado `en validación` hasta la decisión de Pablo Chavez.
- Modificar únicamente los nueve archivos de la allowlist.
- Mantener un agente principal, una fuente propietaria de estado, una ficha de tarea y cinco protocolos.
- No configurar subagentes, skills, hooks, MCP ni automatizaciones.

Confirmadas por Pablo Chavez como gobierno durable el `2026-07-18`:

- El agente principal único y extensible como modelo vigente del proyecto.
- La propiedad normativa de cada documento y protocolo.
- La incorporación futura de subagentes read-only solo ante necesidad demostrable.

Pablo Chavez revisó y aprobó las catorce decisiones, aprobó el núcleo documental y confirmó su vigencia local el `2026-07-18`.

## Snapshot de la tarea e impacto

El estado técnico y operativo general se consulta en [`../CURRENT.md`](../CURRENT.md). Los hechos siguientes son un snapshot verificado durante los preflights de `PWC-2026-001`; se conservan como evidencia histórica de la tarea y no como una segunda fuente de estado actual:

- La referencia local `origin/main` tiene un commit adicional, pero no se observaron diferencias de archivos respecto de `HEAD`; no se hizo `fetch`.
- La configuración efectiva de Render sigue parcialmente documentada.
- La matriz comercial propietaria original no fue localizada.
- Los artefactos comerciales derivados no reemplazan automáticamente esa fuente.
- La compatibilidad efectiva de todos los gates no fue ejecutada porque las pruebas estaban fuera de alcance.

El impacto sobre `PWC-2026-001` fue acotado: estas limitaciones no impidieron crear reglas conservadoras, no ampliaron la allowlist y no acreditan el estado actual de sistemas externos.

## Autorizaciones concedidas

- Inspección read-only para preflight y evidencia.
- Durante la creación inicial, creación de los nueve archivos enumerados y los dos directorios necesarios.
- Durante la revisión correctiva, modificación exclusiva de los nueve archivos enumerados.
- Para la confirmación y cierre, modificación exclusiva de `AGENTS.md`, `docs/README.md`, `docs/CURRENT.md`, `docs/tasks/ACTIVE.md`, `docs/protocols/workflow.md` y `docs/protocols/content.md`.
- Validaciones documentales read-only especificadas para esta tarea.

## Autorizaciones no concedidas

No se concedieron permisos para modificar otros archivos, ejecutar gates funcionales, leer secretos, conectarse a bases de datos, hacer `fetch`, `pull`, staging, commit, merge, rebase, checkout, switch, restore, stash, reset, clean, crear o eliminar ramas o tags, hacer push, abrir PR, crear release o preview, ejecutar deploy o rollback ni modificar servicios externos.

## Riesgos y condiciones de aborto

Riesgos: sobrescribir trabajo ajeno, duplicar estado, confundir aprobación con autorización, incorporar artefactos sensibles, declarar evidencia externa inexistente o ampliar el alcance documental.

La tarea debía detenerse si un path objetivo existía o estaba en conflicto, la allowlist era insuficiente, cambiaba inesperadamente Git, se necesitaban secretos o mutaciones, o una contradicción impedía una regla segura. El preflight no activó esas condiciones.

## Validaciones previstas

- `git diff --check`.
- Estado Git final con los nueve archivos objetivo sin seguimiento.
- Diff limitado a la allowlist.
- Confirmación de que no se modificaron paths ajenos.
- Enlaces relativos resolubles.
- Bloques Markdown balanceados.
- Ausencia de rutas absolutas de Windows.
- Ausencia de nombres, versiones o estados atribuidos a proyectos ajenos a PaginasWebChavez.
- Propiedad única de estado actual y ficha activa.
- Estado final `cerrada`.
- Ausencia de declaraciones falsas sobre Git, release o deploy.
- Ausencia de valores secretos.
- Revisión final del diff de la allowlist.

## Validaciones ejecutadas

### Creación inicial

- `Ejecutado`: `git diff --check`; sin errores. Se observó una advertencia de normalización de fin de línea en el cambio preexistente de `next-env.d.ts`, fuera de la allowlist.
- `Ejecutado`: `git status --short --untracked-files=all`; 25 entradas: 16 preexistentes preservadas y 9 paths autorizados nuevos.
- `Ejecutado`: comparación automatizada de la allowlist contra la línea base; 0 paths inesperados, 0 objetivos faltantes y 0 entradas preexistentes faltantes.
- `Ejecutado`: `git diff --` limitado a los nueve paths no produjo salida porque eran archivos nuevos sin seguimiento; este comando no acreditó su contenido.
- `Ejecutado`: resolución de 47 enlaces relativos; 0 enlaces rotos.
- `Ejecutado`: balance de bloques Markdown; 0 bloques desbalanceados.
- `Ejecutado`: búsqueda de rutas absolutas de Windows y URI locales; 0 coincidencias válidas.
- `Ejecutado`: búsqueda de nombres, versiones o estados atribuidos a proyectos ajenos a PaginasWebChavez; 0 coincidencias.
- `Ejecutado`: comprobación de propietarios; un solo archivo declara propiedad del estado técnico y operativo, y existe una sola ficha `ACTIVE.md`.
- `Ejecutado`: comprobación del estado final; una coincidencia exacta para `en validación`.
- `Ejecutado`: búsqueda de asignaciones con marcadores comunes de secretos; 0 coincidencias.
- `Ejecutado`: el contenido completo se inspeccionó mediante lectura read-only y los nueve archivos se revisaron con `git diff --no-index` contra `/dev/null`; no se inventó un diff Git para archivos untracked.
- `No aplica`: tests, lint, type-check, build, servidores, bases de datos, Playwright, axe y servicios externos; estaban expresamente fuera del alcance documental.
- `Bloqueado`: revisión de Pablo Chavez y cierre; todavía no realizados.

### Revisión correctiva

- `Ejecutado`: preflight de rama, `HEAD`, stage y referencia local de `origin/main`; rama `main`, `HEAD` `800fd392b6427b4dc313183736c90df640a467cb`, `origin/main` local `7cb970095288b9ba5281fa0a1492b1f804e7f22e` y stage vacío.
- `Ejecutado`: comprobación de existencia y hashes iniciales de los nueve objetivos; coincidieron con el cierre anterior de `PWC-2026-001` y no se detectaron cambios posteriores ajenos.
- `Ejecutado`: revisión read-only de los dos documentos históricos; permanecen sin cambios y solo se referencian como evidencia a contrastar.
- `Ejecutado`: `git diff --check`; sin errores. Solo se repitió la advertencia preexistente de normalización LF/CRLF en `portafolio-frontend/next-env.d.ts`.
- `Ejecutado`: `git diff --no-index --check` de cada objetivo contra `/dev/null`; sin errores de whitespace. Git informó únicamente la normalización LF/CRLF prevista para los nueve archivos untracked.
- `Ejecutado`: `git status --short --untracked-files=all`; 25 entradas esperadas, compuestas por 16 cambios preexistentes preservados y 9 archivos autorizados sin seguimiento.
- `Ejecutado`: comparación exacta con la línea base; 0 paths inesperados, 0 faltantes y los 9 objetivos continúan con estado `??`.
- `Ejecutado`: inspección completa de los nueve archivos y revisión de sus parches `git diff --no-index` contra `/dev/null`; no se atribuyó un diff normal de Git a archivos untracked.
- `Ejecutado`: resolución de 48 enlaces relativos; 0 enlaces rotos. Balance Markdown: 0 bloques desbalanceados.
- `Ejecutado`: validación UTF-8 de los nueve archivos; 0 secuencias inválidas y 0 archivos con BOM.
- `Ejecutado`: búsquedas de rutas absolutas de Windows, URI locales y patrones de secretos; 0 coincidencias.
- `Ejecutado`: búsquedas ortográficas y de terminología; 0 tildes objetivo omitidas. Las referencias a revisiones, aprobaciones y autoridad identifican a Pablo Chavez cuando corresponde, y no se encontraron formulaciones genéricas que sustituyan indebidamente esa identificación ni combinaciones contradictorias entre vigencia y revisión pendiente.
- `Ejecutado`: propiedad de estados; `workflow.md` contiene las 7 definiciones canónicas y sus transiciones, mientras `ACTIVE.md` conserva 1 línea de estado actual y 0 definiciones normativas.
- `Ejecutado`: comprobación de permisos documentales, contenido, validación, datos y Git; no se detectaron escrituras implícitas, duplicación del estado temporal de la matriz ni comandos Git requeridos sin clasificar. Verificación y rollback de producción conservan autorizaciones separadas.
- `No aplica`: tests, lint, type-check, build, servidores, bases de datos, backups, migraciones y servicios externos; estaban expresamente prohibidos para esta corrección documental.
- `Bloqueado`: revisión de Pablo Chavez y cierre; todavía no realizados.

### Corrección final de operatividad

- `Ejecutado`: preflight de rama, `HEAD`, stage, estado completo y referencia local de `origin/main`; coincidió con el cierre de la auditoría decisoria y no activó condiciones de aborto.
- `Ejecutado`: existencia, metadatos, hashes y lectura completa de los nueve objetivos antes de editar; los nueve continuaban sin seguimiento y no se detectaron cambios posteriores inesperados.
- `Ejecutado`: corrección limitada a los nueve archivos de la allowlist; no se crearon archivos ni directorios y los 16 cambios preexistentes conservaron su clasificación.
- `Ejecutado`: `git diff --check`; sin errores. Se mantuvo únicamente la advertencia preexistente de normalización LF/CRLF en `portafolio-frontend/next-env.d.ts`, fuera de la allowlist.
- `Ejecutado`: validación directa del contenido completo de los nueve archivos untracked; 0 líneas con whitespace final y no se atribuyó su contenido a un diff Git normal.
- `Ejecutado`: resolución de 51 enlaces relativos; 0 enlaces rotos. Balance Markdown: 0 bloques desbalanceados.
- `Ejecutado`: validación UTF-8; 0 secuencias inválidas y 0 archivos con BOM.
- `Ejecutado`: búsquedas de rutas absolutas de Windows, URI locales y asignaciones con patrones de secretos; 0 coincidencias.
- `Ejecutado`: terminología de autoridad; las referencias a revisiones y aprobaciones identifican a Pablo Chavez cuando corresponde, no se encontraron formulaciones genéricas que sustituyan indebidamente esa identificación y el próximo paso no numera la revisión de Pablo Chavez. Los controles no relacionados con autoridad se describen como validación manual, revisión visual o comprobación manual.
- `Ejecutado`: propiedad documental; las 7 definiciones de estados aparecen únicamente en `workflow.md`, existe una sola ficha `ACTIVE.md` y la ficha conserva una sola línea de estado actual `en validación`.
- `Ejecutado`: comprobaciones de operatividad; carga condicional, admisión de tareas, continuidad sin permisos implícitos, preservación durable antes de reutilizar `ACTIVE.md` y alcance completo de `publicada` quedaron definidos.
- `Ejecutado`: preparación comercial read-only, persistencia documental e implementación técnica quedaron separadas; staging y commit pueden compartir una autorización expresa solo con revisión staged intermedia.
- `Ejecutado`: `rollback definido`, `rollback preparado`, `restauración probada` y `rollback ejecutado` quedaron diferenciados en validación, datos y Git sin transmitir autorizaciones.
- `No aplica`: tests, lint, type-check, build, servidores, bases de datos, backups, migraciones, rollbacks y servicios externos; estaban expresamente prohibidos y no corresponden a esta corrección documental.
- `Bloqueado`: revisión de Pablo Chavez y cierre; todavía no realizados.

### Corrección terminológica focalizada

- `Ejecutado`: búsqueda en los nueve documentos de usos de `revisión`, `aprobación`, `autoridad` y `Pablo`, seguida de inspección contextual de las coincidencias; se confirmó el criterio terminológico registrado en las validaciones anteriores sin alterar sus resultados.
- `Ejecutado`: corrección limitada a `docs/tasks/ACTIVE.md`; la evidencia ya no depende de una expresión oculta ni de contexto externo para poder repetirse.
- `Bloqueado`: revisión de Pablo Chavez y cierre; todavía no realizados.

### Confirmación y cierre

- `Ejecutado`: Pablo Chavez revisó y aprobó las catorce decisiones evaluadas.
- `Ejecutado`: Pablo Chavez aprobó el núcleo documental y confirmó su vigencia local el `2026-07-18`.
- `Ejecutado`: `PWC-2026-001` completó el alcance local y pasó de `en validación` a `cerrada`.
- `Ejecutado`: la confirmación y el cierre no atribuyen staging, commit, tag, push, release, deploy ni publicación externa.
- `Ejecutado`: inspección completa de los nueve documentos; las afirmaciones provisionales restantes corresponden únicamente a definiciones o evidencia histórica identificada.
- `Ejecutado`: `git diff --check` y comprobación directa de whitespace en los archivos untracked; sin errores. Se conservó la advertencia LF/CRLF preexistente de `portafolio-frontend/next-env.d.ts`.
- `Ejecutado`: comparación de hashes con la línea base; cambiaron solo los seis archivos autorizados y los tres protocolos read-only permanecieron intactos.
- `No aplica`: tests, lint, type-check, build, servidores y operaciones externas; no corresponden al cierre documental y no fueron autorizados.

## Resultado y evidencia

Los nueve documentos fueron creados y corregidos localmente dentro de la allowlist y pasaron las validaciones documentales autorizadas registradas. Pablo Chavez revisó y aprobó las catorce decisiones, aprobó el núcleo documental y confirmó su vigencia local el `2026-07-18`. `PWC-2026-001` quedó `cerrada`. No existe evidencia de staging, commit, tag, push, release o deploy porque esas operaciones no fueron autorizadas ni realizadas.

Confirmado por Pablo Chavez. Pendiente de preservación durable en Git.

## Cambios preexistentes preservados

Se preservaron la modificación preexistente de `portafolio-frontend/next-env.d.ts`, los backups locales y los artefactos comerciales sin seguimiento. No fueron modificados, movidos, eliminados, restaurados ni incorporados.

Esta ficha no puede reutilizarse ni sobrescribirse hasta que su contenido haya sido preservado de forma durable y exista una nueva instrucción autorizada para sustituirla.

## Próximo paso no autorizado

Preservación durable de los nueve documentos en Git mediante una fase expresamente autorizada.
