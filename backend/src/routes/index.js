const express = require("express");

const router = express.Router();

// Import and use individual route modules
router.use("/items", require("./items"));
router.use("/authors", require("./authors"));

module.exports = router;