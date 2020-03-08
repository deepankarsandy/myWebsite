const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const reactView = require('express-react-views');
const routes = require('./routes');

const ROOT = path.join(__dirname, '../../');
const app = express();

// view engine setup
app.set('views', path.join(ROOT, 'views'));
// for static html view
// app.use(express.static(path.join(ROOT, 'views')));
// for react views - server side rendered
app.set('view engine', 'jsx');
app.engine('jsx', reactView.createEngine());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../assets')));
app.use(logger('dev'));
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
