const router = require('express').Router();
const pool = require('../config/config');

router.post('/add', (request, response) => {
    const name = request.body.name ? request.body.name : null;
    const surname = request.body.surname ? request.body.surname : null;
    const EKKName = request.body.EKKName ? request.body.EKKName : null;
    const EKKDate = request.body.EKKDate ? request.body.EKKDate : null;
    const EKKNumber = request.body.EKKNumber ? request.body.EKKNumber : null;
    const qualDate = request.body.qualDate ? request.body.qualDate : null;
    const qualNumber = request.body.qualNumber ? request.body.qualNumber : null;
    const expertiseType  = request.body.expertiseType  ? request.body.expertiseType  : null;
    const expertSpeciality   = request.body.expertSpeciality   ? request.body.expertSpeciality   : null;
    const location = request.body.location ? request.body.location : null;
    const email = request.body.email ? request.body.email : null;
    const phone = request.body.phone ? request.body.phone : null;
    const workplaceId = request.body.workplaceId ? request.body.workplaceId : null;
    const secondName = request.body.secondName ? request.body.secondName : null;

    const query = `INSERT INTO public."courtExperts" ` +
        `(name, surname, ekkname, ekkdate, ekknumber, qualdate, qualnumber, ` +
        `expertisetype, expertspeciality, location, email, phone, workplaceid, secondname) ` +
        `VALUES ('${name}', '${surname}', '${EKKName}', '${EKKDate}', '${EKKNumber}', '${qualDate}', '${qualNumber}', ` +
        `${expertiseType}, '${expertSpeciality}', '${location}', '${email}', '${phone}', ${workplaceId}, '${secondName}');`

    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            response.status(400).json(err);
        }
        response.status(200).json('OK');
    })
})

router.put('/:id/update', (request, response) => {
    const courtExpertId = request.params.id;

    // console.log(request.user.rows[0]);

    // const currentUser = request.user.rows[0].role;
    // if (user.id != userId && currentUser != 2) {
    //     // response.status(403).json('Forbidden');
    //     console.log('forbidden');
    // }

    const name = request.body.name ? request.body.name : null;
    const surname = request.body.surname ? request.body.surname : null;
    const EKKName = request.body.EKKName ? request.body.EKKName : null;
    const EKKDate = request.body.EKKDate ? request.body.EKKDate : null;
    const EKKNumber = request.body.EKKNumber ? request.body.EKKNumber : null;
    const qualDate = request.body.qualDate ? request.body.qualDate : null;
    const qualNumber = request.body.qualNumber ? request.body.qualNumber : null;
    const expertiseType  = request.body.expertiseType  ? request.body.expertiseType  : null;
    const expertSpeciality   = request.body.expertSpeciality   ? request.body.expertSpeciality   : null;
    const location = request.body.location ? request.body.location : null;
    const email = request.body.email ? request.body.email : null;
    const phone = request.body.phone ? request.body.phone : null;
    const workplaceId = request.body.workplaceId ? request.body.workplaceId : null;
    const secondName = request.body.secondName ? request.body.secondName : null;

    const query = `UPDATE public."courtExperts" SET ` +
        `(name, surname, ekkname, ekkdate, ekknumber, qualdate, qualnumber, ` +
        `expertisetype, expertspeciality, location, email, phone, workplaceid, secondname) = ` +
        `('${name}', '${surname}', '${EKKName}', '${EKKDate}', '${EKKNumber}', '${qualDate}', '${qualNumber}', ` +
        `${expertiseType}, '${expertSpeciality}', '${location}', '${email}', '${phone}', ${workplaceId}, '${secondName}') WHERE id = ${courtExpertId};`

    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            response.status(400).json(err);
        }
        response.status(200).json('OK');
    })
})

module.exports = router;