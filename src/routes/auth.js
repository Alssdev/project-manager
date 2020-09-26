const { Router } = require('express');
const router = Router();

const { isNotLoggedIn, isLoggedIn } = require('../lib/auth');

const passport = require('passport');

router.get('/signup', isNotLoggedIn, (req, res) => {
	res.render('auth/signup');
});

router.get('/signin', isNotLoggedIn, (req, res) => {
	res.render('auth/signin');
});

router.get('/logout', isLoggedIn, (req, res) => {
	req.logOut();
	res.redirect('/signin');
});

router.post(
	'/signup',
	isNotLoggedIn,
	passport.authenticate('local.signup', {
		successRedirect: '/tasks',
		failureRedirect: '/signup',
		failureFlash: true,
	})
);

router.post('/signin', isNotLoggedIn, (req, res, next) => {
	passport.authenticate('local.signin', {
		successRedirect: '/tasks',
		failureRedirect: '/signin',
		failureFlash: true,
	})(req, res, next);
});

module.exports = router;
