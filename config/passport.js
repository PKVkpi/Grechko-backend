const passport = require('passport');
const bcrypt = require("bcryptjs");
const pool = require('./config');

const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (user, done) {
    console.log('in here 2');
    return done(null, user.id);
})

passport.deserializeUser(async function (id, done) {
    const query = `SELECT * FROM public."users" WHERE id = ${id};`;
    console.log('in here 3: ', id);
    pool.query(query, (err, res) => {
        if (err) {
            console.log('Error: ' + err);
            return done(err);
        }
        return done(null, res);
    })
})

passport.use(new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email',
    passwordField: 'password',
}, async function (req, email, password, done) {
    const query = `SELECT * FROM public."users" WHERE email = '${email}';`;

    console.log(email);

    pool.query(query, async function (err, res) {
        if (err) {
            console.log('Error1: ' + err);
            return done(err, false);
        }

        const user = res.rows[0];

        if (user && user.id) {
            console.log(password);
            console.log(user.password);

            const match = await bcrypt.compare(password, user.password);
            
            if (true) {
                console.log("matched");
                return done(null, {
                    id: user.id
                });
            }
        }

        console.log('Error2: ' + err);
        return done(err, false);
    })
}));

module.exports = passport;