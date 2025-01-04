const { response } = require("express");



const getEventos = (req, resp = response) => {


        
    try {

        return resp.status(200).json(
            {
                ok: true,
                msg: 'EventoO btenido',
            }
    );

        
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error al obtener eventos por favor hable con el administrador '
      
          });
    }

  
}


const crearEvento = (req, resp = response) => {



    console.log(req.body);

    const { tittle, start, end } = req.body;
    console.log('tittle :', tittle);
    console.log('start :', start);
    console.log('end :', end);

    try {

        return resp.status(200).json(
            {
                ok: true,
                msg: 'Evento Creado',
            }
    );

        
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error al obtener eventos por favor hable con el administrador '
      
          });
    }

  
}

const actualizarEvento = (req, resp = response) => {

    try {

        return resp.status(200).json(
            {
                ok: true,
                msg: 'Evento Actualizado',
            }
    );

        
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error al obtener eventos por favor hable con el administrador '
      
          });
    }

  
}


const borrarEvento = (req, resp = response) => {

    try {

        return resp.status(200).json(
            {
                ok: true,
                msg: 'Evento Borrado',
            }
    );

        
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error al obtener eventos por favor hable con el administrador '
      
          });
    }

  
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}


