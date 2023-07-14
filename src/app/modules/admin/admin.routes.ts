import express from 'express'
import { AdminController } from './admin.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLES } from '../../enums/user'
const router = express.Router()

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  AdminController.getAdminProfile
)
router.post('/create-admin', AdminController.createAdmin)
router.post('/login', AdminController.adminLogin)
router.post('/refresh-token', AdminController.adminRefreshToken)
router.patch('/my-profile', AdminController.updateAdminProfile)

export const AdminRoutes = router
