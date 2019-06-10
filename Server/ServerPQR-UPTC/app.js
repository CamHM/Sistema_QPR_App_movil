var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//Se definen por aparte cada una de las entidades
var personRouter = require('./routes/person');
var postRouter = require('./routes/post');
var likeRouter = require('./routes/like');
var commentRouter = require('./routes/comment');
var photoPostRouter = require('./routes/photo_post');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '10mb', extended: true}));
app.use(express.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Se define el routing
app.use('/person', personRouter);
app.use('/post', postRouter);
app.use('/like', likeRouter);
app.use('/comment', commentRouter);
app.use('/photopost', photoPostRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});*/

module.exports = app;
