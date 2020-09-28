const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../lib/auth');

const db = require('../db');

router.get('/', isLoggedIn, (req, res) => {
  let sql = `SELECT * FROM tasks WHERE userID=${req.user.id}`;

  db.all(sql, (err, tasks) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({ error: err.message });
    }

    sql = `SELECT * FROM dividers WHERE userID=${req.user.id}`;
    db.all(sql, (err, dividers) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
      }

      const toDo = tasks.filter((task) => {
        return task.state === 1;
      });

      const inProgress = tasks.filter((task) => {
        return task.state === 2;
      });

      const completed = tasks.filter((task) => {
        return task.state === 3;
      });

      res.render('tasks/list', { toDo, inProgress, completed, dividers });
    });
  });
});

router.get('/add', isLoggedIn, (req, res) => {
  const { state } = req.query;

  res.render('tasks/add', { state });
});

router.get('/delete/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM tasks WHERE id=${id} AND userID=${req.user.id}`,
    (err) => {
      if (err) {
        console.log(err.message);
      }

      res.redirect('/tasks');
    }
  );
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM tasks WHERE id=${id} AND userID=${req.user.id}`;
  db.all(sql, (err, rows) => {
    if (err) {
      console.log(err);
    }

    res.render('tasks/edit', { task: rows[0] });
  });
});

router.post('/', isLoggedIn, (req, res) => {
  const task = req.body;
  const { state } = req.query;

  db.run(
    `INSERT INTO tasks(title, desc, state, userID) VALUES('${task.title}', '${task.desc}', ${state}, ${req.user.id})`,
    (err) => {
      if (err) {
        req.flash('error', 'La tarea no hasido agregada satisfactoriamente.');
      } else {
        req.flash('success', 'La tarea ha sido agregada satisfactoriamente.');
      }

      res.redirect('tasks');
    }
  );
});

router.post('/:id/edit', isLoggedIn, (req, res) => {
  const updatedTask = req.body;
  const { id } = req.params;

  const sql = `UPDATE tasks SET title='${updatedTask.title}', desc='${updatedTask.desc}' WHERE id=${id} AND userID=${req.user.id}`;
  db.run(sql, (err) => {
    if (err) {
      req.flash('error', 'La tarea no ha sido editada satisfactoriamente.');
    } else {
      req.flash('success', 'La tarea ha sido editada satisfactoriamente.');
    }

    res.redirect('/tasks');
  });
});

router.put('/:id/state/:state', isLoggedIn, (req, res) => {
  const { id, state } = req.params;

  const sql = `UPDATE tasks SET state=${state} WHERE id=${id} AND userID=${req.user.id}`;
  db.run(sql, (err) => {
    if (err) {
      console.log(err.message);
      res.sendStatus(500);
    }

    res.sendStatus(200);
  });
});
module.exports = router;
