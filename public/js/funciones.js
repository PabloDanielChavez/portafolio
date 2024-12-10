import {
    nuevoContacto,
    obtenerInformacion
} from './API-min.js';

import {
    informacionPortafolio__grid,
    menu,
    tema,
    btnServicios,
    btnSobreMi,
    btnTranslate,
    btnTema,
    inicio,
    informacion,
    spanServicios,
    sobreMi,
    translate,
    emergente,
    vld,
    bienvenida__borderprincipal,
    formulario,
    bienvenida__fotoperfilborde,
    bienvenida__fotoperfilprincipal,
    bienvenida__titulobienvenida,
    bienvenida__nombreh2,
    bienvenida__formulario,
    btnContacto,
    btnEnviar,
    input__nombre,
    input__correo,
    input__asunto,
    header,
    header__menu,
    headermenu,
    header__link,
    pantallaDeCarga,
    pantallaDeCarga__texto,
    bienvenida,
    bienvenida__principalBox,
    bienvenida__fotoperfilBorde,
    bienvenida__nombreH2,
    bienvenida__ocupacion,
    bienvenida__inputForm,
    bienvenida__navegacion,
    sobremi,
    sobremi__tituloH2,
    sobremi__resumen,
    sobremi__tituloH3,
    sobremi__detalle,
    sobremi__interesBox,
    sobremi__interesIconsNombre,
    habilidades,
    habilidades__tituloH2,
    habilidades__resumen,
    habilidades__tituloH3,
    habilidades__nombre,
    barra,
    barra__porcentaje,
    barra__bar,
    destacados,
    destacados__tituloH2,
    destacados__resumen,
    destacados__box,
    destacados__texto,
    servicios,
    servicios__h2Servicios,
    servicios__planesBox,
    servicios__h3Servicios,
    servicios__detalles,
    servicios__opcion,
    servicios__cantidad,
    servicios__divisor,
    servicios__descuento,
    servicios__parrafo,
    servicios__aqui,
    footer,
    footer__redes,
    footer__lineaHorizontal,
    footer__nombreH2,
    footer__ocupacion,
    footer__linkListado
} from './variables-min.js';

const temasClases = [
    header,
    header__menu,
    headermenu,
    header__link,
    pantallaDeCarga,
    pantallaDeCarga__texto,
    bienvenida,
    bienvenida__principalBox,
    bienvenida__fotoperfilBorde,
    bienvenida__nombreH2,
    bienvenida__ocupacion,
    bienvenida__inputForm,
    bienvenida__navegacion,
    sobremi,
    sobremi__tituloH2,
    sobremi__resumen,
    sobremi__tituloH3,
    sobremi__detalle,
    sobremi__interesBox,
    sobremi__interesIconsNombre,
    habilidades,
    habilidades__tituloH2,
    habilidades__resumen,
    habilidades__tituloH3,
    habilidades__nombre,
    barra,
    barra__porcentaje,
    barra__bar,
    destacados,
    destacados__tituloH2,
    destacados__resumen,
    destacados__box,
    destacados__texto,
    servicios,
    servicios__h2Servicios,
    servicios__planesBox,
    servicios__h3Servicios,
    servicios__detalles,
    servicios__opcion,
    servicios__cantidad,
    servicios__divisor,
    servicios__descuento,
    servicios__parrafo,
    servicios__aqui,
    footer,
    footer__redes,
    footer__lineaHorizontal,
    footer__nombreH2,
    footer__ocupacion,
    footer__linkListado
]

const temasId = [
    menu,
    inicio,
    informacion,
    spanServicios,
    sobreMi,
    translate,
    tema
]

const contacto = [
    bienvenida__principalBox,
    bienvenida__borderprincipal,
    bienvenida__fotoperfilborde,
    bienvenida__fotoperfilprincipal,
    bienvenida__titulobienvenida,
    bienvenida__nombreh2,
    bienvenida__ocupacion,
    formulario,
    bienvenida__navegacion
]

let tipoDeTema = "oscuro";

let menuExpand = 'noExpand';

