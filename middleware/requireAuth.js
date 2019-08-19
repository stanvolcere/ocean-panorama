const passport = require("passport");

// middleware - auth admin request with JWT
const requireAuthAdmin = passport.authenticate('auth_admin_token', { session: false });

//// middleware - auth user request with JWT
const requireAuthUser = passport.authenticate('auth_user_token', { session: false });

//// middleware - auth user request with JWT
const requireAuth = passport.authenticate('auth_token', { session: false });

module.exports = {
    requireAuthAdmin, requireAuthUser, requireAuth
}