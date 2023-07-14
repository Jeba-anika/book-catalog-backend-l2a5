import express from 'express'
import { UserController } from './users.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLES } from '../../enums/user'
const router = express.Router()

router.get(
  '/users/my-profile',
  auth(
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.BUYER,
    ENUM_USER_ROLES.SELLER
  ),
  UserController.getUserProfile
)
router.get(
  '/users/:id',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.getSingleUser
)
router.patch(
  '/users/my-profile',
  auth(
    ENUM_USER_ROLES.SUPER_ADMIN,
    ENUM_USER_ROLES.ADMIN,
    ENUM_USER_ROLES.BUYER,
    ENUM_USER_ROLES.SELLER
  ),
  UserController.updateUserProfile
)
router.patch(
  '/users/:id',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.updateUser
)

router.delete(
  '/users/:id',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.deleteUser
)
router.get(
  '/users',
  auth(ENUM_USER_ROLES.SUPER_ADMIN, ENUM_USER_ROLES.ADMIN),
  UserController.getAllUsers
)
router.post('/auth/signup', UserController.createUser)
router.post('/auth/login', UserController.userLogin)
router.post('/auth/refresh-token', UserController.userRefreshToken)

export const UserRouter = router