export function cargarIndex() {
    if (window.location.href === 'http://127.0.0.1:5500/index.html' || window.location.href === 'https://portafolio-pdc.netlify.app' || window.location.href === 'https://portafolio-pdc.netlify.app/' || window.location.href === 'https://portafolio-pdc.netlify.app/index.html') {
        menu.addEventListener("click", expandMenu);
        btnServicios.addEventListener("click", noDisponible);
        btnSobreMi.addEventListener("click", noDisponible);
        btnTranslate.addEventListener("click", noDisponible);
        btnTema.addEventListener("click", cambiarDeTema);
        btnContacto.addEventListener("click", formularioContacto);
        bienvenida__formulario.addEventListener("submit", validarFormulario);
        mostrarEmergente("check_circle", "Pagina cargada con exito.", 2000);
    } else {
        mostrarEmergente("error", "La pagina no a cargado con exito.", 2000);
    }
}

export function cargarInformacion() {
    if (window.location.href === 'http://127.0.0.1:5500/informacion.html' || window.location.href === 'https://portafolio-pdc.netlify.app/informacion.html' || window.location.href === 'https://portafolio-pdc.netlify.app/informacion') {
        cargarVersiones();
        menu.addEventListener("click", expandMenu);
        btnServicios.addEventListener("click", noDisponible);
        btnSobreMi.addEventListener("click", noDisponible);
        btnTranslate.addEventListener("click", noDisponible);
        btnTema.addEventListener("click", noDisponible);
        mostrarEmergente("check_circle", "Pagina cargada con exito.", 2000);
    } else {
        mostrarEmergente("error", "La pagina no a cargado con exito.", 2000);
    }
}

// Cargar datos de la API a las funciones que la muestra
async function cargarVersiones() {
    const info = await obtenerInformacion();
    info.forEach(datos => {
        const { version, fechaInicio, fechaFin, tipo1, detalle1, tipo2, detalle2, tipo3, detalle3, tipo4, detalle4, tipo5, detalle5 } = datos;
        mostrarInformacion(version, fechaInicio, fechaFin, tipo1, detalle1, tipo2, detalle2, tipo3, detalle3, tipo4, detalle4, tipo5, detalle5);
    });
};

