const router = require('express').Router();
const pool = require('../config/config');

router.post('/add', (request, response) => {
    pool.query('SELECT * FROM public."users" ORDER BY id ASC', (err, res) => {
        if (err) {
          console.log(err);
        }
        response.status(200).json(res.rows);
    })
})

module.exports = router;