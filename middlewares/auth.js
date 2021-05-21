module.exports = {
    loginRequired(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.json('Please Login First');;
    }
};