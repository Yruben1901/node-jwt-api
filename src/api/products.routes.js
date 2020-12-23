/**
 * Router for the products
 * */
import { Router } from 'express'
import * as productService from '../services/product.services'
import { verifyToken, validateRole } from '../scripts/middlewares'

const product_router = Router()

product_router.get('/', [verifyToken], productService.getProducts)
product_router.post('/', [verifyToken, validateRole(["ROLE_ADMIN"])], productService.createProduct)
product_router.get('/:productId',[verifyToken], productService.getProductById)
product_router.put('/:productId', [verifyToken, validateRole(["ROLE_MODERATOR"])], productService.updateProductById)
product_router.delete('/:productId', [verifyToken, validateRole(["ROLE_ADMIN","ROLE_MODERATOR"])], productService.deleteProductById)

export default product_router
