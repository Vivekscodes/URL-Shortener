```javascript
const express = require("express");
const URL = require("../Models/url"); // Import the URL model
const router = express.Router();

// Route to display all URLs on the homepage
router.get("/", async (req, res) => {
  try {
    const allUrls = await URL.find({}); // Fetch all URLs from the database
    return res.render("home", {
      urls: allUrls, // Pass the URLs to the 'home' template
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return res.status(500).send("Internal Server Error"); // Handle errors appropriately
  }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  return res.render("SignUp"); // Render the 'SignUp' template
});

// Route to render the login page
router.get("/login", (req, res) => {
  return res.render("Login"); // Render the 'Login' template
});

module.exports = router;
```