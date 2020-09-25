const express = require('express');
const exphbs = require('express-handlebars');

const path = require('path');
const morgan = require('morgan');

// intialiaztions
const app = express();

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
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// global variables

// routes
app.use('/tasks', require('./routes/tasks'));

// public fils
app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'));
console.log(`Server on port ${app.get('port')}`);
