```javascript
// Importing necessary modules
const express = require("express");
const URL = require("../Models/url"); // Import the URL model

// Initializing the router
const router = express.Router();

// Route to display all URLs on the homepage
router.get("/", async (req, res) => {
  // Fetch all URLs from the database
  const allUrls = await URL.find({});
  
  try {
    // Pass the URLs to the 'home' template
    res.render("home", { urls: allUrls });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    // Handle errors appropriately
    res.status(500).send("Internal Server Error");
  }
});

// Route to render the signup page
router.get("/signup", (req, res) => {
  // Render the 'SignUp' template
  res.render("SignUp");
});

// Route to render the login page
router.get("/login", (req, res) => {
  // Render the 'Login' template
  res.render("Login");
});

// Exporting the router
module.exports = router;
```