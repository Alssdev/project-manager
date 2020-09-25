const { Router } = require('express');
const router = Router();

const db = require('../db');

router.get('/', (req, res) => {
	const sql = 'SELECT * FROM tasks';

	db.all(sql, (err, rows) => {
		if (err) {
			console.log(err.message);
			res.status(500).json({ error: err.message });
		}

		res.render('tasks/list', { tasks: rows });
	});
});

router.get('/add', (req, res) => {
	res.render('tasks/add');
});

router.get('/delete/:id', (req, res) => {
	const { id } = req.params;

	db.run(`DELETE FROM tasks WHERE id=${id}`, (err) => {
		if (err) {
			console.log(err.message);
		}

		res.redirect('/tasks');
	});
});

router.post('/', (req, res) => {
	const task = req.body;

	db.run(
		`INSERT INTO tasks(title, desc) VALUES('${task.title}', '${task.desc}')`,
		(err) => {
			if (err) {
				console.log(err.message);
			}
		}
	);

	res.redirect('tasks');
});

module.exports = router;
