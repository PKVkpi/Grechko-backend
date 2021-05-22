const router = require('express').Router();
const pool = require('../config/config');
const { loginRequired } = require('../middlewares/auth');

// router.get('/', loginRequired, (request, response) => {
//     pool.query('SELECT * FROM public."users" ORDER BY id ASC', (err, res) => {
//         if (err) {
//             response.status(400).json(err);
//         }
//         response.status(200).json(res.rows);
//     })
// })

module.exports = router;