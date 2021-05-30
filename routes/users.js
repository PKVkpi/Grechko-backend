const router = require('express').Router();
const pool = require('../config/config');
const { loginRequired, registratorLogined } = require('../middlewares/auth');

router.get('/', (request, response) => {
    const query = `SELECT * FROM public."users";`;
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        } 

        const user = res.rows[0];
        response.status(200).json(user);
    })
})

router.get('/:id', (request, response) => {
    const userId = request.params.id;
    const query = `SELECT * FROM public."users" WHERE id = ${userId};`;
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        } 

        const user = res.rows[0];
        if (!user) {
            return response.status(404).json('Not found');
        }

        response.status(200).json(user);
    })
})

router.put('/:id/update', loginRequired, (request, response) => {
    const userId = request.params.id;
    const currentUser = request.user.rows[0];
    if (currentUser.id != userId && currentUser.role == 0) {
        return response.status(403).json('Forbidden');
    }

    const currDate = new Date().toISOString();

    const query = `SELECT * FROM public."users" WHERE id = ${userId};`;

    console.log('Updating user');

    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return response.status(400).json(err);
        } 
 
        const oldUser = res.rows[0];
        if (!oldUser) {
            return response.status(404).json('Not found');
        }
        
        const role = request.body.role || oldUser.role;
        

        if (currentUser.role != 2 && oldUser.role != role) {
            return response.status(403).json("Forbidden action");
        }

        
        const password = request.body.password || oldUser.password;
        const name = request.body.name || oldUser.name;
        const surname = request.body.surname || oldUser.surname;
        const location = request.body.location || oldUser.location;
        const passportSeries = request.body.passportSeries || oldUser.passportSeries;
        const passportNumber = request.body.passportNumber || oldUser.passportNumber;
        const passportIssuingAuthority = request.body.passportIssuingAuthority || oldUser.passportIssuingAuthority;
        const passportIssuingDate = request.body.passportIssuingDate || oldUser.passportIssuingDate;
        const identificationCode = request.body.identificationCode || oldUser.identificationCode; 
        const workplaceId = request.body.workplaceId || oldUser.workplaceId || 1;
        const secondName = request.body.secondName || oldUser.secondName;
        console.log(password)
        const query = `UPDATE public."users" SET (role, password, name, surname, location, passportSeries, passportnumber, ` +
            `passportissuingauthority, passportissuingdate, identificationcode, workplaceid, secondname) = ` +
            `('${role}', '${password}', '${name}', '${surname}', '${location}', '${passportSeries}', '${passportNumber}', ` +
            `'${passportIssuingAuthority}', '${passportIssuingDate}', ${identificationCode}, ${workplaceId}, '${secondName}') WHERE id = ${userId};`;

        pool.query(query, (err, res) => {
            if (err) {
                console.log(err);
                return response.status(400).json(err);
            }

            const changedFrom = {
                'role': oldUser.role,
                'password': oldUser.password,
                'name': oldUser.name,
                'surname': oldUser.surname,
                'location': oldUser.location,
                'passportseries': oldUser.passportseries,
                'passportnumber': oldUser.passportnumber,
                'passportissuingauthority': oldUser.passportissuingauthority,
                'passportissuingdate': oldUser.passportissuingdate,
                'identificationcode': oldUser.identificationcode,
                'workplaceid': oldUser.workplaceid,
                'secondname': oldUser.secondname
            }
            const changedTo = {
                'role': role,
                'password': password,
                'name': name,
                'surname': surname,
                'location': location,
                'passportseries': passportSeries,
                'passportnumber': passportNumber,
                'passportissuingauthority': passportIssuingAuthority,
                'passportissuingdate': passportIssuingDate,
                'identificationcode': identificationCode,
                'workplaceid': workplaceId,
                'secondname': secondName
            }

            const query = `INSERT INTO public."archive" ` +
            `(tablica, entityid, changedfrom, changedTo, changedby, changedate) VALUES ` +
            `('users', ${userId}, '${JSON.stringify(changedFrom)}', '${JSON.stringify(changedTo)}', ${currentUser.id}, '${currDate}');` 

            pool.query(query, (err, res) => {
                if (err) {
                    console.log(err);
                    return response.status(400).json(err);
                }

                response.status(200).json('OK');
            });
        })
    })
})

module.exports = router;