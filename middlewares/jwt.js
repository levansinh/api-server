const jwt = require('jsonwebtoken');
const _CONF = require('../configs')

const gennerateAccessToken = (uid, role) => jwt.sign({_id: uid, role},_CONF.SECRET, { expiresIn: '2d' } )
const gennerateRefreshToken = (uid) => jwt.sign({_id: uid}, _CONF.SECRET_REFRESH, {expiresIn: '7d' })

module.exports = {
    gennerateAccessToken,
    gennerateRefreshToken
}