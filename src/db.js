const sqlite = require('sqlite3').verbose()
const path = require('path')

const db = new sqlite.Database(
	path.join(__dirname, 'data/database.sqlite'),
	(err) => {
		if (err) return console.log(err)

		console.log('Database connected')
	}
)

module.exports = db
