# Protocolo de Git, releases y despliegue

## Propósito

Separar inspección, cambios locales, operaciones Git, releases y despliegues. Este protocolo no concede permisos; cada operación mutante requiere instrucción explícita de Pablo Chavez.

## Clasificación de operaciones

### Inspección local read-only

Cuando se usan sin opciones mutantes ni redirecciones con efectos, son ejemplos de inspección:

- `git status`
- `git diff`
- `git diff --cached`
- `git log`
- `git show`
- `git branch --show-current`
- `git rev-parse`
- `git ls-tree`
- `git tag --list`
- `git remote -v`

El nombre general de un comando no determina que todos sus usos sean read-only. El agente debe evaluar la invocación completa, sus opciones, redirecciones y efectos antes de clasificarla.

### Actualización de referencias remotas locales

`git fetch` actualiza referencias remotas locales y requiere autorización, aunque no integre cambios en el working tree. `git pull` combina `fetch` con integración mediante merge o rebase y necesita autorización específica para el remoto, la rama y el método de integración.

### Working tree, índice, referencias e historial

Son operaciones mutantes o con efectos persistentes, entre otras:

- `git add`
- `git restore`
- `git checkout`
- `git switch`
- `git stash`
- `git commit`
- `git merge`
- `git rebase`
- `git reset`
- `git clean`
- creación o eliminación de ramas;
- creación o eliminación de tags.

Las operaciones destructivas, de limpieza o de reescritura de historial están prohibidas por defecto. Solo pueden considerarse con autorización explícita, objetivo exacto, línea base comprobada y condiciones seguras. Esta documentación no autoriza ninguna de ellas.

### Hitos y operaciones remotas

- **Modificación local:** cambio autorizado en el working tree.
- **Staging:** selección exacta de paths para el índice.
- **Commit:** registro local de un changeset revisado.
- **Checkpoint:** hito documental u operativo; no implica commit o tag.
- **Tag:** referencia Git a un objeto concreto.
- **Push o publicación Git:** transferencia autorizada de commits o tags al remoto especificado.
- **PR:** propuesta remota de integración.
- **Nota de versión:** descripción; no crea una release.
- **Release:** hito aprobado con alcance y evidencia.
- **Preview:** entorno externo temporal.
- **Deploy:** entrega a un entorno identificado.
- **Verificación externa de producción:** inspección posterior del entorno; puede ser read-only, pero requiere acceso externo autorizado.
- **Rollback de producción:** mutación que retorna el entorno a una versión objetivo.

Ninguna de estas operaciones implica automáticamente otra.

## Preflight y staging

Antes de una mutación Git se revisan `git status`, `git diff` y `git diff --cached`. Se identifican rama, HEAD, upstream disponible, cambios preexistentes y allowlist. La inspección local no autoriza actualizar referencias remotas ni modificar el working tree.

El staging debe usar rutas exactas. `git add .`, `git add -A` y equivalentes amplios están prohibidos por defecto. No se incorporan cambios ajenos, `.env`, credenciales, backups, dumps, artefactos sensibles o archivos generados no aprobados.

Después de staging se revisa nuevamente el diff staged. Staging no autoriza commit.

### Autorización conjunta y condicional de staging y commit

Una sola instrucción expresa de Pablo Chavez puede autorizar conjuntamente el staging de paths exactos, la revisión del diff staged y el commit condicionado a que el índice coincida con el alcance autorizado. La autorización conjunta no fusiona las operaciones.

Primero se ejecuta el staging exacto. Después se revisan `git status` y `git diff --cached`. Si aparecen archivos ajenos, secretos, generados no autorizados o alcance excedido, el flujo se detiene y no se hace commit. Si el staged diff coincide con el alcance, puede ejecutarse el commit ya autorizado. Staging por sí solo no autoriza commit.

No se usan `git add .`, `git add -A`, `git commit -a` ni equivalentes amplios por defecto. Esta regla no autoriza staging ni commit para una tarea concreta.

## Commits, checkpoints, tags y versiones

Los commits deben ser pequeños y coherentes. El asunto usa forma imperativa, describe el cambio y evita declarar una release inexistente. El cuerpo explica motivo, alcance, validaciones y riesgos cuando aporte valor. No se impone todavía una convención compleja.

Un checkpoint puede existir sin commit. `package.json` no prueba una release del producto y un roadmap no prueba una versión aprobada. Las versiones solo se asignan a releases con significado definido.

Los tags deben ser anotados y utilizarse solo para releases aprobadas. Crear un commit no autoriza tag; crear un tag no autoriza push o release remota.

Referencia técnica: [documentación de tags de Git](https://git-scm.com/docs/git-tag.html) y [pautas de commits de Git](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project).

## Publicación y despliegue

Push, PR, release, publicación Git, preview y deploy requieren autorizaciones independientes que identifiquen remoto, rama, servicio y entorno. No se asume que una plataforma desplegó por observar un commit o una configuración local.

Antes de deploy se requiere artefacto o commit identificado, gates autorizados, variables verificadas sin exponer valores, rollback definido al nivel exigido y smoke test definido. Después se registra URL o servicio, versión observada, estado, logs relevantes, smoke test y, si correspondió, el nivel de rollback alcanzado.

Frontend, backend y base de datos se tratan como unidades separadas. Un deploy frontend no autoriza backend; un deploy backend no autoriza migración; una migración no autoriza deploy.

La verificación externa de producción y el rollback tienen permisos separados. La verificación puede ser read-only, aunque requiere autorización de acceso externo cuando corresponda. El rollback es una operación mutante y potencialmente destructiva: requiere entorno exacto, versión objetivo, evidencia del problema, impacto esperado, autorización independiente y comprobación posterior.

Los niveles se distinguen como `rollback definido`, cuando existe procedimiento y criterio; `rollback preparado`, cuando recursos y pasos están disponibles; `restauración probada`, cuando se comprobó en un entorno autorizado; y `rollback ejecutado`, cuando se aplicó realmente al entorno objetivo. Definir o preparar no significa ejecutar. Una restauración de prueba puede tener efectos y necesita autorización compatible.

## PWC y proveedores

- **Frontend:** Netlify está verificado mediante configuración en el repositorio. Un archivo local no prueba un deploy real.
- **Backend:** Render está parcialmente documentado. No existe configuración declarativa suficiente en el repositorio para reconstruir por completo el servicio real.
- **Base de datos:** debe seguir [`data-changes.md`](data-changes.md) y nunca se considera parte implícita de un deploy.

No operar Netlify o Render hasta identificar proyecto, servicio, rama, entorno, comandos, variables, health check y rollback con evidencia autorizada.

## Autorizaciones independientes

Cada operación requiere autorización explícita, según corresponda:

1. Modificación local.
2. Staging de rutas exactas.
3. Commit.
4. Tag.
5. Push.
6. PR.
7. Nota de versión o release.
8. Preview.
9. Deploy frontend.
10. Deploy backend.
11. Operación de base de datos.
12. Verificación externa de producción.
13. Rollback de producción.

Staging y commit pueden estar cubiertos por una misma instrucción solo bajo el flujo conjunto y condicional definido en este protocolo; siguen siendo operaciones separadas y ninguna implica la otra. La finalización local se reporta sin proponer que estas operaciones se ejecuten automáticamente.
