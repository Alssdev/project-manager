const { Router } = require('express');
const router = Router();

const { isLoggedIn } = require('../lib/auth');

const db = require('../db');

router.get('/add', (req, res) => {
  res.render('dividers/add');
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
