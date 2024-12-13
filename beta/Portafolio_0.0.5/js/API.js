import { mostrarEmergente, disabled } from "./funciones-min.js";
import { btnEnviar } from "./variables-min.js";

const urlInformacion = "http://localhost:4000/informacion";
const urlContactos = "http://localhost:4000/contactos";

export const obtenerInformacion = async () => {
    try {
        const resultado = await fetch(urlInformacion);
        const informacion = await resultado.json();
        return informacion;
    } catch (error) {
        console.log(error);
        mostrarEmergente("database", "La pagina no se a podido conectar con la API" + `<br/>¡inténtalo más tarde!`, 4000);
    }
};

export const nuevoContacto = async contacto => {
    try {
        disabled(btnEnviar, 4500);
        await fetch(urlContactos, {
            method: 'POST',
            body: JSON.stringify(contacto), // data puede ser string o un objeto
            headers: {
                'Content-Type': 'application/json' // Y le decimos que los datos se enviaran como JSON
            }
        });
        mostrarEmergente("send", "¡Enviado correctamente!", 2000);
    } catch (error) {
        console.log(error);
        mostrarEmergente("database", "La pagina no se a podido conectar con la API" + `<br/>¡inténtalo más tarde!`, 4000);
    }
}