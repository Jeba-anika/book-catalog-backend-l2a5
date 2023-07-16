import express from 'express'
import { BookController } from './book.controller'
import auth from '../../middlewares/auth'
import { ENUM_USER_ROLES } from '../../enums/user'
const router = express.Router()

router.get('/:id', BookController.getSingleBook)
router.patch('/:id', auth(ENUM_USER_ROLES.USER), BookController.updateBook)
router.delete('/:id', auth(ENUM_USER_ROLES.USER), BookController.deleteBook)
router.post(
  '/addToWishlist/:id',
  auth(ENUM_USER_ROLES.USER),
  BookController.addToWishlist
)
router.post(
  '/addToCurrentlyReading/:id',
  auth(ENUM_USER_ROLES.USER),
  BookController.addToCurrentlyReading
)
router.post(
  '/addToPlanToReadSoon/:id',
  auth(ENUM_USER_ROLES.USER),
  BookController.addToPlanToReadSoon
)
router.post(
  '/finishedReading/:id',
  auth(ENUM_USER_ROLES.USER),
  BookController.setFinishedReading
)
router.post('/', auth(ENUM_USER_ROLES.USER), BookController.createBook)
router.get('/', BookController.getAllBooks)

export const BookRoutes = router
