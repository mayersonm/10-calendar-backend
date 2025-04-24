const { response } = require("express");
const Evento = require("../models/Evento");


const getEventos = async(req, resp = response) => {

    const eventos = await Evento.find()
                        .populate('user', 'name') // populate user with name
        ;

    try {

        return resp.status(200).json(
            {
                ok: true,
                eventos
            }
    );

        
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error al obtener eventos por favor hable con el administrador '
      
          });
    }

  
}

 
const crearEvento = async (req, resp = response) => {

    const evento = new Evento(req.body);

    try {

       evento.user = req.uid;

       const eventoGuardado = await evento.save();

       resp.status(200).json(
            {
                ok: true,
                msg: 'Evento Creado',
                eventoGuardado
            });

    } catch (error) {
        return resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador ',
      
          });
    }

  
}

const actualizarEvento = async (req, resp = response) => {

    const eventoId = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return resp.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por favor hable con el administrador '
            });
        }
       
        if ( evento.user.toString() != uid ) {
            return resp.status(401).json({
                ok: false,
                msg: 'No tiene privilegios para editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId , nuevoEvento, { new: true } );

        return resp.status(200).json(
            {
                ok: true,
                evento : eventoActualizado
            }
    );

    } catch (error) {

        console.log(error);
        return resp.status(500).json({
            ok: false,
            msg: 'Error al actualizar el evento por favor hable con el administrador '
        });
    }

  
}


const borrarEvento = async(req, resp = response) => {

    try {

        const eventoId = req.params.id;
        const uid = req.uid;
    
        const evento = await Evento.findById(eventoId);
    
            if (!evento) {
                return resp.status(404).json({
                    ok: false,
                    msg: 'Evento no encontrado por favor hable con el administrador '
                });
            }
           
            if ( evento.user.toString() != uid ) {
                return resp.status(401).json({
                    ok: false,
                    msg: 'No tiene privilegios para eliminar este evento'
                });
            }
    
            await Evento.findByIdAndDelete(eventoId);

        return resp.status(200).json({ok: true});

        
    } catch (error) {
        return resp.status(400).json({
            ok: false,
            msg: 'Error al elimiar el evento por favor hable con el administrador '
      
          });
    }

  
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}


