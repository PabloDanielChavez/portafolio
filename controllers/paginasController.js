import { Datos as DatosModel, Versiones, Habilidad as HabilidadModel, Destacados as DestacadosModel, Servicios as ServiciosModel} from '../models/Portafolio.js';

const paginaInicio = async (req, res) => {
    try {
        const [datos, habilidades, destacados, servicios] = await Promise.all([
            DatosModel.findOne({}),
            HabilidadModel.findAll({}),
            DestacadosModel.findAll({order: [['fecha_version', 'DESC']]}),
            ServiciosModel.findAll({})
        ]);

        res.render('inicio', {
            datos,
            habilidades,
            destacados,
            servicios
            
        });
    } catch (error) {
        console.error('Error al consultar la base de datos:', error);
        res.status(500).send('Error al cargar la página de inicio');
    }
}




const paginaInformacion = async (req, res) => {
    // consultar BD
    const version = await Versiones.findAll({
        order: [['id', 'DESC']], // Ordenar por la columna 'descuento' en orden descendente 
    });

    res.render('informacion', {
        pagina_raiz: 'PDC',
        pagina: 'Control de Versiones',
        versiones: version
    });
}

const mostrarHabilidades = async (req, res) => {
    
}

export {
    paginaInicio,
    paginaInformacion,
    mostrarHabilidades
}