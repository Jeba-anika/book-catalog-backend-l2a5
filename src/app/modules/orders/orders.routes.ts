import express from 'express'
import { OrderController } from './orders.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLES } from '../../enums/user'
const router = express.Router()

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.BUYER,
    ENUM_USER_ROLES.SELLER
  ),
  OrderController.getSingleOrder
)
router.post('/', auth(ENUM_USER_ROLES.BUYER), OrderController.createOrder)

router.get(
  '/',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  OrderController.getAllOrders
)
export const OrderRoutes = router
