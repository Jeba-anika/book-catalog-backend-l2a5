/* eslint-disable no-unused-vars */
import { Model, ObjectId, Types } from 'mongoose'
import { IBook } from '../book/book.interface'

export type IUser = {
  _id: ObjectId
  email: string
  password: string
  role: 'user'
  wishlist?: Types.Array<IBook>
  currentlyReading?: Types.Array<IBook>
  planToReadSoon?: Types.Array<IBook>
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUser, '_id' | 'role' | 'email' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
