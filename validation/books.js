const joi = require("joi");
const schema = require("../models/index");
const validateSchema = async (inputs, Schema) => {
  try {
    const { error, value } = schema.validate(inputs);
    if (error)
      throw error.details
        ? error.details[0].message.replace(/['""]+/g, "")
        : " ";
    else return false;
  } catch (error) {
    throw error;
  }
};
module.exports.createBook = async (req, property = "body") => {
  let schems = {};
  schema = joi.object().keys({
    BookName: joi.string().required(),
    BookPrice: joi.string().required(),
    AutherName: joi.string().required(),
  });
  return await validateSchema(req[property], schema);
};
