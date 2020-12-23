import {Router} from 'express'
import * as userService from '../services/user.services'
import {validateRole, verifyRoleExistence, verifyToken} from '../scripts/middlewares'

const user_router = Router()

user_router.get('/', [verifyToken, validateRole(["ROLE_ADMIN"])], userService.getUsers)
user_router.post('/', [verifyToken, validateRole(["ROLE_ADMIN"]), verifyRoleExistence], userService.createUser)

export default user_router