var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');

var mongoose = require('mongoose')

var mongoDB = 'mongodb://127.0.0.1/EW_TPC6'

mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

var db = mongoose.connection

db.on('error', console.error.bind('Erro de conexão ao MongoDB'))

db.once('open', () => {
  console.log('Conexão ao MongoDB realizada com sucesso')
})

var periodosRouter = require('./routes/periodos');
var compositoresRouter = require('./routes/compositores');

var app = express();

// view engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/periodos', periodosRouter);
app.use('/compositores', compositoresRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.jsonp(JSON.stringify(err));
});

module.exports = app;
