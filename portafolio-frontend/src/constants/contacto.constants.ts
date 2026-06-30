import type {
    ContactFormValues,
    ContactSubmitStatus,
    PlazoContacto,
    PreferenciaContacto,
    PresupuestoContacto,
    TipoProyectoContacto
} from "@/types/contacto";

export const CONTACT_MINIMUM_SUBMIT_TIME_MS = 2500;

export const CONTACT_PROJECT_OPTIONS = [
    "Landing Page",
    "Sitio Web Profesional",
    "Tienda Online",
    "Desarrollo a medida",
    "Otro"
] as const satisfies readonly TipoProyectoContacto[];

export const CONTACT_BUDGET_OPTIONS = [
    "Necesito orientación",
    "Hasta USD 200",
    "USD 200 a 1.000",
    "USD 1.000 a 2.500",
    "Más de USD 2.500"
] as const satisfies readonly PresupuestoContacto[];

export const CONTACT_DEADLINE_OPTIONS = [
    "Lo antes posible",
    "Durante el próximo mes",
    "En 1 a 3 meses",
    "Todavía no lo definí"
] as const satisfies readonly PlazoContacto[];

export const CONTACT_PREFERENCES = {
    email: "email",
    whatsapp: "whatsapp"
} as const satisfies Record<PreferenciaContacto, PreferenciaContacto>;

export const CONTACT_INITIAL_FORM: ContactFormValues = {
    nombre: "",
    correo: "",
    tipoProyecto: "",
    presupuesto: "",
    plazo: "",
    preferenciaContacto: CONTACT_PREFERENCES.email,
    telefono: "",
    mensaje: "",
    website: ""
};

export const CONTACT_INITIAL_STATUS: ContactSubmitStatus = {
    type: "idle",
    message: ""
};
