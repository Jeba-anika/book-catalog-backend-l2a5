import express from 'express'
import { BookController } from './book.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLES } from '../../enums/user'
const router = express.Router()

router.post('/', auth(ENUM_USER_ROLES.USER), BookController.createBook)
router.get('/', BookController.getAllBooks)
// router.get(
//   '/:id',
//   auth(
//     ENUM_USER_ROLES.ADMIN,
//     ENUM_USER_ROLES.SUPER_ADMIN,
//     ENUM_USER_ROLES.BUYER,
//     ENUM_USER_ROLES.SELLER
//   ),
//   CowController.getSingleCow
// )
// router.patch('/:id', auth(ENUM_USER_ROLES.SELLER), CowController.updateCow)
// router.delete('/:id', CowController.deleteCow)
// router.post('/', auth(ENUM_USER_ROLES.SELLER), CowController.createCow)
// router.get(
//   '/',
//   auth(
//     ENUM_USER_ROLES.ADMIN,
//     ENUM_USER_ROLES.SUPER_ADMIN,
//     ENUM_USER_ROLES.BUYER,
//     ENUM_USER_ROLES.SELLER
//   ),
//   CowController.getAllCows
// )

// router.post('/', CowController.createCow)

export const BookRoutes = router
