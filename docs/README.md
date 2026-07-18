# Índice documental de PaginasWebChavez

## Propósito

Este directorio organiza el gobierno documental del agente y la evidencia técnica del proyecto. Cada responsabilidad tiene un único documento propietario. Los demás documentos deben enlazarlo y no copiar la misma información como autoridad actual concurrente.

Una ficha puede conservar baseline, hashes, rama, resultados, evidencia y bloqueantes observados cuando estén identificados como snapshot histórico de la tarea, con fecha o fase verificable. Ese snapshot no sustituye el estado general del documento propietario ni debe actualizarse como si fuera una segunda fuente vigente.

## Mapa de autoridad

| Responsabilidad | Documento propietario | Estado documental |
|---|---|---|
| Reglas durables del agente | [`../AGENTS.md`](../AGENTS.md) | Vigente localmente; confirmado por Pablo Chavez el `2026-07-18`; preservado localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Estado técnico y operativo actual | [`CURRENT.md`](CURRENT.md) | Fuente propietaria vigente localmente; confirmada por Pablo Chavez el `2026-07-18`; preservada localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Ficha de tarea actual | [`tasks/ACTIVE.md`](tasks/ACTIVE.md) | `PWC-2026-001` cerrada; confirmación registrada; preservada localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Ciclo y permisos por fase | [`protocols/workflow.md`](protocols/workflow.md) | Vigente localmente; confirmado por Pablo Chavez el `2026-07-18`; preservado localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Contenido comercial | [`protocols/content.md`](protocols/content.md) | Vigente localmente; confirmado por Pablo Chavez el `2026-07-18`; preservado localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Selección y registro de validaciones | [`protocols/validation.md`](protocols/validation.md) | Vigente localmente; confirmado por Pablo Chavez el `2026-07-18`; preservado localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Migraciones, backfills y datos | [`protocols/data-changes.md`](protocols/data-changes.md) | Vigente localmente; confirmado por Pablo Chavez el `2026-07-18`; preservado localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |
| Git, releases y despliegues | [`protocols/git-release-deploy.md`](protocols/git-release-deploy.md) | Vigente localmente; confirmado por Pablo Chavez el `2026-07-18`; preservado localmente en `fa5ec7f0613031216b0330470e720ec91eabacd0` |

La tabla indica el estado documental confirmado y la preservación local del núcleo, no reemplaza el contenido de [`CURRENT.md`](CURRENT.md) ni el estado detallado de la ficha. La vigencia local no acredita push, actualización remota, publicación Git, release o deploy.

## Tipos de documentación

- **En validación:** documento creado o corregido, todavía pendiente de revisión por Pablo Chavez.
- **Vigente:** documento confirmado por Pablo Chavez para gobernar su responsabilidad.
- **Histórico:** evidencia anterior que no gobierna automáticamente el presente.
- **Investigación:** análisis o recomendación sin autoridad normativa.

Los documentos existentes [`architecture/stage-0-baseline.md`](architecture/stage-0-baseline.md) y [`architecture/stage-3-contact-contract.md`](architecture/stage-3-contact-contract.md) son evidencia histórica. Pueden contener estados anteriores, contratos congelados, propuestas no implementadas, riesgos ya resueltos o información que debe volver a contrastarse. No definen el estado actual, no activan propuestas ni transmiten automáticamente sus etapas. Su aplicabilidad debe contrastarse con [`CURRENT.md`](CURRENT.md), el repositorio y la ficha activa. Esta corrección no los modifica.

## Resolución de contradicciones

1. Aplicar la precedencia definida en [`../AGENTS.md`](../AGENTS.md).
2. Identificar el propietario de la responsabilidad en este índice.
3. Comparar la afirmación con evidencia actual del código, configuración, API o base de datos cuando corresponda.
4. Detener solo el área afectada si la contradicción impide una regla o acción segura.
5. Solicitar una decisión de Pablo Chavez cuando la contradicción sea comercial, arquitectónica o de alcance.
6. Actualizar el documento propietario una vez autorizada y verificada la resolución.

Ningún roadmap, informe, ficha archivada, handoff o documento de investigación puede sobrescribir implícitamente el estado de [`CURRENT.md`](CURRENT.md).

## Crecimiento futuro

Esta etapa no crea ADR, una arquitectura consolidada, historial de releases, archivo de tareas ni repositorio propietario de contenido comercial. Cuando una necesidad demostrable y una tarea autorizada los incorporen:

- Los ADR serán propietarios de decisiones arquitectónicas durables, no del estado operativo.
- La documentación de arquitectura describirá contratos y límites, y enlazará el estado confirmado correspondiente.
- El historial registrará tareas cerradas, releases o despliegues efectivamente realizados, no planes.
- El archivo de tareas recibirá fichas cerradas sin mantener una segunda ficha activa.
- La documentación comercial separará intención, contenido aprobado y mapa de implementación según [`protocols/content.md`](protocols/content.md).

No deben crearse documentos futuros solo para completar una estructura teórica.
