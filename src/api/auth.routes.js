/**
 * Router for the authentication
 * */
import { Router } from "express"
import * as authService from '../services/auth.services'
import {verifyRoleExistence} from '../scripts/middlewares'

const auth_router = Router()

auth_router.post('/signIn',authService.signIn)

auth_router.post('/signUp',verifyRoleExistence,authService.signUp)

export default auth_router
