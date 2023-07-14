import { Model, Types } from 'mongoose'
import { IUser } from '../users/users.interface'

export type IBook = {
  title: string
  author: string
  genre: string
  publicationDate: string
  reviews?: Types.Array<string>
  owner: IUser | Types.ObjectId
}

export type BookModel = Model<IBook, object>
export type IBookFilters = {
  searchTerm?: string
  title?: string
  author?: string
  genre?: string
}
