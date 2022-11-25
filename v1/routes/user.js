const express = require("express");
const auth = require("../../service/jwt");
const service = require("../../service");
const router = express.Router();

const controller = require("../controller/user");

const authmiddleware = async (req, res, next) => {
  console.log("in middleware", req.headers.authorization);
  var token = req.headers.authorization;
  const verify = await service.jwtService.verify(token);
  if (verify == null) {
    return res.status(401).send({
      message: "invalid token",
      data: {},
    });
  }
  req.query.id = verify._id; 
  next();
};

//Request -> Middleware ->controller
router.post("/lin", controller.logInUser);
router.get("/auth", authmiddleware, controller.getUser);
router.post("/create", controller.createUser);
router.get("/", controller.getUser);
router.get("/getall", controller.getAllUser);
router.put("/update/_id", controller.updateUser);
router.delete("/del/:id", controller.deleteUser);
// router.get("/gau1",controller.getAllUser1);
module.exports = router;
