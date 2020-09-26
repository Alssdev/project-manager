const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../db');
const passwords = require('./password');

passport.use(
	'local.signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true,
		},
		async (req, username, password, done) => {
			const { name, email } = req.body;
			password = await passwords.encrypt(password);

			let sql = `INSERT INTO users(name, email, password) VALUES('${name}','${email}', '${password}')`;
			db.run(sql, (error) => {
				if (error) {
					return done(error, null);
				}

				sql = `SELECT * FROM users WHERE name='${name}'`;
				db.all(sql, (error, rows) => {
					if (error) return done(error, null);

					return done(null, { name, email, password, id: rows[0].id });
				});
			});
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	sql = `SELECT * FROM users WHERE id='${id}'`;
	db.all(sql, (error, rows) => {
		if (error) return done(error, null);

		return done(null, rows[0]);
	});
});
