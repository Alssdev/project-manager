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
      let { name, email } = req.body;
      email = email.toLowerCase();

      password = await passwords.encrypt(password);

      let sql = `SELECT * FROM users`;
      db.all(sql, (error, rows) => {
        if (error)
          return done(
            error,
            false,
            req.flash('error', 'No se puedo realizar el registro')
          );

        const users = rows.filter((user) => {
          return user.email === email;
        });

        if (users.length === 0) {
          sql = `INSERT INTO users(name, email, password) VALUES('${name}','${email}', '${password}')`;
          db.run(sql, (error) => {
            if (error) {
              return done(
                error,
                false,
                req.flash('error', 'No se puedo realizar el registro')
              );
            }

            let sql = `SELECT * FROM users WHERE email = '${email}'`;
            db.all(sql, (error, rows) => {
              if (error) return done(error, false);

              return done(
                null,
                { name, email, password, id: rows[0].id },
                req.flash('success', 'Bienvenido ' + name)
              );
            });
          });
        } else {
          return done(
            error,
            false,
            req.flash('error', 'Este usuario ya está registrado')
          );
        }
      });
    }
  )
);

passport.use(
  'local.signin',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    (req, email, password, done) => {
      email = email.toLowerCase();
      sql = `SELECT * FROM users WHERE email='${email}'`;
      db.all(sql, async (error, rows) => {
        if (rows.length > 0) {
          const user = rows[0];
          const isValidPassword = await passwords.match(
            password,
            user.password
          );

          if (isValidPassword) {
            done(null, user, req.flash('success', `Bienvenido ${user.name}`));
          } else {
            done(
              null,
              false,
              req.flash('error', 'El usuario o contraseña son inválidos')
            );
          }
        } else {
          done(
            null,
            false,
            req.flash('error', 'El usuario o contraseña son inválidos')
          );
        }
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
