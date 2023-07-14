import { Model, ObjectId, Types } from 'mongoose'
import { IUser } from '../users/users.interface'

export type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Barishal'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Comilla'
  | 'Rangpur'
  | 'Mymensingh'
export type IBreed =
  | 'Brahman'
  | 'Nellore'
  | 'Sahiwal'
  | 'Gir'
  | 'Indigenous'
  | 'Tharparkar'
  | 'Kankrej'
export type ICategory = 'Dairy' | 'Beef' | 'Dual Purpose'
export type ICow = {
  name: string
  age: number
  price: number
  location: ILocation
  breed: IBreed
  weight: number
  label?: 'for sale' | 'sold out'
  category: ICategory
  seller: Types.ObjectId | IUser
}

export type CowModel = Model<ICow, object>
export type ICowFilters = {
  searchTerm?: string
  minPrice?: string
  maxPrice?: string
}

export type ISellerInfo = {
  _id: ObjectId
  role: string
}
