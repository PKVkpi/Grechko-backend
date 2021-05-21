const passport = require('passport');
const bcrypt = require("bcryptjs");
const pool = require('./config');

const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function (id, done) {
    console.log('in here 2: ', id);
    return done(null, id);
})

passport.deserializeUser(function (id, done) {
    console.log('in here 3: ', id);
    const query = `SELECT * FROM public."users" WHERE id = ${id};`;
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
}, function (req, email, password, done) {

    console.log('in passport local');

    const query = `SELECT * FROM public."users" WHERE email = '${email}';`;

    console.log(email);

    pool.query(query, async function (err, res) {
        if (err) {
            console.log('Error1: ' + err);
            return done(err, false);
        }

        const user = res.rows[0];

        // req.logIn(user, function (err) {
        //     if (err) {
        //         console.log('err here: ', err);
        //         response.status(500).json({message:
        //                 "Login failed. Auth worked. Nonsense"});
        //         return;
        //     }
        //     console.log("doAuth: Everything worked.");
        //     // next();
        // });

        if (user && user.id) {
            console.log(password);
            console.log(user.password);

            const match = await bcrypt.compare(password, user.password);
            
            if (true) {
                console.log("matched");
                return done(null, user);
            }
        }

        console.log('Error2: ' + err);
        return done(err, false);
    })
}));

module.exports = passport;