const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const ordenes = await prisma.orden.findMany({
    orderBy: {
      fechaOrden: 'asc',
    },
    include: {
      usuario: true,
    },
  });
  response.json(ordenes);
};
//Obtener por Id
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const orden = await prisma.orden.findUnique({
    where: { id: id },
    include: {
      usuario: true,
      videojuegos: {
        select: {
          videojuego: true,
          cantidad: true,
        },
      },
    },
  });
  response.json(orden);
};
//Crear
module.exports.create = async (request, response, next) => {
  let infoOrden=request.body;
  const newVideojuego =await prisma.orden.create({
    data:{
      fechaOrden:infoOrden.fechaOrden,
      usuarioId:1,
      videojuegos:{
        createMany:{
          //[{videojuegoId, cantidad}]
          data: infoOrden.videojuegos
        }
      }
    }   
  })
  response.json(newVideojuego)
};
module.exports.getVentaProductoMes = async (request, response, next) => {
  let mes = parseInt(request.params.mes); 
 
  //SELECT v.nombre, SUM(ov.cantidad) as suma FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id AND MONTH(o.fechaOrden) = 10 GROUP BY ov.videojuegoId
  
};
module.exports.getVentaProductoTop = async (request, response, next) => {
  let mes = parseInt(request.params.mes); 
 
  //SELECT v.nombre, (SUM(ov.cantidad)*v.precio) as total FROM orden o, ordenonvideojuego ov, videojuego v WHERE o.id=ov.ordenId and ov.videojuegoId=v.id GROUP BY ov.videojuegoId ORDER BY total DESC;
  
};
