import { Schema, model } from 'mongoose'
import { BookModel, IBook } from './book.interface'

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    author: { type: String, required: true },
    publicationDate: { type: String, required: true },
    reviews: [String],
    owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Book = model<IBook, BookModel>('Books', bookSchema)
