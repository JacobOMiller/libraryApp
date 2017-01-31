import * as express from 'express';
import BookShelf from './../models/bookshelf';
import * as methods from '../lib/methods';
let router = express.Router();

router.get('/bookshelf', (req, res, next) => {
  BookShelf.find({}, {}, (e, data) => {
    if (e) return next({ message: 'Could not find bookshelf', Error:e});
    res.json(data);
  })
})
router.post('/bookshelf', methods.isAuthenticated, (req, res, next) => {
    BookShelf.create(req.body.username, (e, data) => {
        if (e) return next({
            message: 'could not create bookshelf',
            error: e
        });
        res.json(data);
    })
})
router.put('/bookshelf/:id', methods.isBookshelfOwner, (req, res, next) => {
    BookShelf.update({_id: req.params.id},req.body, {},(e, data) => {
        if (e) return next({
            message: 'could not update books',
            error: e
        });
        res.json(data);
    })
})
router.delete('/bookshelf/:id', methods.isBookshelfOwner, (req, res, next) => {
    BookShelf.remove({_id: req.params.id},(e) => {
        if (e) return next({
            message: 'could not delete book',
            error: e
        });
        res.json({});
    })
})
router.get('/bookshelf/:username', (req, res, next) => {
  console.log(req.params.username);
  BookShelf.find({username: req.params.username}, {}, (e, data) => {
    if (e) return next({ message: 'Could not find books', error:e});
    console.log(data);
    res.json(data);
  })
})
router.get('/bookshelf/:id', (req, res, next) => {
  console.log(req.params.id);
  BookShelf.findOne({_id: req.params.id}, {}, (e, data) => {
    if (e) return next({ message: 'Could not find books', error:e});
    console.log(data);
    res.json(data);
  })
})
export = router;
