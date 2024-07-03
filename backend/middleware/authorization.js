// middleware/authorize.js
const authorize = (roles = []) => {
    // roles param can be a single role string (e.g. 'staff') or an array of roles (e.g. ['staff', 'parent'])
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        if (!req.user || (roles.length && !roles.includes(req.user.role))) {
            // user's role is not authorized
            return res.status(403).json({ message: 'Forbidden' });
        }

        // authentication and authorization successful
        next();
    };
};

module.exports = authorize;
