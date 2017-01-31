import * as express from 'express';
import {IBook,Book} from './../models/book';
import * as methods from '../lib/methods';
import Bookshelf from './../models/bookshelf';
let router = express.Router();

//book
router.get('/books', (req, res, next) => {
  Book.find({}, {}, (e, data) => {
    if (e) return next({ message: 'Could no find book', Error:e});
    res.json(data);
  })
})
//bookshelf


//book
router.post('/books', methods.isAuthenticated, (req, res, next) => {
    Book.create(req.body, (e, data) => {
        if (e) return next({
            message: 'could not create book',
            Error: e
        });
        res.json(data);
    })
})

//bookshelf


//book
router.put('/books/:id', methods.isAuthenticated, (req, res, next) => {
    Book.update({_id: req.params.id},req.body, {},(e, data) => {
        if (e) return next({
            message: 'could not update books',
            Error: e
        });
        res.json(data);
    })
})

//bookshelf


//book
router.delete('/books/:id', methods.isAuthenticated, (req, res, next) => {
    Book.remove({_id: req.params.id},(e) => {
        if (e) return next({
            message: 'could not delete book',
            Error: e
        });
        res.json({});
    })
})

//bookshelf



//book
router.get('/books/:id', (req, res, next) => {
  console.log(req.params.id);
  Book.findOne({_id: req.params.id}, {}, (e, data) => {
    if (e) return next({ message: 'Could not find books', Error:e});
    console.log(data);
    res.json(data);
  })
})


export = router;
