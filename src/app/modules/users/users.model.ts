/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './users.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
import { roles } from './users.constants'

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: roles, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, '_id' | 'email' | 'password'> | null> {
  return await User.findOne({ email: email })
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
