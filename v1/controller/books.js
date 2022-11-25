const model = require("../../models/index");

//get user

async function getBook(req, res, next) {
  try {
    const data = await model.bookModel.findById(req.query.id);
    if (data) {
      return res.status(200).send({
        message: "book get succesfully",
        data: data,
      });
    }
    return res.status(500).send({
      message: "book not get",
      data: {},
    });
  } catch (e) {
    next(e);
  }
}

//create user

async function createBook(req, res, next) {
  try {
    const data = await model.bookModel.create(req.body);
    if (!data) {
      return res.status(500).send({
        message: "book  not create succesfully",
        data: {},
      });
    }
    return res.status(200).send({
      message: "book  create",
      data: data,
    });
  } catch (e) {
    next(e);
  }
}

//update user

async function updateBook(req, res, next) {
  try {
    console.log("hello i am harry");
    const data = await model.bookModel.findOneAndUpdate(req.query.id, req.body);
    // const data = await model.bookModel.findOneByIdAndUpdate(
    //   { _id: req.params.id },
    //   {
    //     $set: {
    //       BookName: req.body,
    //       BookPrice: req.body,
    //       AuthorName: req.body,
    //     },
    //   },
    //   {
    //     new: true,
    //   }
    // );
    if (data) {
      return res.status(200).send({
        message: "book  updated succesfully",
        data: data,
      });
    }
    res.json({
      success: true,
      updatedData: data,
    });
  } catch (e) {
    next(e);
  }
}

//delete user

async function deleteBook(req, res, next) {
  try {
    console.log("hi am harjeet");
    const user = await model.bookModel.findByIdAndDelete(
      //req.params.id
      req.query.id
    );
    if (!user) {
      return res.status(200).send({
        message: "book not is deleted ",
        data: {},
      });
    }
    return res.status(500).send({
      message: "book is deleted",
      data: user,
    });
    // res.json({
    //   message: "not delete",
    //   data: user,
    // });
  } catch (e) {
    next(e);
  }
}

//pagging

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
    const count = await model.bookModel.count();

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

//get all books

async function getAllBook(req, res, next) {
  try {
    const data = await model.bookModel.find();
    if (data) {
      return res.status(200).send({
        message: "all books get succesfully",
        data: data,
      });
    }
    return res.status(500).send({
      message: "books not get",
      data: {},
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
  paging,
  getAllBook,
};
