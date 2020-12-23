import { Router } from "express"
import { getIndex }from '../services/index.services'

const index_router = Router()

index_router.get('/', getIndex)

export default index_router