import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as path from 'path';
import * as passport from 'passport';
import * as mongoose from 'mongoose';
import * as express from 'express';
import Book from './models/book';
import Bookshelf from './models/bookshelf';
import routes from './routes/index';
import * as logger from 'morgan';
import * as session from 'express-session';
import {User} from './models/Users'
const MongoStore = require('connect-mongo')(session);
let app = express();

//express routes


//optional for security??
const dev = app.get('env') === 'development' ? true : false;

//optional??
if(dev){
  console.log('dev dev');
  let dotenv = require('dotenv');
  dotenv.load();
}
//config req.session your session
app.set('trust proxy', 1); // trust first proxy
let sess = {
  maxAge: 172800000, // 2 days
  secure: false,
  httpOnly: true
}

//set to secure in production
if (app.get('env') === 'production') {
  sess.secure = true // serve secure cookies
}

//use session config
app.use(session({
  cookie: sess,
  secret: process.env.SESSION_SECRET, // can support an array
  store: new MongoStore({
    url: process.env.MONGO_URI
  }),
  unset: 'destroy',
  resave: false,
  saveUninitialized: false //if nothing has changed.. do not restore cookie
}));
//database connections
mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on('connected', () => {
  User.findOne({username: 'admin'}, (err, user) => {
      if(err) return;
      if(user) return;
      if(!user)
        var admin = new User();
        admin.email = process.env.ADMIN_EMAIL;
        admin.username = process.env.ADMIN_USERNAME;
        admin.setPassword(process.env.ADMIN_PASSWORD);
        admin.roles = ['user', 'admin'];
        admin.save();
    });
    
  console.log('Get Served!!!!!');
});
mongoose.connection.on('error', (e) => {

  throw new Error(e);
});
// view engine setup
require('./config/passport')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//config bodyParser
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', require('./api/bookshelf'));
app.use('/api', require('./api/book'));
app.use('/api', require('./api/Users'));
//static routing

app.use('/', routes);
app.use('/vendor', express.static(path.join(__dirname,'../vendor')));
app.use('/node_modules', express.static(path.join(__dirname,'../node_modules')));
app.use('/client', express.static(path.join(__dirname,'../client')));

//a server routes

//apis


//redirect 404 to home for the sake of AngularJS client-side routes
app.get('/*', function(req, res, next) {
  if (/.js|.html|.css|templates|js|scripts/.test(req.path) || req.xhr) {
    return next({ status: 404, message:'Not Found'});
  } else {
    res.render('index');
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});


// developement error handler
// will print stacktrace
if (app.get('env')=== 'developement') {
  app.use((err: Error, req, res, next) => {

    res.status(err['status']|| 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stracktraces leaked to user
app.use((err:Error, req, res, next) => {
  res.status(err['status'] || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
export = app;
