const router = require('express').Router();
const pool = require('../config/config');

router.get('/', (request, response) => {
    pool.query('SELECT * FROM public."positions" ORDER BY id ASC', (err, res) => {
        if (err) {
            response.status(400).json(err);
        }
        response.status(200).json(res.rows);
    })
})

router.get('/:id', (request, response) => {
    const positionId = request.params.id;
    pool.query(`SELECT * FROM public."positions" WHERE id = ${positionId};`, (err, res) => {
        if (err) {
            response.status(400).json(err);
        }
        response.status(200).json(res.rows);
    })
})

module.exports = router;