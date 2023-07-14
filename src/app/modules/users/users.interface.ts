/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose'
export type IName = {
  firstName: string
  lastName: string
}
export type IUser = {
  _id: ObjectId
  phoneNumber: string
  role: 'seller' | 'buyer'
  password: string
  name: IName
  address: string
  budget?: number
  income?: number
}

export type UserModel = {
  isUserExist(
    phone: string
  ): Promise<Pick<IUser, '_id' | 'role' | 'phoneNumber' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
