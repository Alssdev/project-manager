const { Router } = require('express');
const router = Router();

const passport = require('passport');

router.get('/signup', (req, res) => {
	res.render('auth/signup');
});

router.get('/signin', (req, res) => {
	res.render('auth/signin');
});

router.post(
	'/signup',
	passport.authenticate('local.signup', {
		successRedirect: '/tasks',
		failureRedirect: '/signup',
		failureFlash: true,
	})
);

router.post('/signin', (req, res, next) => {
	passport.authenticate('local.signin', {
		successRedirect: '/tasks',
		failureRedirect: '/signin',
		failureFlash: true,
	})(req, res, next);
});

module.exports = router;
