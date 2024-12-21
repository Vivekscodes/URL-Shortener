const express = require("express");
const { connecttodb } = require("./connect");

const path = require("path")
const cookieparser = require("cookie-parser");
const { restrictToLoggedUser } = require("./Middleware/auth")
const app = express();
const URL = require("./Models/url");
const { url } = require("inspector");
const PORT = 3000;
const userRoute = require("./Routes/user")
const urlRoute = require("./Routes/url");
const staticRoute = require("./Routes/staticRouter");
// const userRoute=require("./Routes/user")    //importing user route

connecttodb("mongodb://localhost:27017/URLShortener").then(() => {
    console.log("mongodb connected");
})
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.get("/", async (req, res) => {

// })
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieparser());
app.use("/url", restrictToLoggedUser, urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);
app.get("/test", async (req, res) => {
    const allurls = await URL.find();
    return res.render("home", {
        urls: allurls,
    });
})
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId,
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );
    res.redirect(entry.redirectURL);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})