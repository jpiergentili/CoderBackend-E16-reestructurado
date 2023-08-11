import { Router } from "express";
import cartModel from '../dao/models/cart.models.js';

const router = Router()

export const getProductsFromCart = async (req, res) => {
    try {
        const id = req.params.cid
        const result = await cartModel.findById(id).populate('products.product').lean()
        if (result === null) {
            return {
                statusCode: 404,
                response: { status: 'error', error: 'Not found' }
            }
        }
        return {
            statusCode: 200,
            response: { status: 'success', payload: result }
        }
    } catch(err) {
        return {
            statusCode: 500,
            response: { status: 'error', error: err.message }
        }
    }
}

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const cart = await cartModel.findOne({ _id: cid }).lean().exec()
    console.log(JSON.stringify(cart, null, '\t'));
    res.render('cart', { cart })
})

export default router;
