import express from 'express'
import { UserController } from './users.controller'
const router = express.Router()

router.post('/auth/signup', UserController.createUser)
router.post('/auth/login', UserController.userLogin)
router.post('/auth/refresh-token', UserController.userRefreshToken)
router.get('/user/:id', UserController.getUser)

export const UserRouter = router
