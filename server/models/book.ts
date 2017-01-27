import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

export interface IBook extends mongoose.Document{
  title: string,
  author: string,
  picture: string,
  description: string
}

let Book = new Schema({
  title: String,
  author: String,
  picture: String,
  description: String
});

export default mongoose.model<IBook>('Book', Book);
