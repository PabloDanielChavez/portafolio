# Protocolo de trabajo

## Propósito

Definir el ciclo general del agente principal, la carga proporcional de contexto y la separación de permisos. Las reglas durables y el gobierno documental vigentes localmente fueron confirmados por Pablo Chavez el `2026-07-18`; están en [`../../AGENTS.md`](../../AGENTS.md). El estado técnico y operativo actual y la ficha de tarea pertenecen a [`../CURRENT.md`](../CURRENT.md) y [`../tasks/ACTIVE.md`](../tasks/ACTIVE.md).

## Taxonomía canónica de estados

- `preparada`: alcance propuesto, sin aceptación ni mutación.
- `aprobada`: Pablo Chavez aceptó la intención, decisión o alcance; no habilita mutación automáticamente.
- `autorizada`: una instrucción expresa habilitó fase, efectos, entorno y allowlist.
- `en ejecución`: mutación autorizada en curso.
- `en validación`: ejecución terminada y pendiente de gates o de la aceptación exigida por la ficha.
- `cerrada`: se completó el alcance local y se cumplieron los criterios de aceptación definidos para la tarea.
- `publicada`: se completó y verificó todo el alcance externo autorizado de la tarea.

La existencia de una ficha o un cambio de estado no concede permisos. No toda tarea necesita alcanzar `publicada`; las tareas sin operación externa pueden terminar en `cerrada`.

## Transiciones de estado

Los estados describen hitos permitidos, no una secuencia que toda tarea deba recorrer. Una consulta read-only breve puede no utilizar esta taxonomía. Toda mutación debe pasar por `autorizada`; puede avanzar a `en ejecución` y luego a `en validación` cuando la ejecución termine. Una corrección posterior vuelve a `en ejecución` solo con una autorización aplicable.

Una misma instrucción de Pablo Chavez puede producir `aprobada` y `autorizada` cuando identifica expresamente ambos efectos, la fase, la allowlist, el entorno y los límites. Si esos elementos no están presentes, la aprobación no implica autorización. Si la ficha exige revisión de Pablo Chavez, permanece `en validación` hasta que esa revisión ocurra. Una tarea sin operación externa puede terminar en `cerrada`. `publicada` se limita al alcance externo completo definido para la tarea; una publicación parcial se registra como resultado parcial y no permite usar `publicada` si falta parte del alcance autorizado. Un estado no transmite permisos a una fase posterior y la aceptación de riesgo no convierte un gate fallido en exitoso.

Cada transición debe reflejar evidencia real y solo se registra en la ficha cuando su escritura está autorizada. Las pausas conservan el estado efectivamente alcanzado.

## Admisión de tareas

Una consulta o auditoría read-only breve puede realizarse sin crear, sustituir ni modificar la ficha activa.

Una tarea necesita ficha activa cuando modifica archivos o sistemas; puede continuar entre chats; afecta contenido comercial, datos, Git, release o deploy; o necesita conservar alcance, permisos, decisiones, evidencia o bloqueantes.

Mientras exista una ficha activa sin cerrar, puede continuarse esa tarea y pueden realizarse consultas read-only independientes. Una nueva tarea mutante solo puede prepararse mediante operaciones read-only. Antes de mutar, Pablo Chavez debe decidir expresamente si corresponde continuar, cerrar o sustituir la tarea activa. No se crean fichas para cada consulta ni un sistema de tareas paralelas.

Sustituir la ficha no puede destruir su única evidencia. `ACTIVE.md` solo puede reutilizarse cuando la ficha anterior esté `cerrada` y haya quedado preservada duraderamente en Git o mediante otro mecanismo expresamente autorizado. Antes del primer registro durable en Git, `ACTIVE.md` no puede sobrescribirse. Reutilizar, sustituir o archivar la ficha siempre requiere allowlist documental y autorización de esa fase. Esta etapa no crea un archivo histórico de tareas.

## Ciclo general

1. **Recepción:** identificar la petición, autoridad, restricciones y entregable.
2. **Clasificación:** asignar una o más categorías definidas en `AGENTS.md`.
3. **Carga mínima:** abrir únicamente los documentos aplicables según la ruta de contexto proporcional.
4. **Línea base:** comprobar rama, estado, diffs, archivos existentes y cambios ajenos cuando pueda haber mutaciones.
5. **Preparación read-only:** investigar, delimitar alcance, allowlist, exclusiones, riesgos, gates y condiciones de aborto.
6. **Aprobación:** obtener aceptación expresa de Pablo Chavez sobre la intención o el alcance cuando sea necesaria.
7. **Autorización técnica:** confirmar la fase, los paths, comandos, entornos y efectos permitidos.
8. **Ejecución:** aplicar solo el cambio autorizado y preservar el resto.
9. **Validación:** ejecutar gates proporcionales según [`validation.md`](validation.md).
10. **Revisión del diff:** comprobar alcance, cambios ajenos, secretos y efectos no deseados.
11. **Cierre local:** registrar resultado, evidencia, limitaciones y riesgos residuales.
12. **Git independiente:** exigir cobertura expresa para staging, commit, checkpoint, tag, push o PR; una instrucción puede cubrir staging y commit únicamente bajo el flujo conjunto y condicional del protocolo Git.
13. **Publicación o deploy independiente:** solicitar la operación externa exacta y aplicar [`git-release-deploy.md`](git-release-deploy.md).
14. **Actualización de estado:** modificar documentos propietarios solo si están en la allowlist y la fase documental está autorizada; de lo contrario, registrar la actualización propuesta en el cierre.
15. **Continuidad:** registrar el próximo paso no autorizado y, cuando no haya escritura documental autorizada, entregar un handoff textual autocontenido sin crear archivos.

## Separación de fases

