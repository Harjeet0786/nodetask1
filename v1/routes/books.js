const express = require("express");
const router = express.Router();

const controller = require("../controller/books");

router.post("/create", controller.createBook);
router.get("/getall", controller.getAllBook);
router.get("/", controller.getBook);
router.put("/update/_id", controller.updateBook);
router.delete("/del/:id", controller.deleteBook);
router.get("/page", controller.paging);

module.exports = router;
