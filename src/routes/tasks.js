const { Router } = require('express')
const router = Router()

const db = require('../db')

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM tasks'

	db.all(sql, (err, rows) => {
		if (err) {
			console.log(err.message)
			res.status(500).json({ error: err.message })
		}

		res.render('index', { tasks: rows })
	})
})

module.exports = router