// Crea y muestra datos tomados de API.js en la pagina "Informacion"
function mostrarInformacion(version, fechaInicio, fechaFin, tipo1, detalle1, tipo2, detalle2, tipo3, detalle3, tipo4, detalle4, tipo5, detalle5) {
    const informacionPortafolio__box = document.createElement('LI');
    informacionPortafolio__box.classList.add('informacion-portafolio__box');
    informacionPortafolio__grid.appendChild(informacionPortafolio__box);

    const portafolio__hf = document.createElement('DIV');
    portafolio__hf.classList.add("informacion-portafolio__hf");
    informacionPortafolio__box.appendChild(portafolio__hf);

    const informacionPortafolio__versionParrafo = document.createElement('P');
    informacionPortafolio__versionParrafo.classList.add('informacion-portafolio__version-parrafo');
    informacionPortafolio__versionParrafo.textContent = version;
    portafolio__hf.appendChild(informacionPortafolio__versionParrafo);

    const informacionPortafolio__fechaInicio = document.createElement('P');
    informacionPortafolio__fechaInicio.classList.add('informacion-portafolio__fecha');
    informacionPortafolio__fechaInicio.textContent = fechaInicio;
    portafolio__hf.appendChild(informacionPortafolio__fechaInicio);

    const informacionPortafolio__fechaFin = document.createElement('P');
    informacionPortafolio__fechaFin.classList.add('informacion-portafolio__fecha');
    informacionPortafolio__fechaFin.textContent = fechaFin;
    portafolio__hf.appendChild(informacionPortafolio__fechaFin);

    const informacionPortafolio__texto1 = document.createElement('DIV');
    informacionPortafolio__texto1.classList.add('informacion-portafolio__texto');
    informacionPortafolio__box.appendChild(informacionPortafolio__texto1);

    const informacionPortafolio__iconoDone1 = document.createElement('P');
    if (tipo1 === 'done') {
        informacionPortafolio__iconoDone1.textContent = 'check_circle';
        informacionPortafolio__iconoDone1.classList.add('material-symbols-outlined', 'icono--done');
    } else if (tipo1 === 'error') {
        informacionPortafolio__iconoDone1.textContent = 'error';
        informacionPortafolio__iconoDone1.classList.add('material-symbols-outlined', 'icono--error');
    }
    informacionPortafolio__texto1.appendChild(informacionPortafolio__iconoDone1);

    const informacionPortafolio__parrafo1 = document.createElement('P');
    informacionPortafolio__parrafo1.classList.add('informacion-portafolio__parrafo');
    informacionPortafolio__parrafo1.textContent = detalle1;
    informacionPortafolio__texto1.appendChild(informacionPortafolio__parrafo1);

    const informacionPortafolio__texto2 = document.createElement('DIV');
    informacionPortafolio__texto2.classList.add('informacion-portafolio__texto');
    informacionPortafolio__box.appendChild(informacionPortafolio__texto2);

    const informacionPortafolio__iconoDone2 = document.createElement('P');
    if (tipo2 === 'done') {
        informacionPortafolio__iconoDone2.textContent = 'check_circle';
        informacionPortafolio__iconoDone2.classList.add('material-symbols-outlined', 'icono--done');
    } else if (tipo2 === 'error') {
        informacionPortafolio__iconoDone2.textContent = 'error';
        informacionPortafolio__iconoDone2.classList.add('material-symbols-outlined', 'icono--error');
    }
    informacionPortafolio__texto2.appendChild(informacionPortafolio__iconoDone2);

    const informacionPortafolio__parrafo2 = document.createElement('P');
    informacionPortafolio__parrafo2.classList.add('informacion-portafolio__parrafo');
    informacionPortafolio__parrafo2.textContent = detalle2;
    informacionPortafolio__texto2.appendChild(informacionPortafolio__parrafo2);

    const informacionPortafolio__texto3 = document.createElement('DIV');
    informacionPortafolio__texto3.classList.add('informacion-portafolio__texto');
    informacionPortafolio__box.appendChild(informacionPortafolio__texto3);

    const informacionPortafolio__iconoDone3 = document.createElement('P');
    if (tipo3 === 'done') {
        informacionPortafolio__iconoDone3.textContent = 'check_circle';
        informacionPortafolio__iconoDone3.classList.add('material-symbols-outlined', 'icono--done');
    } else if (tipo3 === 'error') {
        informacionPortafolio__iconoDone3.textContent = 'error';
        informacionPortafolio__iconoDone3.classList.add('material-symbols-outlined', 'icono--error');
    }
    informacionPortafolio__texto3.appendChild(informacionPortafolio__iconoDone3);

    const informacionPortafolio__parrafo3 = document.createElement('P');
    informacionPortafolio__parrafo3.classList.add('informacion-portafolio__parrafo');
    informacionPortafolio__parrafo3.textContent = detalle3;
    informacionPortafolio__texto3.appendChild(informacionPortafolio__parrafo3);

    const informacionPortafolio__texto4 = document.createElement('DIV');
    informacionPortafolio__texto4.classList.add('informacion-portafolio__texto');
    informacionPortafolio__box.appendChild(informacionPortafolio__texto4);

    const informacionPortafolio__iconoDone4 = document.createElement('P');
    if (tipo4 === 'done') {
        informacionPortafolio__iconoDone4.textContent = 'check_circle';
        informacionPortafolio__iconoDone4.classList.add('material-symbols-outlined', 'icono--done');
    } else if (tipo4 === 'error') {
        informacionPortafolio__iconoDone4.textContent = 'error';
        informacionPortafolio__iconoDone4.classList.add('material-symbols-outlined', 'icono--error');
    }
    informacionPortafolio__texto4.appendChild(informacionPortafolio__iconoDone4);

    const informacionPortafolio__parrafo4 = document.createElement('P');
    informacionPortafolio__parrafo4.classList.add('informacion-portafolio__parrafo');
    informacionPortafolio__parrafo4.textContent = detalle4;
    informacionPortafolio__texto4.appendChild(informacionPortafolio__parrafo4);

    const informacionPortafolio__texto5 = document.createElement('DIV');
    informacionPortafolio__texto5.classList.add('informacion-portafolio__texto');
    informacionPortafolio__box.appendChild(informacionPortafolio__texto5);

    const informacionPortafolio__iconoDone5 = document.createElement('P');
    if (tipo5 === 'done') {
        informacionPortafolio__iconoDone5.textContent = 'check_circle';
        informacionPortafolio__iconoDone5.classList.add('material-symbols-outlined', 'icono--done');
    } else if (tipo5 === 'error') {
        informacionPortafolio__iconoDone5.textContent = 'error';
        informacionPortafolio__iconoDone5.classList.add('material-symbols-outlined', 'icono--error');
    }
    informacionPortafolio__texto5.appendChild(informacionPortafolio__iconoDone5);

    const informacionPortafolio__parrafo5 = document.createElement('P');
    informacionPortafolio__parrafo5.classList.add('informacion-portafolio__parrafo');
    informacionPortafolio__parrafo5.textContent = detalle5;
    informacionPortafolio__texto5.appendChild(informacionPortafolio__parrafo5);
};

