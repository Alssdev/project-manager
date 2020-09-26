const { Router } = require('express');
const router = Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
	res.render('auth/signup');
});

router.post(
	'/signup',
	passport.authenticate('local.signup', {
		successRedirect: '/tasks',
		failureRedirect: '/signup',
		failureFlash: true,
	})
);

module.exports = router;
