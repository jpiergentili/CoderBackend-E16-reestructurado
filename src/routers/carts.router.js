import { Router } from "express";
import cartModel from '../dao/models/cart.models.js';

import CustomError from '../services/errors/custom_errors.js';
import EErros from '../services/errors/enums.js';
import {
  generateCartNotFoundErrorInfo,
  generateCartAddErrorInfo,
  generateCartUpdateErrorInfo,
  generateCartProductUpdateErrorInfo,
  generateCartDeleteErrorInfo
} from '../services/errors/info.js';

const router = Router();

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res, next) => {
    const { cid, pid } = req.params;  
    try {
      const cart = await cartModel.findById(cid);
    
      if (!cart) {
        const customError = CustomError.createError({
          name: 'Carrito no encontrado',
          message: 'Carrito no encontrado',
          cause: generateCartNotFoundErrorInfo(),
          code: EErros.DATABASE_ERROR
        });
        return next(customError);
      }
  
      if (cart.cartProducts.length === 1) {
        cart.cartProducts = [];
      } else {
        cart.cartProducts = cart.cartProducts.filter(
          (product) => product._id.toString() !== pid
        );
      }
  
      await cart.save();
  
      return res.json({ message: 'Producto eliminado del carrito exitosamente' });
    } catch (error) {
      const customError = CustomError.createError({
        name: 'Error al eliminar el producto del carrito',
        message: 'Error al eliminar el producto del carrito',
        cause: generateCartDeleteErrorInfo(),
        code: EErros.DATABASE_ERROR
      })
      return next(customError);
    }
})

  /* Ejemplo de request al metodo delete anterior
    http://localhost:8080/api/carts/646adb45fab3b6b69a5fa45b/products/646b909915e9a48004bd8d64    
  */

    router.delete('/:cid', async (req, res, next) => {
    const { cid } = req.params;
    
    try {
        const cart = await cartModel.findOne({ _id: cid });
    
        if (!cart) {
          const customError = CustomError.createError({
            name: 'Carrito no encontrado',
            message: 'Carrito no encontrado',
            cause: generateCartNotFoundErrorInfo(),
            code: EErros.DATABASE_ERROR
          });
          return next(customError);
        }
    
        cart.cartProducts = [];
    
        await cart.save();
    
        return res.json({ message: 'Productos eliminados del carrito exitosamente' });
      } catch (error) {
        const customError = CustomError.createError({
          name: 'Error al eliminar los productos del carrito',
          message: 'Error al eliminar los productos del carrito',
          cause: generateCartDeleteErrorInfo(),
          code: EErros.DATABASE_ERROR
        });
        return next(customError);
    }
});
    /* Ejemplo de la request delete anterior para vaciar el carrito
        DELETE http://localhost:8080/api/carts/646adb45fab3b6b69a5fa45b  
    */

// POST /api/carts/:cid
router.post('/:cid', async (req, res, next) => {
    const { cid } = req.params;
    const { pid, qty } = req.body;
  
    try {
      const cart = await cartModel.findOne({ _id: cid });
  
      if (!cart) {
        const customError = CustomError.createError({
          name: 'Carrito no encontrado',
          message: 'Carrito no encontrado',
          cause: generateCartNotFoundErrorInfo(),
          code: EErros.DATABASE_ERROR
        });
        return next(customError);
      }

      const productAdded = { product: { _id: pid}, qty: qty };
      cart.cartProducts.push(productAdded);
  
      // Guardo los cambios en la base de datos
      await cart.save();
  
      return res.json({ message: 'Producto agregado al carrito exitosamente' });
    } catch (error) {
      const customError = CustomError.createError({
        name: 'Error al agregar el producto al carrito',
        message: 'Error al agregar el producto al carrito',
        cause: generateCartAddErrorInfo(),
        code: EErros.DATABASE_ERROR
      });
      return next(customError);
    }
  });
/* ejemplo 
http://localhost:8080/api/carts/646adb45fab3b6b69a5fa45b

{
  "pid": "646947fa7485490070fda7de",
  "qty": 3
}
*/

// PUT /api/carts/:cid
router.put('/:cid', async (req, res, next) => {
    const { cid } = req.params;
    
    try {
        const { cartProducts, totalAmount } = req.body;

        const updatedCart = await cartModel.findByIdAndUpdate(
            cid,
            { cartProducts, totalAmount },
            { new: true }
        );

        if (!updatedCart) {
          const customError = CustomError.createError({
            name: 'Carrito no encontrado',
            message: 'Carrito no encontrado',
            cause: generateCartNotFoundErrorInfo(),
            code: EErros.DATABASE_ERROR
          });
          return next(customError);
      }
  
        return res.json({ message: 'Carrito actualizado exitosamente' });
      } catch (error) {
        const customError = CustomError.createError({
          name: 'Error al actualizar el carrito',
          message: 'Error al actualizar el carrito',
          cause: generateCartUpdateErrorInfo(),
          code: EErros.DATABASE_ERROR
        });
        return next(customError);
    }
});
/* Ejemplo de la request put anterior
    http://localhost:8080/api/carts/646adb45fab3b6b69a5fa45b

    {
    "_id": "646adb45fab3b6b69a5fa45b",
    "first_name": "Luisina",
    "last_name": "Vergara",
    "cartProducts": [
            {
            "product": {
                    "_id": "646947fa7485490070fda7e4"
                    },
                    "qty": 20
                    }
            ]
    }
*/

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
    const { cid, pid } = req.params;
  
    try {
      const { qty } = req.body;
  
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        const customError = CustomError.createError({
          name: 'Carrito no encontrado',
          message: 'Carrito no encontrado',
          cause: generateCartNotFoundErrorInfo(),
          code: EErros.DATABASE_ERROR
        });
        return next(customError);
      }
  
      const productIndex = cart.cartProducts.findIndex(
        (product) => product._id.toString() === pid
      );
  
      if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado en el carrito' });
      }
  
      cart.cartProducts[productIndex].qty = qty;
  
      await cart.save();
  
      return res.json({ message: 'Cantidad del producto actualizada exitosamente' });
    } catch (error) {
      const customError = CustomError.createError({
        name: 'Error al actualizar la cantidad del producto',
        message: 'Error al actualizar la cantidad del producto',
        cause: generateCartProductUpdateErrorInfo(),
        code: EErros.DATABASE_ERROR
      });
      return next(customError);
    }
});
/*  ejemplo de request put anterior: 
    http://localhost:8080/api/carts/646adb45fab3b6b69a5fa45b/products/646b909915e9a48004bd8d64
    {
        "qty": 5
        } */


export default router;
