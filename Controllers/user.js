const { v4: uuidv4 } = require('uuid')
const { SetUser } = require('../Service/Auth')
const user = require("../Models/user");
async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await user.create({ name, email, password });
    return res.render("home")
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const User = await user.findOne({ email, password });
    if (!User)
        return res.render("login", {
            error: "Invalid email or password"
        })
    const sessionID = uuidv4();
    SetUser(sessionID, User);
    res.cookie("UID", sessionID);
    return res.redirect("/")
}
module.exports = {
    handleUserSignup,
    handleUserLogin
}