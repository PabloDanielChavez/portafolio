# Etapa 3.3.0: contrato de Contacto

Este documento congela el contrato y el comportamiento observable de
`Contacto.tsx` antes de dividir responsabilidades. Describe la implementación
vigente al iniciar la fase 3.3; no propone un contrato nuevo.

## Alcance

La caracterización protege:

- Campos y valores iniciales.
- Opciones cerradas.
- Normalización y validación.
- Payload enviado al backend.
- Persistencia.
- Mensajes visibles de éxito y error.
- Barreras anti-spam.
- Nombres de eventos de medición.

No se modifica el diseño, el JSX, las clases, los endpoints ni Analytics/GTM.

## Ubicación del contrato desde 3.3.1

- `src/types/contacto.ts`: tipos del formulario, payload y estado.
- `src/constants/contacto.constants.ts`: opciones permitidas, preferencia,
  valores iniciales y espera mínima.
- `src/components/utils/contacto.helpers.ts`: normalización, validación,
  detección sospechosa, payload y condiciones anti-spam puras.
- `src/hooks/useContactoForm.ts`: estado, refs y handlers del flujo del
  formulario, incluyendo envío y eventos asociados.
- `src/services/fetchData.ts`: transporte HTTP; ya no define tipos de Contacto.
- `src/components/sections/Contacto.tsx`: interacción visual, foco de errores,
  FAQ, canales sociales y render hasta las siguientes subfases.

Las opciones se ubican en `constants` porque son valores cerrados del contrato,
no copy comercial. El backend seguirá siendo su autoridad futura cuando exista
un mecanismo para administrarlas y entregarlas al frontend.

## Estado y valores iniciales

El formulario mantiene cuatro estados principales:

- `form`: valores de los campos.
- `errors`: errores por campo.
- `status`: estado global `idle`, `success` o `error`.
- `isSubmitting`: bloqueo visual durante el envío.

También utiliza refs para:

- Medir el tiempo desde el inicio del formulario.
- Evitar envíos simultáneos.
- Enfocar el primer campo inválido.
- Registrar el primer foco una sola vez.

Valores iniciales:

| Campo | Valor |
| --- | --- |
| `nombre` | `""` |
| `correo` | `""` |
| `tipoProyecto` | `""` |
| `presupuesto` | `""` |
| `plazo` | `""` |
| `preferenciaContacto` | `"email"` |
| `telefono` | `""` |
| `mensaje` | `""` |
| `website` | `""` |

## Campos y obligatoriedad

| Campo frontend | Requerido en la UI | Contrato backend | Persistencia |
| --- | --- | --- | --- |
| `nombre` | Sí | 2–80 caracteres | `nombre` |
| `correo` | Sí | Email, máximo 120 | `correo` |
| `tipoProyecto` | Sí | Enum opcional por compatibilidad | `tipo_proyecto` o `NULL` |
| `presupuesto` | No | Enum opcional | `presupuesto` o `NULL` |
| `plazo` | No | Enum opcional | `plazo` o `NULL` |
| `preferenciaContacto` | Sí, inicia en email | Enum opcional por compatibilidad | `preferencia_contacto` o `NULL` |
| `telefono` | Solo con WhatsApp | 8–15 dígitos y caracteres permitidos | `telefono` o `NULL` |
| `mensaje` | Sí | Frontend 20–2000; backend 10–2500 | `mensaje` |
| `origen_url` | Generado al enviar | URL HTTP/HTTPS opcional | `origen_url` o `NULL` |
| `website` | Honeypot oculto | String opcional | No se persiste |
| `asunto` / `email` | No los envía la UI actual | Alias legacy opcionales | Se normalizan en backend |

La diferencia de obligatoriedad entre UI y backend es intencional por ahora:
el backend conserva compatibilidad con payloads anteriores. No debe endurecerse
durante el refactor sin una decisión de migración.

## Valores permitidos

### Tipo de proyecto

- `Landing Page`
- `Sitio Web Profesional`
- `Tienda Online`
- `Desarrollo a medida`
- `Otro`

### Presupuesto

- `Necesito orientación`
- `Hasta USD 200`
- `USD 200 a 1.000`
- `USD 1.000 a 2.500`
- `Más de USD 2.500`

### Plazo

- `Lo antes posible`
- `Durante el próximo mes`
- `En 1 a 3 meses`
- `Todavía no lo definí`

### Preferencia de contacto

- `email`
- `whatsapp`

Cuando la preferencia es `whatsapp`, el teléfono es obligatorio tanto en
frontend como en backend.

## Normalización y validación frontend

Antes de validar y enviar:

- Se aplica normalización Unicode NFKC.
- Se eliminan caracteres de control.
- Se compactan espacios.
- El correo se convierte a minúsculas.
- El mensaje conserva saltos de línea útiles y elimina exceso de espacios.
- Se rechazan markup inseguro, URLs excesivas y repeticiones sospechosas.
- El nombre acepta letras Unicode, espacios, puntos, apóstrofes y guiones.
- Ante errores se muestra un estado global y se enfoca el primer campo inválido.