// Muestra el formulario de contacto
function formularioContacto() {
    console.log(btnContacto.classList.value);
    if (btnContacto.classList.value === "bienvenida__contacto") {
        mostrarContacto();
        btnContacto.classList.add('activo');
        disabled(btnContacto, 500);
    } else {
        ocultarContacto();
        btnContacto.classList.remove('activo');
        disabled(btnContacto, 500);
    }
};

function mostrarContacto() {
    iterarArreglo("add", contacto, "activo");
    setTimeout(() => {
        bienvenida__formulario.classList.add("scale1");
        bienvenida__formulario.classList.remove("scale0");
    }, 1);
    btnContacto.textContent = 'Ocultar';
}

function ocultarContacto() {
    iterarArreglo("remove", contacto, "activo");
    btnContacto.textContent = 'Contactar';
}

// Validar Formulario Contacto
async function validarFormulario(e) {
    e.preventDefault();

    const nombre = input__nombre.value;
    const correo = input__correo.value;
    const asunto = input__asunto.value;
    const date = new Date();
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];
    const contacto = {
        nombre,
        correo,
        asunto,
        fecha: ` ${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    }

    if (validar(contacto)) {
        mostrarEmergente("error", "¡Todos los campos son obligatorios!", 2000);
        return;
    }
    await nuevoContacto(contacto);
    setTimeout(() => {
        vaciarFormulario();
        formularioContacto();
    }, 4000);
}

function validar(obj) {
    return !Object.values(obj).every(element => element !== '');
}

function vaciarFormulario() {
    input__nombre.value = "";
    input__correo.value = "";
    input__asunto.value = "";
}

export function mostrarEmergente(tipo, texto, tiempo) {
    crearEmergente(tipo, texto, tiempo);
}

function crearEmergente(tipo, texto, tiempo) {
    const panel__emergente = document.querySelector('.panel__emergente');

    const emergente = document.createElement('DIV');
    emergente.classList.add('emergente', 'scale0');
    panel__emergente.appendChild(emergente);

    const emergente__grid = document.createElement('DIV');
    emergente__grid.classList.add('emergente__grid');
    emergente.appendChild(emergente__grid);

    const emergente__header = document.createElement('HEADER');
    emergente__header.classList.add('emergente__header');
    emergente__grid.appendChild(emergente__header);

    const iconoUno = document.createElement('p');
    if (tipo === "error") {
        iconoUno.classList.add("material-symbols-outlined", "icono--error");
        iconoUno.textContent = "error";
    } else if (tipo === "done") {
        iconoUno.classList.add("material-symbols-outlined", "icono--done");
        iconoUno.textContent = "done";
    } else if (tipo === "check_circle") {
        iconoUno.classList.add("material-symbols-outlined", "icono--done");
        iconoUno.textContent = "check_circle";
    } else if (tipo === "database") {
        iconoUno.classList.add("material-symbols-outlined", "icono--error");
        iconoUno.textContent = "database";
    } else if (tipo === "send") {
        iconoUno.classList.add("material-symbols-outlined", "icono--done");
        iconoUno.textContent = "send";
    } else if (tipo === "palette") {
        iconoUno.classList.add("material-symbols-outlined", "icono--done");
        iconoUno.textContent = "palette";
    }
    emergente__header.appendChild(iconoUno);

    const emergente__h3 = document.createElement('H3');
    emergente__h3.classList.add('emergente__h3');

    if (tipo === "error") {
        emergente__h3.textContent = `error`;
    } else if (tipo === "done") {
        emergente__h3.textContent = `Hecho`;
    } else if (tipo === "check_circle") {
        emergente__h3.textContent = `Cargado`;
    } else if (tipo === "database") {
        emergente__h3.textContent = `API`;
    } else if (tipo === "send") {
        emergente__h3.textContent = `Enviado`;
    } else if (tipo === "palette") {
        emergente__h3.textContent = `Tema`;
    }
    emergente__header.appendChild(emergente__h3);

    const iconoDos = document.createElement('p');
    if (tipo === "error") {
        iconoDos.classList.add("material-symbols-outlined", "icono--error");
        iconoDos.textContent = "error";
    } else if (tipo === "done") {
        iconoDos.classList.add("material-symbols-outlined", "icono--done");
        iconoDos.textContent = "done";
    } else if (tipo === "check_circle") {
        iconoDos.classList.add("material-symbols-outlined", "icono--done");
        iconoDos.textContent = "check_circle";
    } else if (tipo === "database") {
        iconoDos.classList.add("material-symbols-outlined", "icono--error");
        iconoDos.textContent = "database";
    } else if (tipo === "send") {
        iconoDos.classList.add("material-symbols-outlined", "icono--done");
        iconoDos.textContent = "send";
    } else if (tipo === "palette") {
        iconoDos.classList.add("material-symbols-outlined", "icono--done");
        iconoDos.textContent = "palette";
    }
    emergente__header.appendChild(iconoDos);

    const emergente__info = document.createElement('DIV');
    emergente__info.classList.add('emergente__info');
    emergente__grid.appendChild(emergente__info);

    const emergente__texto = document.createElement('p');
    emergente__texto.classList.add('emergente__texto');
    emergente__texto.innerHTML = `${texto}`;
    emergente__info.appendChild(emergente__texto);

    setTimeout(() => {
        emergente.classList.remove('scale0');
        emergente.classList.add('scale1');
        disabled(btnEnviar, tiempo);
        setTimeout(() => {
            emergente.classList.remove('scale1');
            emergente.classList.add('scale0');
            setTimeout(() => {
                emergente.remove();
            }, 200);
        }, tiempo);
    }, 200);
}

export function disabled(elemento, tiempo) {
    if (elemento) {
        elemento.setAttribute('disabled', '');
        setTimeout(() => {
            elemento.removeAttribute('disabled');
        }, tiempo);
    }
}

export function cambiarDeTema() {
    if (tipoDeTema === "claro") {
        iterarArreglo("remove", temasClases, "temaClaro");
        validarArregloId("remove", temasId, "temaClaro");
        // tema.textContent = "mode_night";
        tipoDeTema = 'oscuro';
        mostrarEmergente("palette", "¡Se ha cambiando el tema con exito!", 2000);
    } else {
        iterarArreglo("add", temasClases, "temaClaro");
        validarArregloId("add", temasId, "temaClaro");
        // tema.textContent = "light_mode";
        tipoDeTema = 'claro';
        mostrarEmergente("palette", "¡Se ha cambiando el tema con exito!", 2000);
    }
}

export function iterarArreglo(tipo, arr, clase) {
    for (let i = 0; i < arr.length; i++) {
        let e = arr[i]
        for (let v = 0; v < e.length; v++) {
            if (tipo === "add") {
                e[v].classList.add(clase);
            } else if (tipo === "remove") {
                e[v].classList.remove(clase);
            }
        }
    }
}

export function validarArregloId(tipo, id, clase) {
    if (tipo === 'remove') {
        for (let i = 0; i < id.length; i++) {
            let e = id[i].classList;
            e.remove(clase);
        }
    }
    else if (tipo === 'add') {
        for (let i = 0; i < id.length; i++) {
            let e = id[i].classList;
            e.add(clase);
        }
    }
}

export function expandMenu() {
    if (menuExpand == 'noExpand') {
        validarArregloId('add', temasId, "activo");
        headermenu.classList.add('activo');
        menuExpand = 'expand';
        setTimeout(() => {
            menu.textContent = 'close';
        }, 300);
    } else if (menuExpand === 'expand') {
        validarArregloId('remove', temasId, "activo");
        headermenu.classList.remove('activo');
        menuExpand = 'noExpand';
        setTimeout(() => {
            menu.textContent = 'menu';
        }, 300);
    }
}

export function noDisponible() {
    mostrarEmergente("error", "Esta opción no está disponible" + `<br/>¡inténtalo más tarde!`, 2000);
}

// export function validarArregloId(tipo, id, clase) {
//     console.log('Desde validarArregloId');
//     for (let i = 0; i < id.length; i++) {
//         let e = id[i].classList;
//         // console.log(e);
//         for (let v = 0; v < e.length; v++) {
//             console.log(e[v]);
//             if(e[v] === clase) {
//                 console.log('Paso validacion de clase');
//                 if(tipo === 'remove'){
//                     e.remove(clase);
//                     console.log('Paso validacion de remove');
//                 } else if(tipo === 'add'){
//                     e.add(clase);
//                     console.log('Paso validacion de add');
//                 }
//             }
//         }
//     }
// }
