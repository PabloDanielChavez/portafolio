# Protocolo de validación

## Propósito

Definir gates proporcionales, evidencia y lenguaje de resultados. Este protocolo no autoriza ejecutar comandos; la fase y los permisos se rigen por [`workflow.md`](workflow.md) y la ficha activa.

## Estados de validación

- `Ejecutado`: la comprobación fue realizada y produjo el resultado esperado; registrar comando o revisión y evidencia.
- `Fallido`: se ejecutó y no pasó; registrar hallazgo e impacto.
- `Omitido`: era aplicable, pero no se ejecutó; registrar motivo y riesgo residual.
- `No aplica`: no corresponde al alcance; justificar brevemente.
- `Bloqueado`: no pudo ejecutarse por dependencia, permiso, entorno o contradicción.

Lanzar un comando no basta para usar `Ejecutado`. Si la comprobación encuentra un incumplimiento, su estado es `Fallido`. No debe declararse éxito global ocultando estados fallidos, omitidos o bloqueados.

## Gates obligatorios

Un gate es obligatorio cuando lo establece la ficha, lo establece un protocolo vigente, deriva directamente del riesgo autorizado o fue exigido por Pablo Chavez. Debe identificarse antes de interpretar su resultado. El agente no puede declararlo retroactivamente obligatorio solo después de que falle.

## Selección y registro

Antes de validar, el agente debe inspeccionar los scripts, configuraciones y herramientas reales. No debe inventar comandos, asumir nombres estándar ni convertir herramientas futuras en gates actuales.

Por cada gate registrar:

- estado;
- comando exacto o validación manual solicitada;
- directorio o entorno;
- alcance;
- resultado relevante;
- responsable de la revisión manual;
- riesgo residual.

Las validaciones manuales deben atribuirse a Pablo Chavez o a la persona responsable que efectivamente las realizó. El agente no puede declararlas ejecutadas por inferencia.

## Matriz mínima

| Tipo de tarea | Gates proporcionales |
|---|---|
| Documentación | Diff, enlaces relativos, Markdown, autoridad, contradicciones, alcance y ausencia de secretos |
| Contenido | Fuente, aprobación, mapa de implementación, precios, promesas, duplicados, metadata y validación manual |
| Frontend lógico | Scripts reales de lint, type-check, tests, build, contratos y rutas afectadas |
| Frontend visual | Viewports, interacción, teclado, movimiento, capturas y revisión visual |
| Backend | Check sintáctico, tests, validación, errores, servicios, seguridad y regresiones |
| API | Contrato, estados HTTP, entradas válidas e inválidas, serialización, límites y compatibilidad |
| Base de datos | Entorno, backup, dry-run, transacción, migración, nivel de rollback exigido, idempotencia y conteos |
| SEO | Metadata, canonical, robots, sitemap, JSON-LD, enlaces, status HTTP e indexabilidad |
| Analítica | Contrato de eventos, data layer, tag, red, DebugView/Realtime y consentimiento cuando aplique |
| Accesibilidad | Semántica, nombres, foco, teclado, contraste, movimiento, automatización y revisión manual |
| Seguridad | Secretos, entradas, CORS, headers, rate limits, dependencias, permisos y casos negativos |
| Git | `status`, diff, diff staged, paths exactos, cambios ajenos, secretos y mensaje |
| Deploy | Build autorizado, preview, smoke test, logs, health check, versión entregada y nivel de rollback exigido |

## Niveles de rollback

- `rollback definido`: existe un procedimiento y un criterio de activación.
- `rollback preparado`: los recursos y pasos necesarios están disponibles.
- `restauración probada`: el procedimiento se comprobó en un entorno autorizado.
- `rollback ejecutado`: se aplicó realmente al entorno objetivo.

Definir o preparar un rollback no significa ejecutarlo. Una restauración de prueba puede tener efectos y requiere entorno y autorización compatibles. Las matrices o fichas deben indicar qué nivel exigen; no deben registrar `rollback` de forma aislada cuando pueda confundirse preparación con ejecución. Ejecutarlo requiere autorización independiente, entorno exacto, objetivo, impacto y validación posterior.

## Capacidades actuales y futuras

Los scripts existentes del frontend y backend pueden ser gates solo después de inspeccionarlos y recibir permiso para ejecutarlos. Su mera existencia no acredita que pasen.

Playwright, axe, comparación automatizada de screenshots, Next.js MCP y Playwright MCP son capacidades futuras mientras no estén instaladas y configuradas en el repositorio. Deben registrarse como `No aplica`, `Omitido` o `Bloqueado` según el caso, nunca como gates ejecutados.

La automatización de accesibilidad no reemplaza la comprobación manual. Una captura no acredita comportamiento. Un build exitoso no acredita analítica, SEO, accesibilidad o producción.

## Aceptación de riesgo

La aceptación de un riesgo por Pablo Chavez debe ser explícita, identificar el gate afectado y describir el impacto aceptado. No puede anular restricciones de plataforma, seguridad, secretos o permisos. Tampoco convierte un gate fallido en una validación aprobada: el gate permanece `Fallido` y la decisión se registra por separado como riesgo aceptado.

## Diff y cierre

Toda tarea con mutaciones debe revisar el diff completo de su allowlist y comparar el estado Git final con la línea base. La revisión debe detectar archivos ajenos, cambios generados, secretos, duplicación, alcance excedido y efectos no previstos.

El cierre debe enumerar todos los gates con su estado y riesgos residuales. Si un gate obligatorio falla o queda bloqueado, la tarea no puede declararse cerrada salvo aceptación explícita de Pablo Chavez que identifique el gate y el impacto, y que no contradiga restricciones superiores. La aceptación no modifica el resultado del gate.
