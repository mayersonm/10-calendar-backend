/*
    Events Routes
    /api/events
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, borrarEvento } = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const isDate = require('../helpers/isDate');

// validar JWT para todas las rutas
router.use(validarJWT);

// Obtener eventos
router.get('/',getEventos );

//Crear evento
router.post(
        '/',
    [
        check('tittle', 'el titulo es obligatorio').not().isEmpty(),
        check('start', 'la fecha de inicio es obligatoria').custom(isDate),
        check('end', 'la fecha de fin es obligatoria').custom(isDate),
        validarCampos
    ],
    
    crearEvento 
);

//Actualizar Evento
router.put('/:id',     
        [
            check('tittle', 'el titulo es obligatorio').not().isEmpty(),
            check('start', 'la fecha de inicio es obligatoria').custom(isDate),
            check('end', 'la fecha de fin es obligatoria').custom(isDate),
            validarCampos
        ],
        actualizarEvento );

//Borrar Evento
router.delete('/:id',borrarEvento );

module.exports = router;