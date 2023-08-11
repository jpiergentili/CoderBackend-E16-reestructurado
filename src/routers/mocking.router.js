import { Router } from "express";
import { generateProduct } from "../utils.js";

const router = Router()

router.get('/', async (req, res) => {
    const products = []
    for (let index = 0; index < 100 ; index++){
        products.push(generateProduct())
    }
    res.json({status: 'success', payload: products})
})

/*  ejemplo de request GET anterior: 

    http://localhost:8080/mockingproducts */

export default router