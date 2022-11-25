const bcrypt = require("bcrypt");
async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  try {
    return bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
}

async function comparePass(dbpass, inputpass) {
  const salt = await bcrypt.genSalt(10);
  try {
    return bcrypt.compare(dbpass, inputpass);
  } catch (error) {
    throw error;
  }
}
module.exports = {
  hashedPassword,
  comparePass,
};

// var bcrypt = require("bcryptjs");
// var salt = bcrypt.genSaltSync(10);

// module.exports.hashEncrypt = async (password) => {
//   var hash = bcrypt.hashSync(password, salt);
//   return salt;
// };
// module.exports.hashDecrypt = async (password) => {
//   var hash = bcrypt.compareSync(password, hash);
//   return hash;
// };
