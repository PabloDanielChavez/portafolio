# Capa de contenido

Este directorio es la ubicación acordada para el contenido estático y
editorial de PaginasWebChavez. Se crea en la fase 3.1 como contrato de
arquitectura; la extracción de contenido comenzará de forma progresiva en la
fase 3.2.

La capa de contenido no reemplaza al backend, no funciona como un CMS y no
debe convertirse en un contenedor genérico para cualquier constante.

## Principio de propiedad

Cada dato debe tener una única fuente de verdad según su naturaleza:

| Propiedad | Ubicación |
| --- | --- |
| Contenido comercial estático | `src/content` |
| Configuración técnica estable | `src/config` |
| Datos editables o administrables | Backend y base de datos |
| Transformaciones y formateadores | `utils`, `helpers` o `lib` |
| Render, interacción y composición | `components` |
| Formas de datos entre sistemas | Tipos y contratos explícitos |

Cuando un dato cambie de propietario, la migración debe eliminar la fuente
anterior para evitar valores duplicados.

## Qué pertenece en `src/content`

- Títulos, descripciones y textos comerciales.
- Contenido del hero y secciones estáticas de Home.
- Llamadas a la acción y microcopy.
- Textos institucionales que todavía no se administran desde un panel.
- FAQs temporales mientras no sean editables desde backend.
- Mensajes estáticos de WhatsApp o correo asociados a una campaña o CTA.
- Copy SEO base que deba mantenerse alineado con el contenido visible.

El contenido debe ser serializable y no debe contener:

- JSX ni instancias de iconos.
- Lecturas de variables de entorno.
- Llamadas a APIs.
- Estado o hooks de React.
- Funciones de tracking.
- Validación o normalización.
- Teléfonos, redes o datos editables duplicados del backend.

Los iconos se resuelven en componentes a partir de un identificador semántico
cuando sean necesarios.

## Qué no pertenece en `src/content`

### Backend y base de datos

El backend será la fuente de verdad futura para:

- Trabajos y sus relaciones.
- Slugs canónicos y estables.
- Planes, precios y características editables.
- Rangos de presupuesto.
- Teléfono, correo público y redes.
- Datos editables del negocio.
- Opciones de Contacto administrables desde un panel.

Durante la transición puede existir contenido local ya utilizado en
producción, pero debe estar marcado en el inventario de migración y no
duplicarse en módulos nuevos.

### `src/config`

`src/config/site.ts` conserva configuración técnica estable:

- Dominio canónico.
- Nombre de la marca.
- Locale e idioma.
- Imagen Open Graph predeterminada.
- Rutas técnicas conocidas.
- Metadata técnica global.
- Verificaciones de buscadores.

La configuración no debe incorporar FAQs, textos de secciones, planes,
precios ni opciones editables.

### `utils`, `helpers` y `lib`

Estas carpetas conservan lógica reutilizable:

- Normalizadores.
- Formateadores.
- Constructores de URL.
- Cálculo y adaptación de métricas.
- Transformaciones de respuestas API.
- Helpers de auditoría.
- Validación auxiliar.

Una utilidad puede generar una propuesta de slug para una migración, pero el
slug publicado debe seguir viniendo del backend.

### `components`

Los componentes deben encargarse de:

- Render visual.
- Composición.
- Interacción.
- Estado estrictamente necesario.
- Recepción de contenido y datos por props o imports explícitos.

Un componente no debe ser la fuente principal de textos comerciales ni de
datos editables del negocio.

## Convenciones para módulos futuros

Los módulos se crearán únicamente cuando su contenido sea extraído de un
componente real. No se crean archivos vacíos ni un `index.ts` global por
anticipado.

Nombres previstos:

```text
src/content/
├── README.md
├── hero.content.ts
├── home.content.ts
├── contacto.content.ts
├── footer.content.ts
├── perfil.content.ts
└── seo.content.ts
```

Esta lista es orientativa. Si dos módulos pequeños comparten el mismo ciclo de
cambio pueden combinarse. Si un módulo crece demasiado puede dividirse por
sección.

Los exports deben:

- Usar nombres de dominio, no nombres de estilos.
- Mantener objetos y arrays inmutables mediante `as const` cuando sea útil.
- Declarar tipos cerca del contenido o en `src/types` si forman parte de un
  contrato compartido.
- Separar etiquetas visibles de identificadores estables.
- Evitar rutas, teléfonos y redes escritos directamente si ya tienen otra
  fuente de verdad.

Ejemplo de forma esperada:

