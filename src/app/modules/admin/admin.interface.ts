/* eslint-disable no-unused-vars */
import { Model, ObjectId } from 'mongoose'

export type IAdminName = {
  firstName: string
  lastName: string
}
export type IAdmin = {
  _id: ObjectId
  phoneNumber: string
  role: 'admin'
  password: string
  name: IAdminName
  address: string
}

export type AdminModel = {
  isAdminExist(
    phone: string
  ): Promise<Pick<IAdmin, '_id' | 'role' | 'password'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IAdmin>
