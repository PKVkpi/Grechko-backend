const router = require('express').Router();
const pool = require('../config/config');
const passport = require('../config/passport')

router.get('/login', function (req, res) {
    const data = {};
    data.title = 'Login';
    res.status(200).json(data);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            return res.status(500).json({ message: 'Something went wrong authenticating user' });
        }

        if (!theUser) {
            return res.status(401).json(failureDetails);
        }

        // save user in session
        req.login(theUser.id, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Session save went bad.' });
            }
            res.status(200).json(theUser.id);
        });
    })(req, res, next);
});

router.post('/logout', (req, res) => {
    req.logout();
    res.status(200).json('OK');
})

router.post('/signup', (request, response) => {
    const role = 0;
    const password = request.body.password ? request.body.password : null;
    const name = request.body.name ? request.body.name : null;
    const surname = request.body.surname ? request.body.surname : null;
    const registrationDate = request.body.registrationDate ? request.body.registrationDate : null;
    const location = request.body.location ? request.body.location : null;
    const passportSeries = request.body.passportSeries ? request.body.passportSeries : null;
    const passportNumber = request.body.passportNumber ? request.body.passportNumber : null;
    const passportIssuingAuthority = request.body.passportIssuingAuthority ? request.body.passportIssuingAuthority : null;
    const passportIssuingDate = request.body.passportIssuingDate ? request.body.passportIssuingDate : null;
    const identificationCode = request.body.identificationCode ? request.body.identificationCode : null; 
    const email = request.body.email ? request.body.email : null;
    const workplaceId = request.body.workplaceId ? request.body.workplaceId : null;
    const secondName = request.body.secondName ? request.body.secondName : null;

    const query = `INSERT INTO public."users" ` +
        `(role, password, name, surname, registrationDate, location, passportSeries, ` +
        `passportNumber, passportIssuingAuthority, passportIssuingDate, identificationcode, email, workplaceId, secondName) ` +
        `VALUES (${role}, '${password}', '${name}', '${surname}', '${registrationDate}', '${location}', '${passportSeries}', ` +
        `'${passportNumber}', '${passportIssuingAuthority}', '${passportIssuingDate}', ${identificationCode}, '${email}', ${workplaceId}, '${secondName}');`

    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        }
        response.status(200).json('OK');
    })
})

module.exports = router;