```ts
export const heroContent = {
  eyebrow: "...",
  title: "...",
  description: "...",
  benefits: ["..."],
  actions: {
    primaryLabel: "...",
    secondaryLabel: "...",
  },
} as const;
```

El ejemplo define una forma; no autoriza a reescribir el contenido actual ni a
introducir este archivo antes de su migración en 3.2.

## Contratos frontend/backend

Los valores enviados a una API no deben depender de texto duplicado dentro de
un componente.

Para Contacto:

1. El backend valida y conserva la autoridad sobre valores aceptados.
2. En la fase 3.2 las opciones actuales pueden salir de `Contacto.tsx` hacia
   constantes frontend tipadas, sin cambiar comportamiento.
3. Antes de conectar opciones dinámicas, frontend y backend deben compartir un
   contrato verificable o una prueba de paridad.
4. La conexión con opciones administrables queda pendiente para una fase de
   backend posterior.

Los textos de error, éxito y estados del formulario no se migran en 3.2 si
hacerlo altera validación, handlers, accesibilidad o tracking. Se tratarán
dentro del refactor controlado de 3.3.

## Decisión sobre trabajos y slugs

- El campo `slug` pertenecerá al modelo de trabajos en backend/base de datos.
- Será único, estable y canónico.
- El frontend lo consumirá como parte del contrato de trabajo.
- El frontend no derivará el slug oficial desde `nombre_trabajo`.
- La ruta pública actual `/trabajos/[id]` no cambia en 3.1 ni en 3.2.
- La fase 3.4 migrará a `/trabajos/[slug]`.
- Los IDs antiguos deberán redirigir de forma permanente al slug final.
- Sitemap, canonical, Open Graph y metadata dinámica de trabajos se actualizarán
  después de disponer de slugs autoritativos.

## Decisión sobre planes

`src/components/utils/planes.data.ts` contiene actualmente el catálogo local
de planes. No se mueve en 3.1.

El destino futuro es backend porque planes, precios y características serán
editables. Hasta que exista modelo, endpoint, contrato y estrategia de
fallback, ese archivo sigue siendo la fuente operativa existente.

En una fase de extracción puede cambiar de ubicación o nombre para dejar de
presentarse como una utilidad, pero no debe duplicarse en `src/content`.

## Identidad de marca

PaginasWebChavez se modela como marca, servicio profesional y estudio web.
Pablo Daniel Chavez puede representarse como fundador o profesional asociado
cuando corresponda.

Esta decisión orientará más adelante el contenido institucional y Schema.org,
pero no implica cambios SEO ni JSON-LD durante 3.1.

## Inventario inicial para 3.2

### Primer grupo: bajo riesgo

- Beneficios y textos del Hero.
- Indicadores, proceso y CTA de Home.
- Navegación y texto institucional de Footer.
- Biografía, tecnologías y métricas estáticas de Perfil.
- Mensajes de CTA actualmente ubicados en `components/utils/variables.ts`.

### Segundo grupo: revisar antes de mover

- Metadata comercial distribuida en páginas y `site.ts`.
- Contenido de planes, porque su propietario futuro será backend.
- Etiquetas de auditoría en `trabajos.helpers.ts`.
- Datos de contacto repetidos entre Perfil, Footer, planes y backend.

### Reservado para 3.3

- Validación de Contacto.
- Normalizadores y detección de contenido sospechoso.
- Estado, refs, handlers y envío.
- Mensajes de éxito y error.
- Analytics/GTM.
- Accesibilidad y foco del formulario.

## Inconsistencias conocidas

Estas inconsistencias se documentan, pero no se corrigen en 3.1:

- Los rangos de presupuesto frontend no coinciden con los aceptados por el
  backend.
- Perfil contiene enlaces activos con `TUNUMERO` y `TUUSUARIO`.
- Teléfono, correo y redes aparecen repetidos en varios archivos.
- Los planes y el número de WhatsApp viven dentro de un archivo llamado
  `utils`.
- Los tipos y opciones de Contacto están mezclados con el servicio de fetch.
- El agregador de datos consulta recursos que varias páginas no utilizan.

La discrepancia de presupuestos y los enlaces placeholder deben resolverse al
inicio de 3.2, antes de una extracción amplia.

## Criterio de finalización de 3.2

La extracción se considera correcta cuando:

- El contenido migrado conserva exactamente el mismo texto y comportamiento.
- No se duplican fuentes de verdad.
- Los componentes reciben o importan contenido tipado.
- No cambian estilos, rutas ni tracking.
- Los datos editables siguen viniendo de su fuente actual hasta que el backend
  tenga el contrato definitivo.
- TypeScript, tests pertinentes y build de producción son correctos.