El backend repite normalización y validación y rechaza campos no declarados.
La validación frontend es UX; la validación backend es autoritativa.

## Payload frontend

La UI llama a `enviarMensajeContacto` con:

```ts
{
  nombre,
  correo,
  mensaje,
  origen_url: window.location.href,
  tipoProyecto: tipoProyecto || undefined,
  presupuesto: presupuesto || undefined,
  plazo: plazo || undefined,
  preferenciaContacto,
  telefono: preferenciaContacto === "whatsapp"
    ? telefono
    : undefined,
  website
}
```

El servicio envía JSON mediante `POST` al endpoint `contacto`.

## Persistencia backend

El backend transforma camelCase a las columnas actuales:

```text
tipoProyecto         -> tipo_proyecto
preferenciaContacto  -> preferencia_contacto
```

Los campos opcionales ausentes se guardan como `NULL`. La fecha se genera en el
backend con `createdAt.toISOString()`; las pruebas validan que sea una fecha ISO
válida sin depender de una fecha real fija.

Caso de referencia protegido:

```text
nombre: pRUEBA
correo: pablo@outlook.es
mensaje: hOLA QUIERO UNA PAGINA SUPER LINDA DE PRUEBA LOCAL HOST
origen_url: http://localhost:3000/contacto
tipoProyecto: Landing Page
presupuesto: Hasta USD 200
plazo: Lo antes posible
preferenciaContacto: whatsapp
telefono: +54 911 66621017
```

## Éxito

Después de una respuesta correcta:

- Se reinicia el formulario.
- Se limpia el estado de envío.
- Se reinicia el tiempo inicial.
- Se dispara `contact_form_success`.
- Se muestra exactamente:

> ¡Consulta enviada! Voy a revisar tu proyecto y responderte de forma personalizada.

## Errores

Se conservan cuatro caminos principales:

1. Validación frontend: muestra campos para revisar y enfoca el primero.
2. Envío demasiado rápido: solicita esperar unos segundos.
3. Respuesta backend fallida: usa el mensaje del backend o el fallback visible.
4. Error de red: recomienda intentar nuevamente o usar WhatsApp/correo.

Todos liberan el bloqueo de envío en `finally`.

## Anti-spam y abuso

Frontend:

- Honeypot `website`.
- Tiempo mínimo de 2500 ms.
- Bloqueo de envíos simultáneos.
- Normalización y detección básica de contenido sospechoso.

Backend:

- Orígenes permitidos.
- Rate limiting.
- Honeypot.
- Esquema estricto.
- Validación y sanitización antes de persistir.

Si el honeypot frontend tiene contenido, se simula una respuesta exitosa y no
se llama al backend.

## Eventos Analytics/GTM congelados

| Evento | Momento |
| --- | --- |
| `contact_form_focus` | Primer foco válido del formulario |
| `contact_form_submit` | Intento de envío previo a validación |
| `contact_form_error` | Validación, envío rápido, backend o red |
| `contact_form_success` | Persistencia confirmada |
| `contact_faq_toggle` | Apertura o cierre de una FAQ |
| `contact_social_click` | Click en un canal directo |

El refactor debe conservar nombres y parámetros actuales. La integración usa
`trackEvent`; esta fase no modifica GTM ni GA4.

## WhatsApp

- Seleccionar WhatsApp revela y exige el campo teléfono.
- El teléfono solo se envía cuando WhatsApp es la preferencia.
- Los enlaces sociales de WhatsApp se construyen con el número del perfil.
- El formulario siempre persiste mediante el endpoint; no redirige la consulta
  enviada a WhatsApp.

## Cobertura de caracterización

El frontend utiliza `node:test` y no dispone de un entorno DOM ni Testing
Library. Para no agregar dependencias, la prueba frontend congela de forma
estructural:

- Campos y valores iniciales.
- Opciones.
- Construcción del payload.
- Transporte POST.
- Mensajes.
- Barreras anti-spam.
- Nombres de eventos.

No se presenta como una prueba de interacción real del navegador. La
validación y persistencia efectivas se cubren en la suite backend.

## Invariantes para 3.3

Durante el refactor no deben cambiar:

- Campos, nombres ni valores iniciales.
- Opciones cerradas.
- Reglas y mensajes de validación.
- Payload y endpoint.
- Semántica de campos opcionales.
- Mensaje exacto de éxito.
- Caminos de error.
- Honeypot, tiempo mínimo y bloqueo.
- Eventos y parámetros de medición.
- Accesibilidad, foco y estados `aria`.

## Orden recomendado de extracción

1. Extraer opciones y copy estático.
2. Mover tipos de Contacto fuera de `fetchData`.
3. Extraer normalizadores y validadores puros con tests directos.
4. Extraer el hook de estado/envío.
5. Extraer componentes visuales pequeños.
6. Dividir el JSX principal.
7. Revalidar payload, tracking, teclado y envío real.
