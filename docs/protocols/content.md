# Protocolo de contenido comercial

## Propósito

Gobernar la relación entre intención comercial, copy aprobado y contenido entregado, sin convertir investigación o código en aprobación implícita. El gobierno documental de contenido fue confirmado por Pablo Chavez el `2026-07-18`; el estado actual pertenece a [`../CURRENT.md`](../CURRENT.md) y el alcance de tarea a [`../tasks/ACTIVE.md`](../tasks/ACTIVE.md).

## Flujo propietario

```text
investigación
-> decisión comercial de Pablo Chavez
-> contenido aprobado
-> mapa de implementación
-> frontend/API/base de datos
-> metadata
-> evidencia local
-> evidencia de producción
```

Cada transición requiere evidencia y, cuando implique una acción, autorización para esa fase.

## Distinciones obligatorias

- **Investigación:** inventario, auditoría o evidencia que describe opciones o problemas.
- **Recomendación:** propuesta derivada de la investigación; no gobierna el producto.
- **Decisión comercial:** elección expresa de Pablo Chavez sobre servicios, precios, promesas, CTA o posicionamiento.
- **Arquitectura pública:** estructura aprobada de qué contenido debe existir y dónde, sin implicar copy final.
- **Copy final:** texto candidato completo y trazable.
- **Contenido aprobado:** copy aceptado expresamente por Pablo Chavez.
- **Autorización técnica:** permiso para persistir un mapa o implementar un alcance concreto.
- **Implementación:** cambio aplicado en frontend, API o base de datos.
- **Contenido runtime:** valor que el sistema local entrega actualmente.
- **Producción:** contenido observado en el entorno externo identificado.

El código, la API y la base de datos prueban entrega, no aprobación comercial. Una implementación local no prueba producción.

## Fuentes y mapeo

La fuente propietaria de intención comercial debe estar identificada, versionada o referenciada con propietario, fecha y ubicación verificable. Los informes derivados no reemplazan automáticamente la fuente propietaria.

Si la fuente propietaria no está disponible o no puede identificarse, la implementación afectada se detiene y el estado se consulta en [`../CURRENT.md`](../CURRENT.md) y la ficha activa.

El mapa de implementación debe vincular cada decisión o bloque aprobado con rutas, componentes, helpers, metadata, endpoints, serializadores, tablas y campos que correspondan. Debe identificar fuente runtime, fallback, duplicación y validación esperada.

## Preparación, persistencia e implementación

- **Preparación read-only:** investigación, inventario, reconciliación y mapeo conceptual que pueden producir una propuesta sin modificar archivos ni sistemas.
- **Persistencia del mapa:** guardar la propuesta en documentación; requiere allowlist y autorización documental.
- **Implementación técnica:** aplicar el contenido en frontend, API o base de datos; requiere allowlist y autorización técnica para el entorno y los efectos correspondientes.

Un mapa propuesto puede prepararse read-only. Prepararlo no convierte la propuesta en contenido aprobado. La implementación continúa necesitando una decisión comercial aplicable y autorización técnica.

## Reglas comerciales

- **Datos comerciales:** cada dato comercial, como precio, moneda, condición, visibilidad o alcance, debe tener una única fuente autoritativa identificada. Las distintas rutas, componentes, metadata, API o canales pueden derivar presentaciones de esa fuente, pero no mantener valores independientes sin una decisión documentada. Este protocolo no decide cuál será esa fuente futura.
- **Servicios:** altas, bajas, nombres, alcance o jerarquía requieren decisión comercial.
- **Promesas:** plazos, resultados, garantías y capacidades no pueden inferirse ni ampliarse desde el código.
- **CTA:** destino, compromiso y medición deben ser coherentes con el servicio aprobado.
- **Casos de estudio:** distinguir datos operativos, narrativa comercial, privacidad, fallback y evidencia real.
- **Metadata:** debe derivar del contenido aprobado y no introducir una segunda promesa o posicionamiento.
- **API o DB:** ser fuente runtime no convierte el contenido en decisión comercial aprobada.

## Fallbacks y duplicaciones

Una duplicación transitoria solo es admisible si registra motivo, fuente primaria, precedencia, alcance, observabilidad, propietario, criterio de retiro y validación. Un fallback no puede ocultar indefinidamente errores de la fuente primaria.

El retiro requiere evidencia de que la fuente primaria cubre el alcance, que no existe dependencia activa del fallback y que las validaciones locales y, cuando corresponda, de producción pasaron.

## Divergencias, duplicaciones y autoridad

- **Divergencia temporal o planificada:** el runtime actual y una propuesta futura difieren porque describen momentos o estados distintos; no es por sí sola una contradicción.
- **Duplicación transitoria:** dos representaciones coexisten con precedencia y criterio de retiro documentados.
- **Contradicción entre fuentes vigentes:** dos fuentes vigentes y aplicables reclaman autoridad incompatible sobre el mismo dato y momento.
- **Desactualización del runtime:** la fuente vigente fue implementada o publicada de forma incompleta y la entrega ya no coincide con ella.
- **Falta de autoridad:** no puede identificarse una fuente aprobada y aplicable para decidir el dato.

## Contradicciones

Ante diferencias entre investigación, decisión, copy, mapa y runtime:

1. No elegir una fuente por conveniencia técnica.
2. Identificar la capa propietaria de la afirmación.
3. Clasificar la diferencia antes de bloquear.
4. Detener por contradicción solo las filas, rutas o servicios afectados por fuentes vigentes y aplicables incompatibles.
5. Ante falta de autoridad, detener la implementación afectada sin impedir auditorías, inventarios, reconciliación o preparación autorizadas.
6. Registrar la clasificación en la ficha cuando su escritura esté autorizada.
7. Solicitar decisión de Pablo Chavez cuando sea comercial.
8. No modificar contenido hasta contar con aprobación y autorización técnica.

## Tareas y releases

Una corrección menor puede permanecer en la ficha activa si conserva significado, alcance, precio, promesa, CTA, metadata y mapa autorizados.

Requieren ampliación expresa de alcance o una nueva ficha admitida según [`workflow.md`](workflow.md): nuevos servicios, cambios de precio, promesas, posicionamiento, CTA, casos de estudio, fuente runtime, esquema de DB, contrato API, metadata sustancial o retiro de fallback.

Un cambio de contenido puede justificar una release cuando forma parte de una entrega coordinada con impacto público u operativo. Correcciones menores, investigación y preparación documental no crean por sí solas una versión.
