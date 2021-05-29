const router = require('express').Router();
const pool = require('../config/config');
const { loginRequired, registratorLogined } = require('../middlewares/auth');

router.get('/', (request, response) => {
    const query = `SELECT * FROM public."courtExperts";`;
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        } 

        const courtExperts = res.rows;
        response.status(200).json(courtExperts);
    })
})

router.get('/:id', (request, response) => {
    const userId = request.params.id;
    const query = `SELECT * FROM public."courtExperts" WHERE id = ${userId};`;
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        } 

        const courtExpert = res.rows;
        if (!courtExpert) {
            return response.status(404).json('Not found');
        }

        response.status(200).json(courtExpert);
    })
})

router.post('/add', registratorLogined, (request, response) => {
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
            return response.status(400).json(err);
        }
        response.status(200).json('OK');
    })
})

router.put('/:id/update', loginRequired, (request, response) => {
    const courtExpertId = request.params.id;
    const currentUser = request.user.rows[0];
    if (currentUser.id != courtExpertId && currentUser.role == 0) {
        response.status(403).json('Forbidden');
        return console.log('forbidden');
    }

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
    const currDate = new Date().toISOString();

    const query = `SELECT * FROM public."courtExperts" WHERE id = ${courtExpertId};`;

    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        }

        const oldCourtExpert = res.rows[0];
        if (!oldCourtExpert) {
            return response.status(404).json('Not fopund');
        }

        const query = `UPDATE public."courtExperts" SET ` +
        `(name, surname, ekkname, ekkdate, ekknumber, qualdate, qualnumber, ` +
        `expertisetype, expertspeciality, location, email, phone, workplaceid, secondname) = ` +
        `('${name}', '${surname}', '${EKKName}', '${EKKDate}', '${EKKNumber}', '${qualDate}', '${qualNumber}', ` +
        `${expertiseType}, '${expertSpeciality}', '${location}', '${email}', '${phone}', ${workplaceId}, '${secondName}') WHERE id = ${courtExpertId};`

        pool.query(query, (err, res) => {
            if (err) {
                console.log(err);
                return response.status(400).json(err);
            }

            const changedFrom = {
                'name': oldCourtExpert.name,
                'surname': oldCourtExpert.surname,
                'ekkname': oldCourtExpert.ekkname,
                'ekkdate': oldCourtExpert.ekkdate,
                'ekknumber': oldCourtExpert.ekknumber,
                'qualdate': oldCourtExpert.qualdate,
                'qualnumber': oldCourtExpert.qualnumber,
                'expertisetype': oldCourtExpert.expertisetype,
                'expertspeciality': oldCourtExpert.expertspeciality,
                'location': oldCourtExpert.location,
                'email': oldCourtExpert.email,
                'phone': oldCourtExpert.phone,
                'workplaceid': oldCourtExpert.workplaceid,
                'secondname': oldCourtExpert.secondname
            }
            const changedTo = {
                'name': name,
                'surname': surname,
                'ekkname': EKKName,
                'ekkdate': EKKDate,
                'ekknumber': qualNumber,
                'qualdate': qualDate,
                'qualnumber': qualNumber,
                'expertisetype': expertiseType,
                'expertspeciality': expertSpeciality,
                'location': location,
                'email': email,
                'phone': phone,
                'workplaceid': workplaceId,
                'secondname': secondName
            }


            const query = `INSERT INTO public."archive" ` +
            `(tablica, entityid, changedfrom, changedTo, changedby, changedate) VALUES ` +
            `('courtExperts', ${courtExpertId}, '${JSON.stringify(changedFrom)}', '${JSON.stringify(changedTo)}', ${currentUser.id}, '${currDate}');` 

            pool.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                    return response.status(400).json(err);
                }

                response.status(200).json('OK');
            });
        });
    });
})

module.exports = router;