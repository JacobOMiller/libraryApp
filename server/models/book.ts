import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export interface IBook extends mongoose.Document{
  title: string,
  author: string,
  picture: string,
  description: string
}


let BookSchema = new Schema({
  title: String,
  author: String,
  picture: String,
  description: String
});







export const Book = mongoose.model<IBook>('book', BookSchema);
