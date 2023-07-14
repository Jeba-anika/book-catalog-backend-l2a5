/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const adminSchema = new Schema<IAdmin>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
    },
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
    password: {
      type: String,
      required: true,
      select: 0,
    },
    role: {
      type: String,
      required: true,
      enum: ['admin'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

adminSchema.statics.isAdminExist = async function (
  phone: string
): Promise<Pick<IAdmin, '_id' | 'role' | 'password'> | null> {
  return await Admin.findOne(
    { phoneNumber: phone },
    { _id: 1, role: 1, password: 1 }
  )
}

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

adminSchema.pre('save', async function (next) {
  const admin = this
  admin.password = await bcrypt.hash(
    admin.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

export const Admin = model<IAdmin, AdminModel>('Admins', adminSchema)
