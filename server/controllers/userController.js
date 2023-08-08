const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { Role } = require("@prisma/client");
const jwt = require("jsonwebtoken");
//--npm install bcrypt
const bcrypt = require("bcrypt");

//Crear nuevo usuario
module.exports.register = async (request, response, next) => {
  const userData = request.body;

  //Salt es una cadena aleatoria.
  //"salt round" factor de costo controla cuánto tiempo se necesita para calcular un solo hash de BCrypt
  // salt es un valor aleatorio y debe ser diferente para cada cálculo, por lo que el resultado casi nunca debe ser el mismo, incluso para contraseñas iguales
  let salt= bcrypt.genSaltSync(10);
  // Hash password
  let hash=bcrypt.hashSync(userData.password,salt);
  const user = await prisma.usuario.create({
    data: {
      nombre: userData.nombre,
      email: userData.email,
      password: hash,
      role: Role[userData.role]
    },
  });
  response.status(200).json({
    status: true,
    message: "Usuario creado",
    data: user,
  });
};
module.exports.login = async (request, response, next) => {
  let userReq = request.body;
  //Buscar el usuario según el email dado
  const user = await prisma.Usuario.findUnique({
    where: {
      email: userReq.email,
    },
  });
  //Sino lo encuentra según su email
  if (!user) {
    response.status(401).send({
      success: false,
      message: "Usuario no registrado",
    });
  }
  //Verifica la contraseña
  const checkPassword=await bcrypt.compare(userReq.password, user.password);
  if(checkPassword === false){
    response.status(401).send({
      success:false,
      message: "Credenciales no validas"
    })
  }else{
    //Usuario correcto
    //Crear el payload
    const payload={
      email: user.email,
      role: user.role
    }
    //Crear el token
    const token= jwt.sign(payload,process.env.SECRET_KEY,{
      expiresIn: process.env.JWT_EXPIRE
    });
    response.json({
      success: true,
      message: "Usuario registrado",
      data: {
        user,
        token,
      }
    })
  }
};

