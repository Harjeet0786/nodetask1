const express = require("express");

const userRoutes = require("./user");
const bookRoutes = require("./books");
const router = express.Router();

router.use("/user", userRoutes);
router.use("/book", bookRoutes);

module.exports = router;
