import * as mongoose from 'mongoose';

import {IBook, Book} from './book';
import {IUser, User} from './Users';
let Schema = mongoose.Schema;



export interface IBookshelf extends mongoose.Document{
  name: string;
  books: Array<IBook>;
  username:{ type: string, lowercase: true, required: true};
}

let Bookshelf = new Schema({
  name: String,
  books:[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
  username:{ type: String, lowercase: true, required: true}
});

export default mongoose.model<IBookshelf>('BookShelf', Bookshelf);
