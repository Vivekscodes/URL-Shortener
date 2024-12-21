const shortid = require("shortid");
const URL = require("../Models/url.js");

async function generateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).send("URL is required"); // Added check for body.url
    const shortId = shortid();
    try {
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.users._id,
        });
        return res.render("home", { id: shortId });
    } catch (error) {
        res.status(500).send("Error creating new URL");
    }
}

module.exports = {
    generateNewShortURL,// Ensure the function is properly exported
};