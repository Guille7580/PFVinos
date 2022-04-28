const { Categoria} = require("../db");


async function getAllCategories(req, res) {
  
  try {
    
      const ActivityAll = await Categoria.findAll({});
      res.send(ActivityAll);
    
  } catch (error) {
    res.send(error);
  }
}

async function categoriaPost (req, res, next) {
  try {
    const { nombre } = req.body

    const createCat = await Categoria.findOne({
      where: {
        nombre: nombre
      }
    })

    if (!createCat) {
      const addCat = await Categoria.create({
        nombre: nombre
      })
      return res.json(addCat)
    }
    return next({
      status: 400,
      message: 'Ya existe esta categoria'
    })
  } catch (error) {
    console.log(error)
    next({})
  }
}

async function categoriaUpdate (req, res, next) {
  try {
    const { id, nombre } = req.body

    const UpdateCateg = await Categoria.update(
      {
        nombre
      },
      { where: { id } }
    )

    if (!UpdateCateg) {
      return next({
        status: 404,
        message: 'No data found'
      })
    }
    res.json({
      message: 'Los datos se actualizaron correctamente'
    })
  } catch (error) {
    console.log(error)
    next({})
  }
}
// async function categoriaDeleteId (res, req, next) {
//   const { id } = req.params
//   console.log(id)
//   const user = await Categoria.findByPk(id)
//   if (user) {
//     await user.destroy()

//     res.send('The user has been deleted successfully')
//   } else {
//     res.send('The user does not exist')
//   }
  // const categoriaId = req.params.id;
  // console.log('++++++++++++++++++++' + id)
  // try{
  //   let catId = await Categoria.findByPk(id)
  //   if (catId) {
  //     await catId.destroy(
  //       // where: {
  //       //   id: id,
  //       // }
  //     );
  //     return res.json({ delete: true})
  //   }return res.status(400).send('id no existe')
  // } catch (error){
  //   next (error)
  // }
//}
// categorRoute.delete('/:nombre', async(res, req, next) => {
//  try {
//     const nombre = req.params.nombre
//     console.log("+++++++++++++++++++++" + nombre)
//     const deleteId = await Categoria.findOne({
//       where: {
//         nombre: nombre
//       }
//     })
//     if(deleteId) {
//       await Categoria.destroy()
//       res.json({
//         status: 202,
//         message: 'Categoria borrado'
//       })
//     }
//     else if (!deleteId) {
//       return next({
//         status: 404,
//         message: 'Categoria no encontrada'
//       })
//     }

//   } catch (error) {
//     console.log(error)
//     next({})
//   }
// });

module.exports = {
  getAllCategories,
  categoriaPost,
  //categoriaDelete,
  categoriaUpdate,
  //categoriaDeleteId
}



