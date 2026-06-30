export type TipoProyectoContacto =
    | "Landing Page"
    | "Sitio Web Profesional"
    | "Tienda Online"
    | "Desarrollo a medida"
    | "Otro";

export type PresupuestoContacto =
    | "Necesito orientación"
    | "Hasta USD 200"
    | "USD 200 a 1.000"
    | "USD 1.000 a 2.500"
    | "Más de USD 2.500";

export type PlazoContacto =
    | "Lo antes posible"
    | "Durante el próximo mes"
    | "En 1 a 3 meses"
    | "Todavía no lo definí";

export type PreferenciaContacto = "email" | "whatsapp";

export type ContactFormValues = {
    nombre: string;
    correo: string;
    tipoProyecto: TipoProyectoContacto | "";
    presupuesto: PresupuestoContacto | "";
    plazo: PlazoContacto | "";
    preferenciaContacto: PreferenciaContacto;
    telefono: string;
    mensaje: string;
    website: string;
};

export type ContactFieldErrors = Partial<
    Record<keyof ContactFormValues, string>
>;

export type ContactSubmitStatus = {
    type: "idle" | "success" | "error";
    message: string;
};

export type ContactPayload = {
    nombre: string;
    correo: string;
    mensaje: string;
    origen_url: string;
    tipoProyecto?: TipoProyectoContacto;
    presupuesto?: PresupuestoContacto;
    plazo?: PlazoContacto;
    preferenciaContacto?: PreferenciaContacto;
    telefono?: string;
    website?: string;
};
