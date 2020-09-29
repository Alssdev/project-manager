const express = require('express');
const exphbs = require('express-handlebars');

const path = require('path');
const flash = require('connect-flash');

const session = require('express-session');
const passport = require('passport');

// intialiaztions
const app = express();
require('./lib/passsport');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); // here are views
app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', // files' extentions
    helpers: require('./lib/handlebars'),
  })
);
app.set('view engine', '.hbs');

// middlewares
app.use(
  session({
    secret: 'yVJZ58HdKRwIy9q',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// global variables
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.error = req.flash('error');
  app.locals.user = req.user;
  next();
});

// routes
app.use(require('./routes/auth'));
app.use('/tasks', require('./routes/tasks'));
app.use('/dividers', require('./routes/dividers'));

// public fils
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`);
