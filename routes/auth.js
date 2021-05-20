const router = require('express').Router();
const pool = require('../config/config');

router.get('/login', function (req, res) {

    console.log('in get login');
    // console.log(req.user);


    const data = {};
    data.title = 'Login';
    res.status(200).json(data);
});

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
            response.status(400).json(err);
        }
        response.status(200).json('OK');
    })
})

module.exports = function (passport) {
    console.log('here');

    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
    }), async function (req, res) {
        console.log('in post login');
        console.log(req.sessionID);
        console.log(req.cookies);
        const id = req.user.id;
        console.log(req.user);
        res.send(req.cookies);
    })

    return router;
};

// module.exports = router;