import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { APP_PORT } from './config/config'
import index_router from './api/index.routes'
import product_router from './api/products.routes'
import auth_router from './api/auth.routes'
import user_router from './api/users.routes'
import './models/database'
import * as initializer from './scripts/configurators'

const app = express()
initializer.createRoles()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use('/api', index_router)
app.use('/api/auth', auth_router)
app.use('/api/products',product_router)
app.use('/api/users',user_router)

app.listen(APP_PORT,() => console.log(`Server listening on port: ${APP_PORT}`))