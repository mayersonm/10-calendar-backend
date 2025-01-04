/*
    Events Routes
    /api/events
*/
const { Router } = require('express');
const router = Router();

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');

// validar JWT para todas las rutas
router.use(validarJWT);

// Obtener eventos
router.get('/',getEventos );

//Crear evento
router.post(
        '/',
    [
        require('express-validator').check('title', 'el titulo es obligatorio').not().isEmpty(),
        validarCampos
    ],
    
    crearEvento 
);

//Actualizar Evento
router.put('/:id',actualizarEvento );

//Actualizar Evento
router.delete('/:id',borrarEvento );

module.exports = router;