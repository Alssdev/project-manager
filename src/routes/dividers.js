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

module.exports = router;
