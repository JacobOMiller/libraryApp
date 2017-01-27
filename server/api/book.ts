import * as express from 'express';
import Book from './../models/book';
let router = express.Router();

router.get('/books', (req, res, next) => {
  Book.find({}, {}, (e, data) => {
    if (e) return next({ message: 'Could no find book', Error:e});
    res.json(data);
  })
})

router.post('/books', (req, res, next) => {
    Book.create(req.body, (e, data) => {
        if (e) return next({
            message: 'could not create book',
            Error: e
        });
        res.json(data);
    })
})

router.put('/books/:id', (req, res, next) => {
    Book.update({_id: req.params.id},req.body, {},(e, data) => {
        if (e) return next({
            message: 'could not update books',
            Error: e
        });
        res.json(data);
    })
})
router.delete('/books/:id', (req, res, next) => {
    Book.remove({_id: req.params.id},(e) => {
        if (e) return next({
            message: 'could not delete book',
            Error: e
        });
        res.json({});
    })
})
router.get('/books/:id', (req, res, next) => {
  console.log(req.params.id);
  Book.findOne({_id: req.params.id}, {}, (e, data) => {
    if (e) return next({ message: 'Could not find books', Error:e});
    console.log(data);
    res.json(data);
  })
})
export = router;
