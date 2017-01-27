import express = require('express');
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import {User} from '../models/Users';
let router = express.Router();

router.get('/users/:id', function(req, res, next) {
  User.findOne(req.params._id).select('-passwordHash -salt').then((user) => {
    return res.json()
  }).catch((err) => {
    return next({message:'could not find user', error: err});
  });
});

//CONSTANTLY RETURNS 200 because we are always authorized to check.
router.get('/currentuser', (req, res, next) => {
  if (!req.user) return res.json({});
  return res.json(req.user);
});

router.post('/Register', function(req, res, next) {
  let user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);
  user.save(function(err, user) {
    if(err) return next(err);
    res.json();
  });
});

router.post('/login/local', function(req, res, next) {
  if(!req.body.username && !req.body.password){
    return res.status(400).json({message: "Please fill out every field"});
  }

  passport.authenticate('local', function(err, user, info) {
    if(err) return next(err);
    console.log(user);
    if(user) {
      req.logIn(user, (err) => {
        if (err) return next({message: 'login failed', error: err});
        req.session.save(function (err){
          if (err) return next({message: 'session failed', error: err});
          return res.json(req.user);
        });
      });
    } else {
      return res.json(req.user);
    }
  })(req, res, next);
});

router.get('/logout/local', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return next({message: 'still authenticated, please try again.', error: err});
    req.user = null;
    req.logout();
    return res.json({isAuthenticated: req.isAuthenticated()});
  });
});

export = router;
