import { Schema, model } from 'mongoose'
import { CowModel, ICow } from './cow.interface'
import { breeds, category, labels, locations } from './cow.constants'

const cowSchema = new Schema<ICow>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  breed: { type: String, required: true, enum: breeds },
  category: { type: String, required: true, enum: category },
  label: { type: String, enum: labels },
  location: { type: String, enum: locations },
  price: { type: Number, required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  weight: { type: Number, required: true },
})

export const Cow = model<ICow, CowModel>('Cows', cowSchema)
