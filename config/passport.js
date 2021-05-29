const passport = require('passport');
const bcrypt = require("bcryptjs");
const pool = require('./config');

const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (id, done) {
    return done(null, id);
})

passport.deserializeUser(function (id, done) {
    const query = `SELECT * FROM public."users" WHERE id = ${id};`;
    pool.query(query, (err, res) => {
        if (err) {
            return done(err);
        }
        return done(null, res);
    })
})

passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password',
}, function (req, email, password, done) {
    const query = `SELECT * FROM public."users" WHERE email = '${email}';`;
    pool.query(query, async function (err, res) {
        if (err) {
            console.log('Error1: ' + err);
            return done(err, false);
        }

        const user = res.rows[0];
        if (user && user.id) {
            if (password == user.password) {
                return done(null, user);
            }
        }

        return done(err, false);
    })
}));

module.exports = passport;