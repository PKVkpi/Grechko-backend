const router = require('express').Router();
const pool = require('../config/config');
const { loginRequired } = require('../middlewares/auth');

router.put('/:id/update', loginRequired, (request, response) => {
    const userId = request.params.id;
    const currentUser = request.user.rows[0];
    if (currentUser.id != userId && currentUser.role != 2) {
        response.status(403).json('Forbidden');
        console.log('forbidden');
    }

    const password = request.body.password || null;
    const name = request.body.name || null;
    const surname = request.body.surname || null;
    const location = request.body.location || null;
    const passportSeries = request.body.passportSeries || null;
    const passportNumber = request.body.passportNumber || null;
    const passportIssuingAuthority = request.body.passportIssuingAuthority || null;
    const passportIssuingDate = request.body.passportIssuingDate || null;
    const identificationCode = request.body.identificationCode || null; 
    const workplaceId = request.body.workplaceId || null;
    const secondName = request.body.secondName || null;

    const query = `SELECT * FROM public."users" WHERE id = ${userId};`;

    console.log('Updating user');

    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            response.status(400).json(err);
        } 
 
        const user = res.rows[0];
        if (!user) {
            response.status(404).json('Not found');
        }

        const query = `UPDATE public."users" SET (password, name, surname, location, passportSeries, passportnumber, ` +
            `passportissuingauthority, passportissuingdate, identificationcode, workplaceid, secondname) = ` +
            `('${password}', '${name}', '${surname}', '${location}', '${passportSeries}', '${passportNumber}', ` +
            `'${passportIssuingAuthority}', '${passportIssuingDate}', ${identificationCode}, ${workplaceId}, '${secondName}') WHERE id = ${userId};`;

        pool.query(query, (err, res) => {
            if (err) {
                console.log(err);
                response.status(400).json(err);
            }
            response.status(200).json('OK');
        })
    })
})

module.exports = router;