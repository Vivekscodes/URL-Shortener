const { GetUser } = require('../Service/Auth')
const cookieparser = require('cookie-parser')
async function restrictToLoggedUser(req, res, next) {
    console.log(req
    )
    const userid = req.cookies?.uid;
    if (!userid) return res.redirect('/login')
    const user = GetUser(userid)
    if (!user) return res.redirect('/login')
    req.user = user;
    next()
}
module.exports = {
    restrictToLoggedUser,
}