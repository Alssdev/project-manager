const express = require('express')
const exphbs = require('express-handlebars')

const path = require('path')
const morgan = require('morgan')
const { extname } = require('path')

// intialiaztions
const app = express()

// settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine(
	'.hbs',
	exphbs({
		defaultLayout: 'main',
		layoutsDir: path.join(app.get('views'), 'layouts'),
		partialsDir: path.join(app.get('views'), 'partials'),
		extname: '.hbs',
		helpers: require('./lib/handlebars'),
	})
)
app.set('view engine', '.hbs')

// middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// global variables

// routes
app.use(require('./routes/index'))
app.use('/tasks', require('./routes/tasks'))

// public fils
app.use(express.static(path.join(__dirname, 'public')))

app.listen(app.get('port'))
console.log(`Server on port ${app.get('port')}`)
