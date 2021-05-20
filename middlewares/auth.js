module.exports = {
    loginRequired(req, res, next) {
        if (req.user) {
            return next();
        }
        return res.json('Please Login First');;
    }
};