const jwt = require('jwt-simple');
const config = require('../config/keys');

module.exports = (user) => {
    // gets time stamp for now
    const timestamp = new Date().getTime();
    // sub means subject
    return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
}