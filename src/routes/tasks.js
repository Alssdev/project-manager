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

		const toDo = rows.filter((task) => {
			return task.state === 1;
		});

		const inProgress = rows.filter((task) => {
			return task.state === 2;
		});

		const completed = rows.filter((task) => {
			return task.state === 3;
		});

		res.render('tasks/list', { toDo, inProgress, completed });
	});
});

router.get('/add', (req, res) => {
	const { state } = req.query;

	res.render('tasks/add', { state });
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
	const { state } = req.query;

	db.run(
		`INSERT INTO tasks(title, desc, state) VALUES('${task.title}', '${task.desc}', ${state})`,
		(err) => {
			if (err) {
				console.log(err.message);
			}
		}
	);

	res.redirect('tasks');
});

router.put('/:id/state/:state', (req, res) => {
	const { id, state } = req.params;

	const sql = `UPDATE tasks SET state=${state} WHERE id=${id}`;
	db.run(sql, (err) => {
		if (err) {
			console.log(err.message);
			res.sendStatus(500);
		}

		res.sendStatus(200);
	});
});
module.exports = router;
