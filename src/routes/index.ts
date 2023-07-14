import express from 'express'
import { UserRouter } from '../app/modules/users/users.routes'
import { BookRoutes } from '../app/modules/book/book.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/',
    route: UserRouter,
  },
  {
    path: '/books/',
    route: BookRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
