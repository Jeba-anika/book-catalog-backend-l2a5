import express from 'express'
import { UserRouter } from '../app/modules/users/users.routes'
import { OrderRoutes } from '../app/modules/orders/orders.routes'
import { AdminRoutes } from '../app/modules/admin/admin.routes'
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
  {
    path: '/orders/',
    route: OrderRoutes,
  },
  {
    path: '/admins/',
    route: AdminRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router
