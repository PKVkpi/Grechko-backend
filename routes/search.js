const router = require('express').Router();
const pool = require('../config/config');
const { loginRequired } = require('../middlewares/auth');

router.get('/', loginRequired, (request, response) => {
    // console.log(request.user.rows);

    pool.query('SELECT * FROM public."users" ORDER BY id ASC', (err, res) => {
        if (err) {
          console.log(err);
        }
        response.status(200).json(res.rows);
    })
})

module.exports = router;