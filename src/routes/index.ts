import express from 'express'
import { UserRouter } from '../app/modules/users/users.routes'
import { CowRoutes } from '../app/modules/cow/cow.routes'
import { OrderRoutes } from '../app/modules/orders/orders.routes'
import { AdminRoutes } from '../app/modules/admin/admin.routes'
const router = express.Router()

const moduleRoutes = [
  {
    path: '/',
    route: UserRouter,
  },
  {
    path: '/cows/',
    route: CowRoutes,
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
