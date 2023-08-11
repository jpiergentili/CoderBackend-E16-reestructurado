import { Router } from "express";
import cartModel from '../dao/models/cart.models.js';

const router = Router()

router.get('/:cid', async (req, res) => {
    const cid = req.params.cid
    const cart = await cartModel.findOne({ _id: cid }).lean().exec()
    console.log(JSON.stringify(cart, null, '\t'));
    res.render('cart', { cart })
})

export default router;
