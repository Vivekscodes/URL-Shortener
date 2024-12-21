const express = require("express");
const { generateNewShortURL } = require("../Controllers/url");

const router = express.Router();

router.post('/', generateNewShortURL);
// router.get("/analytics/:shortId", handleAnalytics);
module.exports = router;