- Una fase no autoriza la siguiente y los permisos no se arrastran.
- Una auditoría no autoriza correcciones.
- Una aprobación no autoriza ejecución salvo que una instrucción de Pablo Chavez cumpla también las condiciones explícitas de autorización.
- Una implementación no autoriza staging ni otras operaciones Git.
- Git no autoriza release, publicación Git ni deploy.
- Un deploy de frontend no autoriza backend o base de datos, y viceversa.

## Autorización documental

La necesidad de mantener documentación no concede permiso para editarla. `CURRENT.md`, `ACTIVE.md` y cualquier otro documento requieren inclusión expresa en la allowlist y autorización de la fase documental.

Si una actualización necesaria queda fuera de alcance, el agente debe:

1. No modificar el documento.
2. Describir en el cierre el cambio propuesto y su propietario.
3. Indicar si la omisión es informativa, un riesgo residual o un bloqueante.
4. Solicitar una tarea documental separada cuando corresponda.

Una tarea puede cerrarse con una actualización documental pendiente si la ausencia no impide comprobar el resultado, mantener la seguridad ni reconstruir el estado. Si sí lo impide, debe registrarse como bloqueante.

## Contexto proporcional

Después de `AGENTS.md`, el agente determina la carga adicional por aplicabilidad:

- consulta read-only breve: puede bastar `AGENTS.md`;
- consulta de estado o runtime: `AGENTS.md` y [`../CURRENT.md`](../CURRENT.md);
- tarea durable o mutante: `AGENTS.md`, [`../tasks/ACTIVE.md`](../tasks/ACTIVE.md) y este workflow;
- protocolo especializado: solo el que corresponda a la categoría;
- [`../README.md`](../README.md): cuando sea necesario navegar, localizar un propietario o resolver autoridad.

Esta ruta es un mínimo orientativo, no una obligación rígida. El contexto debe ampliarse ante una necesidad comprobable. No deben cargarse historiales, auditorías, matrices, código o documentación externa completa si bastan fuentes propietarias más concretas, ni documentos únicamente porque estén enlazados.

La investigación web pública y read-only puede realizarse cuando la petición la exige o es necesaria para decidir correctamente, siempre que la plataforma y la sesión permitan acceso. No requiere autorización individual para cada página pública. Debe priorizar fuentes oficiales y registrar aplicabilidad cuando influya en una decisión. No reemplaza evidencia del repositorio ni decisiones de Pablo Chavez.

Fuentes privadas, paneles autenticados, logs, bases de datos, secretos y servicios externos requieren autorización explícita. Verificar producción debe estar dentro del alcance de validación autorizado. `git fetch` conserva autorización independiente porque descarga objetos y actualiza referencias locales.

## Contradicciones y pausas

Una contradicción bloquea solo el área afectada cuando el resto es independiente. Si la ficha está en la allowlist y la fase documental fue autorizada, debe registrar:

- hecho contradictorio;
- fuentes involucradas;
- impacto;
- parte que puede continuar;
- decisión o evidencia necesaria;
- estado alcanzado sin atribuir cierre.

Una tarea pausada conserva su estado real. Si no está autorizada la escritura de la ficha, el cierre debe informar el estado alcanzado, el bloqueo y la actualización propuesta sin atribuir que el documento fue modificado. La pausa no crea una autorización futura implícita.

## Continuidad entre chats

Cuando está autorizado y actualizado, [`../tasks/ACTIVE.md`](../tasks/ACTIVE.md) es la fuente durable local de continuidad de la tarea. Se actualiza con resultado parcial, evidencia, validaciones, bloqueantes, cambios preexistentes y próximo paso no autorizado solo si está en la allowlist y la fase documental fue autorizada. [`../CURRENT.md`](../CURRENT.md) se actualiza bajo las mismas condiciones únicamente cuando cambió el estado técnico u operativo general.

Un handoff textual es solo un medio de transporte: no es fuente propietaria, no concede permisos ni acredita por sí solo el estado actual. Al recibirlo en otro chat, el agente debe contrastarlo mediante operaciones read-only con `ACTIVE.md`, `CURRENT.md`, Git y la evidencia aplicable.

Si no existe handoff, está incompleto o `ACTIVE.md` está desactualizado, solo puede reconstruirse el estado mediante operaciones read-only. No se retoman mutaciones. Ninguna mutación se retoma en otro chat sin una nueva instrucción expresa de Pablo Chavez.

Si no está autorizada la escritura documental, el cierre debe entregar un handoff textual autocontenido sin crear archivos, aclarar que no modificó el estado propietario e identificar la actualización pendiente y la limitación de continuidad. No debe afirmarse que la continuidad es independiente del chat cuando la documentación propietaria no fue actualizada.

## Actualización y archivo

- Actualizar `ACTIVE.md` durante cambios de estado, alcance, permisos, validación, bloqueo o resultado solo cuando el archivo esté en la allowlist y la fase documental esté autorizada.
- Actualizar `CURRENT.md` cuando cambie la arquitectura entregada, fuente runtime, línea base relevante, despliegue verificable, gate disponible, gobierno confirmado o bloqueante general, siempre que el archivo y la fase estén autorizados.
- No copiar en `CURRENT.md` el detalle operativo de la ficha.
- Si falta permiso documental, reportar la actualización propuesta y su impacto sin modificar el archivo.
- Una ficha solo puede archivarse o reutilizarse después de `cerrada` y de quedar preservada duraderamente en Git o mediante otro mecanismo expresamente autorizado. El archivo, sustitución o reutilización requieren paths exactos en la allowlist y una fase documental autorizada. Antes del primer registro durable en Git, `ACTIVE.md` no puede sobrescribirse. Esta etapa no crea el sistema de archivo.
