const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../lib/auth');

const db = require('../db');

router.get('/add', (req, res) => {
  res.render('dividers/add');
});

router.get('/delete/:id', isLoggedIn, (req, res) => {
  const { id } = req.params;

  db.run(
    `DELETE FROM dividers WHERE id=${id} AND userID=${req.user.id}`,
    (err) => {
      if (err) {
        req.flash('error', 'No se ha podido eliminar el divisor');
      }

      res.redirect('/tasks');
    }
  );
});

router.get('/:id/edit', isLoggedIn, (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM dividers WHERE id=${id} AND userID=${req.user.id}`;
  db.all(sql, (err, rows) => {
    if (err) {
      req.flash('error', 'No se puedo acceder a los datos del divisor');
      return res.redirect('/tasks');
    }

    res.render('dividers/edit', { divider: rows[0] });
  });
});

router.post('/', isLoggedIn, (req, res) => {
  const { title } = req.body;

  db.run(
    `INSERT INTO dividers(title, userID) VALUES('${title}', ${req.user.id})`,
    (err) => {
      if (err) {
        req.flash('error', 'El divisor no hasido agregada satisfactoriamente.');
      } else {
        req.flash('success', 'El divisor ha sido agregada satisfactoriamente.');
      }

      res.redirect('tasks');
    }
  );
});

router.post('/:id/edit', isLoggedIn, (req, res) => {
  const divider = req.body;
  const { id } = req.params;

  const sql = `UPDATE dividers SET title='${divider.title}' WHERE id=${id} AND userID=${req.user.id}`;
  db.run(sql, (err) => {
    if (err) {
      req.flash('error', 'El divisor no ha sido editada satisfactoriamente.');
    } else {
      req.flash('success', 'El divisor ha sido editada satisfactoriamente.');
    }

    res.redirect('/tasks');
  });
});

module.exports = router;
