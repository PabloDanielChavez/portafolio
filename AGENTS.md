# Gobierno del agente de PaginasWebChavez

## Propósito

Este archivo contiene las reglas durables vigentes localmente para el agente principal único de PaginasWebChavez. El gobierno documental fue confirmado por Pablo Chavez el `2026-07-18` y preservado localmente en Git mediante el commit `fa5ec7f0613031216b0330470e720ec91eabacd0`. No existe evidencia de push, preservación remota, publicación, release o deploy. El sistema confirmado es extensible, pero no tiene subagentes, skills, hooks, MCP ni automatizaciones propias configuradas. Cualquier extensión futura requiere una necesidad demostrable y autorización expresa de Pablo Chavez.

## Autoridad y precedencia

Pablo Chavez es la autoridad humana final del proyecto.

La precedencia es:

1. Restricciones de plataforma, seguridad y sesión.
2. Instrucción humana explícita de Pablo Chavez.
3. Este `AGENTS.md`.
4. Documentación propietaria vigente.
5. Ficha activa autorizada.
6. Código, configuración, API y base de datos como evidencia real.
7. Documentación histórica.
8. Documentación externa como orientación técnica.

Ningún documento amplía permisos concedidos por Pablo Chavez ni anula restricciones de plataforma. La documentación externa no gobierna el producto. El estado implementado no prueba por sí solo que una decisión comercial haya sido aprobada.

## Inicio obligatorio

Después de cargar este `AGENTS.md`, el agente debe:

1. Clasificar la petición usando la instrucción recibida y estas reglas.
2. Cargar documentación adicional solo por aplicabilidad:
   - [docs/README.md](docs/README.md), para localizar un propietario documental, resolver precedencia o navegar la documentación;
   - [docs/CURRENT.md](docs/CURRENT.md), cuando la tarea dependa del estado técnico u operativo actual;
   - [docs/tasks/ACTIVE.md](docs/tasks/ACTIVE.md), cuando continúe una tarea, pueda haber mutaciones, la tarea sea durable o pueda extenderse entre chats;
   - [docs/protocols/workflow.md](docs/protocols/workflow.md), cuando haya una tarea formal, fases, permisos, estados, continuidad o cierre;
   - únicamente el protocolo especializado que requiera la categoría de la tarea.
3. No abrir documentos solo porque estén enlazados y ampliar el contexto únicamente ante una necesidad comprobable.
4. Verificar la línea base y los cambios preexistentes cuando pueda haber mutaciones.
5. Confirmar alcance, exclusiones, permisos y condiciones de detención.

La clasificación mínima es: dirección o preparación; investigación; contenido comercial; auditoría read-only; frontend/UX; backend/API; base de datos; SEO; analítica; testing y accesibilidad; seguridad; documentación; Git/versionado; publicación/deploy; handoff.

## Protección del proyecto

- Preservar cambios preexistentes y no corregirlos, moverlos, limpiarlos ni incorporarlos sin autorización.
- No leer, mostrar, copiar o versionar secretos salvo necesidad demostrada y permiso explícito. Los archivos `.env`, backups y credenciales quedan fuera de staging por defecto.
- Usar scripts y comandos comprobados en el repositorio. No inventar gates ni declarar que una validación pasó si no fue ejecutada.
- Limitar cada mutación a la allowlist autorizada. Una auditoría no autoriza correcciones.
- Tratar investigación, decisión comercial, contenido aprobado, implementación y evidencia de producción como estados distintos.

## Investigación externa

La investigación web pública y read-only puede realizarse cuando la petición la exige o es necesaria para decidir correctamente, siempre que la plataforma y la sesión permitan el acceso. No requiere autorización individual para cada página pública. Debe priorizar fuentes oficiales, registrar su aplicabilidad cuando influyan en una decisión y no reemplazar evidencia del repositorio ni decisiones de Pablo Chavez. Fuentes privadas, paneles autenticados, logs, bases de datos, secretos, servicios externos y verificaciones de producción requieren el alcance y la autorización aplicables. `git fetch` mantiene autorización independiente.

## Mutaciones documentales

La obligación de mantener documentación actualizada no autoriza a modificarla. `CURRENT.md`, `ACTIVE.md` y cualquier otro documento solo pueden editarse cuando estén incluidos en la allowlist y la fase documental haya sido autorizada. Si no existe autorización, el agente debe reportar en el cierre qué actualización queda pendiente.

Una tarea no queda artificialmente abierta solo porque un documento que necesita actualización esté fuera de la allowlist. El agente debe registrar la actualización como pendiente o como bloqueante según su impacto sobre la trazabilidad, la seguridad o la capacidad de comprobar el resultado.

## Fases y permisos

Auditoría, análisis, preparación, mutación, validación, Git, release y deploy son fases separadas. Una fase no autoriza la siguiente y los permisos no se arrastran.

La existencia de una ficha no autoriza su ejecución. `aprobada` no equivale a `autorizada`. Una implementación terminada no autoriza staging, commit, checkpoint, tag, push, PR, release ni deploy. Cada operación mutante debe estar cubierta expresamente según [docs/protocols/workflow.md](docs/protocols/workflow.md) y [docs/protocols/git-release-deploy.md](docs/protocols/git-release-deploy.md); una misma instrucción solo puede cubrir varias operaciones bajo las condiciones que allí se definen.

## Detención general

Detener el área afectada si aparece una contradicción relevante, cambia inesperadamente la línea base, falta una fuente o decisión necesaria, la allowlist es insuficiente, se requiere un secreto no autorizado, no puede identificarse el entorno, falla un gate obligatorio o la acción necesaria excede los permisos. Continuar solo con áreas independientes y seguras.

## Definición general de terminado

Una tarea está técnicamente terminada cuando el alcance autorizado fue completado, los cambios ajenos fueron preservados, las validaciones proporcionales fueron registradas, el diff fue revisado y los riesgos residuales quedaron explícitos. Los documentos propietarios se actualizan solo si están en la allowlist y la fase documental fue autorizada; de lo contrario, el cierre debe registrar la actualización pendiente y determinar si es informativa o bloqueante. El cierre local no implica staging, commit, tag, push, release ni deploy.

## Documentos propietarios

- Índice y mapa de autoridad: [docs/README.md](docs/README.md)
- Estado técnico y operativo actual: [docs/CURRENT.md](docs/CURRENT.md)
- Ficha única de tarea actual: [docs/tasks/ACTIVE.md](docs/tasks/ACTIVE.md)
- Ciclo de trabajo: [docs/protocols/workflow.md](docs/protocols/workflow.md)
- Contenido comercial: [docs/protocols/content.md](docs/protocols/content.md)
- Validaciones: [docs/protocols/validation.md](docs/protocols/validation.md)
- Cambios de datos: [docs/protocols/data-changes.md](docs/protocols/data-changes.md)
- Git, releases y despliegue: [docs/protocols/git-release-deploy.md](docs/protocols/git-release-deploy.md)

## Cierre esperado

El cierre de cada tarea debe informar: resultado; alcance realizado; archivos o sistemas afectados; validaciones ejecutadas, fallidas, omitidas, bloqueadas o no aplicables; cambios preexistentes preservados; riesgos y limitaciones; estado de la ficha; operaciones no realizadas; y próximo paso no autorizado cuando exista.
