# Protocolo de cambios de datos

## Propósito

Gobernar cambios estructurales, migraciones, backfills, sincronizaciones, limpiezas y correcciones de datos. Este protocolo no autoriza ninguna operación. Los permisos por fase se definen en [`workflow.md`](workflow.md) y la publicación en [`git-release-deploy.md`](git-release-deploy.md).

## Precondiciones obligatorias

Antes de ejecutar una operación con datos se requiere:

1. Identificar inequívocamente entorno, host, puerto, base y usuario operativo sin exponer credenciales.
2. Confirmar si el entorno es local, prueba, staging o producción.
3. Definir tablas, filas, filtros, volumen esperado y exclusiones.
4. Obtener autorización explícita para ese entorno y esa fase.
5. Verificar que exista un backup adecuado o, si la fase lo autoriza expresamente, crear uno.
6. Ejecutar un dry-run real cuando el flujo lo soporte.
7. Definir transacción, idempotencia y bloqueo cuando correspondan.
8. Preparar migración `up/down` cuando sea compatible con el sistema adoptado.
9. Definir el nivel de rollback exigido y el criterio de aborto.
10. Registrar conteos o evidencia antes y después.

Leer configuración no autoriza mostrar secretos. Si identificar el entorno exige exponer un valor sensible, detenerse y pedir un mecanismo seguro.

## Operaciones de respaldo y recuperación

Crear un backup es una mutación y requiere autorización cuando no esté comprendido expresamente en la fase activa. Deben tratarse como operaciones independientes:

- verificar que un backup exista;
- crear un backup;
- comprobar su integridad;
- realizar una `restauración probada` en un entorno autorizado;
- aplicar un `rollback ejecutado` al entorno objetivo.

La autorización o el éxito de una de estas operaciones no autoriza las demás. Cada una requiere entorno, alcance, herramienta, evidencia y permisos compatibles con su efecto.

Los niveles se registran sin tratarlos como equivalentes:

- `rollback definido`: existe un procedimiento y un criterio de activación;
- `rollback preparado`: los recursos y pasos están disponibles;
- `restauración probada`: el procedimiento se comprobó en un entorno autorizado;
- `rollback ejecutado`: se aplicó realmente al entorno objetivo.

Definir o preparar no autoriza ejecutar. Una restauración de prueba puede producir efectos y requiere autorización y entorno compatibles. Ejecutar rollback requiere autorización independiente, entorno exacto, objetivo, impacto y validación posterior.

## Separación de operaciones

- **Cambio estructural:** modifica esquema, índices, restricciones o relaciones.
- **Backfill:** completa o transforma datos dentro de un esquema disponible.
- **Sincronización:** copia o reconcilia datos entre fuentes identificadas.
- **Limpieza:** elimina o retira datos, columnas, fallbacks o compatibilidad temporal.

Estas operaciones deben separarse cuando tengan riesgos, rollback o evidencia diferentes. Una migración estructural exitosa no autoriza el backfill ni la limpieza.

## Seguridad de ejecución

- Un dry-run que modifica datos es `Fallido` y obliga a detener el flujo.
- Ejecutar localmente no autoriza staging ni producción.
- Una transacción debe abarcar todas las escrituras que necesiten atomicidad; si el motor o la operación no permiten rollback, debe documentarse antes de autorizar.
- La idempotencia debe demostrarse cuando la operación pueda repetirse.
- El backup debe tener alcance, fecha, ubicación protegida y procedimiento de restauración verificable.
- Los conteos deben cubrir registros seleccionados, cambiados, omitidos, fallidos y, cuando aplique, restaurados.
- Producción requiere autorización explícita que nombre el entorno y la operación.

## Sistemas de migración existentes

El agente no debe asumir que todas las migraciones actuales de PWC siguen un único sistema. Antes de proponer comandos debe inspeccionar `package.json`, scripts, migraciones y convenciones efectivas del área.

Las migraciones `up/down` y transacciones son el objetivo cuando son compatibles con el sistema adoptado, pero estandarizar los mecanismos actuales requiere una tarea independiente. Este protocolo no autoriza reescrituras retroactivas.

Referencias técnicas: [migraciones de Sequelize](https://sequelize.org/docs/v6/other-topics/migrations/), [transacciones de Sequelize](https://sequelize.org/docs/v6/other-topics/transactions/) y [backup y recuperación de MySQL](https://dev.mysql.com/doc/refman/8.4/en/backup-and-recovery.html).

## Condiciones de aborto

Detener la operación si:

- el entorno, host o base son ambiguos;
- la autorización corresponde a otro entorno;
- falta backup o no puede verificarse su recuperabilidad;
- el dry-run escribe;
- el alcance observado excede los filtros o conteos esperados;
- falta el nivel de rollback exigido para un riesgo no aceptado;
- aparecen errores parciales que rompen atomicidad;
- se detectan secretos en salida o diff;
- el script intenta conectarse a producción sin autorización;
- cambia el esquema o la fuente durante la ejecución;
- se necesita ampliar tablas, filas o comandos autorizados.

Una migración exitosa no autoriza commit, deploy, backfill, limpieza ni operación externa posterior. Cada fase debe validarse y autorizarse por separado.
