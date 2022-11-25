const joi = require("joi");
const { schema } = require("../models/user");
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
exports.createUser = async (req, property = "body") => {
  let schems = {};
  schema = joi.object().keys({
    userName: joi.string().required(),
    age: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().required(),
    AuthorName: joi.string().required(),
  });
  return await validateSchema(req[property], schema);
};
