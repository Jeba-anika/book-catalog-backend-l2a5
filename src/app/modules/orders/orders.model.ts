import { Schema, model } from 'mongoose'
import { IOrder, OrderModel } from './orders.interface'

const orderSchema = new Schema<IOrder>({
  buyer: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  cow: { type: Schema.Types.ObjectId, ref: 'Cows', required: true },
})

export const Order = model<IOrder, OrderModel>('Orders', orderSchema)
