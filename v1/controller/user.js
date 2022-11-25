const bcrypt = require("../../service/hash");
const model = require("../../models/index");
const hash = require("../../service/hash");
const auth = require("../../service/jwt");
const validate = require("../../validation/index");
const service = require("../../service");
//const { body, validationResult } = require("express-validator");
//const { validate } = require("../../models/user");

//get user

async function getUser(req, res, next) {
  try {
    const data = await model.userModel.findById(req.query.id);
    if (data) {
      return res.status(200).send({
        message: "user get succesfully",
        data: data,
      });
    }
    return res.status(500).send({
      message: "user not get",
      data: {},
    });
  } catch (e) {
    next(e);
  }
}

//create user

async function createUser(req, res, next) {
  try {
    // await validate.userValidation.createUser1(req.body);
    // console.log(req.body, "hello");
    console.log(req.body, "zxcvbbnmm");
    req.body.password = await hash.hashedPassword(req.body.password);
    const user = await model.userModel.create(req.body);

    if (user) {
      return res.status(200).send({
        message: "user create succesfully",
        data: user,
      });
    }
    return res.status(300).send({
      message: "user  not created successfully",
      data: {},
    });
  } catch (e) {
    next(e);
  }
}

//update user

async function updateUser(req, res, next) {
  try {
    console.log(req.body, "hello i am harry");
    // const data = await model.userModel.findOneAndUpdate(
    const data = await model.userModel.findByIdAndUpdate(
      //   req.query.id,
      //   req.body
      // );
      req.query.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    if (data) {
      return res.status(200).send({
        message: "user  updated succesfully",
        data: data,
      });
    }
    // res.json({
    //   success: true,
    //   updatedData: data,
    // });
    return res.status(500).send({
      message: "user not updated",
      data: {},
    });
  } catch (e) {
    next(e);
  }
}

//delete user

async function deleteUser(req, res, next) {
  try {
    console.log("hello i am harry");
    const user = await model.userModel.findByIdAndDelete(
      //req.params.id,
      req.query.id
    );
    if (!user) {
      return res.status(200).send({
        message: "user is  not deleted ",
        data: {},
      });
    }
    return res.status(500).send({
      message: "user is deleted",
      data: user,
    });
    // res.json({
    //   message:"not delete",
    //   data:data
    // })
  } catch (e) {
    next(e);
  }
}
async function getAllUser(req, res, next) {
  try {
    console.log("harry");
    const user = await model.userModel.find();
    // //.find(){ bookId: req.query.bookId })
    // .populate("bookId"));
    if (user) {
      return res.status(200).send({
        message: "get all user succesfully",
        data: user,
      });
    }
    return res.status(500).send({
      message: "user  not get",
      data: {},
    });
  } catch (e) {
    next(error);
  }
}

//login user

async function logInUser(req, res, next) {
  try {
    console.log(req.body, "hello i am harry");
    const { email, password } = req.body;
    const user = await model.userModel.findOne({ email: email });
    //  { password: password })

    //.lean();
    if (!user) {
      return res.status(400).send({
        status: "RXERROR",
        message: "user  not log in succesfully",
      });
    }
    //compare

    //console.log(user);

    const result = await bcrypt.comparePass(password, user.password);

    if (result == true) {
      user.token = await service.jwtService.sign({ _id: user._id });
      console.log("token");

      return res.status(201).send({
        status: "RXSUCCESS",
        message: "user login  succesfully now",
        data: user,
      });
    } else {
      return res.json({
        status: "RXERROR",
        message: "incorrect password",
        data: {},
      });
    }
  } catch (e) {
    console.log(e);
    next(e);
  }
}

// pagging

async function paging(req, res) {
  try {
    console.log("hello i am harry");
    const { page = 1, limit = 10 } = req.query;
    //req.params.id, req.query.id
    const data = await model.bookModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await model.userModel.count();

    res.json({
      data: data,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    console.log("error");
    // return res.status(500).send({
    //   message: "not get",
    //   data: {},
    // });
  }
}

module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logInUser,
  getAllUser,
  paging,
  //getAllUser1,
  // createUser1,
};

// let user = await User.findOne({
//   email: req.body.email,
// });
// if (!user) return res.status(400).send(`User not found`);

// const salt = await bcrypt.genSalt(10);
// user.password = await bcrypt.hash(req.body.password, salt);

// user = await user.save();
/*async function logInUser(req, res, next) {
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      res.status(401).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      res.status(200).json({
        message: "Login successful",
        data:user,
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};*/
//log in user
// async function logInUser(req, res, next) {
//   try {
//     console.log(req.body, "zxcvbbnmm");
//     req.body.password = await hash.hashedPassword(req.body.password);
//     const chackEmail = await model.userModel.findOne({
//       email: req.body.email,
//     });
//     if (checkEmail != null) {
//       throw "email already exist";
//     }
//     const user = await model
//       .userModel({
//         userName: req.body.userName,
//         email: req.body.email,
//         password: req.body.password,
//       })
//       .save();
//     return res.status(201).send({
//       message: "create successfully",
//       data: user,
//     });
//   } catch (e) {
//     next(e);
//   }
// }

// async function getAllUser1(req, res, next) {
//   try {
//     console.log("harry");
//     const user = await model.userModel
//       .find({ bookId: req.query.bookId })
//       .populate("bookId");
//     if (user) {
//       return res.status(200).send({
//         message: "get all user succesfully",
//         data: user,
//       });
//     }
//     return res.status(500).send({
//       message: "user  not get",
//       data: {},
//     });
//   } catch (e) {
//     next(error);
//   }
// }
