module.exports = {
    adminLogined(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role > 1) {
                return next();
            }
        }
        return res.json('Not anough rights');
    },
    registratorLogined(req, res, next) {
        if (req.isAuthenticated()) {
            if (req.user.role > 0) {
                return next();
            }
        }
        return res.json('Not anough rights');
    },
    loginRequired(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.json('Please Login First');
    }
};