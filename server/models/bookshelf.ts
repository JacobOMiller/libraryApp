import * as mongoose from 'mongoose';
import Book from './book';
let Schema = mongoose.Schema;

export interface IBookshelf extends mongoose.Document{
  name: string;
  books: number;
}

let BookShelfSchema = new Schema({
  name: String,
  books: Number
});

export const BookShelf = mongoose.model<IBookshelf>('BookShelf', BookShelfSchema);
