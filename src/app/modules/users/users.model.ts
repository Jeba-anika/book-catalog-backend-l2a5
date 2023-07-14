/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './users.interface'
import { roles } from './users.constants'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: roles },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: { type: String, required: true },
    budget: { type: Number },
    income: { type: Number },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.statics.isUserExist = async function (
  phone: string
): Promise<Pick<IUser, '_id' | 'role' | 'phoneNumber' | 'password'> | null> {
  return await User.findOne(
    { phoneNumber: phone },
    { _id: 1, role: 1, password: 1, phoneNumber: 1 }
  )
}

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const User = model<IUser, UserModel>('Users', userSchema)
