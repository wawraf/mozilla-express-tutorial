var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression')
var helmet = require('helmet')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var catalogRouter = require('./routes/catalog');

var app = express();
app.use(helmet())

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.MONGODB_URI || 'mongodb://bond:bond007@ds131753.mlab.com:31753/mozilla-express-tutorial';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

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
  res.render('error');
});

var jStat = require('./controllers/jStat')

console.log('Correlation')
let wiek = [4, 6, 3, 5, 1.5, 1.5] //[45, 78, 24, 51, 13, 13] //[18, 18, 21, 19, 16, 17]
let waga = [1, 3, 3, 3, 6, 5] //[23, 25, 25, 25, 34, 30] //[78, 77, 98, 110, 80, 69]

pearson = jStat.corrcoeff(wiek, waga)
spearman = jStat.spearmancoeff(wiek, waga)

console.log('Pearson: ' + pearson.toFixed(3))
console.log('Spearman: ' + spearman.toFixed(3))

t_pearson = pearson * Math.sqrt(wiek.length - 2) / Math.sqrt(1 - pearson**2) 
t_spearman = spearman * Math.sqrt(wiek.length - 2) / Math.sqrt(1 - spearman**2) 

console.log('T-score (Pearson): ' + t_pearson.toFixed(2))
console.log('T-score (Spearman): ' + t_spearman.toFixed(2))

console.log('P-value (Pearson): ' + (jStat.studentt.cdf(-Math.abs(t_pearson), wiek.length - 2) * 2).toFixed(3))
console.log('P-value (Spearman): ' + (jStat.studentt.cdf(-Math.abs(t_spearman), wiek.length - 2) * 2).toFixed(3))


module.exports = app;