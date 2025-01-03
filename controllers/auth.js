const {response} = require('express');

const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async ( req, resp = response ) =>{

  const {  email, password } = req.body;

  try {

    let usuario = await Usuario.findOne({  email });

    console.log(usuario)

    if ( usuario ) { 
      return resp.status(400).json({
        ok: false,
        msg: 'El correo ingresado ya existe'
  
      });
    } 

    usuario = new Usuario( req.body );

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync( password, salt );

    await usuario.save();

    //generar JWT
    const token = await generarJWT(usuario._id, usuario.name);
  
    resp.status(201).json({
      ok  : true,
      uid : usuario._id,
      name: usuario.name,
      token
    });
    
  } catch (error) {
    console.log(error)
    resp.status(500).json({
      ok: false,
      msg: 'Por hable con el administrador'

    });
  }
}

const loginUsuario = async( req, resp = response )=>{

    const { email, password } = req.body;

      try {
      
      const usuario = await Usuario.findOne({  email });

      if ( !usuario ) { 
        return resp.status(400).json({
          ok: false,
          msg: 'El usuario no existe con ese Email'
    
        });
      } 

      //confirmar password
      const validarPassword = bcrypt.compareSync( password, usuario.password );

      if ( ! validarPassword ) {
        return resp.status(400).json({
          ok: false,
          msg: 'Password incorrecto'
        });
      }

      //generar nuestro JWT 
      const token = await generarJWT(usuario._id, usuario.name);

      resp.json({
        ok: true,
        uid : usuario._id,
        name: usuario.name,
        token
      });

      }catch (error) {
      console.log(error)
        resp.status(500).json({
        ok: false,
        msg: 'Por hable con el administrador'

        })

      }

  } 



const revalidarToken =  async ( req, resp = response )=>{

  const uid = req.uid;
  const name = req.name;

  // generar un nuevo JWT y retornarlo en está petición
  try {

    const token = await generarJWT(uid, name);

    resp.json({
      ok: true,
      token
    })
    
  } catch (error) {

    resp.status(401).json({
      ok:false,
      msg:"Error generando el nuevo JWT"
    })
    
  }

 


 

}


module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken
}

